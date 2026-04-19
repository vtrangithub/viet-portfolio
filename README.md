# Viet H Tran — Personal Portfolio

Personal website built with React. Dark & techy aesthetic.

---

## 📁 Project Structure

```
src/
├── App.js                     ← Root component (assembles all sections)
├── index.js                   ← React entry point (don't edit)
├── index.css                  ← Global styles & CSS design tokens
├── App.css                    ← Footer & main wrapper styles
├── data.js                    ← ✏️ YOUR CONTENT — edit this to update the site
│
├── hooks/
│   ├── useActiveSection.js    ← Detects which section is visible on screen
│   └── useFadeUp.js           ← Scroll-triggered fade-up animations
│
├── utils/
│   └── scrollTo.js            ← Smooth scroll to any section by id
│
└── components/
    ├── Background/            ← Decorative grid + glowing orbs
    ├── Nav/                   ← Fixed top navigation bar
    ├── Hero/                  ← Landing section (name, bio, CTAs)
    ├── Skills/                ← Technical skills grid
    ├── Projects/              ← Project portfolio cards
    ├── Career/                ← Work timeline + education
    ├── Hobbies/               ← Personal hobbies cards
    └── Contact/               ← Email + social links
```

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

## ✏️ How to Update Your Content

**You only need to edit ONE file: `src/data.js`**

- Change your bio, role, or location → update the fields at the top
- Add a new job → add an object to the `career` array
- Add a new project → add an object to the `projects` array
- Add a new skill category → add an object to the `skills` array

---

## 🌐 Deploying to the Internet

### Option A — Vercel (Recommended, free)
1. Push this project to a GitHub repository
2. Go to https://vercel.com and sign in with GitHub
3. Click "New Project" → import your repo
4. Click "Deploy" — done! Vercel gives you a free URL like `viet-portfolio.vercel.app`

### Option B — Netlify (Also free)
1. Run `npm run build` in your terminal — this creates a `build/` folder
2. Go to https://netlify.com
3. Drag and drop the `build/` folder onto the Netlify dashboard
4. Done! Netlify gives you a free URL

### Option C — GitHub Pages
1. Install the gh-pages package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Add to `package.json`:
   ```json
   "homepage": "https://vtrangithub.github.io/viet-portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run:
   ```bash
   npm run deploy
   ```

---

## 🛠 Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** — React code shortcuts
- **Prettier** — auto-formats your code on save
- **Auto Rename Tag** — renames closing HTML/JSX tag automatically
- **GitLens** — better Git integration

---

Built with React · Deployed with Vercel
