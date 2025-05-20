// File: src/app/api/sales/route.ts
import { NextResponse } from 'next/server';

const salesData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 10000 },
  { name: "Mar", revenue: 15000 },
  { name: "Apr", revenue: 14000 },
  { name: "May", revenue: 9000 },
];

export async function GET() {
  return NextResponse.json({ data: salesData });
}
