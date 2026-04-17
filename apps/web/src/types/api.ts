export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface UploadCvResponse {
  cvId: string;
  status: 'uploaded';
}

export interface AnalyzeResponse {
  analysisId: string;
  status: 'pending';
}

export interface ResultError {
  code: string;
  message: string;
  details: unknown;
}

export interface AnalysisResultPayload {
  summary: {
    overall_score: number;
    match_level: 'low' | 'medium' | 'high';
  };
  skills: {
    cv_skills: string[];
    job_skills: string[];
    matched: string[];
    missing: string[];
    partial: string[];
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  metadata: {
    scoring_version: string;
    analysis_notes?: string[];
  };
}

export interface GetResultResponse {
  id: string;
  status: AnalysisStatus;
  result: AnalysisResultPayload | null;
  error: ResultError | null;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details: unknown;
  };
}