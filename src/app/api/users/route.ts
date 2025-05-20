import { NextResponse } from "next/server";
import { UserData } from "../../../mocks/mockData";

export async function GET() {
  return NextResponse.json({ data: UserData });
}
