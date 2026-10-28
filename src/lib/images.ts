/**
 * Centralized watch imagery sourced from Pexels (license-free).
 * Each entry keeps the original photo id so URLs stay stable.
 */

const px = (id: number, ext: 'jpeg' | 'png' = 'jpeg', w = 1100) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=${w}`;

// Primary hero watch — black watch with gold details on coal/dark background (PNG, portrait 2848x4272)
export const heroWatch = px(12159978, 'png', 1200);

export type WatchProduct = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
};

export const collection: WatchProduct[] = [
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    tagline: 'Dark opulence, gilded edge',
    description:
      'A matte obsidian dial framed in 18k gold, balanced by a hand-finished bracelet that catches the light at every angle.',
    image: px(29217139, 'jpeg', 900),
    price: 'Price on request',
  },
  {
    id: 'midnight-classic',
    name: 'Midnight Classic',
    tagline: 'The eternal silhouette',
    description:
      'A understated black-on-black composition with slim gold indices — a quiet statement for the discerning collector.',
    image: px(22032442, 'jpeg', 900),
    price: 'Price on request',
  },
  {
    id: 'royal-silver',
    name: 'Royal Silver',
    tagline: 'Refined radiance',
    description:
      'Brushed silver tones meet a polished bezel and supple leather strap — timeless craftsmanship for everyday elegance.',
    image: px(16562977, 'jpeg', 900),
    price: 'Price on request',
  },
];

export type DetailShot = {
  id: string;
  title: string;
  caption: string;
  image: string;
};

export const detailShots: DetailShot[] = [
  {
    id: 'dial',
    title: 'The Dial',
    caption: 'Hand-applied indices and a sun-brushed finish that shifts with the light.',
    image: px(18641169, 'png', 1000),
  },
  {
    id: 'bezel',
    title: 'The Bezel',
    caption: 'A precision-turned metallic bezel polished to a mirror edge.',
    image: px(4601006, 'jpeg', 1000),
  },
  {
    id: 'crown',
    title: 'Crown & Profile',
    caption: 'The knurled crown — engineered for a lifetime of perfect winds.',
    image: px(1034063, 'jpeg', 1000),
  },
  {
    id: 'strap',
    title: 'The Strap',
    caption: 'Full-grain leather and a deployant clasp sculpted for the wrist.',
    image: px(1432234, 'jpeg', 1000),
  },
];

export const craftsmanshipImage = px(9561316, 'jpeg', 1200);
export const craftsmanshipSecondary = px(6343134, 'jpeg', 900);
