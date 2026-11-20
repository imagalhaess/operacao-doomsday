export function routeFromHash(): string {
  const hash = location.hash.replace(/^#/, '');
  return hash || '/';
}

export function navigate(path: string): void {
  location.hash = path;
}

