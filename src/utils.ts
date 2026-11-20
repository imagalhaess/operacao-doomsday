export const TODAY: string = new Date().toISOString().slice(0, 10);

const STATUS_LABELS: Record<string, string> = {
  watched: '⚡ Já assisti',
  skipped: '👁️ Li o resumo',
  partial: '⏳ Vi uma parte',
  pending: '○ Pendente',
};

export function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? '○ Pendente';
}

export function importanceClass(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
};

export function escapeHtml(value: string = ''): string {
  return String(value).replace(/[&<>'"]/g, (ch) => HTML_ENTITIES[ch] ?? ch);
}

const FILLER_WORDS = new Set([
  'de', 'da', 'do', 'e', 'o', 'a', 'os', 'as', 'para', 'em',
]);

export function initials(title: string): string {
  return title
    .split(/\s+/)
    .filter((w) => !FILLER_WORDS.has(w.toLowerCase()))
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function formatDate(date: string): string {
  if (!date) return 'Sem data';
  const [y, m, d] = date.split('-');
  return `${d}/${m}/${y}`;
}

const DOOMSDAY_RELEASE = new Date('2026-12-18T00:00:00');

export function daysUntilDoomsday(): number {
  const diff = Math.ceil(
    (DOOMSDAY_RELEASE.getTime() - Date.now()) / 86_400_000,
  );
  return diff > 0 ? diff : 0;
}
