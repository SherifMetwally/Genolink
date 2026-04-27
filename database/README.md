# Database Setup

## Requirements
- MySQL 8.0+

## Steps

1. **Create database and tables:**
   ```bash
   mysql -u root -p < schema.sql
   ```

2. **Generate a bcrypt hash for the admin password** (run once from the backend):
   ```bash
   cd ../backend
   node -e "const b=require('bcryptjs'); b.hash('Admin@1234',10).then(h=>console.log(h))"
   ```

3. **Update `seed.sql`** — replace `$2b$10$YourHashHere` with the hash printed above.

4. **Seed initial data:**
   ```bash
   mysql -u root -p genolink < seed.sql
   ```

## Default Admin Login
| Field    | Value                |
|----------|----------------------|
| Email    | admin@genolink.com   |
| Password | Admin@1234           |

> **Change the password immediately after first login.**
