import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { buildApiUrl } from '@/lib/api';

async function getUserId(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token?.user?.id;
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(
    buildApiUrl(`/beneficiaries?userId=${encodeURIComponent(userId)}`),
    {
      cache: 'no-store',
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const response = await fetch(buildApiUrl('/beneficiaries'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...body,
      userId,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
