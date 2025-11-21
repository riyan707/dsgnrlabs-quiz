import { Quiz } from "@/components/quiz/Quiz";
import { Badge } from "@/components/ui/badge";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 pb-16 pt-10 sm:gap-12 sm:px-6 md:max-w-6xl md:px-8 lg:gap-16 lg:px-12">
        <section className="flex flex-col items-center text-center sm:items-center sm:text-center lg:items-center lg:text-center">
          <div className="flex w-full flex-col gap-6 sm:gap-8 md:gap-10">
            <div className="flex items-center justify-center ">
              <div className="flex  px-4 py-2 ">
                <img src="/Logo@4x.png" alt="DSGNR Labs logo" className="h-6 w-auto sm:h-6" />
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Find Out If Your Funnel Is Leaking Profit{" "}
                <span className="text-primary">In 60 Seconds.</span>
              </h1>
              <p className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl lg:text-2xl">
                Answer 12 quick questions and get a personalised breakdown of the exact bottlenecks slowing your growth,
                plus clear steps to fix them.
              </p>
              <Badge
                variant="secondary"
                className="inline-flex w-fit items-center justify-center rounded-full border border-primary/40 bg-primary/15 px-4 py-1 text-xs font-medium text-foreground sm:text-sm md:text-base"
              >
                BONUS: See how much revenue you&apos;re leaving on the table.
              </Badge>
            </div>
          </div>
        </section>

        <section className="flex w-full justify-center">
          <Quiz />
        </section>

        <footer className="text-center text-xs font-semibold tracking-wide text-muted-foreground">
          2025 DSGNR Labs
        </footer>
      </main>
    </div>
  );
}
