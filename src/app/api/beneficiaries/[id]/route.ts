import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { startOfDay } from 'date-fns';

import { buildApiUrl } from '@/lib/api';

type BackendEvent = {
  id: string;
  title: string;
  type: string;
  date: string;
  gifts?: Array<{
    id: string;
    name: string;
    price?: number | null;
    status: string;
  }>;
};

type BackendBeneficiary = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  events: BackendEvent[];
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const userId = token?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const response = await fetch(buildApiUrl(`/beneficiaries/${id}`), {
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(error, { status: response.status });
  }

  const beneficiary = (await response.json()) as BackendBeneficiary;

  if (beneficiary.userId !== userId) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const today = startOfDay(new Date()).getTime();
  const sortedEvents = [...(beneficiary.events ?? [])].sort(
    (first, second) =>
      new Date(first.date).getTime() - new Date(second.date).getTime()
  );
  const upcomingEvents = sortedEvents.filter(
    (event) => new Date(event.date).getTime() >= today
  );
  const pastEvents = sortedEvents.filter(
    (event) => new Date(event.date).getTime() < today
  );
  const timeline = [
    {
      id: `beneficiary-${beneficiary.id}`,
      title: 'Profile created',
      description: `${beneficiary.firstName} was added to your gifting circle.`,
      date: beneficiary.createdAt,
    },
    ...sortedEvents.map((event) => ({
      id: event.id,
      title: event.title,
      description: `${event.type} scheduled`,
      date: event.date,
    })),
  ].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return NextResponse.json({
    ...beneficiary,
    upcomingEvents,
    pastEvents,
    timeline,
  });
}
