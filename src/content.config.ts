import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content model (spec §6). Every collection is editable at /admin
 * via Sveltia/Decap CMS — the CMS config mirrors these schemas.
 * Image fields are string paths inside src/assets/uploads/ so that
 * the build-time Sharp pipeline optimises every upload (spec §7).
 */

const seo = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  })
  .optional();

const branches = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/branches' }),
  schema: z.object({
    name: z.string(),
    locality: z.string(),
    headline: z.string(), // locality H1, e.g. "Kathak Classes in Malviya Nagar, Jaipur"
    online: z.boolean().default(false),
    address: z.string().default(''),
    addressNote: z.string().optional(),
    mapQuery: z.string().optional(), // used for the free keyless Google Maps embed
    mapLink: z.string().optional(), // "Get directions" share link
    phone: z.string().default(''),
    whatsapp: z.string().default(''),
    timings: z
      .array(
        z.object({
          course: z.string(),
          days: z.string(),
          time: z.string(),
        })
      )
      .default([]),
    courses: z.array(z.string()).default([]), // course slugs
    faculty: z.array(z.string()).default([]), // faculty slugs
    photos: z.array(z.string()).default([]),
    order: z.number().default(99),
    seo,
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/courses' }),
  schema: z.object({
    name: z.string(),
    discipline: z.enum(['Dance', 'Music', 'Instrument']),
    short: z.string(), // card blurb
    ageRange: z.string().default('All ages'),
    mode: z.enum(['Online', 'Offline', 'Online + Offline']),
    fee: z.string().default('On enquiry'),
    levels: z
      .array(z.object({ name: z.string(), detail: z.string().optional() }))
      .default([]),
    levelsNote: z.string().optional(),
    examBoards: z.array(z.string()).default([]),
    image: z.string().optional(),
    order: z.number().default(99),
    seo,
  }),
});

const workshops = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/workshops' }),
  schema: z.object({
    title: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    mode: z.enum(['In-person', 'Online']),
    venue: z.string().optional(), // or branch name
    fee: z.string().default('On enquiry'),
    registrationUrl: z.string().optional(),
    image: z.string().optional(),
    seo,
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z
      .enum(['Recital', 'Showcase', 'Workshop', 'Press', 'Celebration'])
      .default('Recital'),
    cover: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    videos: z.array(z.string()).default([]), // YouTube/Vimeo URLs
    placeholder: z.boolean().default(false), // marks seed entries awaiting real media
    seo,
  }),
});

const accomplishments = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/accomplishments' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['Scholar', 'Award', 'Press', 'Result', 'Milestone']),
    metric: z.string().optional(), // e.g. "3", "175+"
    date: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
    placeholder: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Vartika Tiwari'),
    category: z.string().default('Classical Arts'),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    seo,
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    person: z.string(),
    role: z.string().optional(), // e.g. "Parent of a Praveshika student" / publication
    date: z.string().optional(),
    photo: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const faculty = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/faculty' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    credentials: z.string().optional(),
    branches: z.array(z.string()).default([]), // branch slugs
    photo: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = {
  branches,
  courses,
  workshops,
  events,
  accomplishments,
  blog,
  testimonials,
  faculty,
};
