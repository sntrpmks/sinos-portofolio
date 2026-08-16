import { DebugChallenge, DebugValidationResult } from "@/types/lab";

export function validateDebugAnswer(
  challenge: DebugChallenge,
  selectedOptionId: string | null
): DebugValidationResult {
  if (!selectedOptionId) {
    return { correct: false, score: 0 };
  }

  const isMatch = selectedOptionId === challenge.correctAnswer;
  return {
    correct: isMatch,
    score: isMatch ? 1 : 0,
  };
}
