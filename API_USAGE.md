# API Client Setup

This project uses [Orval](https://orval.dev/) to generate TypeScript API client from OpenAPI schema.

## Setup

### 1. Install dependencies

```bash
yarn install
```

### 2. Configure environment variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Generate API client

```bash
yarn generate:api
```

This will generate API client code in `lib/api/generated/` based on the OpenAPI schema from `http://localhost:8000/openapi.json`.

## Usage

### React Query Integration

The generated API client uses React Query for data fetching. First, wrap your app with `QueryProvider`:

```tsx
// app/layout.tsx
import QueryProvider from "@/components/providers/query-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

### Example: Fetch data

```tsx
import { useGetCategoriesApiV1CategoriesGet } from "@/lib/api";

function CategoriesPage() {
  const { data, isLoading, error } = useGetCategoriesApiV1CategoriesGet();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((category) => <div key={category.id}>{category.name}</div>)}
    </div>
  );
}
```

### Example: Mutations

```tsx
import { useCreateCategoryApiV1CategoriesPost } from "@/lib/api";

function CreateCategoryForm() {
  const { mutate, isPending } = useCreateCategoryApiV1CategoriesPost();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        data: {
          name: "Food",
          type: "EXPENSE",
        },
      },
      {
        onSuccess: (data) => {
          console.log("Category created:", data);
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isPending}>
        Create Category
      </button>
    </form>
  );
}
```

### Example: Authentication

```tsx
import { useLoginApiV1AuthLoginPost } from '@/lib/api';

function LoginForm() {
  const { mutate, isPending } = useLoginApiV1AuthLoginPost();

  const handleLogin = (email: string, password: string) => {
    mutate(
      {
        data: {
          email,
          password,
        },
      },
      {
        onSuccess: (data) => {
          // Save token to localStorage
          localStorage.setItem('access_token', data.access_token);
          // Redirect or update UI
        },
      }
    );
  };

  return (
    // Your form JSX
  );
}
```

## API Structure

The generated API is organized by tags:

- `lib/api/generated/auth/` - Authentication endpoints
- `lib/api/generated/transactions/` - Transaction endpoints
- `lib/api/generated/budgets/` - Budget endpoints
- `lib/api/generated/analytics/` - Analytics endpoints
- `lib/api/generated/recurring-transactions/` - Recurring transaction endpoints
- `lib/api/generated/model/` - TypeScript types/interfaces

## Available APIs

### Auth

- `useRegisterApiV1AuthRegisterPost` - Register new user
- `useLoginApiV1AuthLoginPost` - Login user
- `useGetCurrentUserInfoApiV1AuthMeGet` - Get current user info
- `useGetWalletsApiV1WalletsGet` - Get all wallets
- `useCreateWalletApiV1WalletsPost` - Create wallet
- `useGetWalletApiV1WalletsWalletIdGet` - Get wallet by ID
- `useUpdateWalletApiV1WalletsWalletIdPatch` - Update wallet
- `useDeleteWalletApiV1WalletsWalletIdDelete` - Delete wallet

### Transactions

- `useGetCategoriesApiV1CategoriesGet` - Get all categories
- `useCreateCategoryApiV1CategoriesPost` - Create category
- `useGetDailyTransactionsApiV1TransactionsDailyGet` - Get daily transactions
- `useGetWeeklyTransactionsApiV1TransactionsWeeklyGet` - Get weekly transactions
- `useGetMonthlyTransactionsApiV1TransactionsMonthlyGet` - Get monthly transactions
- `useGetTransactionsApiV1TransactionsGet` - Get transactions with filters
- `useCreateTransactionApiV1TransactionsPost` - Create transaction
- `useGetTransactionApiV1TransactionsTransactionIdGet` - Get transaction by ID
- `useUpdateTransactionApiV1TransactionsTransactionIdPatch` - Update transaction
- `useDeleteTransactionApiV1TransactionsTransactionIdDelete` - Delete transaction

### Budgets

- `useGetBudgetsApiV1BudgetsGet` - Get all budgets
- `useCreateBudgetApiV1BudgetsPost` - Create budget
- `useGetBudgetSummaryApiV1BudgetsSummaryGet` - Get budget summary
- `useGetBudgetApiV1BudgetsBudgetIdGet` - Get budget by ID
- `useUpdateBudgetApiV1BudgetsBudgetIdPatch` - Update budget
- `useDeleteBudgetApiV1BudgetsBudgetIdDelete` - Delete budget

### Analytics

- `useGetSpendingByCategoryApiV1AnalyticsSpendingByCategoryGet` - Get spending by category
- `useGetSpendingTrendApiV1AnalyticsSpendingTrendGet` - Get spending trend
- `useGetTopCategoriesApiV1AnalyticsTopCategoriesGet` - Get top categories
- `useExportTransactionsCsvApiV1ReportsTransactionsCsvGet` - Export transactions as CSV
- `useExportTransactionsPdfApiV1ReportsTransactionsPdfGet` - Export transactions as PDF

### Recurring Transactions

- `useGetRecurringTransactionsApiV1RecurringTransactionsGet` - Get all recurring transactions
- `useCreateRecurringTransactionApiV1RecurringTransactionsPost` - Create recurring transaction
- `useGetRecurringTransactionApiV1RecurringTransactionsRecurringIdGet` - Get recurring transaction by ID
- `useUpdateRecurringTransactionApiV1RecurringTransactionsRecurringIdPatch` - Update recurring transaction
- `useDeleteRecurringTransactionApiV1RecurringTransactionsRecurringIdDelete` - Delete recurring transaction
- `useExecuteRecurringTransactionApiV1RecurringTransactionsRecurringIdExecutePost` - Execute recurring transaction

## Authentication

The API client automatically includes the Bearer token from localStorage in all requests.

To set the token after login:

```tsx
localStorage.setItem("access_token", token);
```

To logout:

```tsx
localStorage.removeItem("access_token");
```

## Regenerate API

Whenever the backend API changes, run:

```bash
yarn generate:api
```

This will fetch the latest OpenAPI schema and regenerate all API client code.

## Configuration

Edit `orval.config.ts` to customize the code generation:

- Change output directory
- Modify client type (react-query, axios, etc.)
- Add custom headers
- Configure mock data
- And more...

See [Orval documentation](https://orval.dev/) for more options.
