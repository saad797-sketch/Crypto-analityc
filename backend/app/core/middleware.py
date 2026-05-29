from fastapi import Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import time
from app.core.config import logger

class ErrorHandlingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            start_time = time.time()
            response = await call_next(request)
            process_time = time.time() - start_time
            
            # Log successful requests
            logger.info(
                f"Method: {request.method} Path: {request.url.path} "
                f"Status: {response.status_code} ProcessTime: {process_time:.4f}s"
            )
            return response
        except Exception as e:
            logger.error(f"Unhandled Exception: {str(e)}", exc_info=True)
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={"detail": "Internal Server Error", "message": str(e)},
            )
