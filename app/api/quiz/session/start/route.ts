import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { session_id, email, first_name, utm } = body ?? {};

  if (!session_id || !email) {
    return NextResponse.json({ error: "session_id and email required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("quiz_sessions")
    .upsert(
      {
        session_id: String(session_id),
        email: String(email).toLowerCase().trim(),
        first_name: first_name ? String(first_name).trim() : null,
        utm: utm ?? null,
        status: "started",
        last_question_index: 0,
        last_question_id: null,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: "session_id" }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
