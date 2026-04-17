import { uploadCv } from './cv.service.js';

export const uploadCvController = async (req, res, next) => {
  try {
    const response = await uploadCv(req.file);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};