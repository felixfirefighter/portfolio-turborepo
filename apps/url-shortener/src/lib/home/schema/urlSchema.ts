import { z } from 'zod';

export const urlSchema = z.object({
  url: z.url('Invalid URL format'),
});

export type UrlSchema = z.infer<typeof urlSchema>;