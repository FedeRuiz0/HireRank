import { AppError } from '../../common/app-error.js';
import { env } from '../../config/env.js';

const parseErrorResponse = async (response) => {
  try {
    const payload = await response.json();
    return payload?.error?.code ?? null;
  } catch {
    return null;
  }
};

export const analyzeCvWithAiService = async ({ cvFilePath, jobDescription }) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.AI_SERVICE_TIMEOUT_MS);

  try {
    const response = await fetch(`${env.AI_SERVICE_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cv_file_path: cvFilePath,
        job_description: jobDescription
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const remoteErrorCode = await parseErrorResponse(response);
      throw new AppError({
        code: remoteErrorCode ?? 'AI_ANALYSIS_FAILED',
        message: 'AI service returned an error response.',
        statusCode: 502
      });
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new AppError({
        code: 'AI_SERVICE_TIMEOUT',
        message: 'AI service request timed out.',
        statusCode: 504
      });
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError({
      code: 'AI_SERVICE_UNAVAILABLE',
      message: 'AI service is unavailable.',
      statusCode: 503
    });
  } finally {
    clearTimeout(timeout);
  }
};