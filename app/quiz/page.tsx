"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export type AnswerOption = {
  id: string;
  label: string;
  score: number;
};

export type Question = {
  id: string;
  title: string;
  description?: string;
  options: AnswerOption[];
};

type AnswerMap = Record<string, AnswerOption | undefined>;

const questions: Question[] = [
  {
    id: "monthly_revenue",
    title: "What is your current monthly revenue?",
    options: [
      { id: "rev_0_1k", label: "0 – 1,000", score: 0 },
      { id: "rev_1k_5k", label: "1,000 – 5,000", score: 1 },
      { id: "rev_5k_20k", label: "5,000 – 20,000", score: 2 },
      { id: "rev_20k_plus", label: "20,000+", score: 3 },
    ],
  },
  {
    id: "lead_volume",
    title: "How many leads do you get per month?",
    options: [
      { id: "leads_0_10", label: "0 – 10", score: 0 },
      { id: "leads_10_50", label: "10 – 50", score: 1 },
      { id: "leads_50_200", label: "50 – 200", score: 2 },
      { id: "leads_200_plus", label: "200+", score: 3 },
    ],
  },
  {
    id: "team_size",
    title: "How large is your sales or marketing team?",
    description: "Include contractors or part-time contributors you rely on.",
    options: [
      { id: "team_solo", label: "Just me", score: 0 },
      { id: "team_small", label: "2 – 5 people", score: 1 },
      { id: "team_mid", label: "6 – 15 people", score: 2 },
      { id: "team_large", label: "16+ people", score: 3 },
    ],
  },
  {
    id: "growth_goal",
    title: "What is your primary growth goal for the next 6 months?",
    options: [
      { id: "goal_validate", label: "Validate a new offer", score: 0 },
      { id: "goal_steady", label: "Maintain steady growth", score: 1 },
      { id: "goal_scale", label: "Scale acquisition channels", score: 2 },
      { id: "goal_dominant", label: "Dominate the category", score: 3 },
    ],
  },
];

const scoreMessage = (score: number): string => {
  if (score <= 4) return "You're at an early stage—quick wins will matter most.";
  if (score <= 8) return "Solid traction—dial in your systems to scale.";
  return "You’re primed for aggressive growth—double down on high-leverage moves.";
};

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = showResults
    ? 100
    : Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, answer) => sum + (answer?.score ?? 0), 0),
    [answers]
  );

  const handleSelect = (option: AnswerOption) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (showResults) return;
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentQuestionIndex(totalQuestions - 1);
      return;
    }
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const hasSelectedCurrent = Boolean(answers[currentQuestion?.id]);
  const isFirstStep = currentQuestionIndex === 0;
  const isLastStep = currentQuestionIndex === totalQuestions - 1;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-3xl shadow-lg border-slate-200">
          <CardHeader className="space-y-4 pb-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                <span>{showResults ? "Quiz Complete" : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}</span>
                <span className="font-semibold text-slate-900">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" aria-label="Quiz progress" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {showResults ? "Your personalized quiz results" : currentQuestion.title}
            </CardTitle>
            {!showResults && currentQuestion.description && (
              <p className="text-base text-slate-600 sm:text-lg">{currentQuestion.description}</p>
            )}
          </CardHeader>

          <CardContent className="space-y-6 pt-4 sm:pt-6">
            {!showResults ? (
              <section className="space-y-3" aria-label="Answer choices">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id]?.id === option.id;
                  return (
                    <Button
                      key={option.id}
                      variant={isSelected ? "default" : "outline"}
                      className="w-full justify-between rounded-lg border-slate-200 py-6 text-left text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-lg"
                      onClick={() => handleSelect(option)}
                      aria-pressed={isSelected}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Badge className="ml-3" variant="secondary">Selected</Badge>}
                    </Button>
                  );
                })}
              </section>
            ) : (
              <section className="space-y-6" aria-label="Quiz results">
                <div className="rounded-lg bg-slate-50 p-4 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Total score</p>
                      <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{totalScore}</p>
                    </div>
                    <Badge className="text-base" variant="outline">
                      {scoreMessage(totalScore)}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 sm:text-base">We'll use this to tailor the next step of your funnel.</p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Your answers</h2>
                  <div className="space-y-4">
                    {questions.map((question) => {
                      const selected = answers[question.id];
                      return (
                        <div
                          key={question.id}
                          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Question</p>
                              <p className="text-base font-semibold text-slate-900 sm:text-lg">{question.title}</p>
                            </div>
                            <Badge variant="secondary" className="whitespace-nowrap">Score: {selected?.score ?? 0}</Badge>
                          </div>
                          <Separator className="my-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-600">Your choice</p>
                            <p className="text-base font-semibold text-slate-900 sm:text-lg">
                              {selected?.label ?? "Not answered"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-6">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={!showResults && isFirstStep}
                className="w-full sm:w-32"
              >
                {showResults ? "Back" : "Previous"}
              </Button>
              {!showResults && (
                <Button
                  onClick={handleNext}
                  disabled={!hasSelectedCurrent}
                  className="w-full sm:w-36"
                >
                  {isLastStep ? "See My Results" : "Next"}
                </Button>
              )}
            </div>
            {showResults ? (
              <Button onClick={handleRestart} className="w-full sm:w-auto">
                Restart quiz
              </Button>
            ) : (
              <p className="text-center text-sm text-slate-600 sm:text-left">
                Answers are saved as you go. You can always go back to adjust.
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default QuizPage;
