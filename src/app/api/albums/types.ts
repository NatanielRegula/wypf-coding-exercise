import { z } from 'zod';

export const AlbumZodObject = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
});

export type Album = z.infer<typeof AlbumZodObject>;

export type AlbumsApiResponse = {
  data: Album[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  pagesCount: number;
  currentPage: number;
  itemsPerPage: number;
  isSearchResponse: boolean;
};
