import { NextRequest, NextResponse } from 'next/server';

import { buildApiUrl } from '@/lib/api';
import { getAuthorizedHeaders } from '@/lib/server-api';

function getGiftType(eventType: string) {
  switch (eventType.toLowerCase()) {
    case 'birthday':
      return 'Gift Card';
    case 'wedding':
      return 'Physical';
    case 'anniversary':
      return 'Experience';
    default:
      return 'Digital';
  }
}

function getEventAmount(event: any) {
  const pricedGifts = (event.gifts ?? []).filter((gift: any) => typeof gift.price === 'number');

  if (pricedGifts.length > 0) {
    return pricedGifts.reduce((sum: number, gift: any) => sum + gift.price, 0);
  }

  const baseAmounts: Record<string, number> = {
    birthday: 50,
    wedding: 200,
    anniversary: 120,
    graduation: 80,
  };

  return baseAmounts[event.type?.toLowerCase()] ?? 40;
}

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(buildApiUrl('/events'), {
    headers,
    cache: 'no-store',
  });

  const events = await response.json();

  const transactions = events.map((event: any) => {
    const amount = getEventAmount(event);
    const beneficiaryName = event.beneficiary
      ? `${event.beneficiary.firstName} ${event.beneficiary.lastName}`
      : 'Unknown beneficiary';

    return {
      id: event.id,
      beneficiary: beneficiaryName,
      event: event.title,
      date: event.date,
      amount,
      giftType: getGiftType(event.type),
    };
  });

  const totalSpentAmount = transactions.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);

  const eventsPerMonthMap = new Map<string, number>();
  transactions.forEach((transaction: any) => {
    const month = new Date(transaction.date).toLocaleDateString(undefined, { month: 'short' });
    eventsPerMonthMap.set(month, (eventsPerMonthMap.get(month) ?? 0) + 1);
  });

  const giftTypeDistributionMap = new Map<string, number>();
  transactions.forEach((transaction: any) => {
    giftTypeDistributionMap.set(
      transaction.giftType,
      (giftTypeDistributionMap.get(transaction.giftType) ?? 0) + transaction.amount,
    );
  });

  const spendingByBeneficiaryMap = new Map<string, number>();
  transactions.forEach((transaction: any) => {
    spendingByBeneficiaryMap.set(
      transaction.beneficiary,
      (spendingByBeneficiaryMap.get(transaction.beneficiary) ?? 0) + transaction.amount,
    );
  });

  return NextResponse.json({
    totalSpent: {
      amount: totalSpentAmount,
      trend: transactions.length > 1 ? 0.12 : 0,
    },
    eventsPerMonth: Array.from(eventsPerMonthMap.entries()).map(([name, value]) => ({ name, value })),
    giftTypeDistribution: Array.from(giftTypeDistributionMap.entries()).map(([name, value]) => ({ name, value })),
    spendingByBeneficiary: Array.from(spendingByBeneficiaryMap.entries()).map(([name, value]) => ({ name, value })),
    transactions,
  });
}
