import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

/**
 * Zod v4 schema
 */
const payloadSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  answers: z.record(
    z.string(),
    z
      .object({
        id: z.string(),
        label: z.string(),
        score: z.coerce.number(),
      })
      .passthrough()
  ),
  totalScore: z.coerce.number(),
  maxScore: z.coerce.number(),
  scorePercent: z.coerce.number().min(0).max(100),
  weakestCategories: z.array(z.string()).optional(),
  variant: z.enum(["A", "B"]).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      campaign: z.string().optional(),
      adset: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
});

/**
 * Supabase server client (service role)
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;

/**
 * SES client with explicit credentials (fixes most local failures)
 */
const sesClient =
  process.env.AWS_REGION &&
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY
    ? new SESClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        maxAttempts: 1, // fail fast instead of hanging
      })
    : null;

const NOTION_GUIDE_URL =
  "https://dsgnrlabs.notion.site/The-10-Hidden-Profit-Leaks-Killing-Your-Funnel-2b2e147122b68045838ed144cabc7851";
const STRIPE_BOOKING_URL =
  "https://book.stripe.com/28E28s3OpagG43V3OI38401";

const scoreDiagnosis = (scorePercent: number) => {
  if (scorePercent < 40) return "Your funnel is leaking heavily.";
  if (scorePercent < 70)
    return "Your funnel is okay but leaving money on the table.";
  return "Your funnel is performing well with room for optimisation.";
};

const buildEmailHtml = (scorePercent: number, firstName: string) => {
  const diagnosis = scoreDiagnosis(scorePercent);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Your Funnel Score – DSGNR Labs</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      body { margin: 0; padding: 0; background: #f6f7fb; color: #24262b; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
      .wrap { max-width: 640px; margin: 0 auto; padding: 28px 20px; }
      .card { background: #ffffff; border: 1px solid #e8e9ef; border-radius: 12px; padding: 26px; }
      h1 { font-size: 22px; margin: 0 0 12px; color: #000000; }
      p { margin: 0 0 14px; line-height: 1.55; color: #3b3d45; }
      .btn { display: inline-block; padding: 12px 16px; border-radius: 10px; text-decoration: none; font-weight: 600; background: #0ea5e9; color: #ffffff !important; }
      .btn:hover { background: #0284c7; }
      .muted { color: #6b7280; font-size: 12px; }
      .divider { height: 1px; background: #e8e9ef; margin: 18px 0; }
      a { color: #0ea5e9; }
      @media (prefers-color-scheme: dark) {
        body { background: #0b0b0c; color: #e8e8ea; }
        .card { background: #111114; border: 1px solid #1f1f25; }
        h1 { color: #ffffff; }
        p { color: #d1d1d5; }
        .btn { background: #6ee7b7; color: #0b0b0c !important; }
        a { color: #91f2d0; }
        .muted { color: #b3b3b9; }
        .divider { background: #1f1f25; }
      }
    </style>
  </head>

  <body>
    <div class="wrap">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
        Your funnel score + next steps inside.
      </div>

      <div class="card">
        <h1>Your Funnel Score is ${scorePercent}% ✅</h1>
        <p>Hey ${firstName},</p>
        <p>${diagnosis}</p>
        <p>Below is the fastest path to fix the bottlenecks we detected.</p>

        <p style="margin-top:14px;">
          <a class="btn" href="${NOTION_GUIDE_URL}" target="_blank" rel="noopener noreferrer">
            Read the full fix guide →
          </a>
        </p>
        <p style="margin-top:10px;">
          <a class="btn" href="${STRIPE_BOOKING_URL}" target="_blank" rel="noopener noreferrer">
            Secure your slot ($300 refundable deposit) →
          </a>
        </p>

        <p class="muted" style="margin-top:10px;">
          If the buttons do not work, paste these into your browser:<br>
          <span style="word-break:break-all;">${NOTION_GUIDE_URL}</span><br>
          <span style="word-break:break-all;">${STRIPE_BOOKING_URL}</span>
        </p>

        <div class="divider"></div>

        <p>
          <strong>How the deposit works:</strong><br>
          • If we are not a good fit, you get a full refund.<br>
          • If we are a good fit, the $300 goes into your first ad campaign.
        </p>

        <p style="margin-top:12px;">
          We build your full acquisition system in 30 days, and only charge a 15% fee after you profit.
        </p>
      </div>

      <p style="margin-top:16px;text-align:center;font-size:13px;color:#4b5563;font-weight:500;">
        <span style="opacity:0.8;">Sent by</span> <strong style="color:#0ea5e9;">DSGNR Labs</strong>
      </p>
    </div>
  </body>
</html>`;
};

export async function POST(request: Request) {
  // Supabase sanity
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase credentials missing" },
      { status: 500 }
    );
  }

  // SES sanity
  if (!sesClient || !process.env.SES_FROM_EMAIL) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  // Parse body
  const json = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const {
    firstName,
    email,
    answers,
    totalScore,
    maxScore,
    scorePercent,
    weakestCategories,
    variant,
    utm,
  } = parsed.data;

  // Insert submission
  const { error: insertError } = await supabase
    .from("quiz_submissions")
    .insert({
      first_name: firstName,
      email,
      answers,
      total_score: totalScore,
      max_score: maxScore,
      score_percent: scorePercent,
      weakest_categories: weakestCategories ?? null,
      variant: variant ?? "A",
      utm: utm ?? null,
    });

  if (insertError) {
    console.error("SUPABASE INSERT ERROR:", insertError);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }

  // Build + send email
  const html = buildEmailHtml(scorePercent, firstName);

  try {
    const res = await sesClient.send(
      new SendEmailCommand({
        Destination: { ToAddresses: [email] },
        Source: process.env.SES_FROM_EMAIL,
        Message: {
          Subject: {
            Data: "Your Funnel Score + Next Steps (DSGNR Labs)",
            Charset: "UTF-8",
          },
          Body: {
            Html: { Data: html, Charset: "UTF-8" },
          },
        },
      })
    );

    console.log("SES SEND SUCCESS:", res?.$metadata);
  } catch (error: any) {
    console.error("SES SEND ERROR:", error?.name, error?.message, error);

    return NextResponse.json(
      {
        error: "Failed to send email",
        name: error?.name,
        message: error?.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
