SKILL_KEYWORDS = [
    "python",
    "javascript",
    "typescript",
    "node.js",
    "express",
    "fastapi",
    "react",
    "sql",
    "postgresql",
    "docker",
    "aws",
    "git",
    "rest",
    "testing",
    "ci/cd",
]


def extract_skills(text: str) -> list[str]:
    found: list[str] = []

    for keyword in SKILL_KEYWORDS:
        if keyword in text:
            found.append(keyword)

    return sorted(set(found))