# Deployment Guide: Render & Vercel (Free Tiers) 🚀

This guide provides instructions for deploying using **Render** (for Backend/DB) and **Vercel** (for Frontend).

## 1. Database (Render PostgreSQL)
1. Go to [Render.com](https://render.com) and create an account.
2. Click **New** -> **PostgreSQL**.
3. Name: `crypto-db`, Plan: **Free**.
4. Once created, copy the **Internal Database URL** for the backend.

## 2. Backend (Render Web Service)
1. Click **New** -> **Web Service**.
2. Connect your GitHub repository.
3. Settings:
   - **Name:** `crypto-api`
   - **Root Directory:** `backend`
   - **Environment:** `Docker`
   - **Docker Command:** Leave empty (uses Dockerfile.prod)
4. **Environment Variables:**
   - `DATABASE_URL`: Your Render Postgres URL.
   - `SECRET_KEY`: A long random string.
   - `CORS_ORIGINS`: `https://your-app.vercel.app`

## 3. Frontend (Vercel)
1. Import the repo in Vercel.
2. Set **Root Directory** to `frontend`.
3. Add `NEXT_PUBLIC_API_URL` pointing to your Render Web Service URL.

---
*Note: Render's free tier spins down after inactivity, so the first request might take a few seconds.*
