from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    cv_file_path: str = Field(min_length=1)
    job_description: str = Field(min_length=1)