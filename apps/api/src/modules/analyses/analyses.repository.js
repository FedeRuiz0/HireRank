import { db } from '../../config/db.js';

export const findCvById = async (cvId) => {
  const query = 'SELECT id FROM cvs WHERE id = $1 LIMIT 1';
  const { rows } = await db.query(query, [cvId]);
  return rows[0] ?? null;
};

export const createAnalysis = async ({ cvId, jobDescriptionRaw }) => {
  const query = `
    INSERT INTO analyses (cv_id, job_description_raw, status)
    VALUES ($1, $2, 'pending')
    RETURNING id, status
  `;

  const { rows } = await db.query(query, [cvId, jobDescriptionRaw]);
  return rows[0];
};

export const findAnalysisById = async (analysisId) => {
  const query = `
    SELECT id, status, result_payload, error_message
    FROM analyses
    WHERE id = $1
    LIMIT 1
  `;

  const { rows } = await db.query(query, [analysisId]);
  return rows[0] ?? null;
};

export const findPendingAnalyses = async (limit = 10) => {
  const query = `
    SELECT id
    FROM analyses
    WHERE status = 'pending'
    ORDER BY created_at ASC
    LIMIT $1
  `;

  const { rows } = await db.query(query, [limit]);
  return rows;
};

export const claimAnalysisForProcessing = async (analysisId) => {
  const query = `
    UPDATE analyses AS a
    SET status = 'processing',
        started_at = NOW(),
        updated_at = NOW()
    FROM cvs AS c
    WHERE a.id = $1
      AND a.status = 'pending'
      AND c.id = a.cv_id
    RETURNING a.id, a.cv_id, a.job_description_raw, c.storage_path
  `;

  const { rows } = await db.query(query, [analysisId]);
  return rows[0] ?? null;
};

export const markAnalysisCompleted = async ({ analysisId, resultPayload }) => {
  const query = `
    UPDATE analyses
    SET status = 'completed',
        result_payload = $2::jsonb,
        error_message = NULL,
        completed_at = NOW(),
        updated_at = NOW()
    WHERE id = $1
  `;

  await db.query(query, [analysisId, JSON.stringify(resultPayload)]);
};

export const markAnalysisFailed = async ({ analysisId, errorCode }) => {
  const query = `
    UPDATE analyses
    SET status = 'failed',
        error_message = $2,
        completed_at = NOW(),
        updated_at = NOW()
    WHERE id = $1
  `;

  await db.query(query, [analysisId, errorCode]);
};