// Automatically imports images from public/images.
// Drop new image files into that folder and they will appear in the respective section.

const publicModules = import.meta.glob('../../public/images/*.{jpg,jpeg,png,webp,gif,svg,JPG,JPEG,PNG,WEBP,GIF,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const colors = ['var(--blue)', 'var(--orange)', 'var(--ink)'];

const IGNORED_NAMES = ['portrait', 'potrait', 'profile', 'avatar', 'sd'];

const PROJECT_META = {
  'sneha-jalakam': {
    title: 'Sneha Jalakam (2023)',
    category: 'magazine',
    categoryLabel: 'Magazine Work',
    tag: 'Editorial & Flipbook',
    badge: 'Digital Flipbook',
    description: 'Imam Gazzali Madrasa IG-16 Yambu — Souvenir Magazine & Custom Editorial Layout',
    link: 'https://online.fliphtml5.com/pfgik/Sneha-Jalakam/#p=1',
    linkText: 'Read Interactive Flipbook ↗',
    color: 'var(--orange)',
  },
  'bakestory': {
    title: 'Bake Story',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Food Branding',
  },
  'camp': {
    title: 'Camp 2024',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Event Promotion',
  },
  'chemical': {
    title: 'Chemical Brand Campaign',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Commercial Campaign',
  },
  'china package': {
    title: 'China Travel Package',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Tourism & Travel',
  },
  'giveaway1': {
    title: 'Special Giveaway',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Promotional Creative',
  },
  'maveli box': {
    title: 'Maveli Box',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Festive Branding',
  },
  'onam1': {
    title: 'Onam Celebration',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Festival Poster',
  },
  'pernal offer': {
    title: 'Perunnal Special Offer',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Festive Promo',
  },
  'social media poster design_ admission poster': {
    title: 'Admission Open Poster',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Academy Admission',
  },
  'vietnam': {
    title: 'Vietnam Tour Package',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Travel & Tourism',
  },
  'webinar': {
    title: 'Live Webinar Masterclass',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Online Workshop',
  },
  'first year': {
    title: '1st Year Anniversary',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Anniversary Campaign',
  },
  'ramadan': {
    title: 'Ramadan Mubarak',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Festive Creative',
  },
};

export const projects = Object.entries(publicModules)
  .filter(([path]) => {
    const filename = path.split('/').pop().replace(/\.[^/.]+$/, '').toLowerCase();
    return !IGNORED_NAMES.some((ignored) => filename.includes(ignored));
  })
  .map(([path, url], index) => {
    const rawFilename = path.split('/').pop().replace(/\.[^/.]+$/, '');
    const cleanKey = rawFilename.toLowerCase().trim();
    const meta = PROJECT_META[cleanKey] || {};

    const isMagazine =
      meta.category === 'magazine' ||
      cleanKey.includes('magazine') ||
      cleanKey.includes('jalakam') ||
      cleanKey.includes('book');

    const category = meta.category || (isMagazine ? 'magazine' : 'social');
    const categoryLabel = meta.categoryLabel || (category === 'magazine' ? 'Magazine Work' : 'Social Media Poster');
    const title = meta.title || rawFilename;

    return {
      id: `${category}-${index + 1}`,
      index: String(index + 1).padStart(2, '0'),
      title,
      category,
      categoryLabel,
      tag: meta.tag || (category === 'magazine' ? 'Editorial / Magazine' : 'Social Media Poster'),
      badge: meta.badge || (category === 'magazine' ? 'Flipbook' : 'Poster'),
      description: meta.description || '',
      link: meta.link || null,
      linkText: meta.linkText || (meta.link ? 'View Online ↗' : null),
      color: meta.color || colors[index % colors.length],
      image: url,
    };
  });

export const socialMediaProjects = projects.filter((p) => p.category === 'social');
export const magazineProjects = projects.filter((p) => p.category === 'magazine');
