import { Button } from "@/components/ui/button";
import { AnswerOption, Question } from "@/lib/quiz/types";

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
              variant={isSelected ? "default" : "outline"}
              className="flex w-full justify-between whitespace-normal text-left"
              onClick={() => onSelectOption(option)}
              aria-pressed={isSelected}
            >
              <span className="pr-3 font-medium">{option.label}</span>
              {isSelected ? <span className="text-xs text-muted-foreground">Selected</span> : null}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
