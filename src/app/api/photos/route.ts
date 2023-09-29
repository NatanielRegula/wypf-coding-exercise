import { NextResponse } from 'next/server';
import { Photo, PhotoZodObject } from './types';

export async function GET(request: Request): Promise<NextResponse<Photo[]>> {
  const { searchParams } = new URL(request.url);

  const requestedAlbumId = searchParams.get('albumId');

  const params = new URLSearchParams();

  if (requestedAlbumId !== null) {
    params.append('albumId', requestedAlbumId);
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?${params.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
        credentials: 'same-origin',
      },
    }
  );

  const rawData = await res.json();

  const validatedPhotosAndErrorsAsNull = rawData.map((data: unknown) => {
    try {
      return PhotoZodObject.parse(data);
    } catch (error) {
      console.error('Validation error:', error);
      return null;
    }
  });

  const validatedPhotos: Photo[] = validatedPhotosAndErrorsAsNull.filter(
    (photo: Photo | null) => photo !== null
  );

  return NextResponse.json(validatedPhotos);
}
