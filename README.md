# GM Business Solutions

Full-stack e-commerce platform built with **React 19**, **Express**, **TypeScript**, **Drizzle ORM**, and **PostgreSQL**.

## Tech Stack

### Frontend
- React 19 + Vite
- React Router v7
- Chart.js + react-chartjs-2
- Axios
- Tailwind CSS

### Backend
- Express 5 + TypeScript
- Drizzle ORM + PostgreSQL
- JWT authentication with refresh tokens
- M-Pesa STK Push integration
- Nodemailer (Gmail SMTP)
- Cloudinary for image uploads

## Features

- Customer, staff, and admin role-based dashboards
- Product catalog with variants, categories, search, and filters
- Cart, wishlist, coupons, and reviews
- Order management with pickup stations
- M-Pesa payment integration
- Email verification and password reset
- Admin analytics and reports

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── Drizzle/         # ORM schema, migrations, seed
│   │   ├── auth/            # Authentication routes and services
│   │   ├── middleware/      # Auth middleware
│   │   ├── products/        # Product routes, services, controllers
│   │   ├── orders/          # Order management
│   │   ├── payments/        # M-Pesa integration
│   │   └── ...
│   └── .env.example
└── frontend/
    └── src/
        ├── pages/           # Route pages
        ├── Features/        # API integrations
        ├── context/         # React context providers
        └── components/      # Reusable UI
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon or local)
- Gmail account for SMTP (or another provider)
- M-Pesa developer credentials (optional, for payments)

### Installation

```bash
# Install dependencies
pnpm install

# Run database migrations
pnpm --filter backend run generate
pnpm --filter backend run migrate

# Seed the database (optional)
pnpm --filter backend run seed
```

### Environment Variables

Copy the example env files and fill in your values:

```bash
cp backend/.env.example backend/.env
```

See `backend/.env.example` for the full list of required variables.

### Running the App

```bash
# Start backend (http://localhost:5000)
pnpm --filter backend run dev

# Start frontend (http://localhost:5173)
pnpm --filter frontend run dev
```

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `Database_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for access tokens |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens |
| `FRONTEND_URL` | Frontend origin for CORS |
| `EMAIL_USER` | Gmail SMTP email |
| `EMAIL_PASSWORD` | Gmail app password |

### Optional (M-Pesa)

| Variable | Description |
|----------|-------------|
| `MPESA_CONSUMER_KEY` | Safaricom consumer key |
| `MPESA_CONSUMER_SECRET` | Safaricom consumer secret |
| `MPESA_SHORT_CODE` | Business shortcode |
| `MPESA_PASSKEY` | M-Pesa passkey |
| `MPESA_ENVIRONMENT` | `sandbox` or `production` |
| `MPESA_CALLBACK_URL` | Public callback URL |

### Optional (Seeding)

| Variable | Description |
|----------|-------------|
| `SEED_ADMIN_PASSWORD` | Admin seed password |
| `SEED_CUSTOMER_PASSWORD` | Customer seed password |
| `SEED_STAFF_PASSWORD` | Staff seed password |

If omitted, random passwords are generated and printed to the console during seeding.

## Security

- Helmet security headers enabled
- CORS locked to `FRONTEND_URL`
- Rate limiting on auth routes (20 req / 15 min)
- JWT access tokens: 15 minutes
- JWT refresh tokens: 7 days with rotation
- Session validation against database
- Passwords hashed with bcrypt (10 rounds)
- No secrets committed to version control

## Scripts

### Backend

| Script | Description |
|--------|-------------|
| `pnpm --filter backend run dev` | Start dev server with tsx |
| `pnpm --filter backend run build` | Compile TypeScript |
| `pnpm --filter backend run seed` | Seed the database |
| `pnpm --filter backend run generate` | Generate Drizzle migrations |
| `pnpm --filter backend run migrate` | Apply migrations |

### Frontend

| Script | Description |
|--------|-------------|
| `pnpm --filter frontend run dev` | Start Vite dev server |
| `pnpm --filter frontend run build` | Production build |
| `pnpm --filter frontend run lint` | Run oxlint |

## License

ISC
