import { Quiz } from "@/components/quiz/Quiz";
import { Badge } from "@/components/ui/badge";

export default function QuizPage() {
  return (
    <div
      className="min-h-screen bg-[#f1f0ee] text-[#262626]"
      style={{
        ["--background" as string]: "#f1f0ee",
        ["--foreground" as string]: "#262626",
        ["--primary" as string]: "#d8b75c",
        ["--primary-foreground" as string]: "#262626",
        ["--accent" as string]: "#d8b75c",
        ["--muted" as string]: "#e7e4dc",
        ["--muted-foreground" as string]: "#4b4b4b",
        ["--ring" as string]: "#4d96ff",
      }}
    >
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 pb-16 pt-10 sm:pt-8">
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <div className="mb-6 px-4 py-3  transition-opacity hover:opacity-90">
              <img src="/Logo@4x.png" alt="DSGNR Labs logo" className="h-7 w-auto sm:h-6" />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Find Out If Your Funnel Is Leaking Profit{" "}
                <span className="text-[#d8b75c] ">In 60 Seconds.</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-[#3a3a3a] sm:text-xl">
                Answer 12 quick questions and get a personalised breakdown of the exact bottlenecks slowing your growth + clear steps to fix them.
              </p>
              <Badge 
                variant="secondary" 
                className="rounded-full px-4 py-1 text-sm font-medium bg-[#d8b75c]/20 text-[#262626] border border-[#d8b75c]/40"
              >
                BONUS: See how much revenue you’re leaving on the table.
              </Badge>
            </div>
          
          </div>
        </section>
 
        <section className="mt-2.5 w-full sm:mt-20">
          <div className="rounded-2xl border ">
            <Quiz />
          </div>
        </section>

        <footer className="mt-12 text-center text-xs font-semibold tracking-wide text-[#4b4b4b]">
          2025 DSGNR Labs
        </footer>
      </main>
    </div>
  );
}
