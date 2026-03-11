import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalSpent: {
      amount: 1250.75,
      trend: 0.15,
    },
    eventsPerMonth: [
      { name: 'Jan', value: 12 },
      { name: 'Feb', value: 19 },
      { name: 'Mar', value: 3 },
      { name: 'Apr', value: 5 },
      { name: 'May', value: 2 },
      { name: 'Jun', value: 3 },
    ],
    giftTypeDistribution: [
      { name: 'Physical', value: 400 },
      { name: 'Digital', value: 300 },
      { name: 'Experience', value: 300 },
      { name: 'Gift Card', value: 200 },
    ],
    spendingByBeneficiary: [
      { name: 'John Doe', value: 500 },
      { name: 'Jane Smith', value: 750 },
    ],
    transactions: [
      {
        id: '1',
        beneficiary: 'John Doe',
        event: 'Birthday',
        date: '2023-01-15',
        amount: 50.0,
      },
      {
        id: '2',
        beneficiary: 'Jane Smith',
        event: 'Wedding',
        date: '2023-02-20',
        amount: 200.0,
      },
    ],
  });
}
