# khb

Weekend project. A one-page site for buying houses in Texas for cash.

## Run it

```bash
npm install
npm run dev      # local preview
npm run build    # production build -> dist/
```

## Deploy

Static site — the `dist/` folder deploys as-is (Cloudflare Pages preset:
build command `npm run build`, output directory `dist`).

## Before launch

- `src/config.ts` — paste the Formspree form ID (the lead form won't
  submit without it), plus the business phone and email when they exist.
