from app.contracts.request_models import AnalyzeRequest
from app.contracts.response_models import AnalyzeResponse
from app.services.extraction.skill_extractor import extract_skills
from app.services.matching.jd_parser import parse_job_description
from app.services.matching.score_calculator import calculate_score
from app.services.parsing.pdf_text_extractor import extract_text_from_pdf
from app.services.parsing.text_cleaner import clean_text


def analyze_controller(payload: AnalyzeRequest) -> AnalyzeResponse:
    cv_text_raw = extract_text_from_pdf(payload.cv_file_path)
    cv_text_clean = clean_text(cv_text_raw)

    cv_skills = extract_skills(cv_text_clean)

    jd_parsed = parse_job_description(payload.job_description)
    job_skills = jd_parsed["skills"]

    result = calculate_score(cv_skills=cv_skills, job_skills=job_skills)

    return AnalyzeResponse(**result)