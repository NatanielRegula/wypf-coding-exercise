import { NextResponse } from 'next/server';
import { Album, AlbumsApiResponse, AlbumZodObject } from './types';

export async function GET(
  request: Request
): Promise<NextResponse<AlbumsApiResponse>> {
  const { searchParams } = new URL(request.url);

  const requestedUserId = searchParams.get('userId');

  const params = new URLSearchParams();

  if (requestedUserId !== null) {
    params.append('userId', requestedUserId);
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?${params.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
        credentials: 'same-origin',
      },
    }
  );

  const rawData = await res.json();

  const validatedAlbumsAndErrorsAsNull = rawData.map((data: unknown) => {
    try {
      return AlbumZodObject.parse(data);
    } catch (error) {
      console.error('Validation error:', error);
      return null;
    }
  });

  const validatedAlbums: Album[] = validatedAlbumsAndErrorsAsNull.filter(
    (album: Album | null) => album !== null
  );

  const itemsPerPage = Math.min(
    Math.max(parseInt(searchParams.get('itemsPerPage') ?? '10'), 5),
    20
  );

  const pagesCount = Math.ceil(validatedAlbums.length / itemsPerPage);

  const currentPage = Math.min(
    Math.max(parseInt(searchParams.get('page') ?? '1'), 1),
    pagesCount
  );

  const sliceStart = (currentPage - 1) * itemsPerPage;
  const sliceEnd = sliceStart + itemsPerPage;

  const selectedRange = validatedAlbums.slice(sliceStart, sliceEnd);

  const hasPrevPage = sliceStart > 0;
  const hasNextPage = sliceEnd < validatedAlbums.length;

  return NextResponse.json({
    data: selectedRange,
    hasPrevPage: hasPrevPage,
    hasNextPage: hasNextPage,
    pagesCount: pagesCount,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  });
}
