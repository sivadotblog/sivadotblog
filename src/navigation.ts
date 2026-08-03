import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Posts',
      href: getBlogPermalink(),
    },
    {
      text: 'Projects',
      href: getPermalink('/projects'),
    },
    {
      text: 'Books',
      href: getPermalink('best-reads', 'category'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
  ],
  actions: [],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/sivadotblog' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/sivanandhasr/' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/sivadotblog/' },
  ],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [],
  footNote: `
    Siva's Blog &middot; Copyright (c) 2020-${new Date().getFullYear()} &middot; All rights reserved.
  `,
};
