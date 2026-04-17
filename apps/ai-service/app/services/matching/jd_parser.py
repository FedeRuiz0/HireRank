from app.services.extraction.skill_extractor import extract_skills
from app.services.parsing.text_cleaner import clean_text


def parse_job_description(job_description: str) -> dict:
    cleaned = clean_text(job_description)
    skills = extract_skills(cleaned)

    return {
        "cleaned_text": cleaned,
        "skills": skills,
    }