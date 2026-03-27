# Shopio — Admin Portal Frontend

A full-featured e-commerce admin dashboard built with Next.js 15 App Router. Manage orders, products, customers, and categories through a clean, dark-themed interface that is fully responsive across desktop and mobile.

---

## Table of Contents

- [Pages & Features](#pages--features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Architecture Notes](#architecture-notes)

---

## Pages & Features

### Login — `/login`
- Email and password authentication
- Show/hide password toggle
- Remember me checkbox
- Server Action-based form submission with error handling
- On success, sets a secure HTTP-only `auth_token` cookie (7-day expiry) and redirects to `/dashboard`

---

### Dashboard — `/dashboard`
- **Revenue Stats**: Total revenue with trend indicator (up/down/neutral vs previous period)
- **Order Stats**: Total orders, this month count, and trend
- **Successful Orders**: Count, success rate, and trend
- **Cancelled Orders**: Count and cancellation rate
- **Average Order Value**: Current AOV and trend
- **Inventory Value**: Total value, unit count, product count, new this month
- **Top Selling Products**: Ranked list with quantity sold
- **Low Stock Alerts**: Products flagged as Critical / Warning / Out of stock
- **Orders by Status**: Visual donut chart of order status distribution

---

### Orders — `/orders`
- **Statistics bar**: Total orders, pending, completed, revenue — each with trend
- **Filters**: Status (PENDING / PAID / SHIPPED / DELIVERED / CANCELLED), date range, customer name search
- **Paginated table** (10 per page by default): Order ID, customer, status badge, item count, total, date
- **Order Detail Modal**: Full order info, product list, and inline status update
- Responsive: table on desktop, card list on mobile

---

### Products — `/products`
- **Statistics bar**: Total, active, low stock, out of stock counts
- **Filters**: Category, stock status (In Stock / Low Stock / Out of Stock), name search
- **Paginated table** (10 per page by default): Product name, category, price, stock count, stock status badge, active status badge
- **Create Product Modal**: Name, description, price, stock, category, active toggle
- **Product Detail Modal**: Edit stock quantity and active/inactive status
- Responsive: table on desktop, card list on mobile

---

### Customers — `/customers`
- **Search**: Filter by customer name
- **Paginated table** (20 per page by default): Name, email, phone, total orders, joined date
- **Customer Detail Modal**: Contact info, inline phone number edit, full order history with status and amounts
- Responsive: table on desktop, card list on mobile

---

### Categories — `/categories`
- **Table**: All categories with product count per category
- **Create Category Modal**: Add new category with name
- **Category Detail Modal**: View all products belonging to the category
- Responsive: table on desktop, card list on mobile

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 15.x | Framework — App Router, Server Components, Server Actions |
| [React](https://react.dev) | 19.x | UI library |
| [react-dom](https://react.dev) | 19.x | DOM renderer |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS styling |
| [@tailwindcss/postcss](https://tailwindcss.com) | 4.x | PostCSS integration for Tailwind v4 |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Static typing |
| [ESLint](https://eslint.org) | 9.x | Linting |
| [eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint) | 15.x | Next.js ESLint rules |

> No external UI component library is used. All components are custom-built with Tailwind CSS.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — AuthProvider
│   ├── page.tsx                    # Redirects to /login
│   ├── (auth)/
│   │   ├── layout.tsx              # Header + Sidebar + PageContent
│   │   ├── dashboard/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── products/page.tsx
│   │   ├── customers/page.tsx
│   │   └── categories/page.tsx
│   └── (un-auth)/
│       ├── layout.tsx              # Centered layout for login
│       └── login/page.tsx
│
├── components/
│   ├── pageDashboard/              # Dashboard-specific components
│   ├── pageOrders/                 # Orders page components
│   ├── pageProducts/               # Products page components
│   ├── pageCustomers/              # Customers page components
│   ├── pageCategories/             # Categories page components
│   ├── pageLogin/                  # Login page components
│   ├── shared/                     # Reusable UI (Table, Input, Button, etc.)
│   └── svg/                        # SVG icon components
│
├── services/
│   ├── api.ts                      # Base API client (auth token injection, error handling)
│   ├── auth.service.ts             # Login endpoint
│   ├── orders.service.ts           # Orders CRUD and filtering
│   ├── products.service.ts         # Products CRUD and filtering
│   ├── customers.service.ts        # Customers list and details
│   ├── categories.service.ts       # Categories CRUD
│   └── dashboard.service.ts        # Dashboard stats
│
├── actions/                        # Next.js Server Actions ("use server")
│   ├── auth.actions.ts             # loginAction, logoutAction
│   ├── orders.actions.ts           # getOrderAction, editOrderStatusAction
│   ├── products.actions.ts         # createProductAction, updateProductAction
│   ├── customers.actions.ts        # updateCustomerAction
│   └── categories.actions.ts       # createCategoryAction
│
├── models/
│   ├── model.ts                    # All TypeScript interfaces (Auth, Orders, Products, Customers, Categories, Dashboard)
│   └── tableRows.ts                # Table row view types (ProductRow, OrderRow, CustomerRow, CategoryRow)
│
├── utilities/
│   ├── tableConfig.tsx             # Column definitions and card configs for all 4 tables
│   └── tableCells.tsx              # Small "use client" cell components (clickable names/IDs)
│
├── context/
│   ├── AuthContext.tsx             # logout() via useAuth() hook
│   └── NavigationContext.tsx       # Active route tracking
│
├── config/
│   └── navigation.ts              # Sidebar nav items (route, label, icon)
│
└── middleware.ts                   # Auth guard: redirects unauthenticated users to /login
```

---

## Local Setup

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm, yarn, or pnpm
- The Shopio backend API running (defaults to `http://localhost:4000/api`)

### Steps

**1. Clone the repository**

```bash
git clone <repository-url>
cd shopio-frontend
```

**2. Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

**3. Configure environment variables**

Create a `.env.local` file in the project root:

```env
API_URL=http://localhost:4000/api
```

Replace the URL with your backend API address if it differs.

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `API_URL` | Yes | Base URL of the backend REST API (e.g. `http://localhost:4000/api`) |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server at `http://localhost:3000` |
| `npm run build` | Build the production bundle |
| `npm start` | Start the production server (requires `build` first) |
| `npm run lint` | Run ESLint on the codebase |

---

## Architecture Notes

### Authentication
- Login stores an `auth_token` HTTP-only cookie via a Server Action
- `middleware.ts` guards all routes under `(auth)/` — unauthenticated requests redirect to `/login`
- The API client (`services/api.ts`) automatically attaches `Authorization: Bearer <token>` to every request and redirects to `/auth/logout` on 401 responses

### Server vs Client Components
- Pages and data-fetching components are **React Server Components** by default
- `"use client"` is applied only where browser APIs or interactivity is needed:
  - `tableCells.tsx` — clickable name/ID cells that push a modal query param via `useRouter`
  - Filter components — use `useRouter` for URL-based state
  - Modal overlays — use `useState` for open/close
  - Forms — use `useActionState` for Server Action responses

### URL-based Modal State
Modals (order detail, product detail, customer detail, category detail) are opened by pushing a query param (e.g. `?productId=xxx`) to the URL. This means:
- The modal state is bookmarkable and shareable
- The server fetches modal data on the server side
- No client-side data fetching needed for modals

### Data Flow
```
Page (Server) → fetches data → passes to Components (Server)
                                       ↓
                              Client cell components
                              push query params on click
                                       ↓
                              Page re-renders server-side
                              with new searchParams → modal opens
```
