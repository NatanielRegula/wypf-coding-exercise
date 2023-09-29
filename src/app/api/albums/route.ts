import { NextResponse } from 'next/server';
import { Album, AlbumZodObject } from './types';

export async function GET(request: Request): Promise<NextResponse<Album[]>> {
  const { searchParams } = new URL(request.url);

  const requestedUserId = searchParams.get('userId');

  const params = new URLSearchParams();

  if (requestedUserId !== null) {
    params.append('userId', requestedUserId);
  }

  console.log(params.toString());

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

  return NextResponse.json(validatedAlbums);
}
