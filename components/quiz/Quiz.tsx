"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { questions } from "@/lib/quiz/questions";
import { AnswerOption } from "@/lib/quiz/types";

import { ProgressHeader } from "./ProgressHeader";
import { QuestionStep } from "./QuestionStep";
import { ResultsView } from "./ResultsView";

export function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerOption | undefined>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, ans) => sum + (ans?.score ?? 0), 0),
    [answers],
  );

  const maxScore = useMemo(
    () => questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.score)), 0),
    [],
  );

  const scorePercent = Math.round((totalScore / maxScore) * 100);

  const handleSelect = (option: AnswerOption) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (showResults) return;
    const hasAnswer = !!answers[currentQuestion.id];
    if (!hasAnswer) return;

    if (currentQuestionIndex === totalQuestions - 1) {
      setShowResults(true);
      return;
    }

    setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  };

  const handlePrevious = () => {
    if (showResults) return;
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
  };

  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === totalQuestions - 1;
  const selected = answers[currentQuestion?.id ?? ""];

  return (
    <Card className="w-full max-w-3xl border-muted/60 bg-background/95 shadow-lg">
      <CardContent className="space-y-6 p-4 sm:p-6 lg:p-8">
        {!showResults ? (
          <div className="space-y-6">
            <ProgressHeader currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions} />
            <QuestionStep
              question={currentQuestion}
              selectedOptionId={selected?.id}
              onSelectOption={handleSelect}
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">{Math.round(progress)}% complete</div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button variant="outline" onClick={handlePrevious} disabled={isFirst} className="w-full sm:w-32">
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={!selected} className="w-full sm:w-40">
                  {isLast ? "See My Results" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <ResultsView
            totalScore={totalScore}
            maxScore={maxScore}
            scorePercent={scorePercent}
            onRestart={handleRestart}
          />
        )}
      </CardContent>
    </Card>
  );
}
