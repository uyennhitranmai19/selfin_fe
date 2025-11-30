# Thiết lập API Client - Tổng kết

## ✅ Đã hoàn thành

### 1. Cài đặt Dependencies

- ✅ Orval - Code generator từ OpenAPI schema
- ✅ Axios - HTTP client
- ✅ @tanstack/react-query - Data fetching và caching
- ✅ @tanstack/react-query-devtools - DevTools cho React Query

### 2. Cấu hình Orval

- ✅ Tạo file `orval.config.ts` với cấu hình:
  - Input: `http://localhost:8000/openapi.json`
  - Output: `lib/api/generated`
  - Client: react-query
  - Mode: tags-split (chia theo tags)
  - Custom mutator: `lib/api/client.ts`

### 3. Custom API Client

- ✅ Tạo `lib/api/client.ts` với:
  - Axios instance với baseURL
  - Request interceptor để tự động thêm Bearer token
  - Response interceptor để xử lý lỗi 401 (unauthorized)

### 4. React Query Provider

- ✅ Tạo `QueryProvider` component
- ✅ Tích hợp vào `app/providers.tsx`
- ✅ Cấu hình default options (staleTime, retry, etc.)

### 5. Environment Variables

- ✅ Tạo `.env.local` với `NEXT_PUBLIC_API_URL`
- ✅ Cập nhật `.gitignore` để ignore generated files

### 6. TypeScript Configuration

- ✅ Cập nhật `tsconfig.json` target từ ES5 lên ES2017

### 7. Package Scripts

- ✅ Thêm script `generate:api` vào `package.json`

### 8. Documentation

- ✅ Tạo `API_USAGE.md` với hướng dẫn chi tiết
- ✅ Tạo example components

## 📁 Cấu trúc Files đã tạo

```
├── orval.config.ts                    # Cấu hình Orval
├── .env.local                         # Environment variables
├── API_USAGE.md                       # Hướng dẫn sử dụng API
├── lib/
│   └── api/
│       ├── client.ts                  # Custom Axios instance
│       ├── index.ts                   # Export tất cả APIs
│       └── generated/                 # Auto-generated (git ignored)
│           ├── auth/
│           ├── transactions/
│           ├── budgets/
│           ├── analytics/
│           ├── recurring-transactions/
│           └── model/
├── components/
│   ├── providers/
│   │   └── query-provider.tsx         # React Query Provider
│   └── examples/
│       ├── categories-example.tsx     # Example: Query
│       └── create-category-example.tsx # Example: Mutation
```

## 🚀 Cách sử dụng

### 1. Generate API Client

```bash
yarn generate:api
```

### 2. Import và sử dụng hooks

```tsx
import { useGetCategoriesApiV1CategoriesGet } from "@/lib/api";

function Component() {
  const { data, isLoading } = useGetCategoriesApiV1CategoriesGet();
  // ...
}
```

### 3. Authentication

```tsx
// Sau khi login
localStorage.setItem("access_token", token);

// Logout
localStorage.removeItem("access_token");
```

## 📚 APIs đã generate

### Auth (7 endpoints)

- Register, Login, Get current user
- Wallets CRUD

### Transactions (10 endpoints)

- Categories CRUD
- Transactions CRUD
- Daily/Weekly/Monthly grouping

### Budgets (6 endpoints)

- Budgets CRUD
- Budget summary

### Analytics (5 endpoints)

- Spending by category
- Spending trend
- Top categories
- Export CSV/PDF

### Recurring Transactions (6 endpoints)

- Recurring transactions CRUD
- Execute recurring transaction

## 🔧 Tính năng

1. **Type-safe**: Tất cả APIs đều có TypeScript types
2. **Auto-complete**: IntelliSense cho tất cả params và responses
3. **React Query integration**: Automatic caching, refetching, mutations
4. **Authentication**: Auto Bearer token injection
5. **Error handling**: Tự động redirect khi 401
6. **DevTools**: React Query DevTools để debug

## 📝 Next Steps

1. Khi backend API thay đổi, chạy lại:

   ```bash
   yarn generate:api
   ```

2. Sử dụng các hooks đã generate trong components

3. Xem `API_USAGE.md` để biết thêm chi tiết và examples

4. Check examples trong `components/examples/` để tham khảo

## ⚙️ Customization

Để thay đổi cấu hình, edit `orval.config.ts`:

- Thay đổi output directory
- Thêm custom headers
- Thêm mock data
- Và nhiều options khác

Xem docs: https://orval.dev/
