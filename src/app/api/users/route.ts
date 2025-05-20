import { UserData } from "../../../mocks/mockData";
export async function GET() {
  return Response.json({ data: UserData });
}