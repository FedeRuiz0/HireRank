import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

import { AppError } from '../../common/app-error.js';
import { env } from '../../config/env.js';

const uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const finalFilename = `${Date.now()}-${safeOriginalName}`;
    cb(null, finalFilename);
  }
});

const fileFilter = (_req, file, cb) => {
  const isPdfMime = file.mimetype === 'application/pdf';
  const hasPdfExtension = file.originalname.toLowerCase().endsWith('.pdf');

  if (!isPdfMime || !hasPdfExtension) {
    cb(
      new AppError({
        code: 'CV_INVALID_FILE_TYPE',
        message: 'Only PDF files are supported.',
        statusCode: 400
      })
    );
    return;
  }

  cb(null, true);
};

export const uploadCvMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.MAX_CV_FILE_SIZE_MB * 1024 * 1024
  }
}).single('cvFile');