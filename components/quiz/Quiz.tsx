"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { questions } from "@/lib/quiz/questions";
import { AnswerOption } from "@/lib/quiz/types";

import { ProgressHeader } from "./ProgressHeader";
import { QuestionStep } from "./QuestionStep";
import { ResultsView } from "./ResultsView";

const loadingMessages = [
  {
    title: "Setting up your score...",
    description: "Crunching your answers to find signal.",
  },
  {
    title: "This is interesting...",
    description: "Spotting where messaging might be leaking.",
  },
  {
    title: "Money is on the table...",
    description: "Estimating revenue missed by weak links.",
  },
  {
    title: "Almost done",
    description: "Packaging your personalised plan.",
  },
];

export function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerOption | undefined>>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

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

  useEffect(() => {
    if (!isLoadingResults) return;

    setLoadingStep(0);
    const timer = setInterval(() => {
      setLoadingStep((prev) => {
        const nextStep = prev + 1;
        if (nextStep >= loadingMessages.length) {
          clearInterval(timer);
          setIsLoadingResults(false);
          setShowResults(true);
          return prev;
        }
        return nextStep;
      });
    }, 850);

    return () => clearInterval(timer);
  }, [isLoadingResults]);

  const handleSelect = (option: AnswerOption) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (showResults) return;
    const hasAnswer = !!answers[currentQuestion.id];
    if (!hasAnswer) return;

    if (currentQuestionIndex === totalQuestions - 1) {
      setIsLoadingResults(true);
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
    setIsLoadingResults(false);
    setLoadingStep(0);
    setCurrentQuestionIndex(0);
  };

  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === totalQuestions - 1;
  const selected = answers[currentQuestion?.id ?? ""];

  return (
    <Card className="w-full max-w-3xl border-muted/60 bg-background/95 shadow-lg">
      <CardContent className="space-y-6 p-4 sm:p-6 lg:p-8">
        {!showResults && !isLoadingResults ? (
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
        ) : isLoadingResults ? (
          <div className="space-y-6 rounded-xl border border-dashed border-muted/60 bg-muted/20 p-6 text-center shadow-sm">
            <div className="mx-auto h-12 w-12 rounded-full border-4 border-muted/60 border-t-primary animate-spin" />
            <div className="space-y-2">
              <p className="text-lg font-semibold">{loadingMessages[loadingStep]?.title}</p>
              <p className="text-sm text-muted-foreground">
                {loadingMessages[loadingStep]?.description ?? "Preparing your personalised results..."}
              </p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary/80 transition-all"
                style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
              />
            </div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Analysing your answers</p>
          </div>
        ) : (
          <ResultsView
            totalScore={totalScore}
            maxScore={maxScore}
            scorePercent={scorePercent}
            answers={answers}
            onRestart={handleRestart}
          />
        )}
      </CardContent>
    </Card>
  );
}
