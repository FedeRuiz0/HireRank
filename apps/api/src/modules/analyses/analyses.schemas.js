import { z } from 'zod';

export const AnalyzeRequestSchema = z.object({
  cvId: z.string(),
  jobDescription: z.string()
});

export const AnalysisIdParamsSchema = z.object({
  id: z.string().uuid()
});