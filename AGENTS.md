# AGENTS.md

Guide for AI coding agents working in this repository.

## Important Rules

- **NEVER perform git operations** (no `git add`, `git commit`, `git push`, `git stash`, etc.)

## Project Overview

Personal portfolio site built with **Astro 4**, **SolidJS**, **Tailwind CSS 4**, and **MDX/Markdown**.
Package manager is **Bun**. No backend — static site with GitHub API data fetched at build time via urql/GraphQL.

## Build / Dev Commands

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `bun run dev`     | Start Astro dev server                |
| `bun run build`   | Type-check (`astro check`) then build |
| `bun run preview` | Preview the production build locally  |
| `bun run format`  | Format all source files with Prettier |

There is **no test framework** and no test scripts. To verify changes, run:

```sh
bun run build
```

This runs `astro check` (TypeScript diagnostics) followed by `astro build`.

## Project Structure

```
src/
├── components/        # SolidJS (.tsx) and Astro (.astro) components
├── content.config.ts  # Astro content collection definitions (zod schemas)
├── env.d.ts           # Astro type references
├── img/               # Image assets (imported in components)
├── layouts/           # Astro layout components
├── pages/             # Routes — .astro, .mdx, .md files
│   └── article/       # Blog posts in Markdown
└── styles/
    └── global.css     # Tailwind 4 config, theme, and global styles
```

Other key files:

- `astro.config.ts` — Astro config with SolidJS, Sitemap, MDX integrations
- `remark-mermaid.js` — Custom remark plugin for mermaid diagrams
- `remark-reading-time.js` — Custom remark plugin for reading time estimates
- `tsconfig.json` — ESNext target, SolidJS JSX, nodenext modules

## Code Style

### Formatting (Prettier)

Configured in `.prettierrc`. Run `bun run format` to apply.

- **Double quotes** — not single quotes
- **Trailing commas** everywhere (`"trailingComma": "all"`)
- **Spaces** for indentation (no tabs)
- **No parens** on single-param arrow functions (`x => x`, not `(x) => x`)
- Prettier plugins handle Astro file formatting and Tailwind class sorting

### TypeScript

- Target: ESNext, module resolution: nodenext
- JSX configured for **SolidJS** (`jsxImportSource: "solid-js"`)
- Strict mode is not explicitly enabled — follow existing conventions
- Use `type` keyword for type definitions (not `interface`)
- Prefer inline types in function signatures over separate type declarations

### Imports

- Named imports from packages: `import { createClient } from "@urql/core";`
- Relative paths with `../` — no path aliases are configured
- Default imports for images: `import photo from "../img/photo.png";`
- Astro built-ins: `import { Image } from "astro:assets";`
- Astro components: `import MainHead from "../components/MainHead.astro";`

### Naming Conventions

| Thing              | Convention | Example                          |
| ------------------ | ---------- | -------------------------------- |
| SolidJS components | PascalCase | `function ExternalLink() {}`     |
| `.tsx` files       | lowercase  | `footer.tsx`, `link.tsx`         |
| `.astro` files     | PascalCase | `MainHead.astro`                 |
| Variables / data   | camelCase  | `const spotlight = [...]`        |
| Types              | PascalCase | `type Props = { title: string }` |

### Component Patterns

**SolidJS components (`.tsx`)**:

- Functional components with explicit `props` parameter (do NOT destructure props — this breaks SolidJS reactivity)
- Props typed inline: `function Header(props: { title: string }) { ... }`
- Named exports: `export function Footer() { ... }`
- Conditional rendering with ternary: `{props.subTitle ? <div>...</div> : null}`

**Astro components (`.astro`)**:

- Server-side logic in frontmatter (`---` block)
- Access props via `Astro.props`
- Content collections use `defineCollection` with zod schemas
- View Transitions enabled via `<ViewTransitions />`

### Styling

- **Tailwind CSS 4** — configured entirely in `src/styles/global.css` (no `tailwind.config.*` or `postcss.config.*` files)
- Theme uses **Catppuccin** color palette via `@catppuccin/tailwindcss`
  - Light theme: `.latte` class on `<html>`
  - Dark theme: `.mocha` class on `<html>`
  - Dark mode variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Semantic color tokens defined in `@theme` block: `background`, `foreground`, `muted`, `primary`, `secondary`, `accent`, `card`, `border`, `ring`
- Font: **JetBrains Mono** for both sans and mono via `@fontsource/jetbrains-mono`
- Typography plugin: `@tailwindcss/typography` loaded via `@plugin` directive
- Tailwind classes applied inline on elements

### Error Handling

- Simple try/catch with `console.error(e)` for API calls
- No error boundaries — this is a static site with minimal runtime logic

## Integrations

- **@astrojs/solid-js** — SolidJS islands for interactive components
- **@astrojs/sitemap** — Auto-generated sitemap
- **@astrojs/mdx** — MDX support for rich content pages
- **@urql/core + graphql** — GitHub GraphQL API queries at build time
- **beautiful-mermaid** — Diagram rendering in blog articles (via custom remark plugin)
- **reading-time** — Reading time estimates (via custom remark plugin)

## Common Tasks

### Adding a blog post

Create a new `.md` file in `src/pages/article/` with appropriate frontmatter.

### Adding a new component

- Interactive components: create a `.tsx` file in `src/components/` using SolidJS patterns
- Static components: create a `.astro` file in `src/components/`

### Verifying changes

Always run `bun run build` — it will catch TypeScript errors and build failures.
Run `bun run format` to ensure consistent formatting.
