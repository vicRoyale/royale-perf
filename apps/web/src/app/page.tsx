royale-perf/
├─ .env.example
├─ docker-compose.yml
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
├─ tsconfig.base.json
├─ .eslintrc.cjs
├─ .prettierrc
├─ .husky/
│  └─ pre-commit
├─ prisma/
│  ├─ schema.prisma
│  ├─ seed.ts
│  └─ erd.mmd                 # Diagramme ERD (Mermaid)
├─ packages/
│  ├─ ui/
│  │  ├─ package.json
│  │  └─ src/
│  │     ├─ index.ts
│  │     ├─ components/
│  │     │  ├─ Card.tsx
│  │     │  ├─ KPI.tsx
│  │     │  ├─ DataTable.tsx
│  │     │  ├─ PageHeader.tsx
│  │     │  ├─ FiltersBar.tsx
│  │     │  ├─ ExportButtons.tsx
│  │     │  ├─ Toast.tsx
│  │     │  └─ Pill.tsx
│  │     └─ hooks/
│  │        └─ useToast.ts
│  └─ config/
│     ├─ package.json
│     └─ src/
│        ├─ env.ts
│        └─ constants.ts
├─ apps/
│  └─ web/
│     ├─ package.json
│     ├─ next.config.mjs
│     ├─ postcss.config.mjs
│     ├─ tailwind.config.ts
│     ├─ playwright.config.ts
│     ├─ vitest.config.ts
│     ├─ public/
│     │  ├─ logo.svg
│     │  └─ icons/*.svg
│     └─ src/
│        ├─ app/
│        │  ├─ globals.css
│        │  ├─ layout.tsx
│        │  ├─ page.tsx                     # Redirection vers /dashboard selon rôle
│        │  ├─ (auth)/login/page.tsx
│        │  ├─ (auth)/logout/route.ts
│        │  ├─ dashboard/agent/page.tsx
│        │  ├─ dashboard/manager/page.tsx
│        │  ├─ dashboard/admin/page.tsx
│        │  ├─ rapports/mensuel/route.ts    # PDF
│        │  ├─ api/
│        │  │  ├─ auth/[...nextauth]/route.ts
│        │  │  ├─ exports/csv/route.ts
│        │  │  ├─ exports/xlsx/route.ts
│        │  │  ├─ exports/pdf/route.ts
│        │  │  ├─ sse/stream/route.ts       # SSE
│        │  │  ├─ users/route.ts            # CRUD Users (Admin)
│        │  │  ├─ teams/route.ts            # CRUD Teams (Admin)
│        │  │  ├─ goals/route.ts            # CRUD Goals (Admin/Manager)
│        │  │  ├─ activities/route.ts       # CRUD + create déclenche SSE
│        │  │  ├─ leads/route.ts
│        │  │  ├─ mandates/route.ts
│        │  │  ├─ visits/route.ts
│        │  │  ├─ offers/route.ts
│        │  │  ├─ deals/route.ts
│        │  │  ├─ properties/route.ts
│        │  │  └─ audit-logs/route.ts
│        │  └─ privacy/page.tsx
│        ├─ components/
│        │  ├─ Sidebar.tsx
│        │  ├─ Topbar.tsx
│        │  ├─ DashboardKpis.tsx
│        │  ├─ Charts.tsx
│        │  ├─ Funnel.tsx
│        │  ├─ Heatmap.tsx
│        │  ├─ Pipeline.tsx
│        │  ├─ QuickActions.tsx
│        │  ├─ Filters.tsx
│        │  ├─ RBAC.tsx
│        │  └─ Notifications.tsx
│        ├─ lib/
│        │  ├─ prisma.ts
│        │  ├─ auth.ts
│        │  ├─ rbac.ts
│        │  ├─ zod-schemas.ts
│        │  ├─ sse.ts
│        │  └─ exports.ts
│        ├─ styles/
│        │  └─ theme.css
│        └─ tests/
│           ├─ unit/
│           │  ├─ zod.spec.ts
│           │  └─ kpi.spec.ts
│           ├─ api/
│           │  └─ activities.spec.ts
│           └─ e2e/
│              ├─ login.spec.ts
│              └─ dashboard-realtime.spec.ts
└─ README.md
