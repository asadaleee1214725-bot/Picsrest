export interface PicsrestImage {
  id: string;
  unsplashId: string;
  /** Picsum seed used as guaranteed fallback */
  picsumSeed: number;
  title: string;
  creator: string;
  category: Category;
  likes: number;
  /** height / width ratio — used to size the image container */
  aspectRatio: number;
}

export type Category =
  | "All"
  | "Nature"
  | "Cars"
  | "AI"
  | "Technology"
  | "Fashion"
  | "Food"
  | "Architecture"
  | "Wallpapers";

export const CATEGORIES: Category[] = [
  "All",
  "Nature",
  "Cars",
  "AI",
  "Technology",
  "Fashion",
  "Food",
  "Architecture",
  "Wallpapers",
];

/** Unsplash thumbnail — tried first */
export function thumbUrl(unsplashId: string, w = 600): string {
  return `https://images.unsplash.com/photo-${unsplashId}?w=${w}&q=80&fit=crop&auto=format`;
}

/** Unsplash full-res for the modal */
export function fullUrl(unsplashId: string): string {
  return `https://images.unsplash.com/photo-${unsplashId}?w=1400&q=90&fit=crop&auto=format`;
}

/**
 * Picsum Photos fallback — always works, deterministic by seed.
 * URL format: https://picsum.photos/seed/{seed}/{w}/{h}
 */
export function picsumThumbUrl(seed: number, w: number, aspectRatio: number): string {
  const h = Math.round(w * aspectRatio);
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export function picsumFullUrl(seed: number): string {
  return `https://picsum.photos/seed/${seed}/1400/900`;
}

export const ALL_IMAGES: PicsrestImage[] = [
  // ── Nature ──────────────────────────────────────────────────────────────────
  {
    id: "n1",
    unsplashId: "1506905925346-21bda4d32df4",
    picsumSeed: 15,
    title: "Misty Mountain Sunrise",
    creator: "Samuel Ferrara",
    category: "Nature",
    likes: 3241,
    aspectRatio: 1.4,
  },
  {
    id: "n2",
    unsplashId: "1501854140801-50d01698950b",
    picsumSeed: 28,
    title: "Golden Hour Valley",
    creator: "Hendrik Cornelissen",
    category: "Nature",
    likes: 1892,
    aspectRatio: 0.75,
  },
  {
    id: "n3",
    unsplashId: "1470071459604-3b5ec3a7fe05",
    picsumSeed: 40,
    title: "Panoramic Landscape",
    creator: "Luca Bravo",
    category: "Nature",
    likes: 2754,
    aspectRatio: 0.6,
  },
  {
    id: "n4",
    unsplashId: "1518020382113-a7e8fc38eac9",
    picsumSeed: 65,
    title: "Wildflower Meadow",
    creator: "Annie Spratt",
    category: "Nature",
    likes: 1543,
    aspectRatio: 1.35,
  },
  {
    id: "n5",
    unsplashId: "1441974231531-c6227db76b6e",
    picsumSeed: 129,
    title: "Sunlit Forest Path",
    creator: "Casey Horner",
    category: "Nature",
    likes: 4021,
    aspectRatio: 1.5,
  },
  {
    id: "n6",
    unsplashId: "1465146344425-f00d5f5c8f07",
    picsumSeed: 155,
    title: "Flowing Waterfall",
    creator: "Daniele Levis Pelusi",
    category: "Nature",
    likes: 2987,
    aspectRatio: 1.3,
  },

  // ── Cars ─────────────────────────────────────────────────────────────────────
  {
    id: "c1",
    unsplashId: "1503376780353-7e6692767b70",
    picsumSeed: 201,
    title: "Ferrari in Motion",
    creator: "Marcin Jozwiak",
    category: "Cars",
    likes: 5678,
    aspectRatio: 0.67,
  },
  {
    id: "c2",
    unsplashId: "1492144534655-ae79c964c9d7",
    picsumSeed: 202,
    title: "Classic Red Roadster",
    creator: "David Emrich",
    category: "Cars",
    likes: 3891,
    aspectRatio: 0.7,
  },
  {
    id: "c3",
    unsplashId: "1544636331-9849afff8e2b",
    picsumSeed: 203,
    title: "Lamborghini at Dusk",
    creator: "Vitali Adutskevich",
    category: "Cars",
    likes: 7234,
    aspectRatio: 0.65,
  },
  {
    id: "c4",
    unsplashId: "1525609004556-c46c7d6cf023",
    picsumSeed: 204,
    title: "Porsche on the Road",
    creator: "Goh Rhy Yan",
    category: "Cars",
    likes: 2987,
    aspectRatio: 0.67,
  },
  {
    id: "c5",
    unsplashId: "1511919884226-fd3cad34687c",
    picsumSeed: 205,
    title: "Supercar Close-Up",
    creator: "Nabil Saleh",
    category: "Cars",
    likes: 4102,
    aspectRatio: 0.75,
  },

  // ── AI ───────────────────────────────────────────────────────────────────────
  {
    id: "ai1",
    unsplashId: "1677442135703-1787eea5ce01",
    picsumSeed: 301,
    title: "Neural Networks",
    creator: "Steve Johnson",
    category: "AI",
    likes: 4512,
    aspectRatio: 1.2,
  },
  {
    id: "ai2",
    unsplashId: "1620712943543-bcc4688e7485",
    picsumSeed: 302,
    title: "AI Digital Mind",
    creator: "Possessed Photography",
    category: "AI",
    likes: 3217,
    aspectRatio: 1.0,
  },
  {
    id: "ai3",
    unsplashId: "1485827404703-89b55fcc595e",
    picsumSeed: 303,
    title: "Robot Vision",
    creator: "Alex Knight",
    category: "AI",
    likes: 6789,
    aspectRatio: 1.5,
  },
  {
    id: "ai4",
    unsplashId: "1655720033654-a4239dd42d10",
    picsumSeed: 304,
    title: "Machine Learning Flow",
    creator: "Growtika",
    category: "AI",
    likes: 2891,
    aspectRatio: 0.8,
  },

  // ── Technology ───────────────────────────────────────────────────────────────
  {
    id: "t1",
    unsplashId: "1531297484001-80022131f5a1",
    picsumSeed: 401,
    title: "Neon Circuit Glow",
    creator: "Maximalfocus",
    category: "Technology",
    likes: 2341,
    aspectRatio: 0.75,
  },
  {
    id: "t2",
    unsplashId: "1518770660439-4636190af475",
    picsumSeed: 402,
    title: "Motherboard Macro",
    creator: "Fredy Jacob",
    category: "Technology",
    likes: 1987,
    aspectRatio: 0.67,
  },
  {
    id: "t3",
    unsplashId: "1451187580459-43490279c0fa",
    picsumSeed: 403,
    title: "Developer Workspace",
    creator: "Radowan Nakif Rehan",
    category: "Technology",
    likes: 3102,
    aspectRatio: 1.3,
  },
  {
    id: "t4",
    unsplashId: "1526374965328-7f61d4dc18c5",
    picsumSeed: 404,
    title: "Glitch Matrix",
    creator: "Markus Spiske",
    category: "Technology",
    likes: 4561,
    aspectRatio: 1.5,
  },

  // ── Fashion ──────────────────────────────────────────────────────────────────
  {
    id: "f1",
    unsplashId: "1515886657613-9f3515b0c78f",
    picsumSeed: 501,
    title: "Street Style Editorial",
    creator: "Charles Etoroma",
    category: "Fashion",
    likes: 5120,
    aspectRatio: 1.5,
  },
  {
    id: "f2",
    unsplashId: "1469334031218-e382a71b716b",
    picsumSeed: 502,
    title: "Summer Collection",
    creator: "Tamara Bellis",
    category: "Fashion",
    likes: 4320,
    aspectRatio: 1.33,
  },
  {
    id: "f3",
    unsplashId: "1483985988355-763728e1935b",
    picsumSeed: 503,
    title: "Urban Couture",
    creator: "freestocks",
    category: "Fashion",
    likes: 2876,
    aspectRatio: 1.25,
  },
  {
    id: "f4",
    unsplashId: "1509631179647-0177331693ae",
    picsumSeed: 504,
    title: "Monochrome Look",
    creator: "Apostolos Vamvouras",
    category: "Fashion",
    likes: 3654,
    aspectRatio: 1.4,
  },

  // ── Food ─────────────────────────────────────────────────────────────────────
  {
    id: "fo1",
    unsplashId: "1565299624946-b28f40a0ae38",
    picsumSeed: 601,
    title: "Artisan Wood-Fired Pizza",
    creator: "Alan Hardman",
    category: "Food",
    likes: 3891,
    aspectRatio: 0.8,
  },
  {
    id: "fo2",
    unsplashId: "1567620905732-2d1ec7ab7445",
    picsumSeed: 602,
    title: "Brunch Spread",
    creator: "Joseph Gonzalez",
    category: "Food",
    likes: 2654,
    aspectRatio: 0.75,
  },
  {
    id: "fo3",
    unsplashId: "1540189549336-e6e99b402fdd",
    picsumSeed: 603,
    title: "Omakase Sushi",
    creator: "Jakub Kapusnak",
    category: "Food",
    likes: 4102,
    aspectRatio: 0.7,
  },
  {
    id: "fo4",
    unsplashId: "1504674900247-0877df9cc836",
    picsumSeed: 604,
    title: "Gourmet Plate",
    creator: "Brooke Lark",
    category: "Food",
    likes: 5217,
    aspectRatio: 0.67,
  },
  {
    id: "fo5",
    unsplashId: "1512621776951-a57141f2eefd",
    picsumSeed: 605,
    title: "Fresh Produce Bowl",
    creator: "Anna Pelzer",
    category: "Food",
    likes: 3341,
    aspectRatio: 1.0,
  },

  // ── Architecture ─────────────────────────────────────────────────────────────
  {
    id: "a1",
    unsplashId: "1486325212027-8081e485255e",
    picsumSeed: 700,
    title: "Glass Tower Reflection",
    creator: "Sean Pollock",
    category: "Architecture",
    likes: 4231,
    aspectRatio: 1.6,
  },
  {
    id: "a2",
    unsplashId: "1488972685288-c3fd157d7c7a",
    picsumSeed: 701,
    title: "Geometric Facade",
    creator: "Alexandre Perotto",
    category: "Architecture",
    likes: 3102,
    aspectRatio: 1.3,
  },
  {
    id: "a3",
    unsplashId: "1479839672679-a46483c0e7c8",
    picsumSeed: 702,
    title: "Minimal Interior",
    creator: "Douglas Sheppard",
    category: "Architecture",
    likes: 2891,
    aspectRatio: 0.8,
  },
  {
    id: "a4",
    unsplashId: "1464146072230-91cabc968266",
    picsumSeed: 703,
    title: "Modern Library",
    creator: "Sandro Katalina",
    category: "Architecture",
    likes: 5678,
    aspectRatio: 0.75,
  },

  // ── Wallpapers ───────────────────────────────────────────────────────────────
  {
    id: "w1",
    unsplashId: "1419242902214-272b3f66ee7a",
    picsumSeed: 800,
    title: "Deep Space Nebula",
    creator: "Greg Rakozy",
    category: "Wallpapers",
    likes: 8934,
    aspectRatio: 0.67,
  },
  {
    id: "w2",
    unsplashId: "1462275646964-a0e3386b89fa",
    picsumSeed: 801,
    title: "Aurora Borealis",
    creator: "Vincent Guth",
    category: "Wallpapers",
    likes: 7654,
    aspectRatio: 0.67,
  },
  {
    id: "w3",
    unsplashId: "1534796636912-3b584dfe24f7",
    picsumSeed: 802,
    title: "Liquid Abstract",
    creator: "Pawel Czerwinski",
    category: "Wallpapers",
    likes: 6123,
    aspectRatio: 0.67,
  },
  {
    id: "w4",
    unsplashId: "1557682250-33bd709cbe85",
    picsumSeed: 803,
    title: "Neon Gradient",
    creator: "Milad Fakurian",
    category: "Wallpapers",
    likes: 5432,
    aspectRatio: 0.67,
  },
  {
    id: "w5",
    unsplashId: "1558618666-fcd25c85cd64",
    picsumSeed: 804,
    title: "Dark Geometric",
    creator: "Susan Holt Simpson",
    category: "Wallpapers",
    likes: 4871,
    aspectRatio: 0.67,
  },
];

/** Initial page size and increment for infinite scroll */
export const PAGE_SIZE = 12;
