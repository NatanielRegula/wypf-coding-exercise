import { NextResponse } from 'next/server';
import { User, UserZodObject } from './types';

export async function GET(request: Request): Promise<NextResponse<User[]>> {
  const { searchParams } = new URL(request.url);

  const requestedUserId = searchParams.get('userId');

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${requestedUserId ?? ''}`,
    {
      headers: {
        'Content-Type': 'application/json',
        credentials: 'same-origin',
      },
    }
  );

  const rawData = await res.json();

  if (requestedUserId !== null) {
    return NextResponse.json([UserZodObject.parse(rawData)]);
  }

  const validatedUsersAndErrorsAsNull = rawData.map((data: unknown) => {
    try {
      return UserZodObject.parse(data);
    } catch (error) {
      console.error('Validation error:', error);
      return null;
    }
  });

  const validatedUsers: User[] = validatedUsersAndErrorsAsNull.filter(
    (user: User | null) => user !== null
  );

  return NextResponse.json(validatedUsers);
}
