import { tracks } from '../data/tracks';
import { getTrackStats } from '../state/stats';
import { getProgress } from '../state/store';
import { ui } from '../state/ui';

export function renderWrappedPage(): string {
  const t = tracks.find((item) => item.id === ui.selectedTrack) || tracks[0];
  const s = getTrackStats(t.id);
  const ratings = t.items.map((item) => getProgress(item.id).rating).filter(Boolean);
  const avg = ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : '—';

  const trackOptions = tracks
    .map(
      (item) =>
        `<option value="${item.id}" ${item.id === t.id ? 'selected' : ''}>Trilha ${item.number} — ${item.name}</option>`
    )
    .join('');

  const statsList = [
    ['Títulos', s.total],
    ['Assistidos', s.watched],
    ['Por resumo', s.skipped],
    ['Média', avg === '—' ? '—' : `${avg}/5`]
  ];

  return `
    <div class="eyebrow">Relatório de conclusão</div>
    <h1>Marvel Wrapped</h1>
    <p class="lede">Um retrato da sua missão em cada etapa. O relatório fica mais completo conforme você registra status, datas e estrelas.</p>

    <div class="toolbar" style="margin-top:24px; grid-template-columns:minmax(0,1fr)">
      <select data-filter="wrappedTrack" aria-label="Selecionar trilha">
        ${trackOptions}
      </select>
    </div>

    <div class="wrapped-hero" style="margin-top:16px">
      <div class="eyebrow">MARVEL WRAPPED / TRILHA ${t.number}</div>
      <h2>${t.name}</h2>
      <p class="lede">
        ${
          s.percent === 100
            ? 'Trilha concluída. O próximo capítulo já está liberado.'
            : `${s.percent}% da trilha registrada. Complete ou conheça por resumo todos os títulos para fechar o relatório.`
        }
      </p>
      <div class="wrapped-stats">
        ${statsList
          .map(
            ([label, value]) => `
          <div class="wrapped-stat">
            <strong>${value}</strong>
            <span>${label}</span>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <div class="wrapped-layout" style="margin-top:14px">
      <div class="wrapped-side">
        <h3>Agora você está atualizada para…</h3>
        <p>
          ${t.insight}
          ${
            s.percent === 100
              ? 'Você pode seguir sem carregar pendências desta trilha.'
              : 'Ainda vale abrir os dossiês pendentes antes de avançar.'
          }
        </p>
        <h3 style="margin-top: 20px;">Na próxima trilha você vai encontrar…</h3>
        <p>${t.next}</p>
      </div>
      <div class="wrapped-side">
        <h3>Indicadores da operação</h3>
        <p><strong>${s.watched}</strong> títulos assistidos integralmente.</p>
        <p><strong>${s.skipped}</strong> títulos conhecidos pelo resumo.</p>
        <p><strong>${s.pending}</strong> pendências no radar.</p>
        <button class="primary-button" style="margin-top: 14px;" data-action="navigate" data-path="/maratona">Ver títulos da maratona</button>
      </div>
    </div>
  `;
}

