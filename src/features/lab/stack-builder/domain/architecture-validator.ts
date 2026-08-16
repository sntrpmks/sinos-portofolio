import { AppChallenge, AppValidationResult } from "@/types/lab";

export function checkAppAnswer(
  challenge: AppChallenge,
  selectedOptionIds: string[]
): AppValidationResult {
  if (!selectedOptionIds || selectedOptionIds.length === 0) {
    return { correct: false, score: 0 };
  }

  const expected = challenge.correctAnswers;
  if (selectedOptionIds.length !== expected.length) {
    return { correct: false, score: 0 };
  }

  const isMatch = expected.every((id) => selectedOptionIds.includes(id));
  return {
    correct: isMatch,
    score: isMatch ? 1 : 0,
  };
}
