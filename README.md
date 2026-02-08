# Portfolio (Vite + React + TypeScript)

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview build output:

```bash
npm run preview
```

## GitHub Pages Deployment

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

### User Page

If your repo is `YOUR_GITHUB_USERNAME.github.io`, keep `base: "/"` in `vite.config.ts`.

### Project Page

If your repo is `portfolio`, set `base: "/portfolio/"` in `vite.config.ts` before deploying.

## Notes

- Edit content in `src/data.ts` to update projects, skills, and experience.
- Replace placeholders in `src/App.tsx` (name, title, links) and adjust styling in `src/styles/index.css`.
