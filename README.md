# Crypto Intelligence Platform 🚀

A professional-grade crypto intelligence platform featuring real-time data analysis, portfolio tracking, and market insights.

## 🏗️ Architecture

- **Frontend:** React, TypeScript, Next.js (App Router), Tailwind CSS, Shadcn UI.
- **Backend:** Python FastAPI, Pydantic, SQLAlchemy/SQLModel.
- **Database:** PostgreSQL.
- **Infrastructure:** Docker, Docker Compose.
- **Deployment:** Vercel (Frontend), Railway (Backend & DB).

## 🚀 Quick Start (Local Development)

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.10+

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd crypto-intel-platform
   ```

2. **Docker Setup (Recommended)**
   ```bash
   docker-compose up --build
   ```

3. **Manual Setup**

   **Backend:**
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate # or .venv\Scripts\activate on Windows
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📁 Project Structure

```text
crypto-intel-platform/
├── frontend/                # Next.js Application
├── backend/                 # FastAPI Application
├── docker-compose.yml       # Local development setup
└── README.md
```

## 🛡️ Environment Variables

Check `.env.example` in both `frontend/` and `backend/` folders for the required variables.

## 🚀 Deployment

For instructions on how to deploy this platform to production (Vercel & Railway), please refer to the [DEPLOY.md](./DEPLOY.md) guide.

## 📄 License
MIT
