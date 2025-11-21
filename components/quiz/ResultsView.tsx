import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ResultsViewProps {
  totalScore: number;
  maxScore: number;
  scorePercent: number;
  onRestart?: () => void;
}

const getMessage = (scorePercent: number) => {
  if (scorePercent <= 39) return "Your funnel is leaking heavily.";
  if (scorePercent <= 69) return "Your funnel is okay but leaving money on the table.";
  return "Your funnel is performing well with room for optimisation.";
};

export function ResultsView({ totalScore, maxScore, scorePercent, onRestart }: ResultsViewProps) {
  const message = getMessage(scorePercent);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Score</p>
        <p className="text-lg font-semibold">
          {totalScore} / {maxScore}
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">Percent</p>
          <p className="text-lg font-semibold">{scorePercent}%</p>
        </div>
        <Progress value={scorePercent} aria-label={`Score ${scorePercent}%`} />
      </div>
      <p className="text-base font-medium leading-relaxed">{message}</p>
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
