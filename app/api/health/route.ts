/**
 * @file route.ts
 * @module api/health
 * @description Health check endpoint for Docker and load balancer
 * @author BharatERP
 * @created 2025-01-27
 */

import { NextResponse } from "next/server";

/**
 * Health check endpoint
 * Returns 200 if service is healthy
 */
export async function GET() {
  try {
    // Basic health check - can be extended to check database, etc.
    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "editor-test",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

