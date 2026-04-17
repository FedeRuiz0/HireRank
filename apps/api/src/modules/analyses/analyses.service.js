import { AppError } from '../../common/app-error.js';
import { AnalyzeRequestSchema, AnalysisIdParamsSchema } from './analyses.schemas.js';
import { createAnalysis, findAnalysisById, findCvById } from './analyses.repository.js';

const ANALYSIS_ERROR_MESSAGES = {
  AI_ANALYSIS_FAILED: 'No se pudo completar el análisis del CV',
  AI_SERVICE_UNAVAILABLE: 'El servicio de análisis no está disponible',
  AI_SERVICE_TIMEOUT: 'El servicio de análisis demoró demasiado en responder',
  PDF_TEXT_NOT_SUPPORTED: 'El PDF no contiene texto seleccionable',
  CV_FILE_NOT_FOUND: 'No se encontró el archivo del CV para analizar',
  CV_INVALID_FILE_TYPE: 'El archivo de CV no tiene un formato PDF válido'
};

const validateAnalyzePayload = (payload) => {
  const parsed = AnalyzeRequestSchema.safeParse(payload);

  if (!parsed.success) {
    throw new AppError({
      code: 'INVALID_JOB_DESCRIPTION',
      message: 'Invalid analyze request payload.',
      statusCode: 400,
      details: parsed.error.flatten().fieldErrors
    });
  }

  const { cvId, jobDescription } = parsed.data;

  if (!cvId || cvId.trim().length === 0) {
    throw new AppError({
      code: 'CV_ID_REQUIRED',
      message: 'cvId is required.',
      statusCode: 400
    });
  }

  const isCvUuid = AnalysisIdParamsSchema.shape.id.safeParse(cvId);

  if (!isCvUuid.success) {
    throw new AppError({
      code: 'INVALID_CV_ID',
      message: 'cvId must be a valid UUID.',
      statusCode: 400
    });
  }

  if (!jobDescription || jobDescription.trim().length === 0) {
    throw new AppError({
      code: 'JOB_DESCRIPTION_REQUIRED',
      message: 'jobDescription is required.',
      statusCode: 400
    });
  }

  if (jobDescription.trim().length < 30) {
    throw new AppError({
      code: 'JOB_DESCRIPTION_TOO_SHORT',
      message: 'jobDescription must be at least 30 characters long.',
      statusCode: 400
    });
  }

  return {
    cvId: cvId.trim(),
    jobDescription: jobDescription.trim()
  };
};

const mapAnalysisError = (errorCode) => {
  if (!errorCode) {
    return null;
  }

  return {
    code: errorCode,
    message: ANALYSIS_ERROR_MESSAGES[errorCode] ?? 'Ocurrió un error durante el análisis',
    details: null
  };
};

export const createAnalysisService = async (payload) => {
  const { cvId, jobDescription } = validateAnalyzePayload(payload);

  const cv = await findCvById(cvId);

  if (!cv) {
    throw new AppError({
      code: 'CV_NOT_FOUND',
      message: 'CV not found.',
      statusCode: 404
    });
  }

  const analysis = await createAnalysis({
    cvId,
    jobDescriptionRaw: jobDescription
  });

  return {
    analysisId: analysis.id,
    status: analysis.status
  };
};

export const getAnalysisResultService = async (params) => {
  const parsedParams = AnalysisIdParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    throw new AppError({
      code: 'ANALYSIS_NOT_FOUND',
      message: 'Analysis not found.',
      statusCode: 404
    });
  }

  const analysis = await findAnalysisById(parsedParams.data.id);

  if (!analysis) {
    throw new AppError({
      code: 'ANALYSIS_NOT_FOUND',
      message: 'Analysis not found.',
      statusCode: 404
    });
  }

  const isCompleted = analysis.status === 'completed';
  const isFailed = analysis.status === 'failed';

  return {
    id: analysis.id,
    status: analysis.status,
    result: isCompleted ? analysis.result_payload : null,
    error: isFailed ? mapAnalysisError(analysis.error_message) : null
  };
};