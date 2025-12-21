import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { session_id } = body ?? {};

  if (!session_id) return NextResponse.json({ error: "session_id required" }, { status: 400 });

  const now = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("quiz_sessions")
    .update({
      status: "completed",
      completed_at: now,
      last_seen_at: now,
    })
    .eq("session_id", String(session_id));

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
