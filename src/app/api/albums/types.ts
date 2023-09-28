import { z } from 'zod';

export const AlbumZodObject = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
});

export type Album = z.infer<typeof AlbumZodObject>;
