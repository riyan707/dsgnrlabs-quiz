import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { session_id, last_question_index, last_question_id } = body ?? {};

  if (!session_id || typeof last_question_index !== "number") {
    return NextResponse.json({ error: "session_id + last_question_index required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("quiz_sessions")
    .update({
      status: "in_progress",
      last_question_index,
      last_question_id: last_question_id ?? null,
      last_seen_at: new Date().toISOString(),
    })
    .eq("session_id", String(session_id));

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
