import { NextResponse } from "next/server";

const customerData = [
  { name: "Jan", signups: 220 },
  { name: "Feb", signups: 180 },
  { name: "Mar", signups: 300 },
  { name: "Apr", signups: 270 },
  { name: "May", signups: 200 },
];

export async function GET() {
  return NextResponse.json({ data: customerData });
}
