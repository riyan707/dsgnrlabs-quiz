import { Button } from "@/components/ui/button";
import { AnswerOption, Question } from "@/lib/quiz/types";
import { cn } from "@/lib/utils";

interface QuestionStepProps {
  question: Question;
  selectedOptionId?: string;
  onSelectOption: (option: AnswerOption) => void;
}

export function QuestionStep({ question, selectedOptionId, onSelectOption }: QuestionStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold leading-tight">{question.title}</h2>
        {question.description ? <p className="text-sm text-muted-foreground">{question.description}</p> : null}
      </div>
      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <Button
              key={option.id}
              variant="outline"
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl border-2 bg-transparent text-left px-3 py-3 text-sm leading-tight transition-all hover:!bg-transparent hover:!text-foreground sm:px-4 sm:py-4 sm:text-base sm:leading-snug md:gap-4",
                isSelected
                  ? "border-black/70 shadow-md shadow-black/5 hover:border-black/80"
                  : "border-black/25 hover:border-black/45 hover:shadow-sm hover:shadow-black/5",
              )}
              onClick={() => onSelectOption(option)}
              aria-pressed={isSelected}
            >
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-3 font-medium md:whitespace-normal md:overflow-visible md:text-clip">
                {option.label}
              </span>
              {isSelected ? <span className="text-xs text-muted-foreground">Selected</span> : null}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
