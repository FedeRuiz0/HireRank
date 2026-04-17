from app.core.config import settings


def _compute_partial(cv_skills: list[str], missing_skills: list[str]) -> list[str]:
    partial: list[str] = []

    for missing in missing_skills:
        for cv_skill in cv_skills:
            if missing in cv_skill or cv_skill in missing:
                partial.append(missing)
                break

    return sorted(set(partial))


def _calculate_match_level(score: int) -> str:
    if score >= 80:
        return "high"
    if score >= 60:
        return "medium"
    return "low"


def calculate_score(cv_skills: list[str], job_skills: list[str]) -> dict:
    cv_set = set(cv_skills)
    job_set = set(job_skills)

    matched = sorted(cv_set & job_set)
    missing = sorted(job_set - cv_set)
    partial = _compute_partial(cv_skills=cv_skills, missing_skills=missing)

    if not job_skills:
        overall_score = 0
    else:
        overall_score = int(round((len(matched) / len(job_skills)) * 100))

    match_level = _calculate_match_level(overall_score)

    strengths = []
    weaknesses = []
    recommendations = []
    analysis_notes = []

    if matched:
        strengths.append(f"Se detectaron {len(matched)} skills alineadas con la vacante")
    else:
        weaknesses.append("No se detectaron skills directamente alineadas con la vacante")

    if missing:
        weaknesses.append(f"Faltan {len(missing)} skills clave respecto a la descripción")
        recommendations.append("Agregar experiencia o evidencia concreta para las skills faltantes")

    if partial:
        strengths.append("Hay skills parcialmente alineadas que pueden reforzarse")
        recommendations.append("Aclarar en el CV el nivel de dominio de skills relacionadas")

    if overall_score >= 80:
        recommendations.append("Mantener el enfoque del CV y optimizar logros cuantificables")
    elif overall_score >= 60:
        recommendations.append("Priorizar proyectos recientes vinculados a la vacante")
    else:
        recommendations.append("Reestructurar el CV para enfatizar skills requeridas por el puesto")

    analysis_notes.append("MVP heuristic scoring based on keyword overlap")

    return {
        "summary": {
            "overall_score": overall_score,
            "match_level": match_level,
        },
        "skills": {
            "cv_skills": cv_skills,
            "job_skills": job_skills,
            "matched": matched,
            "missing": missing,
            "partial": partial,
        },
        "feedback": {
            "strengths": strengths,
            "weaknesses": weaknesses,
            "recommendations": recommendations,
        },
        "metadata": {
            "scoring_version": settings.scoring_version,
            "analysis_notes": analysis_notes,
        },
    }