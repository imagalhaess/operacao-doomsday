import { tracks } from '../data/tracks';
import { getTrackStats } from '../state/stats';
import { renderProgressBar } from './dashboard';

export function renderTracksPage(): string {
  const tracksHtml = tracks
    .map((t) => {
      const s = getTrackStats(t.id);
      return `
        <div class="timeline-item">
          <div class="timeline-year">${t.period}</div>
          <div class="timeline-line"></div>
          <div class="timeline-content">
            <div class="track-top">
              <div>
                <div class="track-kicker">TRILHA ${t.number}</div>
                <h3>${t.name}</h3>
              </div>
              <button class="small-button" data-action="open-track" data-track="${t.id}">Ver títulos</button>
            </div>
            <p>${t.description}</p>
            ${renderProgressBar(s.percent)}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="eyebrow">Mapa da operação</div>
    <h1>Trilhas</h1>
    <p class="lede">O percurso foi dividido por função narrativa. Você pode seguir em ordem de lançamento ou avançar pelo que for essencial.</p>
    <div class="timeline">
      ${tracksHtml}
    </div>
  `;
}

