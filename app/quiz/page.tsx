import { Quiz } from "@/components/quiz/Quiz";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-muted/20 px-4 py-10 sm:px-8">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <Quiz />
      </div>
    </div>
  );
}
