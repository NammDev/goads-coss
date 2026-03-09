import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://getnada.com/api/v1/inboxes/${encodeURIComponent(email)}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Getnada returned ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
