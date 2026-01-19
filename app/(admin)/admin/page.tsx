import { createSupabaseServerClient } from "@/lib/supabase/server";

const DROP_CUTOFF_HOURS = 48;

function daysAgoISO(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function hoursAgoISO(h: number) {
  const d = new Date();
  d.setHours(d.getHours() - h);
  return d.toISOString();
}

function pct(n: number, d: number) {
  if (!d) return 0;
  return Math.round((n / d) * 100);
}

function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="text-xs text-white/40">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-white/90">{value}</div>
      {sub ? <div className="mt-1 text-xs text-white/40">{sub}</div> : null}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();

  const since7 = daysAgoISO(7);
  const dropCutoffNow = hoursAgoISO(DROP_CUTOFF_HOURS);

  // ----------------------------
  // ALL-TIME METRICS
  // ----------------------------
  const { count: startedAll, error: a1 } = await supabase
    .from("quiz_sessions")
    .select("*", { count: "exact", head: true });
  if (a1) throw new Error(a1.message);

  const { count: completedAll, error: a2 } = await supabase
    .from("quiz_sessions")
    .select("*", { count: "exact", head: true })
    .not("completed_at", "is", null);
  if (a2) throw new Error(a2.message);

  const { count: activeAll, error: a3 } = await supabase
    .from("quiz_sessions")
    .select("*", { count: "exact", head: true })
    .gte("last_seen_at", dropCutoffNow)
    .is("completed_at", null);
  if (a3) throw new Error(a3.message);

  const { count: droppedAll, error: a4 } = await supabase
    .from("quiz_sessions")
    .select("*", { count: "exact", head: true })
    .lt("last_seen_at", dropCutoffNow)
    .is("completed_at", null);
  if (a4) throw new Error(a4.message);

  const startedA = startedAll ?? 0;
  const completedA = completedAll ?? 0;
  const activeA = activeAll ?? 0;
  const droppedA = droppedAll ?? 0;

  const completionRateAll = pct(completedA, startedA);
  const dropOffRateAll = pct(droppedA, startedA);
  const activeRateAll = pct(activeA, startedA);

  // ----------------------------
  // 7-DAY METRICS
  // ----------------------------
  const { count: started7d, error: s1 } = await supabase
    .from("quiz_sessions")
    .select("*", { count: "exact", head: true })
    .gte("started_at", since7);
  if (s1) throw new Error(s1.message);

  const { count: completed7d, error: s2 } = await supabase
    .from("quiz_sessions")
    .select("*", { count: "exact", head: true })
    .gte("completed_at", since7)
    .not("completed_at", "is", null);
  if (s2) throw new Error(s2.message);

  const { count: active7d, error: s3 } = await supabase
    .from("quiz_sessions")
    .select("*", { count: "exact", head: true })
    .gte("started_at", since7)
    .gte("last_seen_at", dropCutoffNow)
    .is("completed_at", null);
  if (s3) throw new Error(s3.message);

  const { count: dropped7d, error: s4 } = await supabase
    .from("quiz_sessions")
    .select("*", { count: "exact", head: true })
    .gte("started_at", since7)
    .lt("last_seen_at", dropCutoffNow)
    .is("completed_at", null);
  if (s4) throw new Error(s4.message);

  const { count: submissions7d, error: s5 } = await supabase
    .from("quiz_submissions")
    .select("*", { count: "exact", head: true })
    .gte("created_at", since7);
  if (s5) throw new Error(s5.message);

  const started7 = started7d ?? 0;
  const completed7 = completed7d ?? 0;
  const active7 = active7d ?? 0;
  const dropped7 = dropped7d ?? 0;

  const completionRate7d = pct(completed7, started7);
  const dropOffRate7d = pct(dropped7, started7);
  const activeRate7d = pct(active7, started7);

  // ----------------------------
  // COMPACT ACTIVITY FEED
  // ----------------------------
  const { data: recentSessions, error: f1 } = await supabase
    .from("quiz_sessions")
    .select("email, first_name, last_seen_at, completed_at, last_question_index, session_id")
    .order("last_seen_at", { ascending: false })
    .limit(10);
  if (f1) throw new Error(f1.message);

  const { data: recentSubs, error: f2 } = await supabase
    .from("quiz_submissions")
    .select("email, first_name, created_at, score_percent, variant")
    .order("created_at", { ascending: false })
    .limit(10);
  if (f2) throw new Error(f2.message);

  const sessionsFeed = (recentSessions ?? []).map((s) => ({
    type: "session" as const,
    key: `session-${s.session_id}`,
    email: s.email ?? "unknown",
    first_name: s.first_name ?? null,
    ts: s.last_seen_at,
    meta: s.completed_at ? "completed" : "in progress",
    label: s.completed_at ? "completed session" : `at q ${s.last_question_index}`,
  }));

  const subsFeed = (recentSubs ?? []).map((s) => ({
    type: "submission" as const,
    key: `submission-${s.email ?? "unknown"}-${s.created_at}`,
    email: s.email ?? "unknown",
    first_name: s.first_name ?? null,
    ts: s.created_at,
    meta: "submitted",
    label: `${s.score_percent}% · variant ${s.variant}`,
  }));

  const activity = [...sessionsFeed, ...subsFeed]
    .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
    .slice(0, 12);

  return (
    <div className="space-y-6">
      {/* ALL-TIME */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
        <div className="text-sm font-semibold text-white/90">All-time</div>
        <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Started" value={startedA} />
          <StatCard title="Completed" value={`${completedA} · ${completionRateAll}%`} sub="completion rate" />
          <StatCard title="Dropped" value={`${droppedA} · ${dropOffRateAll}%`} sub={`inactive > ${DROP_CUTOFF_HOURS}h`} />
          <StatCard title="Active (now)" value={`${activeA} · ${activeRateAll}%`} sub="seen recently" />
          <StatCard title="Net progress" value={Math.max(0, startedA - droppedA)} sub="started minus dropped" />
        </div>
      </div>

      {/* LAST 7 DAYS */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
        <div className="text-sm font-semibold text-white/90">Last 7 days</div>
        <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Started" value={started7} sub="new sessions started" />
          <StatCard title="Completed" value={`${completed7} · ${completionRate7d}%`} sub="completion rate" />
          <StatCard title="Dropped" value={`${dropped7} · ${dropOffRate7d}%`} sub={`inactive > ${DROP_CUTOFF_HOURS}h`} />
          <StatCard title="Active" value={`${active7} · ${activeRate7d}%`} sub="seen recently" />
          <StatCard title="Submissions" value={submissions7d ?? 0} sub="quiz_submissions rows" />
          <StatCard title="Net progress" value={Math.max(0, started7 - dropped7)} sub="started minus dropped" />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
        <div className="mb-1 text-sm font-semibold text-white/90">Recent activity</div>
        <div className="text-xs text-white/40">Sessions + submissions (latest 12)</div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <div className="bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/60">
            User · Event · Time
          </div>

          <div className="divide-y divide-white/10">
            {activity.length === 0 ? (
              <div className="px-4 py-8 text-sm text-white/40">No activity yet.</div>
            ) : (
              activity.map((a) => {
                const name = a.first_name ? `${a.first_name} · ` : "";
                return (
                  <div key={a.key} className="px-4 py-3">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <div className="text-sm text-white/80 break-all">
                        {name}
                        {a.email}
                      </div>
                      <div className="text-xs text-white/50">
                        {new Date(a.ts).toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-white/50">
                      <span className="text-white/70">{a.meta}:</span> {a.label}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
