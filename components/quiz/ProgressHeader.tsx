import { Progress } from "@/components/ui/progress";

interface ProgressHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function ProgressHeader({ currentQuestionIndex, totalQuestions }: ProgressHeaderProps) {
  const displayNumber = currentQuestionIndex + 1;
  const percent = Math.min(100, Math.round((displayNumber / totalQuestions) * 100));

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Progress</p>
        <h2 className="text-lg font-semibold">{`Question ${displayNumber} of ${totalQuestions}`}</h2>
      </div>
      <Progress value={percent} aria-label={`Progress: ${percent}%`} />
    </div>
  );
}
