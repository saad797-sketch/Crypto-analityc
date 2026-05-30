from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings, logger
from app.core.middleware import ErrorHandlingMiddleware
from app.api.v1_endpoints import router as api_v1_router
from app.core.database import engine, Base
from app.models import models

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Error Handling & Logging Middleware
app.add_middleware(ErrorHandlingMiddleware)

# Include API Router
app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables verified/created successfully.")
    except Exception as e:
        logger.error(f"Database connection failed during startup: {str(e)}")
        logger.info("Continuing startup... DB features might be unavailable.")

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}"}
