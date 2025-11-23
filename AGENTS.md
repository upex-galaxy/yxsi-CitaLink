# Repository Guidelines

## Project Structure & Module Organization
- Frontend lives under `src/app` (App Router). Key routes: `page.tsx` (login), `dashboard`, and `citas`.
- Shared UI sits in `src/components` (`ui` shadcn-derived primitives, `layout` wrappers, `theme-provider.tsx`), helpers in `src/lib`, and reusable hooks in `src/hooks`.
- Static assets (logos, favicons) go in `public/`; docs and workflow notes live in `docs/` (see `GITFLOW.md`, `AMBIENTES.md`).
- Automation utilities are in `scripts/` (`mcp-builder`, prompt updater). Templates for prompts live in `templates/`.

## Build, Test, and Development Commands
- `pnpm dev`: run the Next.js dev server on `localhost:3000`.
- `pnpm build`: production build; fail-fast on type errors and lint issues.
- `pnpm start`: serve the built app.
- `pnpm lint`: Next.js ESLint suite (TypeScript, React, Tailwind class order).
- `pnpm ai` / `pnpm up:prompt`: regenerate MCP config and refresh prompt templates.
- Copy `.env.example` to `.env.local` and fill required keys before running builds.

## Coding Style & Naming Conventions
- Language: TypeScript with React Server/Client Components. Prefer `camelCase` for variables/functions, `PascalCase` for components, `kebab-case` for route segments and file slugs.
- Styling: Tailwind-first; group class lists by layout/spacing/typography/state. Theme tokens live in `tailwind.config.ts`.
- Formatting: rely on `pnpm lint` (Next + ESLint). Use 2-space indent, double quotes, and keep imports ordered (third-party → aliases → relative).

## Testing Guidelines
- No formal suite is present yet. When adding tests, colocate `*.test.ts(x)` near components or under `src/__tests__/`.
- Favor React Testing Library for components and lightweight integration checks; add Playwright for key user flows if warranted.
- Gate merges with lint + tests; document any temporary skips in PR descriptions.

## Commit & Pull Request Guidelines
- Branching follows `docs/GITFLOW.md`: work on `feature/<task-name>` from `staging`; merge back via PRs (staging → main for releases).
- Use conventional commit prefixes (`feat`, `fix`, `refactor`, `docs`, `test`). Example: `feat: integrate toast notifications`.
- PRs should include: summary, linked issue/ticket, screenshots or GIFs for UI changes, and notes on testing run (`pnpm lint`, planned tests).
- Keep commits scoped (one concern per commit) and avoid mixing refactors with behavioral changes in the same commit.

## Security & Configuration Tips
- Never commit secrets; `.env.local` stays local. Use `.env.example` to advertise required keys.
- Validate any third-party library additions with team before install; keep dependencies minimal to reduce bundle size.
- When adding assets, place them in `public/` and reference with absolute URLs (e.g., `/logo-CitaLink.png`) to keep path consistency.
