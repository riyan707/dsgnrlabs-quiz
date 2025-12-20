"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AnswerOption } from "@/lib/quiz/types";

/** ---------------------------
 *  UTM READ (from Quiz.tsx localStorage capture)
 *  -------------------------- */
type UtmPayload = {
  source?: string;
  campaign?: string;
  adset?: string;
  content?: string;
};

const UTM_STORAGE_KEY = "dsgnr_utms_v1";

function getStoredUtm(): UtmPayload {
  try {
    return JSON.parse(localStorage.getItem(UTM_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

/** ---------------------------
 *  META PIXEL
 *  -------------------------- */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;


interface ResultsViewProps {
  totalScore: number;
  maxScore: number;
  scorePercent: number;
  answers: Record<string, AnswerOption | undefined>;
  onRestart?: () => void;
}

const insightCopy: Record<
  string,
  {
    strong: string;
    weak: string;
  }
> = {
  offer_clarity: {
    strong: "Messaging is clear and easy to understand.",
    weak: "Messaging and offer clarity need tightening so strangers instantly get it.",
  },
  landing_page_quality: {
    strong: "Landing page looks conversion-ready.",
    weak: "Landing page needs stronger copy, proof, and speed to convert.",
  },
  follow_up_system: {
    strong: "Follow-up system keeps leads warm.",
    weak: "Follow-up and nurture are inconsistent, so leads go cold.",
  },
  tracking_confidence: {
    strong: "Tracking and attribution are under control.",
    weak: "Tracking is shaky, making it hard to double down on winners.",
  },
  sales_process: {
    strong: "Sales process is defined and repeatable.",
    weak: "Sales process isn't consistent, so close rates are volatile.",
  },
  retention_rate: {
    strong: "Retention and referrals are solid, which compounds growth.",
    weak: "Retention and referrals are weak; customers aren't sticking or spreading the word.",
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const deriveInsights = (answers: Record<string, AnswerOption | undefined>) => {
  const summary = Object.entries(insightCopy).flatMap(([id, copy]) => {
    const score = answers[id]?.score;
    if (score === undefined) return [];
    return [{ id, score, copy }];
  });

  const strengths = summary
    .filter((item) => item.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.copy.strong);

  const focusAreas = summary
    .filter((item) => item.score <= 1)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((item) => item.copy.weak);

  return {
    strengths,
    focusAreas,
  };
};

const priceByScore = [75, 300, 1250, 3200];
const billingMultiplierByScore = [1, 4, 3, 2.5];
const leadVolumeByScore = [25, 125, 350, 650];
const conversionRateByScore = [0.04, 0.08, 0.15, 0.25];

const estimateRevenueUpside = (answers: Record<string, AnswerOption | undefined>) => {
  const offerPriceScore = answers.offer_price?.score ?? 1;
  const billingScore = answers.billing_model?.score ?? 0;
  const leadVolumeScore = answers.lead_volume?.score ?? 1;
  const conversionScore = answers.conversion_rate?.score ?? 1;

  const avgTicket = priceByScore[offerPriceScore] ?? priceByScore[1];
  const billingMultiplier = billingMultiplierByScore[billingScore] ?? billingMultiplierByScore[0];
  const monthlyLeads = leadVolumeByScore[leadVolumeScore] ?? leadVolumeByScore[1];
  const currentConversion = conversionRateByScore[conversionScore] ?? conversionRateByScore[1];
  const targetConversion = Math.min(
    conversionRateByScore[Math.min(conversionScore + 1, conversionRateByScore.length - 1)] + 0.05,
    0.35
  );

  const currentRevenue = monthlyLeads * currentConversion * avgTicket * billingMultiplier;
  const optimisedRevenue = monthlyLeads * targetConversion * avgTicket * billingMultiplier;
  const upside = Math.max(0, Math.round(optimisedRevenue - currentRevenue));

  return {
    upside,
    details: {
      avgTicket,
      billingMultiplier,
      billingLabel: answers.billing_model?.label ?? "current billing model",
      priceLabel: answers.offer_price?.label ?? "your current price point",
      monthlyLeads,
      currentConversion: Math.round(currentConversion * 100),
      targetConversion: Math.round(targetConversion * 100),
    },
  };
};

export function ResultsView({
  totalScore,
  maxScore,
  scorePercent,
  answers,
  onRestart,
}: ResultsViewProps) {
  const { strengths, focusAreas } = deriveInsights(answers);
  const revenue = estimateRevenueUpside(answers);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Fire Meta Lead AFTER successful submit (wait + init + track)
  const fireMetaLead = () => {
    let attempts = 0;
    const maxAttempts = 30; // 30 * 200ms = 6 seconds

    const timer = setInterval(() => {
      attempts += 1;

      if (typeof window === "undefined") return;

      const fbq = window.fbq;

      if (fbq) {
        // ensure init happened (safe; ignores duplicates)
        if (PIXEL_ID) {
          try {
            fbq("init", PIXEL_ID);
          } catch {
            // ignore
          }
        }

        fbq("track", "Lead", { value: 1, currency: "USD" });
        fbq("track", "CompleteRegistration");

        console.log("[META] Lead + CompleteRegistration fired ✅", {
          pixelId: PIXEL_ID,
        });

        clearInterval(timer);
        return;
      }

      if (attempts >= maxAttempts) {
        console.log("[META] fbq never became ready ❌", {
          pixelId: PIXEL_ID,
          attempts,
        });
        clearInterval(timer);
      }
    }, 200);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !firstName) return;

    const answerPayload = Object.fromEntries(
      Object.entries(answers)
        .filter(([, answer]) => answer !== undefined)
        .map(([key, answer]) => [key, answer as AnswerOption])
    );

    const weakestCategories = Object.entries(answers)
      .filter(([, answer]) => answer && answer.score <= 1)
      .map(([key]) => key);

    const utm = getStoredUtm();

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log("[SUBMIT] starting", { firstName, email });

      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          email,
          answers: answerPayload,
          totalScore,
          maxScore,
          scorePercent,
          weakestCategories: weakestCategories.length ? weakestCategories : undefined,
          utm,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      console.log("[SUBMIT] success -> firing Lead");

      setIsSuccess(true);
      fireMetaLead();
    } catch (error) {
      setIsSuccess(false);
      setSubmitError(error instanceof Error ? error.message : "Could not send results. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Score Section */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Score</p>
        <p className="text-lg font-semibold">
          {totalScore} / {maxScore}
        </p>
      </div>

      {/* Percent + Progress */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">Percent</p>
          <p className="text-lg font-semibold">{scorePercent}%</p>
        </div>
        <Progress value={scorePercent} aria-label={`Score ${scorePercent}%`} />
      </div>

      {/* Revenue Upside */}
      <div className="space-y-3 rounded-lg border border-muted/60 bg-background p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground">
            Revenue left on the table (per month)
          </p>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Estimate</span>
        </div>
        <p className="text-3xl font-semibold text-primary">{formatCurrency(revenue.upside)}</p>
        <p className="text-sm text-muted-foreground">
          Based on {revenue.details.monthlyLeads} leads/month, raising conversions from{" "}
          {revenue.details.currentConversion}% to about {revenue.details.targetConversion}% and a{" "}
          {revenue.details.priceLabel.toLowerCase()} worth roughly {formatCurrency(revenue.details.avgTicket)} (
          {revenue.details.billingLabel.toLowerCase()} ~ {revenue.details.billingMultiplier}x value).
        </p>
      </div>

      {/* Snapshot */}
      <div className="space-y-3 rounded-lg border border-muted/60 bg-muted/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-muted-foreground">Personalised snapshot</p>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Your mix</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Strengths</p>
            {strengths.length ? (
              <ul className="space-y-1 text-sm text-foreground">
                {strengths.map((item) => (
                  <li key={item} className="rounded-md bg-background px-3 py-2 shadow-xs">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Solid foundations to build on.</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Focus areas</p>
            {focusAreas.length ? (
              <ul className="space-y-1 text-sm text-foreground">
                {focusAreas.map((item) => (
                  <li key={item} className="rounded-md bg-background px-3 py-2 shadow-xs">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No glaring gaps – time to scale the winners.</p>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          We'll tailor an action plan around the weak spots above, especially the messaging if it scored low.
        </p>
      </div>

      {/* Email Capture */}
      <Card className="border-muted/60 bg-background/70 shadow-sm">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Want the full breakdown?</h3>
            <p className="text-sm text-muted-foreground">
              Enter your name & email and we'll send your score, bottlenecks, and the fix guide.
            </p>
          </div>

          <form className="flex flex-col gap-3 sm:flex-row sm:items-center" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
                if (submitError) setSubmitError(null);
                if (isSuccess) setIsSuccess(false);
              }}
              required
              disabled={isSubmitting}
            />

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (submitError) setSubmitError(null);
                if (isSuccess) setIsSuccess(false);
              }}
              required
              disabled={isSubmitting}
            />

            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || !email || !firstName}>
              {isSubmitting ? "Sending..." : isSuccess ? "Sent" : "Send My Results"}
            </Button>
          </form>

          {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

          {isSuccess ? (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Check your inbox — your results are on the way.
            </p>
          ) : null}
        </CardContent>
      </Card>

      {onRestart ? (
        <div className="pt-2">
          <Button variant="outline" onClick={onRestart} className="w-full sm:w-auto">
            Retake quiz
          </Button>
        </div>
      ) : null}
    </div>
  );
}
