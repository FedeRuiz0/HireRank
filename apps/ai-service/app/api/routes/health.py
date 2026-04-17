from fastapi import APIRouter

from app.api.controllers.health_controller import health_controller

router = APIRouter(tags=["health"])


@router.get("/health")
def get_health() -> dict:
    return health_controller()