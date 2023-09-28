import { NextResponse } from 'next/server';
import { User, UserZodObject } from './types';

export async function GET(): Promise<NextResponse<User[]>> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    headers: {
      'Content-Type': 'application/json',
      credentials: 'same-origin',
    },
  });

  const rawData = await res.json();

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
