import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const payloadSchema = z.object({
  session_id: z.string().uuid(),
  event_type: z.enum(["start", "view_question", "complete"]),
  question_id: z.string().optional(),
  question_index: z.number().int().min(0).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      campaign: z.string().optional(),
      adset: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase credentials missing" }, { status: 500 });
  }

  const json = await req.json().catch(() => null);
  const parsed = payloadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { session_id, event_type, question_id, question_index, utm } = parsed.data;

  const { error } = await supabase.from("quiz_events").insert({
    session_id,
    event_type,
    question_id: question_id ?? null,
    question_index: typeof question_index === "number" ? question_index : null,
    utm: utm ?? null,
  });

  if (error) {
    console.error("QUIZ_EVENT_INSERT_ERROR:", error);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
