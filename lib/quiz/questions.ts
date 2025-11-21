import { AnswerOption, Question } from "./types";

const makeOptions = (id: string, labels: [string, string, string, string]): AnswerOption[] =>
  labels.map((label, idx) => ({
    id: `${id}_${idx + 1}`,
    label,
    score: idx, // 0,1,2,3
  }));

export const questions: Question[] = [
  {
    id: "offer_price",
    title: "What is the price of your main product or service?",
    description: "Choose the closest range.",
    options: makeOptions("offer_price", [
      "Under $100",
      "$100 – $500",
      "$500 – $2,000",
      "$2,000+",
    ]),
  },
  {
    id: "billing_model",
    title: "How do you typically charge your clients?",
    description: "Select the option that matches your primary model.",
    options: makeOptions("billing_model", [
      "One-time payment",
      "Monthly retainer",
      "Hybrid (setup + monthly)",
      "Flexible / depends on client",
    ]),
  },
  {
    id: "monthly_revenue",
    title: "What is your current monthly revenue?",
    description: "Rough estimate is fine.",
    options: makeOptions("monthly_revenue", [
      "$0 – $1,000",
      "$1,000 – $5,000",
      "$5,000 – $20,000",
      "$20,000+",
    ]),
  },
  {
    id: "traffic_volume",
    title: "How much qualified traffic do you get per month?",
    description: "People who could realistically buy.",
    options: makeOptions("traffic_volume", [
      "Under 1,000 visits",
      "1,000 – 5,000 visits",
      "5,000 – 20,000 visits",
      "20,000+ visits",
    ]),
  },
  {
    id: "lead_volume",
    title: "How many leads do you generate monthly?",
    options: makeOptions("lead_volume", [
      "Fewer than 50",
      "50 – 200",
      "200 – 500",
      "500+ leads",
    ]),
  },
  {
    id: "conversion_rate",
    title: "What’s your lead-to-customer conversion rate?",
    description: "If you don’t track it, pick the closest guess.",
    options: makeOptions("conversion_rate", [
      "Under 5%",
      "5% – 10%",
      "10% – 20%",
      "20%+",
    ]),
  },
  {
    id: "offer_clarity",
    title: "How clear is your core offer to a stranger?",
    options: makeOptions("offer_clarity", [
      "Unclear / people get confused",
      "Some clarity, but not sharp",
      "Clear and easy to explain",
      "Crystal clear + strong urgency",
    ]),
  },
  {
    id: "landing_page_quality",
    title: "How effective is your main landing page?",
    options: makeOptions("landing_page_quality", [
      "Generic or slow",
      "Basic but understandable",
      "Good copy + proof",
      "Tested, fast, built to convert",
    ]),
  },
  {
    id: "follow_up_system",
    title: "How mature is your follow-up system?",
    options: makeOptions("follow_up_system", [
      "No follow-up",
      "Manual and inconsistent",
      "Semi-automated",
      "Fully automated + personalised",
    ]),
  },
  {
    id: "tracking_confidence",
    title: "How confident are you in tracking & attribution?",
    options: makeOptions("tracking_confidence", [
      "No tracking",
      "Basic analytics only",
      "Tracking key channels",
      "Full-funnel tracking with QA",
    ]),
  },
  {
    id: "sales_process",
    title: "How defined is your sales process?",
    options: makeOptions("sales_process", [
      "No defined process",
      "Loose steps, varies a lot",
      "Documented process",
      "Optimised + enforced process",
    ]),
  },
  {
    id: "retention_rate",
    title: "How strong is retention / repeat business?",
    description: "If you're not sure, estimate.",
    options: makeOptions("retention_rate", [
      "Low / lots of churn",
      "Okay but inconsistent",
      "Strong repeat/retention",
      "Very strong + referrals happen naturally",
    ]),
  },
];
