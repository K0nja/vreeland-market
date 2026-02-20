# Vreeland Market Website

Modern React site for Vreeland Market — Woodhaven, Michigan.

## Tech Stack

- **React 18** with Vite
- **React Router v6** for client-side routing
- **CSS Modules** for scoped, component-level styles
- **localStorage** for admin hero persistence

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

Output goes to `/dist` — upload this folder to your hosting provider.

---

## Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Routes + layout shell
├── styles/
│   └── globals.css       # CSS variables, resets, shared utilities
├── components/
│   ├── Nav.jsx / .module.css
│   ├── Footer.jsx / .module.css
│   ├── Section.jsx / .module.css   # Reusable section wrapper + labels
│   └── AdminModal.jsx / .module.css
├── pages/
│   ├── HomePage.jsx / .module.css
│   ├── HistoryPage.jsx / .module.css
│   ├── OrderPage.jsx / .module.css
│   ├── CateringPage.jsx / .module.css
│   ├── DonnyPage.jsx / .module.css
│   └── ContactPage.jsx / .module.css
└── data/
    ├── navItems.js       # Nav links
    ├── features.js       # Home page feature cards
    ├── cateringMenu.js   # Catering categories + items
    └── timeline.js       # History page timeline
```

---

## Things to Update Before Going Live

### 1. Toast URL (`src/pages/OrderPage.jsx`)
```js
const TOAST_URL = 'YOUR_TOAST_URL_HERE'
```
Replace with your actual Toast ordering page URL.

### 2. Admin Password (`src/pages/HomePage.jsx`)
```js
const ADMIN_PASSWORD = 'vreeland2024'
```
Change this to something private before deploying.

### 3. Catering Menu Prices (`src/data/cateringMenu.js`)
Update prices and items to match your actual menu.

### 4. History Details (`src/data/timeline.js`)
Fill in real founding dates and family story details.

---

## Admin Panel

The floating **🛠 Admin** button (bottom-right of home page) lets an admin update:
- Seasonal banner text (show/hide)
- Hero headline and subheading
- Callout bar (e.g. "Holiday Hours in Effect")

Changes are saved to `localStorage` and persist between sessions.

---

## Hosting on GitHub Pages

### First time setup

**1. Create a GitHub account** at https://github.com if you don't have one.

**2. Create a new repository**
- Go to https://github.com/new
- Name it `vreeland-market` (or whatever you like)
- Set it to **Public**
- Click **Create repository**

**3. Open a terminal in this project folder, then run:**
```bash
npm install
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vreeland-market.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username)*

**4. Deploy to GitHub Pages:**
```bash
npm run deploy
```

**5. Enable GitHub Pages**
- Go to your repo on GitHub
- Click **Settings** → **Pages** (left sidebar)
- Under "Branch", select `gh-pages` → `/ (root)`
- Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/vreeland-market/
```
It may take 1–2 minutes to go live the first time.

### Updating the site later
Any time you make changes, just run:
```bash
npm run deploy
```
That's it — it rebuilds and republishes automatically.
