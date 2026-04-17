import { API_BASE_URL } from '../config/api';
import type {
  AnalyzeResponse,
  ApiError,
  GetResultResponse,
  UploadCvResponse
} from '../types/api';

const parseApiError = async (response: Response): Promise<Error> => {
  try {
    const payload = (await response.json()) as ApiError;
    return new Error(payload.error.message);
  } catch {
    return new Error('Unexpected API error');
  }
};

export const uploadCv = async (file: File): Promise<UploadCvResponse> => {
  const formData = new FormData();
  formData.append('cvFile', file);

  const response = await fetch(`${API_BASE_URL}/upload-cv`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw await parseApiError(response);
  }

  return (await response.json()) as UploadCvResponse;
};

export const startAnalysis = async ({
  cvId,
  jobDescription
}: {
  cvId: string;
  jobDescription: string;
}): Promise<AnalyzeResponse> => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cvId, jobDescription })
  });

  if (!response.ok) {
    throw await parseApiError(response);
  }

  return (await response.json()) as AnalyzeResponse;
};

export const getAnalysisResult = async (analysisId: string): Promise<GetResultResponse> => {
  const response = await fetch(`${API_BASE_URL}/results/${analysisId}`);

  if (!response.ok) {
    throw await parseApiError(response);
  }

  return (await response.json()) as GetResultResponse;
};