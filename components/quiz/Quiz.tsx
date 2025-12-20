"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { questions } from "@/lib/quiz/questions";
import { AnswerOption } from "@/lib/quiz/types";

import { ProgressHeader } from "./ProgressHeader";
import { QuestionStep } from "./QuestionStep";
import { ResultsView } from "./ResultsView";

/** ---------------------------
 *  UTM CAPTURE (stored for ResultsView submit)
 *  -------------------------- */
type UtmPayload = {
  source?: string;
  campaign?: string;
  adset?: string;
  content?: string;
};

const UTM_STORAGE_KEY = "dsgnr_utms_v1";

function captureUtmsFromUrl(): UtmPayload {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    adset: params.get("utm_adset") ?? undefined,
    content: params.get("utm_content") ?? undefined,
  };
}

function getStoredUtm(): UtmPayload {
  try {
    return JSON.parse(localStorage.getItem(UTM_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function storeUtm(newUtm: UtmPayload) {
  const current = getStoredUtm();
  const merged = { ...current, ...newUtm };
  localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

const loadingMessagesPool = [
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
  {
    title: "Double-checking your answers...",
    description: "Making sure every response influences your score correctly.",
  },
  {
    title: "Looking for hidden wins...",
    description: "Scanning for easy fixes that unlock fast growth.",
  },
  {
    title: "Prioritising action steps...",
    description: "Ranking fixes by impact so you know where to start.",
  },
  {
    title: "Tuning recommendations...",
    description: "Adjusting advice based on your model and pricing.",
  },
];

export function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerOption | undefined>>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessages, setLoadingMessages] = useState(loadingMessagesPool);

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

  /** Capture UTMs once on landing and persist */
  useEffect(() => {
    const fromUrl = captureUtmsFromUrl();
    storeUtm(fromUrl);
  }, []);

  useEffect(() => {
    if (!isLoadingResults) return;

    // randomise message order and pace to feel more human
    const shuffled = [...loadingMessagesPool].sort(() => Math.random() - 0.5);
    setLoadingMessages(shuffled);
    setLoadingProgress(0);

    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const delay = 800 + Math.random() * 700; // 0.8s - 1.5s between updates
      timeoutId = setTimeout(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) return 100;
          const increment = 8 + Math.random() * 14; // 8% - 22% increments
          const next = Math.min(100, Math.round(prev + increment));
          if (next >= 100) {
            setTimeout(() => {
              setIsLoadingResults(false);
              setShowResults(true);
            }, 500);
          } else {
            tick();
          }
          return next;
        });
      }, delay);
    };

    tick();

    return () => clearTimeout(timeoutId);
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
    setLoadingProgress(0);
    setCurrentQuestionIndex(0);
  };

  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === totalQuestions - 1;
  const selected = answers[currentQuestion?.id ?? ""];

  const loadingMessage =
    loadingMessages[Math.min(loadingMessages.length - 1, Math.floor((loadingProgress / 100) * loadingMessages.length))] ??
    loadingMessages[0];
  const loadingPercent = loadingProgress;

  if (isLoadingResults) {
    return (
      <div className="fixed inset-0 z-20 overflow-y-auto bg-background px-4 py-12 sm:px-6">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full border-4 border-muted/60 border-t-primary/80 animate-spin" />
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Hang tight</p>
              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">{loadingMessage?.title}</h2>
              <p className="text-base text-muted-foreground">
                {loadingMessage?.description ?? "Preparing your personalised results..."}
              </p>
            </div>
            <div className="h-2 w-full max-w-xl overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary/80 transition-all" style={{ width: `${loadingPercent}%` }} />
            </div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Analysing your answers</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="fixed inset-0 z-20 overflow-y-auto bg-background px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8">
          <header className="space-y-2 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Your personalised report</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Here are your results</h2>
            <p className="text-base text-muted-foreground">Save them or retake the quiz below.</p>
          </header>
          <div className="rounded-2xl border border-muted/60 bg-card/95 p-5 shadow-lg sm:p-8">
            <ResultsView
              totalScore={totalScore}
              maxScore={maxScore}
              scorePercent={scorePercent}
              answers={answers}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-4xl border-muted/60 bg-card/95 shadow-lg md:max-w-5xl">
      <CardContent className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <ProgressHeader currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions} />
          <QuestionStep question={currentQuestion} selectedOptionId={selected?.id} onSelectOption={handleSelect} />
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
      </CardContent>
    </Card>
  );
}
