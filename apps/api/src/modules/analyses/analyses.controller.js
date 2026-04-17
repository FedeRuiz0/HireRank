import {
  createAnalysisService,
  getAnalysisResultService
} from './analyses.service.js';

export const createAnalysisController = async (req, res, next) => {
  try {
    const response = await createAnalysisService(req.body);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAnalysisResultController = async (req, res, next) => {
  try {
    const response = await getAnalysisResultService(req.params);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};