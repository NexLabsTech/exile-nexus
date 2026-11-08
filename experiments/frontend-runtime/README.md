# EXN-M01-WO-001 — Synthetic runtime build probes

These throwaway candidates are intentionally **not** the Exile Nexus app.
They render one original static heading plus one equivalent React counter.
No game assets, APIs, authentication, third-party telemetry or real data.

- `astro/`: Astro 7.4.7, @astrojs/react 7.1.4, React 19.3.1.
- `vite/`: Vite 8.3.6, React 19.3.1.
- Astro uses TypeScript 6.0.2 (required by `@astrojs/check@0.9.12` peer range); Vite uses TypeScript 7.0.2. Both use strict typechecking, Node 22 and `dist/`.
- Benchmark: `.github/workflows/runtime-adr-benchmark.yml` on PRs.
- Direct package versions are exact. Transitive dependencies are resolved
  by a temporary npm lock per CI job. A production lockfile MUST be committed
  by the later implementation Work Order. Do not treat this as reproducible
  production code or a fixed benchmark baseline.
- No server Functions or deployment is created. Cloudflare compatibility
  in this WO is an official static-build documentation review only.

Commands per candidate:
```sh
npm install --package-lock-only --no-audit --no-fund
npm ci --no-audit --no-fund
npm run check
npm run build
```
