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
