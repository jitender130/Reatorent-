# DineCraft - Luxury Restaurant Demo & Online Suite (Pure Frontend)

Yeh ek **100% Pure Frontend** (React + TypeScript + Vite + Tailwind CSS) restaurant web application hai. Isme kisi backend server ya external database ki jarurat nahi hai. Aap ise direct **GitHub**, **GitHub Pages**, **Vercel**, ya **Netlify** par bina kisi error ke publish kar sakte hain.

---

## 🚀 GitHub Pages par Deploy Kaise Karein (2 Minutes Setup)

Humne is repo me automatic **GitHub Actions Workflow** (`.github/workflows/deploy.yml`) aur `vite.config.ts` me `base: './'` configure kar diya hai.

### Steps:
1. Is code ko apne GitHub account par push karein (`git push origin main`).
2. Apne GitHub repository me jayein aur **Settings** tab par click karein.
3. Left menu me **Pages** par click karein.
4. **Build and deployment > Source** dropdown me **"GitHub Actions"** select karein.
5. Bas! GitHub automatically website build karke aapko live URL de dega (e.g. `https://<username>.github.io/<repo-name>/`).

---

## ⚡ Vercel / Netlify par 1-Click Deploy:
1. [Vercel](https://vercel.com) ya [Netlify](https://netlify.com) par login karein.
2. "Import Repository" select karein.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy** — website 30 seconds me live ho jayegi!

---

## 💻 Local System par Run Kaise Karein:

```bash
# 1. Dependencies install karein
npm install

# 2. Local development server start karein
npm run dev

# 3. Static production build banane ke liye (dist folder generate hoga)
npm run build

# 4. Built production site preview karne ke liye
npm run preview
```

---

## ✨ Features Included:
- **100% Client-Side Pure Frontend** (Zero backend dependency).
- **Direct WhatsApp Ordering & Reservations** (Direct kitchen order formatting).
- **4 Instant Cuisine Presets** (Mughlai/Indian, Italian, Pure Veg, Grills/Bistro).
- **"Customize for Client" Live Tool** (Prospect ke samne unka restaurant name daalne ke liye).
- **Printable Table QR Standee Preview** (Table dining menu generator).
- **Real Food Photography** with resilient Zero-Broken-Image fallback.
