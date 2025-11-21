import { AnswerOption, Question } from "./types";

const makeOptions = (id: string, labels: [string, string, string, string]): AnswerOption[] =>
  labels.map((label, idx) => ({
    id: `${id}_${idx + 1}`,
    label,
    score: idx,
  }));

export const questions: Question[] = [
  {
    id: "monthly_revenue",
    title: "What is your current monthly revenue?",
    options: makeOptions("monthly_revenue", ["$0 - $1,000", "$1,000 - $5,000", "$5,000 - $20,000", "$20,000+"]),
  },
  {
    id: "lead_volume",
    title: "How many leads do you generate monthly?",
    options: makeOptions("lead_volume", ["Fewer than 50", "50 - 200", "200 - 500", "500+ leads"],),
  },
  {
    id: "conversion_rate",
    title: "What is your lead-to-customer conversion rate?",
    options: makeOptions("conversion_rate", ["Under 5%", "5% - 10%", "10% - 20%", "20%+"],),
  },
  {
    id: "follow_up_system",
    title: "How mature is your follow-up system?",
    options: makeOptions("follow_up_system", ["No follow-up", "Manual and inconsistent", "Semi-automated", "Fully automated and personalized"],),
  },
  {
    id: "tracking_confidence",
    title: "How confident are you in your tracking and attribution?",
    options: makeOptions("tracking_confidence", ["No tracking", "Basic analytics only", "Attribution on key channels", "Full-funnel tracking with QA"],),
  },
  {
    id: "email_nurture",
    title: "How strong is your email nurture?",
    options: makeOptions("email_nurture", ["No sequences", "1-2 basic sequences", "Segmented drips", "Behavioral, tested flows"],),
  },
  {
    id: "ad_channels",
    title: "How diversified are your paid channels?",
    options: makeOptions("ad_channels", ["Not running ads", "One channel experimenting", "2-3 channels with ROAS", "Diversified with reliable ROAS"],),
  },
  {
    id: "landing_page_quality",
    title: "How effective are your landing pages?",
    options: makeOptions("landing_page_quality", ["Generic and slow", "Basic but clear", "Good copy with proof", "Tested, fast, and tailored"],),
  },
  {
    id: "offer_clarity",
    title: "How clear is your core offer?",
    options: makeOptions("offer_clarity", ["Unclear value prop", "Some clarity", "Clear with proof", "Crystallized offer with urgency"],),
  },
  {
    id: "pricing_strategy",
    title: "How defined is your pricing strategy?",
    options: makeOptions("pricing_strategy", ["Guesswork", "Competitor-based", "Value-based but untested", "Validated pricing strategy"],),
  },
  {
    id: "sales_process",
    title: "How defined is your sales process?",
    options: makeOptions("sales_process", ["No defined process", "Loose steps", "Documented process", "Optimized, enforced process"],),
  },
  {
    id: "demo_to_close_rate",
    title: "What is your demo-to-close rate?",
    options: makeOptions("demo_to_close_rate", ["Under 10%", "10% - 25%", "25% - 40%", "40%+"],),
  },
  {
    id: "sales_team_size",
    title: "What is your sales team size?",
    options: makeOptions("sales_team_size", ["Solo founder", "1-2 reps", "3-5 reps", "More than 5 reps"],),
  },
  {
    id: "sales_training",
    title: "How do you train sales reps?",
    options: makeOptions("sales_training", ["No training", "Ad-hoc coaching", "Regular playbooks", "Formal training with QA"],),
  },
  {
    id: "objection_handling",
    title: "How do you handle objections?",
    options: makeOptions("objection_handling", ["On the fly", "Basic FAQ", "Scripts with proof", "Data-backed objection bank"],),
  },
  {
    id: "crm_usage",
    title: "How is your CRM used?",
    options: makeOptions("crm_usage", ["No CRM", "Rarely updated", "Used by some", "Source of truth"],),
  },
  {
    id: "pipeline_visibility",
    title: "How visible is your pipeline?",
    options: makeOptions("pipeline_visibility", ["No visibility", "Basic stages", "Stages with forecasting", "Dashboards with SLAs"],),
  },
  {
    id: "reporting_cadence",
    title: "How often do you review metrics?",
    options: makeOptions("reporting_cadence", ["Never", "Monthly", "Weekly", "Daily or real-time"],),
  },
  {
    id: "kpi_focus",
    title: "How focused are your KPIs?",
    options: makeOptions("kpi_focus", ["No KPIs", "Too many KPIs", "Few core KPIs", "North-star with supporting KPIs"],),
  },
  {
    id: "retention_rate",
    title: "What is your retention rate?",
    options: makeOptions("retention_rate", ["Under 70%", "70% - 80%", "80% - 90%", "90%+"],),
  },
  {
    id: "referral_system",
    title: "How strong is your referral system?",
    options: makeOptions("referral_system", ["No program", "Occasional asks", "Simple referral program", "Automated and incentivized"],),
  },
  {
    id: "onboarding_quality",
    title: "How structured is onboarding?",
    options: makeOptions("onboarding_quality", ["Unstructured", "Basic checklist", "Standardized onboarding", "High-touch and automated"],),
  },
  {
    id: "upsell_strategy",
    title: "How defined is your upsell strategy?",
    options: makeOptions("upsell_strategy", ["None", "Opportunistic", "Simple offers", "Programmatic upsells"],),
  },
  {
    id: "churn_reason_tracking",
    title: "How do you track churn reasons?",
    options: makeOptions("churn_reason_tracking", ["Not tracked", "Anecdotes only", "Tagged in CRM", "Structured tracking with action"],),
  },
  {
    id: "cs_response_time",
    title: "What is your typical customer support response time?",
    options: makeOptions("cs_response_time", ["Over 48 hours", "24-48 hours", "Same day", "Within hours"],),
  },
  {
    id: "feature_adoption",
    title: "How do you track feature adoption?",
    options: makeOptions("feature_adoption", ["Not tracked", "Basic events", "Key features tracked", "Adoption playbooks run"],),
  },
  {
    id: "product_fit_confidence",
    title: "How confident are you in product-market fit?",
    options: makeOptions("product_fit_confidence", ["Unsure", "Some fit in niches", "Clear fit in core segments", "Strong fit validated"],),
  },
  {
    id: "brand_positioning",
    title: "How refined is your brand positioning?",
    options: makeOptions("brand_positioning", ["Undefined", "Basic tagline", "Positioning statement", "Tested, resonant positioning"],),
  },
  {
    id: "website_load_speed",
    title: "How performant is your website?",
    options: makeOptions("website_load_speed", ["Slow (3s+)", "Average (2-3s)", "Fast (<2s)", "Very fast and optimized"],),
  },
  {
    id: "seo_basics",
    title: "How solid are your SEO fundamentals?",
    options: makeOptions("seo_basics", ["No SEO", "Basic metadata", "Content and technical basics", "Roadmap with regular audits"],),
  },
  {
    id: "content_cadence",
    title: "How often do you publish content?",
    options: makeOptions("content_cadence", ["Rarely", "Monthly", "Biweekly", "Weekly or more"],),
  },
  {
    id: "social_proof",
    title: "How much social proof do you present?",
    options: makeOptions("social_proof", ["None", "Few logos", "Good mix of proof", "Powerful proof across pages"],),
  },
  {
    id: "case_studies",
    title: "How many case studies do you have?",
    options: makeOptions("case_studies", ["None", "One light case", "Several brief cases", "Deep, specific case studies"],),
  },
  {
    id: "testimonials",
    title: "How strong are your testimonials?",
    options: makeOptions("testimonials", ["None", "Generic quotes", "Segmented quotes", "Video and quantified testimonials"],),
  },
  {
    id: "video_demos",
    title: "How do you use video demos?",
    options: makeOptions("video_demos", ["No demos", "One generic demo", "Segmented demos", "Tailored demos per ICP"],),
  },
  {
    id: "webinar_frequency",
    title: "How often do you run webinars?",
    options: makeOptions("webinar_frequency", ["Never", "Quarterly", "Monthly", "Biweekly or more"],),
  },
  {
    id: "blog_traffic",
    title: "What is your monthly blog traffic?",
    options: makeOptions("blog_traffic", ["Under 1k", "1k - 5k", "5k - 20k", "20k+"],),
  },
  {
    id: "organic_leads",
    title: "How many organic leads do you get monthly?",
    options: makeOptions("organic_leads", ["None", "Under 10", "10 - 30", "30+"],),
  },
  {
    id: "paid_leads",
    title: "How many paid leads do you get monthly?",
    options: makeOptions("paid_leads", ["None", "Under 50", "50 - 150", "150+"],),
  },
  {
    id: "cost_per_lead",
    title: "How does your cost per lead compare to target?",
    options: makeOptions("cost_per_lead", ["Unknown", "Higher than target", "Near target", "Below target"],),
  },
  {
    id: "lifetime_value",
    title: "What is your average customer lifetime value?",
    options: makeOptions("lifetime_value", ["Unknown", "Low (<$500)", "Mid ($500-$2k)", "High (>$2k)"],),
  },
  {
    id: "payback_period",
    title: "What is your payback period on acquisition?",
    options: makeOptions("payback_period", ["Unknown", "Over 6 months", "3-6 months", "Under 3 months"],),
  },
  {
    id: "cash_flow_buffer",
    title: "How much cash flow buffer do you maintain?",
    options: makeOptions("cash_flow_buffer", ["Under 1 month", "1-2 months", "3-6 months", "6+ months"],),
  },
  {
    id: "budget_allocation",
    title: "How disciplined is your budget allocation?",
    options: makeOptions("budget_allocation", ["No budget plan", "Rough percentages", "Budget by channel", "Budget with ROI guardrails"],),
  },
  {
    id: "analytics_stack",
    title: "How mature is your analytics stack?",
    options: makeOptions("analytics_stack", ["No stack", "Google Analytics only", "GA plus heatmaps", "GA, product, and BI stack"],),
  },
  {
    id: "attribution_confidence",
    title: "How confident are you in attribution?",
    options: makeOptions("attribution_confidence", ["No model", "Last-click only", "Blended with gaps", "Multi-touch with validation"],),
  },
  {
    id: "experiment_velocity",
    title: "How fast do you run experiments?",
    options: makeOptions("experiment_velocity", ["No experiments", "Occasional tests", "1-2 tests/month", "Weekly test cadence"],),
  },
  {
    id: "roadmap_clarity",
    title: "How clear is your product roadmap?",
    options: makeOptions("roadmap_clarity", ["No roadmap", "Quarterly wishlist", "Prioritized backlog", "Outcome-based roadmap"],),
  },
  {
    id: "engineering_bandwidth",
    title: "How is engineering capacity managed?",
    options: makeOptions("engineering_bandwidth", ["Overcommitted", "Tight capacity", "Some buffer", "Healthy capacity pipeline"],),
  },
  {
    id: "design_resources",
    title: "How available are design resources?",
    options: makeOptions("design_resources", ["None", "Freelance ad-hoc", "Part-time design", "Dedicated design partner"],),
  },
  {
    id: "qa_process",
    title: "How robust is your QA process?",
    options: makeOptions("qa_process", ["No QA", "Basic smoke tests", "Checklist-based", "Automated and manual QA"],),
  },
  {
    id: "release_frequency",
    title: "How often do you release?",
    options: makeOptions("release_frequency", ["Less than monthly", "Monthly", "Biweekly", "Weekly or faster"],),
  },
  {
    id: "incident_response",
    title: "How planned is your incident response?",
    options: makeOptions("incident_response", ["No process", "Ad-hoc", "Runbooks exist", "Runbooks with drills"],),
  },
  {
    id: "data_backup",
    title: "How reliable are your backups?",
    options: makeOptions("data_backup", ["No backups", "Periodic manual", "Automated weekly", "Automated daily and tested"],),
  },
  {
    id: "access_control",
    title: "How do you manage access control?",
    options: makeOptions("access_control", ["Shared accounts", "Basic roles", "Least-privilege for core apps", "Least-privilege with audits"],),
  },
  {
    id: "compliance_posture",
    title: "How mature is your compliance posture?",
    options: makeOptions("compliance_posture", ["None", "Informal practices", "Documented policies", "Audited or certified"],),
  },
  {
    id: "hiring_plan",
    title: "How defined is your hiring plan?",
    options: makeOptions("hiring_plan", ["No plan", "Plan but no pipeline", "Pipeline building", "Active hiring with SLAs"],),
  },
  {
    id: "culture_alignment",
    title: "How embedded are your company values?",
    options: makeOptions("culture_alignment", ["Undefined values", "Values on paper", "Values in rituals", "Values drive decisions"],),
  },
];
