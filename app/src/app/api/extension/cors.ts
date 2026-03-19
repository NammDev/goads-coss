import { NextResponse } from "next/server";

/** CORS headers for Chrome extension API endpoints */
export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

/** Standard OPTIONS handler for CORS preflight */
export function handleOptions() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

/** JSON response with CORS headers */
export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders() });
}
