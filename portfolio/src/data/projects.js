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
  'rajasthan package': {
    title: 'Rajasthan Desert Tour Package',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Travel & Tourism',
    color: 'var(--orange)',
  },
  'manali package': {
    title: 'Manali Tour Package',
    category: 'social',
    categoryLabel: 'Social Media Poster',
    tag: 'Travel & Tourism',
    color: 'var(--blue)',
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
  'flyer1': {
    title: 'Nuvana Worldwide Travel & Cargo A5 Flyer',
    category: 'flyer',
    categoryLabel: 'Flyers & Print Works',
    tag: 'A5 Print Flyer',
    description: 'Double-sided A5 print campaign for Nuvana.go & Nuvana.ex — Travel services & Grand Opening ceremony',
    images: [
      { url: '/images/flyer/Flyer-Front.jpg', title: 'Side 1: Worldwide Travel & Cargo' },
      { url: '/images/flyer/Flyer-Back.jpg', title: 'Side 2: Grand Opening Ceremony' },
    ],
    color: 'var(--blue)',
  },
  'flyer2': {
    title: 'Nuvana Door-to-Door Cargo & Travel A5 Flyer',
    category: 'flyer',
    categoryLabel: 'Flyers & Print Works',
    tag: 'A5 Print Flyer',
    description: 'Double-sided A5 print campaign for Nuvana.ex Door-to-Door Cargo & Nuvana.go One-Stop Travel Solutions',
    images: [
      { url: '/images/flyer/Flyer2-Front.jpg', title: 'Side 1: Door-to-Door Cargo (150+ Countries)' },
      { url: '/images/flyer/Flyer2-Back.jpg', title: 'Side 2: Discount Tickets & Travel Services' },
    ],
    color: 'var(--orange)',
  },
  'flyer': {
    title: 'Nuvana Worldwide Travel & Cargo A5 Flyer',
    category: 'flyer',
    categoryLabel: 'Flyers & Print Works',
    tag: 'A5 Print Flyer',
    description: 'Double-sided A5 print campaign for Nuvana.go & Nuvana.ex',
    images: [
      { url: '/images/flyer/Flyer-Front.jpg', title: 'Side 1: Front' },
      { url: '/images/flyer/Flyer-Back.jpg', title: 'Side 2: Back' },
    ],
    color: 'var(--blue)',
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

    const isFlyer =
      meta.category === 'flyer' ||
      meta.category === 'flyers' ||
      cleanKey.includes('flyer') ||
      cleanKey.includes('print');

    const category = meta.category || (isFlyer ? 'flyer' : isMagazine ? 'magazine' : 'social');
    const categoryLabel =
      meta.categoryLabel ||
      (category === 'flyer'
        ? 'Flyers & Print Works'
        : category === 'magazine'
        ? 'Magazine Work'
        : 'Social Media Poster');
    const title = meta.title || rawFilename;

    return {
      id: `${category}-${index + 1}`,
      index: String(index + 1).padStart(2, '0'),
      title,
      category,
      categoryLabel,
      tag:
        meta.tag ||
        (category === 'flyer'
          ? 'A5 Flyer (2 Sides)'
          : category === 'magazine'
          ? 'Editorial / Magazine'
          : 'Social Media Poster'),
      badge: meta.badge || null,
      badgeText:
        meta.badgeText ||
        (category === 'magazine'
          ? 'READ FLIPBOOK ↗'
          : null),
      description: meta.description || '',
      images: meta.images || null,
      link: meta.link || null,
      linkText: meta.linkText || (meta.link ? 'View Online ↗' : null),
      color: meta.color || colors[index % colors.length],
      image: url,
    };
  });

export const socialMediaProjects = projects.filter((p) => p.category === 'social');
export const magazineProjects = projects.filter((p) => p.category === 'magazine');
export const flyerProjects = projects.filter((p) => p.category === 'flyer' || p.category === 'flyers');
