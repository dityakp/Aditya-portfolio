# Aditya Kumar Prasad | DevSecOps & Cloud Engineer ☁️🔒

![React](https://img.shields.io/badge/React-19.0.0-61DBFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Netlify Deploy](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

Welcome to the source code of my **[personal portfolio website](https://adityakp.netlify.app/)**. 

Designed with an "Infrastructure Blueprint" aesthetic, this highly interactive Single Page Application (SPA) serves as a living resume to showcase my expertise in Cloud Computing, DevOps Automation, and Software Engineering.

## ✨ Features

- **Dynamic Scroll Interactivity**: Advanced parallax scrolling, scroll-scrubbed scale animations, and reveals utilizing `motion/react` entirely synchronized to viewport scroll progress.
- **Fluid Simulation Canvas**: A customized, highly performant WebGL fluid background that responds to mouse hovers but remains gracefully faded into the UI.
- **GitHub Live API Integration**: Dynamically fetches and displays my most recently updated public repositories directly from the GitHub REST API.
- **Seamless Smooth Scrolling**: Implemented `Lenis` to guarantee silky smooth buttery scroll frame rates across all browsers and devices.
- **Serverless Formspree Integration**: Contact form connected directly to Formspree, preventing the need for an active backend server while securely handling submission data.
- **"Glassmorphism" Design**: A custom Tailwind v4 config tailored toward a dark, cyberpunk, blueprint aesthetic incorporating dense monospace typography and glowing accents.

## 🛠 Tech Stack

- **Framework**: [React v19](https://react.dev/) + [Vite v6](https://vitejs.dev/) + TypeScript
- **Styling**: Vanilla `index.css` & [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://motion.dev/) & [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis) 
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router DOM v7
- **Deployment & Hosting**: Configured explicitly for static SPA routing on [Netlify](https://www.netlify.com/).

## 🚀 Local Development

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/dityakp/Aditya-portfolio.git
cd Aditya-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the Vite development server
```bash
npm run dev
```
The site will spin up at `http://localhost:3000`.

## 📦 Building for Production

This project is configured out-of-the-box to bundle securely for Netlify or any static hosting provider.

To create an optimized production build:
```bash
npm run build
```
This generates the `dist/` directory.

To locally preview your production build exactly as it would appear on a live server:
```bash
npm run preview
```

## 🌐 Deployment Architecture

The application relies on specific SPA (Single Page Application) routing rules. When deploying to platforms like Netlify or Vercel, deep links (like `/contact`) will fail (404 Error) if the server isn't explicitly told to redirect traffic to the root index.

This repository fixes this via two files:
1. `public/_redirects`: Forces Netlify to redirect `/*` to `/index.html 200`
2. `netlify.toml`: Automates the `npm run build` trigger and explicitly publishes the `dist/` folder on every push to `main`.

---

> "Automating the boring. Scaling the important. Building cloud systems that scale reliably." 
> 
> — **Aditya Kumar Prasad**
