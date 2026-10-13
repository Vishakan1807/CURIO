# 🐘 Curio & Co. — Permanent PostgreSQL Backend Service

This backend service is designed to **never expire**, avoiding free-tier cloud limits, project auto-pausing, or sudden service shutdowns.

---

## ⚡ Option 1: Run with Docker (Recommended — 1 Command)

If you have Docker installed on your Windows, Mac, or Linux machine / VPS:

```bash
# 1. Navigate to the server folder
cd server

# 2. Start PostgreSQL 16 & pgAdmin containers
docker compose up -d
```

- **PostgreSQL Database:** `localhost:5432`  
  - Database: `curio_gifting_db`
  - User: `curio_admin`
  - Password: `CurioPostgresSecure2026!`
- **pgAdmin Web GUI:** [http://localhost:5050](http://localhost:5050)
  - Login: `admin@curio.com` / `CurioAdminPass2026!`

Then start the Node API server:
```bash
npm install
npm start
```
The API is live at **`http://localhost:4000`**!

---

## 💻 Option 2: Run with Native PostgreSQL (Local or VPS)

1. Install PostgreSQL (Windows installer from [postgresql.org](https://www.postgresql.org/download/windows/)).
2. Open **pgAdmin** or **psql** and execute:
   ```sql
   CREATE DATABASE curio_gifting_db;
   ```
3. Run the schema migration:
   ```bash
   psql -U postgres -d curio_gifting_db -f schema.sql
   ```
4. Set your `.env` connection string:
   ```env
   DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/curio_gifting_db
   PORT=4000
   ```
5. Run `npm install && npm start`.

---

## 🌐 Option 3: Hosting It Forever for Free or Cheap

To keep this running permanently without Firebase/Supabase pausing:

1. **Hetzner Cloud VPS / DigitalOcean Droplet ($3.50 – $4 / month):**
   - Install Docker with `curl -fsSL https://get.docker.com | sh`
   - Git clone your repo, `cd server && docker compose up -d`
   - It will run 24/7/365 without ever shutting down or pausing.
2. **Raspberry Pi or Old PC / Home Server:**
   - Free forever! Just run Docker or Postgres directly.
3. **Neon Serverless PostgreSQL (Permanent Free Tier):**
   - Neon offers a free tier that does **not** delete your project after inactivity.
   - Simply copy the connection string into `DATABASE_URL` in `.env`.
