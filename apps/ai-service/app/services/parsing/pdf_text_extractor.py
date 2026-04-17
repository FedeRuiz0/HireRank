from pathlib import Path

from pypdf import PdfReader

from app.core.exceptions import AiServiceError


def extract_text_from_pdf(pdf_file_path: str) -> str:
    path = Path(pdf_file_path)

    if not path.exists() or not path.is_file():
        raise AiServiceError(
            code="CV_FILE_NOT_FOUND",
            message="CV file path does not exist",
            status_code=404,
            details={"cv_file_path": pdf_file_path},
        )

    if path.suffix.lower() != ".pdf":
        raise AiServiceError(
            code="CV_INVALID_FILE_TYPE",
            message="Only PDF files are supported",
            status_code=400,
            details={"cv_file_path": pdf_file_path},
        )

    reader = PdfReader(str(path))
    pages_text: list[str] = []

    for page in reader.pages:
        page_text = page.extract_text() or ""
        if page_text.strip():
            pages_text.append(page_text)

    combined_text = "\n".join(pages_text).strip()

    if not combined_text:
        raise AiServiceError(
            code="PDF_TEXT_NOT_SUPPORTED",
            message="PDF has no selectable text",
            status_code=422,
            details={"cv_file_path": pdf_file_path},
        )

    return combined_text