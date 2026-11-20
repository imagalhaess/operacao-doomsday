import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

let server;
let characters;
let links;
let modals;
let marathon;
let drawer;
let tracks;
let store;
let coop;
let allItems;
let watchNow;
let shell;
let ui;
let posters;
const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const locationDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'location');

before(async () => {
  const saved = new Map();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => saved.get(key) ?? null,
      setItem: (key, value) => saved.set(key, String(value)),
    },
  });
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: { hash: '#/' },
  });
  server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    ssr: { noExternal: ['peerjs'] },
    appType: 'custom',
  });
  [characters, links, modals, marathon, drawer, tracks, store, coop, { allItems }, watchNow, shell, { ui }, posters] =
    await Promise.all([
      server.ssrLoadModule('/src/data/characters.ts'),
      server.ssrLoadModule('/src/data/links.ts'),
      server.ssrLoadModule('/src/components/coop-modals.ts'),
      server.ssrLoadModule('/src/components/marathon.ts'),
      server.ssrLoadModule('/src/components/detail-drawer.ts'),
      server.ssrLoadModule('/src/components/tracks.ts'),
      server.ssrLoadModule('/src/state/store.ts'),
      server.ssrLoadModule('/src/state/coop.ts'),
      server.ssrLoadModule('/src/data/tracks.ts'),
      server.ssrLoadModule('/src/components/watch-now.ts'),
      server.ssrLoadModule('/src/components/shell.ts'),
      server.ssrLoadModule('/src/state/ui.ts'),
      server.ssrLoadModule('/src/components/poster.ts'),
    ]);
});

after(async () => {
  await server?.close();
  if (storageDescriptor) {
    Object.defineProperty(globalThis, 'localStorage', storageDescriptor);
  } else {
    delete globalThis.localStorage;
  }
  if (locationDescriptor) {
    Object.defineProperty(globalThis, 'location', locationDescriptor);
  } else {
    delete globalThis.location;
  }
});

test('pixel hero HUD and logo appear only on the 8-bit trail', () => {
  const route = ui.route;
  try {
    for (const path of ['/', '/maratona', '/wrapped', '/guia', '/historico']) {
      ui.route = path;
      const html = shell.renderShell('');
      assert.match(html, /class="app-shell theme-classic"/);
      assert.match(html, /class="brand-mark" src="\/icon.svg"/);
      assert.doesNotMatch(html, /pixel-hud-bar|hud-hero-btn|\/icon-8bit.svg/);
      assert.equal([...html.matchAll(/data-action="toggle-sound"/g)].length, 1);
    }
    ui.route = '/trilhas';
    const html = shell.renderShell('');
    assert.match(html, /class="app-shell theme-8bit"/);
    assert.match(html, /class="brand-mark" src="\/icon-8bit.svg"/);
    assert.match(html, /pixel-hud-bar/);
    assert.match(html, /hud-hero-btn/);
    assert.match(html, /data-action="toggle-sound"/);
  } finally {
    ui.route = route;
  }
});

test('save and restore controls explain their purpose and use the pixel button style', () => {
  const html = shell.renderShell('');
  assert.match(html, /class="pixel-action-btn" data-action="export"[^>]*>Salvar progresso</);
  assert.match(html, /class="pixel-action-btn" data-action="import"[^>]*>Restaurar progresso</);
  assert.match(html, /Salvar baixa um arquivo\. Restaurar abre esse arquivo e substitui o progresso atual\./);
  assert.match(html, /aria-describedby="backup-help"/);
});

test('posters retain a readable fallback without inline script handlers', () => {
  const item = allItems.find((item) => item.id === 'iron-man');
  const html = posters.renderPoster(item);
  assert.match(html, /class="initials"[^>]*>HF</);
  assert.match(html, /<img data-poster[^>]+alt=""/);
  assert.doesNotMatch(html, /\bonerror=|\bonload=|Poster oficial/);
  const fallback = posters.renderPoster({ ...item, id: 'uncatalogued', title: '<Raro> & "Novo"' });
  assert.doesNotMatch(fallback, /<img/);
  assert.doesNotMatch(fallback, /<R/);
});

test('page navigation prefers the latest build while retaining an offline fallback', async () => {
  const handlers = new Map();
  let online = true;
  const cachedHtml = new Response('cached page');
  const source = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');
  runInNewContext(source, {
    self: { location: { origin: 'https://app.test' }, addEventListener: (type, handler) => handlers.set(type, handler) },
    caches: {
      match: async () => cachedHtml,
      open: async () => ({ put: async () => {} }),
    },
    fetch: async () => {
      if (!online) throw new Error('offline');
      return new Response('latest page');
    },
    Response,
    URL,
  });
  const navigate = () => {
    let response;
    handlers.get('fetch')({
      request: { method: 'GET', mode: 'navigate', url: 'https://app.test/' },
      respondWith: (result) => { response = result; },
    });
    return response;
  };
  assert.equal(await (await navigate()).text(), 'latest page');
  online = false;
  assert.equal(await (await navigate()).text(), 'cached page');
  let intercepted = false;
  handlers.get('fetch')({
    request: { method: 'GET', url: 'https://image.tmdb.org/poster.jpg' },
    respondWith: () => { intercepted = true; },
  });
  assert.equal(intercepted, false);
});

test('character selection keeps the full roster when faction is missing', () => {
  const factions = characters.CHARACTERS.map((character) => character.faction);
  try {
    for (const character of characters.CHARACTERS) delete character.faction;
    const html = modals.renderCharSelectModal('2');
    assert.equal([...html.matchAll(/data-char-id="/g)].length, 12);
    for (const character of characters.CHARACTERS) {
      assert.equal(html.split(`data-char-id="${character.id}"`).length - 1, 1);
    }
    assert.match(html.split('HIPERVIL')[1], /data-char-id="doctor-doom"/);
    assert.equal([...html.matchAll(/width="32" height="32"/g)].length, 12);
    assert.equal([...html.matchAll(/shape-rendering="crispEdges"/g)].length, 12);
  } finally {
    characters.CHARACTERS.forEach((character, i) => { character.faction = factions[i]; });
  }
});

test('watch actions open catalogued Disney+ entities on every surface, never search', () => {
  const trail = tracks.renderTracksPage();
  for (const item of allItems.filter((item) => item.id !== 'doomsday')) {
    const url = new URL(links.getDisneyPlusLink(item));
    assert.equal(url.origin, 'https://www.disneyplus.com');
    assert.match(url.pathname, /^\/browse\/entity-[a-f0-9-]{36}$/);
    assert.equal(url.search, '');
    assert.equal(url.hash, '');
    const trailNode = trail.split('<article').find((node) =>
      node.includes(`data-item-id="${item.id}"`));
    for (const html of [marathon.renderTitleCard(item), drawer.renderDetailDrawer(item), trailNode]) {
      assert.ok(html.includes(`href="${url.href}"`), item.id);
      assert.match(html, /target="_blank"\s+rel="noopener noreferrer"/);
      assert.match(html, />Assistir agora</);
      assert.doesNotMatch(html, /disneyplus\.com\/search/);
    }
  }
});

test('unreleased and uncatalogued titles do not pretend to offer playback', () => {
  const unreleased = allItems.find((item) => item.id === 'doomsday');
  for (const item of [unreleased, { ...allItems[0], id: 'unknown-title' }]) {
    assert.equal(links.getDisneyPlusLink(item), null);
    for (const html of [marathon.renderTitleCard(item), drawer.renderDetailDrawer(item)]) {
      assert.match(html, /class="watch-unavailable"/);
      assert.doesNotMatch(html, /class="pixel-action-btn pixel-action-btn--disney"/);
      assert.doesNotMatch(html, /href="(?:null|undefined)"/);
    }
  }
  assert.equal(links.getDisneyPlusLink({ id: 'toString' }), null);
  assert.match(watchNow.renderWatchNow({ ...allItems[0], id: 'toString' }), /watch-unavailable/);
});

test('direct links identify productions, not translated names or remakes', () => {
  const item = allItems[0];
  const renamed = { ...item, title: '<script>" & outro nome' };
  assert.equal(links.getDisneyPlusLink(renamed), links.getDisneyPlusLink(item));
  const html = watchNow.renderWatchNow(renamed);
  assert.ok(html.includes('&lt;script&gt;&quot; &amp; outro nome'));
  assert.ok(!html.includes(renamed.title));
  const remakes = allItems.filter((item) =>
    ['fantastic-four-2005', 'fantastic-four-2015', 'fantastic-four'].includes(item.id));
  assert.equal(new Set(remakes.map(links.getDisneyPlusLink)).size, remakes.length);
  const original = allItems.find((item) => item.id === 'endgame');
  const encore = allItems.find((item) => item.id === 'avengers-encore');
  assert.notEqual(links.getDisneyPlusLink(original), links.getDisneyPlusLink(encore));
});

test('cards and dossier expose Disney+ and keep status labels after selection', () => {
  const item = allItems[0];
  for (const status of ['pending', 'watched', 'skipped', 'partial']) {
    store.updateProgress(item.id, { status });
    const card = marathon.renderTitleCard(item);
    const detail = drawer.renderDetailDrawer(item);
    for (const html of [card, detail]) {
      assert.ok(html.includes(`href="${links.getDisneyPlusLink(item)}"`));
      assert.match(html, /target="_blank"\s+rel="noopener noreferrer"/);
      assert.match(html, /J\u00e1 assisti/);
      assert.match(html, /Li o resumo/);
      assert.doesNotMatch(html, />Assisti<|>Assistido<|J\u00e1 sei a hist\u00f3ria/);
    }
    assert.equal([...detail.matchAll(/data-action="status"/g)].length, 4);
    assert.match(detail, new RegExp(`data-status="${status}"\\s+aria-pressed="true"`));
  }
  store.resetProgress();
});

test('trail renders the selected player at the current node as progress changes', () => {
  coop.setP1Character('iron-man');
  const first = coop.getPlayerPosition();
  store.updateProgress(first.item.id, { status: 'watched' });
  const next = coop.getPlayerPosition();
  assert.notEqual(next.item.id, first.item.id);
  const html = tracks.renderTracksPage();
  const currentNode = html.split('<article').find((node) =>
    node.includes(`data-item-id="${next.item.id}"`));
  assert.match(currentNode, /class="pixel-walker-tag"/);
  assert.match(currentNode, /\[ Tony Stark \]/);
  assert.match(currentNode, />J\u00e1 assisti</);
  store.resetProgress();
});
