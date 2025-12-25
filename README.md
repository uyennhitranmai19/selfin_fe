# ExpenseTracker - Personal Finance Management App

Ứng dụng quản lý tài chính cá nhân được xây dựng với Next.js và HeroUI.

## Tech Stack

### Frontend Framework

- **Next.js 16.0.7** - React framework với App Router và Turbopack
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe development

### UI & Styling

- **HeroUI v2** - Component library (full suite: Button, Card, Modal, Table, Select, Input, etc.)
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion 11.18.2** - Animation library
- **next-themes 0.4.6** - Dark mode support

### State Management & Data Fetching

- **@tanstack/react-query v5.90.11** - Server state management
- **@tanstack/react-query-devtools** - Query debugging tools
- **React Context API** - Authentication state management

### Form Handling & Validation

- **React Hook Form 7.66.0** - Form state management
- **Zod 4.1.12** - Schema validation
- **@hookform/resolvers** - Form validation integration

### API Integration

- **Orval 7.17.0** - OpenAPI code generator
- **Axios 1.13.2** - HTTP client
- **Custom Axios Instance** - Authentication interceptor with token management

### Authentication

- **Next-Auth v5.0.0-beta.30** - Authentication framework
- **@auth/prisma-adapter** - Database adapter for auth
- **bcryptjs** - Password hashing
- **JWT Tokens** - Stored in localStorage for session persistence

### Utilities & Additional Libraries

- **date-fns 4.1.0** - Date manipulation
- **recharts 3.4.1** - Charts and data visualization
- **jspdf 3.0.3** - PDF generation
- **csv-stringify 6.6.0** - CSV export functionality
- **clsx 2.1.1** - Conditional className utility

### Development Tools

- **ESLint** - Code linting with Next.js, React, TypeScript configs
- **Prettier** - Code formatting
- **@typescript-eslint** - TypeScript linting rules

## API Architecture

### Backend Integration

- **API Base URL**: `https://api-sit.jupiterpro.online/api/selfin`
- **OpenAPI Specification**: Auto-generated from `/api/selfin/openapi.json`
- **Code Generation**:
  - Command: `yarn generate:api`
  - Output: `lib/api/generated/` (hooks and models)
  - Client: React Query hooks with TypeScript types
  - Pattern: `useGetTransactionsV1TransactionsGet`, `useCreateBudgetV1BudgetsPost`, etc.

### Custom API Client

- **File**: `lib/api/client.ts`
- **Features**:
  - Automatic JWT token injection from localStorage
  - URL normalization (strips duplicate `/api` prefix)
  - Custom Axios instance as mutator for Orval

## Project Structure

```
web/expenseTracker/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages group
│   │   ├── signin/               # Login page
│   │   └── register/             # Registration page
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Dashboard home
│   │   ├── transactions/         # Transaction management
│   │   ├── budgets/              # Budget management
│   │   ├── wallets/              # Wallet management
│   │   ├── categories/           # Category management
│   │   └── recurring/            # Recurring transactions
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   └── providers.tsx             # App providers wrapper
├── components/                   # Reusable components
│   ├── navbar.tsx                # Navigation bar (with auth state)
│   ├── logo.tsx                  # Logo component
│   ├── theme-switch.tsx          # Dark mode toggle
│   └── auth-loading.tsx          # Auth loading spinner
├── contexts/                     # React Context providers
│   └── AuthContext.tsx           # Authentication state & route protection
├── lib/                          # Libraries and utilities
│   └── api/                      # API integration
│       ├── client.ts             # Custom Axios instance
│       ├── generated/            # Orval generated code
│       └── index.ts              # API exports
├── config/                       # Configuration files
│   └── site.ts                   # Site configuration
├── orval.config.ts               # Orval code generator config
├── tailwind.config.js            # Tailwind CSS config
└── tsconfig.json                 # TypeScript config
```

## Key Features Implemented

### Authentication System

- **Client-side auth state** with React Context
- **Protected routes** - Auto-redirect based on auth status
- **Session persistence** - Token stored in localStorage
- **Login/Logout flow** - Integrated with backend API

### UI/UX

- **Responsive design** - Mobile-friendly layouts
- **Dark mode support** - Theme switcher
- **Loading states** - Spinners and skeletons
- **Form validation** - Real-time validation with Zod
- **Toast notifications** - Success/error feedback

### Dashboard Features

- **Transaction management** - CRUD operations with filters
- **Budget tracking** - Create, edit, monitor budgets
- **Wallet management** - Multiple wallet support
- **Category organization** - Custom categories with icons
- **Analytics** - Charts and visualizations (Recharts)

### Developer Experience

- **Type safety** - Full TypeScript coverage
- **Auto-generated API** - Single command to update from OpenAPI spec
- **Hot reload** - Turbopack for fast development
- **ESLint + Prettier** - Consistent code style

## Environment Setup

### Prerequisites

- Node.js 20+
- Yarn package manager

### Installation

```bash
yarn install
```

### Development

```bash
# Start dev server with Turbopack
yarn dev

# Generate API client from OpenAPI spec
yarn generate:api

# Build for production
yarn build

# Start production server
yarn start

# Lint code
yarn lint
```

## Configuration

### API Configuration

Edit `orval.config.ts` to update API endpoint:

```typescript
target: "https://api-sit.jupiterpro.online/api/selfin/openapi.json";
```

### Theme Configuration

Customize colors and theme in `tailwind.config.js`:

- Primary colors: Sky blue palette (#0ea5e9)
- Dark mode: Automatic with next-themes
- HeroUI theme overrides available

## Authentication Flow

1. User visits protected route (`/dashboard/*`)
2. AuthContext checks localStorage for `access_token`
3. If no token → redirect to `/auth/signin`
4. User logs in → token saved → redirect to `/dashboard`
5. On page reload → token re-validated → auth state maintained
6. Logout → token cleared → redirect to `/auth/signin`

## API Request Flow

1. Component uses generated hook (e.g., `useGetWalletsV1WalletsGet()`)
2. React Query manages cache and request state
3. Custom Axios client intercepts request
4. Token from localStorage injected as Bearer header
5. URL normalized (duplicate `/api` stripped)
6. Response returned to component
7. React Query updates cache

## Build Information

- **Build Command**: `yarn build`
- **Output**: `.next/` directory
- **Deployment**: Static or SSR (Next.js supports both)
- **Environment**: Production optimizations enabled

## License

Licensed under the [MIT license](https://github.com/heroui-inc/next-app-template/blob/main/LICENSE).
