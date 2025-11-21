# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router project; primary routes and React components live in `app/`. `app/page.tsx` is the landing view; `app/quiz/page.tsx` is the quiz route scaffold.
- Shared layout and global styles: `app/layout.tsx` and `app/globals.css` (Tailwind 4 utility classes). Static assets: `public/`. Generated output: `.next/` (do not edit).
- Config and tooling: `next.config.ts`, `tsconfig.json` (strict mode with `@/*` path alias), `eslint.config.mjs`, `postcss.config.mjs`.

## Build, Test, and Development Commands
- `npm run dev` - start the local dev server at `http://localhost:3000`.
- `npm run lint` - run ESLint with the Next.js config; add `-- --fix` to auto-format minor issues.
- `npm run build` - production build to `.next/`.
- `npm run start` - serve the production build (run `npm run build` first).

## Coding Style & Naming Conventions
- TypeScript-first; keep `strict`-mode types and avoid `any`. Prefer function components and hooks.
- Indentation: 2 spaces; keep imports sorted by library -> local. Name route segment folders in `app/` with kebab-case; name exported React components in PascalCase. `@/*` alias is available for root-relative imports.
- Styling via Tailwind utility classes in TSX; add shared styles in `app/globals.css` when utilities cannot express them.

## Testing Guidelines
- No automated test suite is defined yet; rely on `npm run lint` before committing. When adding tests, align names with the file under test (e.g., `app/quiz/__tests__/page.test.tsx`). Aim for meaningful coverage of UI states and data branches.

## Commit & Pull Request Guidelines
- Use short, imperative commit messages (e.g., `feat: add quiz layout`, `chore: tighten lint`).
- Open PRs with a clear summary, linked issue (if any), and screenshots or GIFs for UI changes. Note how you verified the change (lint/build/dev run) and call out any known follow-ups.

## Security & Configuration Tips
- Keep secrets in `.env.local`; never commit environment files. Document required env keys in the PR if you add new ones.
- Validate that `npm run build` passes before deployment; it will surface missing env vars and route errors early.


