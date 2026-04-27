# Genolink Physician Portal — Setup Guide

## Prerequisites
- Node.js 18+ and npm
- MySQL 8.0+

---

## 1. Database

```bash
# Create tables
mysql -u root -p < database/schema.sql

# Generate bcrypt hash for admin password
cd backend
node -e "const b=require('bcryptjs'); b.hash('Admin@1234',10).then(h=>console.log(h))"
```

Copy the printed hash into `database/seed.sql` (replace `$2b$10$YourHashHere`), then:

```bash
mysql -u root -p genolink < database/seed.sql
```

Default admin login:
| Email              | Password   |
|--------------------|------------|
| admin@genolink.com | Admin@1234 |

> Change the password on first login.

---

## 2. Backend (Express API)

```bash
cd backend
cp .env.example .env          # fill in DB credentials and JWT_SECRET
npm install
npm run dev                   # runs on http://localhost:4000
```

`.env` required values:
| Key         | Example value                  |
|-------------|-------------------------------|
| DB_HOST     | localhost                      |
| DB_USER     | root                           |
| DB_PASSWORD | your_mysql_password            |
| DB_NAME     | genolink                       |
| JWT_SECRET  | a_long_random_secret_string    |
| PORT        | 4000                           |

---

## 3. Portal Frontend (Next.js)

```bash
cd portal
cp .env.local.example .env.local    # set NEXT_PUBLIC_API_URL and JWT_SECRET
npm install
npm run dev                          # runs on http://localhost:3001
```

`.env.local` required values:
| Key                 | Value                              |
|---------------------|------------------------------------|
| NEXT_PUBLIC_API_URL | http://localhost:4000/api          |
| JWT_SECRET          | same value as backend JWT_SECRET   |

Open [http://localhost:3001](http://localhost:3001) and sign in.

---

## Project Structure

```
Genolink/
  app/           ← Marketing website (unchanged, GitHub Pages)
  components/    ← Marketing site components (unchanged)
  backend/       ← Node.js + Express REST API (port 4000)
    src/
      db/        ← MySQL connection pool
      middleware/ ← JWT auth + role guard
      routes/    ← auth, patients, test-requests, reports, admin, test-catalog
    uploads/     ← PDF reports (gitignored)
  portal/        ← Next.js SSR physician portal (port 3001)
    app/
      (auth)/login/         ← Login page
      (portal)/dashboard/   ← Dashboard
      (portal)/patients/    ← Patient list + create
      (portal)/test-requests/ ← Request list + create
      (portal)/reports/     ← Download reports
      (portal)/admin/       ← Admin-only pages
    lib/          ← Auth helpers, API client, utilities
    components/   ← Sidebar, UI components
  database/
    schema.sql    ← MySQL table definitions
    seed.sql      ← Initial admin user + sample tests
```

---

## Roles & Access

| Feature              | Doctor | Admin |
|----------------------|--------|-------|
| View own patients    | ✓      | ✓     |
| Create patient       | ✓      | ✓     |
| Submit test request  | ✓      | —     |
| Track test status    | ✓      | ✓     |
| Download reports     | ✓      | ✓     |
| Manage doctor accounts | —    | ✓     |
| Update test status   | —      | ✓     |
| Upload PDF reports   | —      | ✓     |
| Manage test catalog  | —      | ✓     |
