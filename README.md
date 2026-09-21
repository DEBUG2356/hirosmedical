# Hírös Medical Center – weboldal

Gyógytorna, modern fizikoterápia, masszázs és kiscsoportos mozgásórák Kecskeméten. Egyoldalas,
animált bemutatkozó oldal a Facebook-oldal tartalmából, a „Senior torna" plakát arculatával
(navy + zöld, Montserrat display, kézírásos kiemelés).

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (`app/globals.css` – `@theme` tokenek, `@layer components`)
- `motion` (Framer Motion) – reveal, split-line címek, sticky spotlight, számlálók, lightbox
- `lenis` – sima görgetés
- `sharp` – képoptimalizálás (`scripts/prep-images.mjs`)

## Futtatás

```bash
npm install
npm run dev      # http://localhost:3231
npm run build
```

## Struktúra

- `lib/site.ts` – **minden szöveg és adat** (cég, szolgáltatások, kezelések, órarend, statisztikák)
- `lib/images.ts` – generált képmetaadat (ne szerkeszd kézzel)
- `components/` – szekciók sorrendben: `Hero`, `Marquee`, `BodyMap` (panaszok), `Services`,
  `Treatments` (sticky spotlight), `Classes` (órarend + plakát-kártyák), `About`, `Quote`,
  `Gallery`, `Contact`, valamint `Header`, `Footer`, `Preloader`, `Lightbox`, `motion.tsx` (segédek)
- `public/img/` – optimalizált webp-k; `logo.png` a Facebook-logóból fehér-kulcsolt PNG
- `source-assets/` – eredeti FB-képek és bejegyzés-szövegek (gitignore-olva)
- `CEGADATOK.md` – forrásjegyzék és egyeztetendő adatok

## Képek frissítése

Új forráskép: tedd a `source-assets/fb/` mappába `NNN_0_<fbid>.jpg` néven, vedd fel a
`scripts/prep-images.mjs` megfelelő listájába, majd:

```bash
node scripts/prep-images.mjs
```

Ha egy meglévő nevű képet cserélsz, nevezd át – a Next image-cache makacsul a régit mutatja.
