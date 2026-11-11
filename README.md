# Developer Dossier

A single-page portfolio site presenting projects, skills, and an engineering timeline as an interactive dossier: a searchable project catalog, per-project detail pages, a chronological story view, and an in-app resume modal.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion
- Zustand
- lucide-react

## Features

- Dossier view — searchable, filterable project catalog with category chips (AI & Local Agents, Rust & Desktop, Systems & Low-Latency, Computer Vision, Full-Stack Web) and featured/title sorting
- Project detail — per-project architecture breakdown, metrics, and related projects computed from shared tech stacks
- Story view — a chronological, chapter-based timeline
- Resume viewer — modal-based resume display
- Responsive, accessible UI — keyboard navigation, a skip-to-content link, and reduced-motion support via Framer Motion's `MotionConfig`

## Getting started

### Prerequisites

- Node.js 20.19+ and npm

### Installation

```bash
git clone https://github.com/Udbhav7002/portfolio_website.git
cd portfolio_website
npm install
```

### Available scripts

```bash
npm run dev       # Start the dev server (port 3000)
npm run build     # Type-check (tsc -b) and build for production
npm run preview   # Preview the production build locally
```

## Project structure

```
├── public/            # Static assets served at root
├── src/
│   ├── app/           # Root App component
│   ├── data/          # Typed content (bio, projects, story chapters)
│   ├── features/      # Pure logic (project insights, connections)
│   ├── pages/         # Page-level composition
│   ├── shared/        # Store, UI primitives, utilities
│   └── widgets/       # Feature views (dossier, narrative, project-detail, metrics)
├── index.html
├── vercel.json        # Deployment config
└── vite.config.ts
```

## Deployment

The site is configured for [Vercel](https://vercel.com): `vercel.json` sets the Vite framework preset and SPA rewrites so all routes resolve to `index.html`. Connect the repository to a Vercel project and it builds on push.

## License

MIT — see [LICENSE](LICENSE).
