/**
 * schema.org JSON-LD builders (spec §8).
 * EducationalOrganization (global) · LocalBusiness ×5 (branches) ·
 * Course · Event · Article · BreadcrumbList · FAQPage.
 */
import { settings, absoluteUrl } from './site';

const ORG_ID = `${settings.domain}/#organization`;

export function orgSchema() {
  const sameAs = Object.values(settings.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': ORG_ID,
    name: settings.siteName,
    alternateName: 'Fankaar Arts',
    slogan: settings.tagline,
    url: settings.domain,
    logo: absoluteUrl('/logo.png'),
    email: settings.email,
    telephone: `+91${settings.phone}`,
    founder: { '@type': 'Person', name: 'Vartika Tiwari' },
    foundingLocation: { '@type': 'City', name: 'Jaipur' },
    areaServed: 'Jaipur, Rajasthan, India',
    ...(sameAs.length ? { sameAs } : {}),
  };
}

interface BranchLike {
  name: string;
  headline: string;
  address: string;
  online: boolean;
  mapLink?: string;
  intro?: string;
}

export function branchSchema(branch: BranchLike, path: string) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: `${settings.siteName} — ${branch.name}`,
    url: absoluteUrl(path),
    image: absoluteUrl('/logo.png'),
    telephone: `+91${settings.phone}`,
    email: settings.email,
    parentOrganization: { '@id': ORG_ID },
    priceRange: '₹₹',
  };
  if (!branch.online && branch.address) {
    base.address = {
      '@type': 'PostalAddress',
      streetAddress: branch.address,
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    };
  }
  if (branch.mapLink) base.hasMap = branch.mapLink;
  return base;
}

interface CourseLike {
  name: string;
  short: string;
  mode: string;
  levels: { name: string }[];
}

export function courseSchema(course: CourseLike, path: string) {
  const modes: string[] = [];
  if (course.mode.includes('Online')) modes.push('Online');
  if (course.mode.includes('Offline')) modes.push('Onsite');
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${course.name} — ${settings.shortName}, Jaipur`,
    description: course.short,
    url: absoluteUrl(path),
    provider: { '@id': ORG_ID },
    ...(course.levels.length
      ? { educationalLevel: course.levels.map((l) => l.name).join(', ') }
      : {}),
    offers: {
      '@type': 'Offer',
      category: 'Fees on enquiry',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: modes.map((m) => ({
      '@type': 'CourseInstance',
      courseMode: m,
      courseSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'Weekly',
        repeatCount: 3,
      },
    })),
  };
}

interface EventLike {
  title: string;
  date: Date;
  endDate?: Date;
  description?: string;
  online?: boolean;
  venue?: string;
  image?: string;
}

export function eventSchema(ev: EventLike, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: ev.title,
    startDate: ev.date.toISOString().split('T')[0],
    ...(ev.endDate ? { endDate: ev.endDate.toISOString().split('T')[0] } : {}),
    eventAttendanceMode: ev.online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: ev.online
      ? { '@type': 'VirtualLocation', url: settings.domain }
      : {
          '@type': 'Place',
          name: ev.venue || `${settings.siteName}, Jaipur`,
          address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressCountry: 'IN' },
        },
    ...(ev.description ? { description: ev.description } : {}),
    ...(ev.image ? { image: absoluteUrl(ev.image) } : {}),
    organizer: { '@id': ORG_ID },
    url: absoluteUrl(path),
  };
}

interface ArticleLike {
  title: string;
  excerpt: string;
  date: Date;
  updated?: Date;
  author: string;
  image?: string;
}

export function articleSchema(post: ArticleLike, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    dateModified: (post.updated ?? post.date).toISOString(),
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: absoluteUrl(path),
    ...(post.image ? { image: absoluteUrl(post.image) } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
