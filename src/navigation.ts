import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Articles',
      links: [
        {
          text: 'All Posts',
          href: getBlogPermalink(),
        },
        {
          text: 'AI Strategies',
          href: getPermalink('ai-strategies', 'tag'),
        },
        {
          text: 'Enterprise Strategies',
          href: getPermalink('enterprise-strategies', 'category'),
        },
        {
          text: 'Data Platforms',
          href: getPermalink('data-platforms', 'category'),
        },
        {
          text: 'Platform Engineering',
          href: getPermalink('platform-engineering', 'category'),
        },
        {
          text: 'Techno Bytes',
          href: getPermalink('techno-bytes', 'category'),
        },
        {
          text: 'Observability',
          href: getPermalink('observability', 'category'),
        },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'My Reflections',
      href: getPermalink('reflections', 'category'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/sivadotblog' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/sivanandhasr/' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/sivadotblog/' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    Siva's Blog &middot; Copyright (c) 2020-${new Date().getFullYear()} &middot; All rights reserved.
  `,
};
