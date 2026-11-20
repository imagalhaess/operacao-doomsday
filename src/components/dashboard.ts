import { getStats, getNextItem, getTrackStats } from '../state/stats';
import { tracks } from '../data/tracks';
import { daysUntilDoomsday } from '../utils';
import type { Track } from '../data/types';

function renderStatCard(value: string | number, label: string, accent = false): string {
  return `
    <div class="stat ${accent ? 'accent' : ''}">
      <div class="mono">STATUS</div>
      <div class="value">${value}</div>
      <div class="label">${label}</div>
    </div>
  `;
}

export function renderProgressBar(percent: number): string {
  return `
    <div class="progress-row">
      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
      <span class="progress-label">${percent}%</span>
    </div>
  `;
}

export function renderTrackCard(t: Track): string {
  const s = getTrackStats(t.id);
  const isDone = s.percent === 100;
  return `
    <article class="track-card ${isDone ? 'track-card--complete' : ''}" data-track-id="${t.id}">
      <div class="track-top">
        <div>
          <div class="track-kicker">TRILHA ${t.number} / ${t.period}</div>
          <h3>${t.name}</h3>
        </div>
        <span class="badge ${isDone ? 'essential' : ''}">${isDone ? 'CONCLUÍDA' : `${s.pending} pendentes`}</span>
      </div>
      <p>${t.description}</p>
      ${renderProgressBar(s.percent)}
      <div class="card-meta">${s.watched} assistidas · ${s.skipped} com história conhecida · ${s.total} títulos</div>
      <button class="small-button" data-action="open-track" data-track="${t.id}">Abrir trilha →</button>
    </article>
  `;
}

export function renderDashboard(): string {
  const s = getStats();
  const next = getNextItem();
  const days = daysUntilDoomsday();

  return `
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">Operação ativa / dossiê pessoal</div>
        <h1>Chegue ao fim da maratona sabendo exatamente o que lembrar.</h1>
        <p class="lede">Uma central de comando para assistir, pular com contexto e conectar as histórias que levam a <em>Avengers: Doomsday</em>.</p>
        <div class="hero-cta">
          <button class="primary-button" data-action="navigate" data-path="/maratona">Continuar maratona</button>
          <button class="ghost-button" data-action="open-detail" data-id="${next.id}">Próximo dossiê: ${next.title}</button>
        </div>
      </div>
      <div class="hero-countdown">
        <div>
          <div class="eyebrow">Contagem da missão</div>
          <div class="countdown-number" id="live-countdown">${days || '—'}</div>
          <div class="countdown-label">dias até Avengers: Doomsday</div>
        </div>
        <div class="countdown-foot">
          Estreia oficial indicada pela Marvel: <strong>18 de dezembro de 2026</strong>.<br>
          Fonte e materiais oficiais estão nos dossiês.
        </div>
      </div>
    </section>

    <div class="stats-grid">
      ${renderStatCard(s.total, 'produções no radar')}
      ${renderStatCard(s.watched, 'assistidas integralmente')}
      ${renderStatCard(s.skipped, 'já sabe a história')}
      ${renderStatCard(s.pending, 'pendentes')}
      ${renderStatCard(`${s.percent}%`, 'conclusão da missão', true)}
    </div>

    <div class="section-head">
      <div>
        <div class="eyebrow">Rota de preparação</div>
        <h2>Progresso por trilha</h2>
      </div>
      <p>Concluir = assistir à produção ou marcar que já sabe a história.</p>
    </div>

    <div class="track-grid">
      ${tracks.map(renderTrackCard).join('')}
    </div>

    <div class="section-head">
      <div>
        <div class="eyebrow">Próximo ponto de controle</div>
        <h2>O título recomendado</h2>
      </div>
    </div>

    <div class="callout">
      <div class="callout-copy">
        <div class="callout-icon">→</div>
        <div>
          <h3>${next.title}</h3>
          <p>${next.trackName} · ${next.year} · ${next.importance.toLowerCase()} · ${next.type}</p>
        </div>
      </div>
      <button class="primary-button" data-action="open-detail" data-id="${next.id}">Abrir dossiê</button>
    </div>
  `;
}

