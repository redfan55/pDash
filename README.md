# Cisco Secure AI Factory with NVIDIA

Interactive dashboard showcasing Cisco's Secure AI Factory architecture, use cases, and full-stack infrastructure components powered by NVIDIA.

## Tech Stack

- **React 18** — UI framework
- **Vite 6** — Build tool & dev server
- **Tailwind CSS 3** — Utility-first styling
- **Lucide React** — Icon library

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel

### Option 1: Import from GitHub (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click **Import** and select your GitHub repository
4. Vercel auto-detects Vite — no configuration needed
5. Click **Deploy**

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Project Structure

```
cisco-secure-ai-factory/
├── public/
│   └── vite.svg              # Favicon
├── src/
│   ├── App.jsx                # Main application component
│   ├── index.css              # Tailwind directives + base styles
│   └── main.jsx               # React entry point
├── index.html                 # HTML entry point
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── .gitignore                 # Git ignore rules
```

## Features

- **Home Screen** — Entry point with navigation
- **8 AI Use Cases** — Healthcare, Safety, Physical AI, Self-Driving, Drug Research, Retail, Warehouse, Defect Detection
- **Interactive Stack Layers** — Compute, NVIDIA AI Software, Kubernetes, Networking, Storage, Security, Observability
- **Isometric 3D Scenes** — Per use-case animated visualizations
- **Product Detail Modals** — Technical specifications for each product
- **Particle Background** — Canvas-based animated particle field
- **Idle Attract Mode** — Auto-cycles through use cases when inactive
