import { z } from 'zod';

export const PhotoZodObject = z.object({
  albumId: z.number(),
  id: z.number(),
  title: z.string(),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
});

export type Photo = z.infer<typeof PhotoZodObject>;
