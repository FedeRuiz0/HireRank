import { AppError } from '../../common/app-error.js';
import { createCv } from './cv.repository.js';
import { UploadedCvFileSchema } from './cv.schemas.js';

export const uploadCv = async (file) => {
  if (!file) {
    throw new AppError({
      code: 'CV_FILE_REQUIRED',
      message: 'A PDF CV file is required.',
      statusCode: 400
    });
  }

  const parsedFile = UploadedCvFileSchema.safeParse(file);

  if (!parsedFile.success) {
    throw new AppError({
      code: 'CV_INVALID_FILE_TYPE',
      message: 'Only PDF files are supported.',
      statusCode: 400,
      details: parsedFile.error.flatten().fieldErrors
    });
  }

  const cv = await createCv({
    originalFilename: file.originalname,
    storedFilename: file.filename,
    mimeType: file.mimetype,
    fileSize: file.size,
    storagePath: file.path
  });

  return {
    cvId: cv.id,
    status: 'uploaded'
  };
};