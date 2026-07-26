# Siva's Blog

Personal blog at [siva.blog](https://siva.blog), built with [Astro](https://astro.build/) (using the [AstroWind](https://github.com/arthelokyo/astrowind) starter) and Tailwind CSS v4.

## Commands

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm install`     | Install dependencies                |
| `npm run dev`     | Start dev server at localhost:4321  |
| `npm run build`   | Production build to `./dist/`       |
| `npm run preview` | Preview production build locally    |
| `npm run check`   | Run astro check + ESLint + Prettier |
| `npm run fix`     | Auto-fix ESLint + Prettier issues   |

**Node.js requirement:** >= 22.12.0

## Content

Blog posts live in `src/data/post/` as `.md`/`.mdx` files. See `AGENTS.md` for the full project architecture.

## Deployment

Pushes to `main` build the site and deploy it via FTP to the production host (see `.github/workflows/actions.yaml`).
