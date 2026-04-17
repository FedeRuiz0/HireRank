import { Router } from 'express';

import {
  createAnalysisController,
  getAnalysisResultController
} from './analyses.controller.js';

const analysesRouter = Router();

analysesRouter.post('/analyze', createAnalysisController);
analysesRouter.get('/results/:id', getAnalysisResultController);

export { analysesRouter };