import { NextRequest } from "next/server";
import { POST as ChatPOST } from "@/app/api/ai/chat/route";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return ChatPOST(req);
}
