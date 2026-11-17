import { services, testimonials } from '../../data/content';
import { importedProjects } from './importedProjects';

/* ─────────────────────────────────────────────────────────────────────────────
   Portfolio page content.
   Everything here is built from assets and copy that already exist in this site
   (portfolio images, services, testimonials, offices). Nothing is invented:
   there are no client names, case-study metrics or results. Edit freely.
   ───────────────────────────────────────────────────────────────────────────── */

export interface ShotImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  caption: string;
  /** which edge of a tall screenshot stays visible when it is cropped */
  position?: string;
  /** 'cover' crops tall page screenshots from the top (like a browser window) instead of shrinking them */
  fit?: 'cover';
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  sector: string;
  sectorRest: string;
  name: string;
  headline: string;
  brief: string;
  meta: { label: string; value: string }[];
  accessNote: string;
  summary: string;
  built: string[];
  tags: string[];
  disclosure: string;
  accent: string;
  accentSoft: string;
  dark: string;
  sweep: 'ltr' | 'rtl';
  wash?: 'strong';
  images: { desktop: ShotImage; feature: ShotImage; secondary: ShotImage; mobile: ShotImage };
  motion: {
    swap: 'diagonal' | 'drift' | 'feather';
    direction: 'ltr' | 'rtl';
    parallax: boolean;
    edgeTrace: boolean;
    pan: number;
    zoom: number;
  };
  metrics: ProjectMetric[];
  metricsSource: string;
  /** heading above the "what we built" list (defaults to "What we deliver") */
  builtTitle?: string;
  /** the project's live site: turns the showcase pill and primary button into "View project" links */
  liveUrl?: string;
  /** replaces the default "Next step" block with project-specific links (apps, website...) */
  access?: { label: string; note?: string; links: { label: string; href: string; strong?: boolean }[] };
  /** a single "View Website" link shown under the meta rows */
  metaLink?: string;
}

const P = '/images/portfolio';

interface Raw {
  file: string;
  w: number;
  h: number;
  title: string;
}

/** real pixel sizes of the files in /public/images/portfolio, plus the titles used in the home-page gallery */
const library: Record<string, Raw[]> = {
  Website: [
    { file: '1', w: 736, h: 1435, title: 'Comunidade do Edu · Digital Education' },
    { file: '2', w: 736, h: 2874, title: 'FinTech Banking & Payments' },
    { file: '3', w: 736, h: 3337, title: 'Luxury Real Estate Showcase' },
    { file: '4', w: 736, h: 1357, title: 'SaaS Analytics & Cloud Dashboard' },
    { file: '5', w: 600, h: 1050, title: 'E-Commerce Fashion Marketplace' },
    { file: '6', w: 375, h: 750, title: 'Healthcare Telemedicine Portal' },
    { file: '7', w: 736, h: 1156, title: 'Creative Agency Portfolio Hub' },
    { file: '8', w: 375, h: 750, title: 'Enterprise Cloud Management' },
    { file: '9', w: 736, h: 1105, title: 'Modern Media & Publishing Platform' },
  ],
  Logos: [
    { file: '1', w: 1920, h: 1292, title: 'Designer Hub Brand Mark' },
    { file: '2', w: 900, h: 900, title: 'Apex Studio Identity' },
    { file: '3', w: 1600, h: 1600, title: 'Nexus Flow Emblem' },
    { file: '4', w: 1920, h: 1920, title: 'Vanguard Capital Identity' },
    { file: '5', w: 500, h: 500, title: 'Prism Dynamic Brand' },
    { file: '6', w: 500, h: 500, title: 'Zenith Technology Monogram' },
    { file: '7', w: 1250, h: 1250, title: 'Aurora Creative Studio Icon' },
    { file: '8', w: 500, h: 500, title: 'Velocity Modern Brand' },
    { file: '9', w: 2000, h: 2000, title: 'Horizon Ventures Insignia' },
  ],
  'Mobile-Apps': [
    { file: '1', w: 736, h: 1742, title: 'GoFit Workout & Tracker' },
    { file: '2', w: 736, h: 1379, title: 'CryptoPay Mobile Wallet' },
    { file: '3', w: 736, h: 1742, title: 'FoodieDash Fast Delivery' },
    { file: '4', w: 736, h: 1453, title: 'TravelNest Booking Flow' },
    { file: '5', w: 736, h: 1742, title: 'MindPulse Meditation UI' },
    { file: '6', w: 736, h: 1742, title: 'SmartHome IoT Controller' },
    { file: '7', w: 530, h: 1060, title: 'TaskMaster Pro Workflow' },
    { file: '8', w: 736, h: 1742, title: 'MediCare Health Connect' },
    { file: '9', w: 736, h: 1742, title: 'ShopWave Retail Mobile' },
  ],
  'Book-Cover': [
    { file: '1', w: 605, h: 850, title: 'Enemy · Denis Villeneuve' },
    { file: '2', w: 736, h: 1090, title: 'The Silent Echo' },
    { file: '3', w: 736, h: 1089, title: 'Chronicles of Tomorrow' },
    { file: '4', w: 428, h: 648, title: 'Shadows in the Fog' },
    { file: '5', w: 735, h: 580, title: 'Beyond the Event Horizon' },
    { file: '6', w: 736, h: 1090, title: 'Whispers of the Wild' },
    { file: '7', w: 500, h: 666, title: 'The Art of Strategy' },
    { file: '8', w: 736, h: 487, title: 'Midnight in Metropolis' },
    { file: '9', w: 707, h: 1000, title: 'Legacy of the Sun' },
  ],
  Graphic: [
    { file: '1', w: 674, h: 1198, title: 'Modern Vector Artistry' },
    { file: '2', w: 626, h: 626, title: 'Brand Campaign Visuals' },
    { file: '3', w: 735, h: 976, title: 'Digital Advertising Suite' },
    { file: '4', w: 736, h: 981, title: 'Social Media Engagement Pack' },
    { file: '5', w: 1600, h: 1043, title: 'Creative Infographic Series' },
    { file: '6', w: 1920, h: 1280, title: 'Visual Merchandising Deck' },
    { file: '7', w: 944, h: 944, title: 'Packaging Design Concepts' },
    { file: '8', w: 600, h: 1200, title: 'Editorial Typography & Layout' },
    { file: '9', w: 1024, h: 768, title: 'Dynamic Promotional Posters' },
  ],
  'Motion-Graphic': [
    { file: '1', w: 1920, h: 1080, title: 'Character Animation Storyboard' },
    { file: '2', w: 1400, h: 730, title: 'Product 3D Motion Keyframe' },
    { file: '3', w: 2000, h: 1125, title: 'Explainer Video Visuals' },
    { file: '4', w: 1920, h: 1280, title: 'Brand Launch Micro-Animation' },
    { file: '5', w: 1000, h: 880, title: 'Dynamic UI Kinetic State' },
    { file: '6', w: 1200, h: 900, title: 'Kinetic Typography Scene' },
    { file: '7', w: 2560, h: 2560, title: 'Broadcast Title Sequence' },
    { file: '8', w: 2560, h: 2560, title: 'Logo Reveal & Visual Stinger' },
    { file: '9', w: 1200, h: 813, title: 'Social Motion Highlight Reel' },
  ],
};

const shot = (dir: string, n: number, label: string, discipline: string, position = 'top'): ShotImage => {
  const raw = library[dir][n - 1];
  return {
    src: `${P}/${dir}/${raw.file}.webp`,
    width: raw.w,
    height: raw.h,
    alt: `${discipline}: ${raw.title}`,
    label,
    caption: raw.title,
    position,
    fit: dir === 'Website' ? 'cover' : undefined,
  };
};

const ACCENTS = [
  { accent: '#F9B918', soft: '#FCD34D', dark: '#0c0b08' },
  { accent: '#FACC15', soft: '#FDE047', dark: '#0a0a0a' },
  { accent: '#F5A80F', soft: '#FBD066', dark: '#100d07' },
  { accent: '#FCD34D', soft: '#FEE9A0', dark: '#0b0a06' },
];

interface Def {
  id: string;
  dir: string;
  set: [number, number, number, number];
  labels: [string, string, string, string];
  discipline: string;
  sectorRest: string;
  name: string;
  headline: string;
  brief: string;
  scope: string;
  summary: string;
  built: [string, string, string];
  tags: string[];
  position?: string;
}

const defs: Def[] = [
  {
    id: 'web-experiences',
    dir: 'Website',
    set: [1, 2, 3, 4],
    labels: ['Web experience', 'Feature detail', 'Layout study', 'Product site'],
    discipline: 'Website design',
    sectorRest: ' · Responsive websites',
    name: 'Web Experiences',
    headline: 'Websites that look sharp and convert.',
    brief:
      'Fast, responsive websites and web applications built to scale and convert, designed around how your customers actually browse.',
    scope: 'UI / UX design · Front-end build · Responsive layouts',
    summary:
      'A selection of websites we designed and built across education, finance, real estate and SaaS. Each one is planned around a clear goal, laid out for every screen size and built to load fast.',
    built: [
      'Page layouts planned around one job per section, so visitors always know the next step.',
      'Responsive builds that hold up from large desktops down to small phones.',
      'Clean, fast front-ends that are ready for SEO and easy to keep growing.',
    ],
    tags: ['Web Development', 'UI / UX design', 'Search Engine Optimization'],
  },
  {
    id: 'brand-marks',
    dir: 'Logos',
    set: [1, 2, 3, 4],
    labels: ['Brand mark', 'Identity', 'Emblem', 'Monogram'],
    discipline: 'Logo design',
    sectorRest: ' · Brand identity',
    name: 'Brand Marks',
    headline: 'Logos that make a first impression last.',
    brief:
      'Distinctive marks and identity systems that look right on a website, on a shopfront and on a social avatar.',
    scope: 'Logo design · Brand identity · Usage guidelines',
    summary:
      'A selection of logos and identities from our design team. Each mark is built to stay legible at small sizes, work in one color and scale cleanly across print and digital.',
    built: [
      'Concept routes that explore different directions before one is refined.',
      'Marks tested in full color, one color and at favicon size.',
      'Delivery in the file formats your team needs for web, print and social.',
    ],
    tags: ['Logo design', 'Brand identity', 'Visual design'],
    position: 'center',
  },
  {
    id: 'mobile-apps',
    dir: 'Mobile-Apps',
    set: [1, 2, 3, 4],
    labels: ['App experience', 'Key flow', 'Interface detail', 'Mobile screen'],
    discipline: 'Mobile app design',
    sectorRest: ' · iOS & Android',
    name: 'Mobile Apps',
    headline: 'App experiences people come back to.',
    brief:
      'Native and cross-platform mobile apps for iOS and Android that engage users, from the first tap to the tenth session.',
    scope: 'App design · UI / UX · iOS & Android build',
    summary:
      'A selection of mobile interfaces across fitness, payments, delivery and travel. The screens favor a clear primary action, thumb-friendly spacing and flows that feel familiar from the first launch.',
    built: [
      'Screen-by-screen flows that keep the main action within reach of one thumb.',
      'Consistent interface systems so every new screen feels like part of one product.',
      'Builds for iOS and Android that stay fast on everyday devices.',
    ],
    tags: ['App Development', 'UI / UX design', 'iOS & Android'],
    position: 'top',
  },
  {
    id: 'book-covers',
    dir: 'Book-Cover',
    set: [1, 2, 3, 4],
    labels: ['Cover design', 'Series look', 'Genre study', 'Front cover'],
    discipline: 'Book cover design',
    sectorRest: ' · Publishing',
    name: 'Book Covers',
    headline: 'Covers that earn the click and the shelf space.',
    brief:
      'Cover art for authors and publishers, composed to read at thumbnail size and to promise the right story.',
    scope: 'Cover design · Typography · Print & e-book files',
    summary:
      'A selection of book covers across thriller, science fiction, fantasy and non-fiction. Each is composed to stay readable as a small online thumbnail while still rewarding a closer look in print.',
    built: [
      'Typography and imagery chosen to signal the genre at a glance.',
      'Thumbnail checks so the title still reads in an online store listing.',
      'Print-ready and e-book files prepared for the platforms you publish on.',
    ],
    tags: ['Cover design', 'Typography', 'Visual design'],
    position: 'center',
  },
  {
    id: 'graphic-design',
    dir: 'Graphic',
    set: [1, 2, 3, 4],
    labels: ['Campaign visual', 'Brand piece', 'Ad creative', 'Social pack'],
    discipline: 'Graphic design',
    sectorRest: ' · Visual communication',
    name: 'Graphic Design',
    headline: 'Visuals that carry a message at a glance.',
    brief:
      'Campaign graphics, advertising creatives and social media packs that keep a brand looking consistent everywhere it appears.',
    scope: 'Graphic design · Advertising creative · Social media assets',
    summary:
      'A selection of graphic work spanning campaign visuals, advertising suites and social media packs. The pieces share one visual language so a brand feels consistent from poster to post.',
    built: [
      'A shared visual language across campaign, advertising and social formats.',
      'Layouts sized and exported for each channel they will run on.',
      'Editable source files so your team can extend the set later.',
    ],
    tags: ['Graphic design', 'Social Media & content', 'Brand visuals'],
    position: 'center',
  },
  {
    id: 'motion-graphics',
    dir: 'Motion-Graphic',
    set: [1, 2, 3, 4],
    labels: ['Motion frame', 'Keyframe', 'Explainer scene', 'Launch animation'],
    discipline: 'Motion graphics',
    sectorRest: ' · Animation & video',
    name: 'Motion Graphics',
    headline: 'Motion that explains, launches and holds attention.',
    brief:
      'Animated explainers, product motion and brand reveals that turn a static idea into something people watch to the end.',
    scope: 'Motion design · Storyboarding · Animation',
    summary:
      'A selection of frames from our motion work: character animation, product keyframes, explainer scenes and brand launches. Each is storyboarded first so the finished motion has a clear beginning, point and end.',
    built: [
      'Storyboards agreed before animation starts, so changes stay cheap and early.',
      'Motion paced for the platform, from short social cuts to longer explainers.',
      'Exports prepared for web, social and presentation use.',
    ],
    tags: ['Motion graphics', 'Animation', 'Video content'],
    position: 'center',
  },
  {
    id: 'web-platforms',
    dir: 'Website',
    set: [5, 6, 7, 8],
    labels: ['Marketplace', 'Portal', 'Agency site', 'Cloud platform'],
    discipline: 'Web platform design',
    sectorRest: ' · Platforms & portals',
    name: 'Web Platforms',
    headline: 'From storefronts to portals, built to be used.',
    brief:
      'E-commerce marketplaces, healthcare portals and cloud platforms, designed so complex products feel simple to use.',
    scope: 'Platform UX · Front-end build · Design systems',
    summary:
      'A second selection covering e-commerce, healthcare, creative agencies and enterprise cloud. These projects lean on structure: clear navigation, consistent components and layouts that scale as a product grows.',
    built: [
      'Navigation and page structure planned for products with many screens.',
      'Reusable components so new pages stay consistent and quick to build.',
      'Layouts tuned for both quick visits and long working sessions.',
    ],
    tags: ['Web Development', 'Software as a Service', 'UI / UX design'],
  },
  {
    id: 'identity-systems',
    dir: 'Logos',
    set: [5, 6, 7, 9],
    labels: ['Logo', 'Monogram', 'Studio icon', 'Insignia'],
    discipline: 'Brand identity',
    sectorRest: ' · Identity systems',
    name: 'Identity Systems',
    headline: 'One mark, many places, always recognizable.',
    brief:
      'Logo families and monograms built to flex across apps, packaging, signage and social without losing character.',
    scope: 'Identity design · Monograms · Icon systems',
    summary:
      'A second selection of marks and monograms for technology, creative and venture brands. They are drawn on a clear grid so the same symbol can sit on an app icon, a letterhead or a shopfront.',
    built: [
      'Symbols drawn on a consistent grid for clean scaling.',
      'Primary, secondary and icon-only versions of each mark.',
      'Color and spacing rules so the identity stays consistent as it grows.',
    ],
    tags: ['Logo design', 'Brand identity', 'Icon design'],
    position: 'center',
  },
  {
    id: 'app-experiences',
    dir: 'Mobile-Apps',
    set: [5, 6, 7, 8],
    labels: ['Wellness app', 'Smart home', 'Productivity', 'Health app'],
    discipline: 'App interface design',
    sectorRest: ' · Product design',
    name: 'App Experiences',
    headline: 'Interfaces that feel obvious on the first try.',
    brief:
      'Wellness, smart home, productivity and health apps designed around calm, readable screens and clear next steps.',
    scope: 'Product design · Interface systems · Prototyping',
    summary:
      'A second selection of app interfaces, from meditation to IoT control. The work favors generous spacing, readable type and states that always show the user what happened and what to do next.',
    built: [
      'Interface states designed for loading, empty and error moments, not just the happy path.',
      'Readable type and spacing tuned for use on the move.',
      'Interactive prototypes so ideas can be tested before they are built.',
    ],
    tags: ['App Development', 'UI / UX design', 'Prototyping'],
    position: 'top',
  },
  {
    id: 'cover-art',
    dir: 'Book-Cover',
    set: [5, 6, 7, 9],
    labels: ['Cover art', 'Fantasy cover', 'Non-fiction', 'Standalone'],
    discipline: 'Cover art',
    sectorRest: ' · Publishing',
    name: 'Cover Art',
    headline: 'Stories wrapped in the right first impression.',
    brief:
      'Illustrated and typographic covers for science fiction, fantasy and business titles, made to stand out in a crowded list.',
    scope: 'Cover illustration · Typography · Layout',
    summary:
      'A second selection of covers across genres. Each balances a strong central image with typography that is easy to read in a store listing and confident on a physical shelf.',
    built: [
      'Central imagery chosen to hint at the story without giving it away.',
      'Type pairings that match the tone of the genre.',
      'Final files prepared for both print and digital editions.',
    ],
    tags: ['Cover design', 'Illustration', 'Typography'],
    position: 'center',
  },
  {
    id: 'visual-campaigns',
    dir: 'Graphic',
    set: [5, 6, 7, 9],
    labels: ['Infographic', 'Merchandising', 'Packaging', 'Promo poster'],
    discipline: 'Visual campaigns',
    sectorRest: ' · Print & digital',
    name: 'Visual Campaigns',
    headline: 'Infographics, packaging and posters with a point of view.',
    brief:
      'Information design, packaging concepts and promotional posters that make products and ideas easy to understand.',
    scope: 'Infographics · Packaging concepts · Promotional design',
    summary:
      'A second selection of design work for print and digital: infographic series, merchandising decks, packaging concepts and promotional posters, each aimed at making one idea easy to take in.',
    built: [
      'Information organized so the key point lands before the details.',
      'Packaging concepts presented on realistic mock-ups.',
      'Poster layouts with one clear focal point and call to action.',
    ],
    tags: ['Graphic design', 'Packaging', 'Print design'],
    position: 'center',
  },
  {
    id: 'motion-stories',
    dir: 'Motion-Graphic',
    set: [5, 6, 8, 9],
    labels: ['Interface motion', 'Kinetic type', 'Logo reveal', 'Social reel'],
    discipline: 'Motion design',
    sectorRest: ' · Brand motion',
    name: 'Motion Stories',
    headline: 'Logo reveals, kinetic type and social-first motion.',
    brief:
      'Short-form motion for brands: logo stingers, kinetic typography, interface animation and social highlight reels.',
    scope: 'Kinetic typography · Logo animation · Social motion',
    summary:
      'A second selection of motion frames covering interface animation, kinetic typography, logo reveals and social highlight reels, all built to grab attention in the first second.',
    built: [
      'Logo reveals and stingers that fit naturally at the start or end of a video.',
      'Kinetic typography timed to the voice-over or music underneath.',
      'Vertical and square versions prepared for social platforms.',
    ],
    tags: ['Motion graphics', 'Kinetic typography', 'Social video'],
    position: 'center',
  },
];

const pageTotal = (dir: string) => library[dir].length;

const ownProjects: Project[] = defs.map((d, i) => {
  const a = ACCENTS[i % ACCENTS.length];
  const [a1, a2, a3, a4] = d.set;
  const pos = d.position ?? 'top';
  const [l1, l2, l3, l4] = d.labels;
  return {
    id: d.id,
    sector: d.discipline,
    sectorRest: d.sectorRest,
    name: d.name,
    headline: d.headline,
    brief: d.brief,
    meta: [
      { label: 'Discipline', value: d.discipline },
      { label: 'Scope', value: d.scope },
    ],
    accessNote: `Want results like this for your own brand? Tell us about your project and we will reply with a plan.`,
    summary: d.summary,
    built: d.built,
    tags: d.tags,
    disclosure:
      'Selected visuals from our portfolio. Full project details, scope and references are shared on request.',
    accent: a.accent,
    accentSoft: a.soft,
    dark: a.dark,
    sweep: i % 2 === 0 ? 'ltr' : 'rtl',
    wash: i === 2 ? 'strong' : undefined,
    images: {
      desktop: shot(d.dir, a1, l1, d.discipline, pos),
      feature: shot(d.dir, a2, l2, d.discipline, pos),
      secondary: shot(d.dir, a3, l3, d.discipline, pos),
      mobile: shot(d.dir, a4, l4, d.discipline, pos),
    },
    motion: {
      swap: i % 2 === 0 ? 'diagonal' : 'drift',
      direction: i % 2 === 0 ? 'ltr' : 'rtl',
      parallax: i === 1,
      edgeTrace: i % 5 === 0 || i === 10,
      pan: [6, 8, 6, 7, 10, 6][i % 6],
      zoom: [1.03, 1.025, 1.03, 1.03, 1.04, 1.03][i % 6],
    },
    metrics: [
      { value: '4', label: 'Visuals featured in this showcase' },
      { value: String(pageTotal(d.dir)), label: `Pieces in our ${d.discipline.toLowerCase()} collection` },
      { value: '6', label: 'Creative disciplines in our portfolio' },
      { value: '3', label: 'Offices: Karachi, Berlin and New York' },
    ],
    metricsSource: 'Counted from this portfolio · The Yellow Solutions',
  };
});

/** the original showcases first, then the additional projects (see importedProjects.ts) */
export const projects: Project[] = [...ownProjects, ...importedProjects];

/* ── Glance canvas ─────────────────────────────────────────────────────────── */

export interface GlanceImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  tag: string;
  /** aspect ratio the card is cropped to */
  ar?: [number, number];
  position?: string;
}

const glance = (dir: string, n: number, tag: string, ar?: [number, number], position = 'top'): GlanceImage => {
  const raw = library[dir][n - 1];
  return {
    src: `${P}/${dir}/${raw.file}.webp`,
    width: raw.w,
    height: raw.h,
    alt: raw.title,
    tag,
    ar,
    position,
  };
};

export const glanceDashboard = glance('Motion-Graphic', 3, 'Motion', [1400, 826], 'center');
export const glanceDesktop = glance('Website', 1, 'Web', [2656, 1660], 'top');
export const glanceFlow = glance('Graphic', 6, 'Graphic', [1440, 814], 'center');
export const glancePhones: GlanceImage[][] = [
  [
    glance('Mobile-Apps', 1, 'App', [405, 835]),
    glance('Mobile-Apps', 3, 'App', [405, 835]),
    glance('Mobile-Apps', 5, 'App', [405, 835]),
  ],
  [
    glance('Mobile-Apps', 6, 'App', [405, 835]),
    glance('Mobile-Apps', 8, 'App', [405, 835]),
    glance('Mobile-Apps', 9, 'App', [405, 835]),
  ],
];

export const industries = [
  'Education',
  'Fintech',
  'Real estate',
  'SaaS',
  'Healthcare',
  'E-commerce',
  'Publishing',
  'Creative agencies',
];

/* ── By the numbers ────────────────────────────────────────────────────────── */

export interface Stat {
  kicker: string;
  value: number;
  suffix: string;
  label: string;
  viz: 'timeline' | 'delivery' | 'team' | 'sectors';
}

export const stats: Stat[] = [
  { kicker: 'Clients', value: 1000, suffix: '+', label: 'Satisfied clients', viz: 'delivery' },
  { kicker: 'Services', value: services.length, suffix: '', label: 'Digital services under one roof', viz: 'sectors' },
  { kicker: 'Offices', value: 3, suffix: '', label: 'Offices: Karachi, Berlin and New York', viz: 'team' },
  { kicker: 'Portfolio', value: 6, suffix: '', label: 'Creative disciplines in our portfolio', viz: 'timeline' },
];

export const timelineStops = ['Web', 'Logo', 'App', 'Book', 'Graphic', 'Motion'];
export const sectorTiles = ['Web', 'Apps', 'SEO', 'Ads', 'AI', 'CRM', 'POS', 'Data'];

/* ── Reviews (from the testimonials already on the site) ───────────────────── */

export interface Review {
  title: string;
  quote: string;
  name: string;
  role: string;
}

const byName = (n: string) => testimonials.find((t) => t.name === n);
const reviewPicks: { name: string; title: string }[] = [
  // each headline is a verbatim phrase taken from that client's own quote
  { name: 'Stacey R.', title: 'Sales started day one' },
  { name: 'Lena P.', title: 'Test fast, share data clearly' },
  { name: 'Eddie T.', title: 'Exactly what we needed' },
  { name: 'Rachel W.', title: 'Everything works perfectly across devices' },
];

export const reviews: Review[] = reviewPicks
  .map((p) => {
    const t = byName(p.name);
    return t ? { title: p.title, quote: t.quote, name: t.name, role: t.company } : null;
  })
  .filter((r): r is Review => r !== null);

/* ── Capabilities ──────────────────────────────────────────────────────────── */

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
const svc = (title: string) => services.find((s) => s.title === title);

export interface FlowStep {
  label: string;
  sub: string;
  chips?: string[];
}

export type Visual =
  | { kind: 'flow'; steps: FlowStep[] }
  | {
      kind: 'screens';
      main: { src: string; width: number; height: number; alt: string };
      phone?: { src: string; width: number; height: number; alt: string };
    }
  | { kind: 'pipeline' }
  | { kind: 'visibility' };

export interface Capability {
  title: string;
  body: string;
  href: string;
  visual: Visual;
  related?: string[];
}

const img = (dir: string, n: number, w: number, h: number) => {
  const raw = library[dir][n - 1];
  return { src: `${P}/${dir}/${raw.file}.webp`, width: w, height: h, alt: raw.title };
};

const capabilityDefs: { title: string; visual: Visual; related?: string[] }[] = [
  {
    title: 'Web Development',
    visual: { kind: 'screens', main: img('Website', 1, 1440, 900), phone: img('Mobile-Apps', 1, 405, 835) },
    related: ['Web Experiences', 'Web Platforms'],
  },
  {
    title: 'App Development',
    visual: { kind: 'screens', main: img('Mobile-Apps', 4, 1440, 900), phone: img('Mobile-Apps', 2, 405, 835) },
    related: ['Mobile Apps', 'App Experiences'],
  },
  { title: 'Digital Marketing', visual: { kind: 'visibility' } },
  {
    title: 'Social Media Management and Content Creation',
    visual: {
      kind: 'flow',
      steps: [
        { label: 'Plan', sub: 'Goals, audience and content calendar' },
        { label: 'Create', sub: 'Posts, reels and stories', chips: ['Posts', 'Reels', 'Stories'] },
        { label: 'Grow', sub: 'Publish, engage and report' },
      ],
    },
    related: ['Graphic Design', 'Motion Graphics'],
  },
  { title: 'Search Engine Optimization', visual: { kind: 'visibility' }, related: ['Web Experiences'] },
  {
    title: 'AI Automations / AI Business Automation',
    visual: {
      kind: 'flow',
      steps: [
        { label: 'Trigger', sub: 'A request, form or new record arrives' },
        { label: 'AI step', sub: 'Classify, extract and decide' },
        { label: 'Actions', sub: 'Run, log and monitor', chips: ['Update CRM', 'Notify team', 'Create task'] },
      ],
    },
  },
  {
    title: 'AI Chat Bots and Voice Agents',
    visual: {
      kind: 'flow',
      steps: [
        { label: 'Question', sub: 'A customer asks by chat or voice' },
        { label: 'AI agent', sub: 'Understands, looks up and replies', chips: ['Chat', 'Voice', '24/7'] },
        { label: 'Resolution', sub: 'Answered, or handed to your team' },
      ],
    },
  },
  { title: 'Customer Relationship Management', visual: { kind: 'pipeline' } },
  {
    title: 'Generative AI',
    visual: {
      kind: 'flow',
      steps: [
        { label: 'Prompt', sub: 'A brief, a brand voice, a goal' },
        { label: 'Model', sub: 'Generate and refine drafts', chips: ['Text', 'Images', 'Video'] },
        { label: 'Review', sub: 'Human-approved, on-brand output' },
      ],
    },
    related: ['Graphic Design', 'Motion Graphics'],
  },
  {
    title: 'User interface and experience design',
    visual: { kind: 'screens', main: img('Website', 7, 1440, 900), phone: img('Mobile-Apps', 5, 405, 835) },
    related: ['Web Experiences', 'Mobile Apps', 'App Experiences'],
  },
];

export const capabilities: Capability[] = capabilityDefs.flatMap((c) => {
  const s = svc(c.title);
  if (!s) return [];
  return [{ title: c.title, body: s.description, href: `/service/${slug(c.title)}`, visual: c.visual, related: c.related }];
});

export const heroCount = projects.length;
