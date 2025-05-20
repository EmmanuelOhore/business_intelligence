import { NextResponse } from "next/server";

const revenueData = [
  { name: "Subscriptions", value: 650 },
  { name: "One-Time Purchases", value: 250 },
  { name: "Affiliate Income", value: 100 },
];

export async function GET() {
  return NextResponse.json({ data: revenueData });
}
