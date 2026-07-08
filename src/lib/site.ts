import settings from '../data/settings.json';

export { settings };

/** wa.me deep link with a pre-filled message (spec §10). */
export function waLink(message?: string): string {
  const msg = encodeURIComponent(message ?? settings.whatsappMessage);
  return `https://wa.me/${settings.whatsapp}?text=${msg}`;
}

export function telLink(): string {
  return `tel:+91${settings.phone}`;
}

export function mailLink(): string {
  return `mailto:${settings.email}`;
}

/** Human date, Indian-English style: 14 August 2026 */
export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function isUpcoming(start: Date, end?: Date): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return (end ?? start).getTime() >= now.getTime();
}

/** Keyless Google Maps embed URL from a plain-text query (free, no API). */
export function mapEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, settings.domain).href;
}
