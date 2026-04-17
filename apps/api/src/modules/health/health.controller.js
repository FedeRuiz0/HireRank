import { checkHealth } from './health.service.js';

export const getHealthController = async (_req, res, next) => {
  try {
    const payload = await checkHealth();
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};