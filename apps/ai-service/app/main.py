from fastapi import FastAPI

from app.api.routes.analyze import router as analyze_router
from app.api.routes.health import router as health_router
from app.core.config import settings
from app.core.exceptions import (
    AiServiceError,
    ai_service_error_handler,
    unexpected_error_handler,
)
from app.core.logger import logger

app = FastAPI(title=settings.app_name)

app.add_exception_handler(AiServiceError, ai_service_error_handler)
app.add_exception_handler(Exception, unexpected_error_handler)

app.include_router(health_router)
app.include_router(analyze_router)


@app.on_event("startup")
def on_startup() -> None:
    logger.info("AI service started")