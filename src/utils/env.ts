function getEnv(key: string, fallback: string): string {
  try {
    return (import.meta as any).env?.[key] || fallback;
  } catch {
    return fallback;
  }
}

function normalizeFormspreeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('https://formspree.io/f/')) return trimmed;
  return `https://formspree.io/f/${trimmed}`;
}

export function getFormEndpoint(name: string, fallback: string): string {
  const value = getEnv(`VITE_FORMSPREE_${name}`, '');
  if (!value) return fallback;
  return normalizeFormspreeUrl(value);
}
