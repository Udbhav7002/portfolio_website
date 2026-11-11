# Developer Dossier

A personal developer portfolio website presenting projects, skills, and engineering journey as an interactive "dossier" — with searchable project breakdowns, architecture details, and a chronological story view.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Animation:** Framer Motion
- **State management:** Zustand
- **Icons:** lucide-react

## Features

- **Dossier view** — searchable, filterable project catalog with category chips (AI & Local Agents, Rust & Desktop, Systems & Low-Latency, Computer Vision, Full-Stack Web) and featured/title sorting
- **Project detail** — per-project architecture breakdown, metrics, and related-project connections computed from shared tech stacks
- **Story view** — a chronological, chapter-based timeline of the engineering journey
- **In-app resume viewer** — modal-based resume display
- **Responsive, accessible UI** — keyboard-friendly navigation, skip-to-content link, and reduced-motion support via Framer Motion's `MotionConfig`

## Getting Started

### Prerequisites

- Node.js 20.19+ and npm

### Installation

```bash
git clone https://github.com/Udbhav7002/portfolio_website.git
cd portfolio_website
npm install
```

### Available Scripts

```bash
npm run dev       # Start the dev server (port 3000)
npm run build     # Type-check (tsc -b) and build for production
npm run preview   # Preview the production build locally
```

## Project Structure

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

The site is configured for [Vercel](https://vercel.com) (`vercel.json` sets the Vite framework preset and SPA rewrites so all routes resolve to `index.html`). Connect the repository to a Vercel project and it will build automatically on push — no extra configuration required.

## License

Released under the [MIT License](LICENSE).
