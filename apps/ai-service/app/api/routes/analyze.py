from fastapi import APIRouter

from app.api.controllers.analyze_controller import analyze_controller
from app.contracts.request_models import AnalyzeRequest
from app.contracts.response_models import AnalyzeResponse

router = APIRouter(tags=["analyze"])


@router.post("/analyze", response_model=AnalyzeResponse)
def post_analyze(payload: AnalyzeRequest) -> AnalyzeResponse:
    return analyze_controller(payload)