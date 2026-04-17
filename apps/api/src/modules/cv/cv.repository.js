import { db } from '../../config/db.js';

export const createCv = async ({
  originalFilename,
  storedFilename,
  mimeType,
  fileSize,
  storagePath
}) => {
  const query = `
    INSERT INTO cvs (
      original_filename,
      stored_filename,
      mime_type,
      file_size,
      storage_path,
      text_extraction_status
    )
    VALUES ($1, $2, $3, $4, $5, 'pending')
    RETURNING id
  `;

  const values = [originalFilename, storedFilename, mimeType, fileSize, storagePath];
  const { rows } = await db.query(query, values);

  return rows[0];
};