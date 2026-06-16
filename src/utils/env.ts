function getEnv(key: string, fallback: string): string {
  try {
    return (import.meta as any).env?.[key] || fallback;
  } catch {
    return fallback;
  }
}

export function getFormEndpoint(name: string, fallback: string): string {
  const id = getEnv(`VITE_FORMSPREE_${name}`, '');
  return id ? `https://formspree.io/f/${id}` : fallback;
}
