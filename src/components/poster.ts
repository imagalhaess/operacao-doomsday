import { initials } from '../utils';
import type { TrackItem } from '../data/types';

// Curated poster paths from TMDB for official Marvel releases
// TMDB base URL: https://image.tmdb.org/t/p/w185
const TMDB_POSTERS: Record<string, string> = {
  'iron-man': 'https://image.tmdb.org/t/p/w185/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
  'incredible-hulk': 'https://image.tmdb.org/t/p/w185/gKzYx79y0AQTL4UAi74Kw7Hgqvg.jpg',
  'iron-man-2': 'https://image.tmdb.org/t/p/w185/6WBeq4JJhsxmvtOJNCfqWHtSDMz.jpg',
  'thor': 'https://image.tmdb.org/t/p/w185/prSfAi1xGrhLQNxVSUFh61xQ4Qx.jpg',
  'captain-america-first': 'https://image.tmdb.org/t/p/w185/vSNxAJTlD0r02V9sPYjqjqll4bK.jpg',
  'avengers': 'https://image.tmdb.org/t/p/w185/RYMXAocvgFarArIRG28yisC11q.jpg',
  'iron-man-3': 'https://image.tmdb.org/t/p/w185/7XiGq277DkC7y3S9H9tZ7Zf49bT.jpg',
  'thor-dark-world': 'https://image.tmdb.org/t/p/w185/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg',
  'winter-soldier': 'https://image.tmdb.org/t/p/w185/tVFRMdxPPZhk7a44wpy6A2T9smu.jpg',
  'guardians': 'https://image.tmdb.org/t/p/w185/r2J02Z2OpNTctfOSN2Ydgii51I3.jpg',
  'age-of-ultron': 'https://image.tmdb.org/t/p/w185/4ssDuvEDkS9NvmR19Fuq2w69utE.jpg',
  'ant-man': 'https://image.tmdb.org/t/p/w185/rQRnQ9OrWiPppZ9099mCGFiPb4C.jpg',
  'civil-war': 'https://image.tmdb.org/t/p/w185/rAGiXaUfPzY7CehyNKspix99x0e.jpg',
  'doctor-strange': 'https://image.tmdb.org/t/p/w185/4PiiNGjZ1KTIbvtBaTy1pHNB3YP.jpg',
  'guardians-2': 'https://image.tmdb.org/t/p/w185/y4MBh0EjBlMuOzv9axM4qJmLRbF.jpg',
  'spider-homecoming': 'https://image.tmdb.org/t/p/w185/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
  'thor-ragnarok': 'https://image.tmdb.org/t/p/w185/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
  'black-panther': 'https://image.tmdb.org/t/p/w185/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
  'infinity-war': 'https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'ant-man-wasp': 'https://image.tmdb.org/t/p/w185/eivQmS3wqz9Q11Qscj1n21gZZKl.jpg',
  'captain-marvel': 'https://image.tmdb.org/t/p/w185/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
  'endgame': 'https://image.tmdb.org/t/p/w185/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
  'spider-far-from-home': 'https://image.tmdb.org/t/p/w185/4q2hz2m8hubgvij98xUVcnKAuxd.jpg',
  'black-widow': 'https://image.tmdb.org/t/p/w185/qAZ0whky0HuyRKNq0Hg565l59zp.jpg',
  'shang-chi': 'https://image.tmdb.org/t/p/w185/1BIoJbKBVIvc8BQfe76q0HrlTeS.jpg',
  'eternals': 'https://image.tmdb.org/t/p/w185/b6q0949iUX56aA2rM035p5U6o9w.jpg',
  'no-way-home': 'https://image.tmdb.org/t/p/w185/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'multiverse-madness': 'https://image.tmdb.org/t/p/w185/wRnbOi9Knq6zQv98aq7yqL9n44P.jpg',
  'thor-love-thunder': 'https://image.tmdb.org/t/p/w185/pIkRyD18kl4F0b6997j9H9gG1Q.jpg',
  'wakanda-forever': 'https://image.tmdb.org/t/p/w185/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
  'quantumania': 'https://image.tmdb.org/t/p/w185/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
  'guardians-3': 'https://image.tmdb.org/t/p/w185/r2J02Z2OpNTctfOSN2Ydgii51I3.jpg',
  'marvels': 'https://image.tmdb.org/t/p/w185/9GBhzXMFnGZ3fdkxg0IPTI99NkE.jpg',
  'deadpool-wolverine': 'https://image.tmdb.org/t/p/w185/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  'brave-new-world': 'https://image.tmdb.org/t/p/w185/pzId5HknTwtmJ68vaF1L73Wf35w.jpg',
  'thunderbolts': 'https://image.tmdb.org/t/p/w185/1nEvL34l2C7XqKq72hC5B32b5z.jpg',
  'fantastic-four': 'https://image.tmdb.org/t/p/w185/9TFSqghEHwZ510P9q3q3N8Zp3w.jpg',
  'x-men': 'https://image.tmdb.org/t/p/w185/bRDAc0rqOPdGQh4L9Y0V0vA7Z0c.jpg',
  'x2': 'https://image.tmdb.org/t/p/w185/144aH7Jg7k9kQ0Z0l8oV0h4A7Z0.jpg',
  'logan': 'https://image.tmdb.org/t/p/w185/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg',
  'deadpool': 'https://image.tmdb.org/t/p/w185/fSRb7vyIP8rQpL0I47P3qUsRIne.jpg',
  'wandavision': 'https://image.tmdb.org/t/p/w185/glKDvtvywgxJhOxBYq59KyIR1Y7.jpg',
  'loki-1': 'https://image.tmdb.org/t/p/w185/kEl2t3OhXc379gPjI999vP8QvL9.jpg',
  'loki-2': 'https://image.tmdb.org/t/p/w185/voHUAt6CuMT29aerEc5wHbKqNxV.jpg'
};

export function renderPoster(item: TrackItem): string {
  const posterUrl = TMDB_POSTERS[item.id];
  const itemInitials = initials(item.title);

  if (posterUrl) {
    return `
      <div class="poster poster--image">
        <img
          src="${posterUrl}"
          alt="Poster oficial de ${item.title}"
          loading="lazy"
          onerror="this.parentElement.classList.remove('poster--image'); this.remove();"
        />
        <div class="poster-overlay">
          <span class="poster-meta">${item.year}<br>${item.type.toUpperCase()}</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="poster">
      <span class="initials">${itemInitials}</span>
      <span class="poster-meta">${item.year}<br>${item.type.toUpperCase()}</span>
    </div>
  `;
}

