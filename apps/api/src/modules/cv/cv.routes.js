import { Router } from 'express';

import { uploadCvController } from './cv.controller.js';
import { uploadCvMiddleware } from './cv.upload.js';

const cvRouter = Router();

cvRouter.post('/upload-cv', uploadCvMiddleware, uploadCvController);

export { cvRouter };