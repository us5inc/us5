export const publishedProducts = [
  {
    name: 'Neon Bubble Galaxy',
    slug: 'neon-bubble-galaxy',
    developer: 'US5 Incorporation',
    category: 'Mobile game',
    status: 'Published mobile game',
    summary: 'A mobile game published by US5 Incorporation.',
    icon: '/images/neon-bubble-galaxy.png',
    productPath: '/products/neon-bubble-galaxy/',
    privacyPath: '/privacy/',
    supportPath: '/support/',
    deletionPath: '/data-deletion/',
  },
  {
    name: 'Arrows Puzzle Pro',
    slug: 'arrows-puzzle-pro',
    developer: 'US5 Incorporation',
    category: 'Mobile game',
    status: 'Published mobile game',
    summary: 'A mobile game published by US5 Incorporation.',
    icon: '/images/arrows-puzzle-pro.png',
    productPath: '/products/arrows-puzzle-pro/',
    privacyPath: '/privacy/',
    supportPath: '/support/',
    deletionPath: '/data-deletion/',
  },
] as const;

export type PublishedProduct = (typeof publishedProducts)[number];

export const featuredProduct = publishedProducts[0];
export const arrowsPuzzlePro = publishedProducts[1];
