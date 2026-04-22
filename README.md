# Viet H Tran — Personal Portfolio

Personal website built with React. Dark & techy aesthetic. Live at [viethungtranwebdev.com](https://viethungtranwebdev.com)

---

## 📁 Project Structure

```
src/
├── App.js                     ← Root component (assembles all sections)
├── App.css                    ← Footer & main wrapper styles
├── index.js                   ← React entry point (don't edit)
├── index.css                  ← Global styles & CSS design tokens
├── data.js                    ← ✏️ YOUR CONTENT — edit this to update the site
│
├── hooks/
│   ├── useActiveSection.js    ← Detects which section is visible on screen
│   ├── useFadeUp.js           ← Scroll-triggered fade-up animations
│   ├── useScrollProgress.js   ← Drives the top scroll progress bar
│   └── useTypingEffect.js     ← Typing animation in the Hero section
│
├── utils/
│   ├── analytics.js           ← Google Analytics initialization
│   └── scrollTo.js            ← Smooth scroll to any section by id
│
└── components/
    ├── Background/            ← Decorative grid + glowing orbs
    ├── Nav/                   ← Fixed top navigation bar
    ├── Hero/                  ← Landing section (name, bio, CTAs, typing animation)
    ├── Skills/                ← Technical skills grid
    ├── Projects/              ← Project portfolio cards
    ├── Career/                ← Work timeline + education
    ├── Blog/                  ← Blog & Insights section with category filters
    ├── TechNews/              ← Live tech news feed from Hacker News API
    ├── Hobbies/               ← Personal hobbies cards
    ├── Contact/               ← Email + social links
    └── ResumeModal/           ← Resume overlay modal
```

---

## 🌐 Sections (in order)

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Name, bio, typing animation, resume CTA |
| 2 | **Skills & Tools** | Language, framework, cloud, and tool categories |
| 3 | **What I've Built** | Featured project cards with stack tags |
| 4 | **Work Experience** | Career timeline + education |
| 5 | **Blog & Insights** | Personal blog posts filterable by category |
| 6 | **Tech News** | Live feed from Hacker News API (Top / New / Best) |
| 7 | **Hobbies & Life** | Personal interests outside of work |
| 8 | **Contact** | Email, GitHub, LinkedIn links |

---

## ✏️ How to Update Your Content

**You only need to edit ONE file: `src/data.js`**

| What to change | Where in data.js |
|----------------|-----------------|
| Name, bio, location, email | Top-level fields |
| Add a new job | `career` array |
| Add a new project | `projects` array |
| Add a skill category | `skills` array |
| Add a blog post | `blog` array |
| Add/edit a hobby | `hobbies` array |
| Add your photo | Set `photo: "/profile.jpg"` and put the image in `/public` |
| Google Analytics | Set `analyticsId: "G-XXXXXXXXXX"` |

---

## 🔌 APIs & External Services

### Hacker News API (TechNews section)
- **No API key required** — completely free and open
- Fetches live stories from `https://hacker-news.firebaseio.com/v0/`
- Supports three feeds: Top Stories, New Stories, Best Stories
- Displays score, comment count, source domain, and time posted

---

## 🚀 Getting Started in VS Code

### Step 1 — Install Node.js
Download from https://nodejs.org (choose the LTS version)

### Step 2 — Open this folder in VS Code
```
File → Open Folder → select the viet-portfolio folder
```

### Step 3 — Open the VS Code terminal
```
Terminal → New Terminal  (or press Ctrl + `)
```

### Step 4 — Install dependencies
```bash
npm install
```

### Step 5 — Start the development server
```bash
npm start
```

Your site will open at **http://localhost:3000** in your browser.
Any changes you save in VS Code will instantly update in the browser.

---

## 🌐 Deploying to the Internet

This project auto-deploys on every `git push` (Vercel upstream already configured).

```bash
git add .
git commit -m "your message"
git push
```

### Manual deploy options

**Vercel (current setup)**
1. Push to GitHub — Vercel picks it up automatically
2. Live at your custom domain within ~1 minute

**Netlify**
1. Run `npm run build` — creates a `build/` folder
2. Drag and drop the `build/` folder at https://netlify.com

**GitHub Pages**
1. Install: `npm install gh-pages --save-dev`
2. Add to `package.json`:
   ```json
   "homepage": "https://vtrangithub.github.io/viet-portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Styling | Plain CSS with CSS variables (no Tailwind) |
| Animations | Custom `useFadeUp` hook + CSS transitions |
| Routing | Single-page app (no React Router) |
| Data | Static `data.js` — no database |
| News Feed | Hacker News Firebase REST API |
| Analytics | Google Analytics (GA4) |
| Deployment | Vercel |

---

## 🛠 Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** — React code shortcuts
- **Prettier** — auto-formats your code on save
- **Auto Rename Tag** — renames closing HTML/JSX tag automatically
- **GitLens** — better Git integration

---

## 📝 Changelog

| Date | Change |
|------|--------|
| Apr 2026 | Added TechNews section — live Hacker News feed with Top/New/Best filters |
| Apr 2026 | Fixed Blog category filter bug — cards now re-animate correctly on filter switch |
| Apr 2026 | Added `useScrollProgress` and `useTypingEffect` hooks |
| Apr 2026 | Added ResumeModal component |

---

Built with React · Deployed with Vercel
