# Helix Craftworks Site

A Vite + React + Tailwind one-page site for Helix Craftworks (hidden doors, built-ins, finish carpentry), wired for Netlify Forms.

## Prerequisites
- Node.js 18+

## Setup
```bash
npm install
```

## Development
```bash
npm run dev
```
Open the URL shown by Vite (default http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Netlify Forms
The contact form in `src/App.tsx` posts with `data-netlify="true"`, `form-name`, and a honeypot `bot-field`, with client-side success/error states. A hidden detection form in `index.html` ensures Netlify registers the schema at build time. Deploy to Netlify and submissions will land in Forms. For reCAPTCHA, add `data-netlify-recaptcha="true"` to the form.

## Customization
- Palette comes from the brand guide: Charcoal Black `#1E1E1E`, Redwood Stain `#7B3F00`, Steel Gray `#7A7A7A`, Canvas White `#F9F9F9`.
- Typography: Montserrat for headings (`font-display`), Lato for body (`font-sans`).
- Swap copy and highlights in `src/App.tsx` to match current offerings.
- Favicons are sourced from `/Assets/favicon`; add additional assets to `/public` or import in components as needed.
