import { NextRequest, NextResponse } from "next/server";

// Placeholder PDF route; final rendering will be implemented later using Playwright.
export async function GET(_req: NextRequest) {
  return NextResponse.json({ status: "stub", message: "PDF export will be implemented after template finalization." });
}


