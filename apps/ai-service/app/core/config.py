from dataclasses import dataclass
import os


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("AI_SERVICE_APP_NAME", "HireRank AI Service")
    app_env: str = os.getenv("AI_SERVICE_ENV", "development")
    app_host: str = os.getenv("AI_SERVICE_HOST", "0.0.0.0")
    app_port: int = int(os.getenv("AI_SERVICE_PORT", "8001"))
    scoring_version: str = os.getenv("AI_SCORING_VERSION", "v1")


settings = Settings()