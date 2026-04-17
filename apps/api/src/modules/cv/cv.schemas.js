import { z } from 'zod';

export const UploadedCvFileSchema = z.object({
  originalname: z.string().min(1),
  mimetype: z.literal('application/pdf'),
  size: z.number().positive(),
  filename: z.string().min(1),
  path: z.string().min(1)
});