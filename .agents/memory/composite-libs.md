---
name: Composite libs in this pnpm monorepo
description: Why a new lib/* package fails a consuming artifact's typecheck, and the two-part fix.
---

# Adding a lib/* package that an artifact imports

When an `artifacts/*` package imports a `lib/*` package, two things must be true or the artifact's `tsc --noEmit` fails with "Cannot find module 'react'/'@uppy/...'" errors pointing *inside the lib source*:

1. **The lib must be a composite, referenced project.** Set `composite: true`, `declarationMap: true`, `emitDeclarationOnly: true` in its `tsconfig.json`; add it to the root `tsconfig.json` `references`; add it to the consuming artifact's `tsconfig.json` `references`. Mirror `lib/api-client-react` as the reference pattern. Then `pnpm run typecheck:libs` builds its `.d.ts` into `dist/`.

**Why:** Without composite+references, the consuming artifact's tsc pulls the lib's raw source into its own program and tries to resolve the lib's peer/deps (react, @uppy) from the *artifact's* dependency context, where they aren't installed. As a referenced project the lib is built separately in its own context (where its deps resolve) and the artifact consumes only the emitted `.d.ts`.

2. **Run `pnpm install` after adding a lib's deps.** A lib copied from a template can have deps in its `package.json` but no `node_modules` linked. Symptom: `typecheck:libs` fails resolving the lib's *own* declared deps even after the composite config is right. `pnpm install` links them.

**How to apply:** Do both whenever introducing a new lib into the build graph, before trusting any typecheck result.
