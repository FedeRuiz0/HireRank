from typing import Literal

from pydantic import BaseModel


class SummaryModel(BaseModel):
    overall_score: int
    match_level: Literal["low", "medium", "high"]


class SkillsModel(BaseModel):
    cv_skills: list[str]
    job_skills: list[str]
    matched: list[str]
    missing: list[str]
    partial: list[str]


class FeedbackModel(BaseModel):
    strengths: list[str]
    weaknesses: list[str]
    recommendations: list[str]


class MetadataModel(BaseModel):
    scoring_version: str
    analysis_notes: list[str]


class AnalyzeResponse(BaseModel):
    summary: SummaryModel
    skills: SkillsModel
    feedback: FeedbackModel
    metadata: MetadataModel