import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

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
    server: { middlewareMode: true },
    ssr: { noExternal: ['peerjs'] },
    appType: 'custom',
  });
  [characters, links, modals, marathon, drawer, tracks, store, coop, { allItems }] =
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

test('Disney+ search safely round-trips accented titles and URL delimiters', () => {
  const item = { ...allItems[0], title: 'Thor: Amor & Trov\u00e3o / "Loki"? #2' };
  const url = new URL(links.getDisneyPlusLink(item));
  assert.equal(url.origin, 'https://www.disneyplus.com');
  assert.equal(url.pathname, '/search');
  assert.equal(url.searchParams.get('q'), item.title);
  assert.equal(url.searchParams.size, 1);
  assert.equal(url.hash, '');
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
