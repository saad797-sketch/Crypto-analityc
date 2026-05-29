# Deployment Guide: Crypto Intelligence Platform 🚀

This guide provides professional instructions for deploying the platform to production.

## 🏗️ Architecture Summary
- **Frontend:** Next.js deployed on **Vercel**.
- **Backend:** FastAPI deployed on **Railway**.
- **Database:** PostgreSQL hosted on **Railway**.

---

## 1. Backend & Database (Railway)

### Steps:
1. **Create a Railway account** at [railway.app](https://railway.app).
2. **Create a new Project** and select "Provision PostgreSQL".
3. **Deploy Backend:**
   - Connect your GitHub repository.
   - Point to the `backend/` directory.
   - Use `Dockerfile.prod` for optimized builds.
4. **Environment Variables:**
   Set the following in Railway's variables panel:
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}` (Automatic if using Railway DB).
   - `SECRET_KEY`: A long random string.
   - `ALGORITHM`: `HS256`.
   - `CORS_ORIGINS`: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`).

---

## 2. Frontend (Vercel)

### Steps:
1. **Create a Vercel account** at [vercel.com](https://vercel.com).
2. **Import Project:** Select your GitHub repo.
3. **Configure Project:**
   - **Root Directory:** `frontend/`
   - **Framework Preset:** Next.js
4. **Environment Variables:**
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL (e.g., `https://backend-production.up.railway.app/api/v1`).
5. **Deploy:** Hit "Deploy".

---

## 3. Production Variables Template

### Backend (`backend/.env.production`)
```env
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-production-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=11520
PROJECT_NAME="Crypto Intel PRO"
```

### Frontend (`frontend/.env.production`)
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1
```

---

## 4. CI/CD Recommendations

- **GitHub Actions:** Use them to run tests on every Pull Request.
- **Automated Deployments:** Both Vercel and Railway support automatic deployments on `git push` to the `main` branch.
- **Branch Protection:** Enable branch protection for `main` to require passing tests and reviews before merging.
- **Staging Environment:** Create a separate Railway project for staging to test changes before they hit production.

---

## 5. Monitoring & Maintenance
- **Railway Metrics:** Use the built-in dashboard to monitor CPU/Memory usage.
- **Vercel Analytics:** Enable for frontend performance and Core Web Vitals.
- **Logs:** Centralize logs using Railway's log explorer.
