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
- PostgreSQL database ([Neon](https://neon.tech) recommended — the backend uses the Neon serverless driver, so Docker is **not** required)
- Gmail account for SMTP (or another provider)
- M-Pesa developer credentials (optional, for payments)

Docker is optional. If you have it you can use `docker-compose up`; if not, use a hosted Postgres (Neon) and run the apps directly with Node.

### Installation

```bash
# Install dependencies
npm install
npm install --prefix backend
npm install --prefix frontend

# Run database migrations
npm run generate --prefix backend
npm run migrate --prefix backend

# Seed the database (optional)
npm run seed --prefix backend
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
npm run dev --prefix backend

# Start frontend (http://localhost:5173) — in a second terminal
npm run dev --prefix frontend

# Or run both at once from the repo root
npm run dev
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
| `npm run dev --prefix backend` | Start dev server with tsx |
| `npm run build --prefix backend` | Compile TypeScript |
| `npm run test --prefix backend` | Run Vitest tests |
| `npm run seed --prefix backend` | Seed the database |
| `npm run generate --prefix backend` | Generate Drizzle migrations |
| `npm run migrate --prefix backend` | Apply migrations |

### Frontend

| Script | Description |
|--------|-------------|
| `npm run dev --prefix frontend` | Start Vite dev server |
| `npm run build --prefix frontend` | Production build |
| `npm run lint --prefix frontend` | Run oxlint |
| `npm run test --prefix frontend` | Run Vitest tests |

## Deployment

### Frontend (Vercel)

The `frontend/` directory is a standard Vite app and deploys to Vercel out of the box:

1. Import the repository in Vercel and set the **Root Directory** to `frontend`.
2. Build command: `npm run build`, output directory: `dist`.
3. Add the environment variable `VITE_API_URL` pointing at your deployed backend, e.g. `https://api.your-domain.com/api`. Vite inlines this at build time, so it must be set before building.
4. `frontend/vercel.json` already rewrites all routes to `index.html` for client-side routing.

### Backend

Deploy the `backend/` service to any Node host (Render, Railway, Fly.io, or Vercel Functions) and set the environment variables from `backend/.env.example`. Because the app uses the Neon serverless driver, pointing `Database_URL` at a Neon Postgres instance is the simplest option.

## Docker (optional)

If you have Docker installed:

```bash
cp .env.example .env   # fill in secrets
docker-compose up -d --build
```

This starts Postgres, the backend (`:5000`), and the frontend (`:80`) behind nginx, which also proxies `/api` to the backend.

## License

ISC
