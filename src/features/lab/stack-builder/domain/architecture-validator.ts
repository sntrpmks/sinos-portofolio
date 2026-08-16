import { StackChallenge, ValidationResult, ValidationResultCode } from "@/types/lab";

export function validateArchitecture(
  challenge: StackChallenge,
  userStack: string[]
): ValidationResult {
  // Empty Stack check
  if (!userStack || userStack.length === 0) {
    return {
      correct: false,
      score: 0,
      mistakes: 1,
      resultCode: "EMPTY_STACK",
      feedbackKey: "emptyArchitecture",
    };
  }

  // Missing components check
  const missing = challenge.expectedArchitecture.filter(
    (id) => !userStack.includes(id)
  );

  if (missing.length > 0) {
    return {
      correct: false,
      score: 0,
      mistakes: missing.length,
      resultCode: "MISSING_COMPONENTS",
      feedbackKey: "missingFeedback",
    };
  }

  // Unnecessary components check
  const optional = challenge.optionalComponents || [];
  const unnecessary = userStack.filter(
    (id) => !challenge.expectedArchitecture.includes(id) && !optional.includes(id)
  );

  if (unnecessary.length > 0) {
    return {
      correct: false,
      score: 0,
      mistakes: unnecessary.length,
      resultCode: "UNNECESSARY_COMPONENTS",
      feedbackKey: "unnecessaryFeedback",
    };
  }

  // Order check
  const isOrderCorrect = challenge.expectedArchitecture.every(
    (id, idx) => userStack[idx] === id
  );

  if (!isOrderCorrect || userStack.length !== challenge.expectedArchitecture.length) {
    return {
      correct: false,
      score: 0,
      mistakes: 1,
      resultCode: "INVALID_ORDER",
      feedbackKey: "orderFeedback",
    };
  }

  // Correct architecture
  return {
    correct: true,
    score: 100,
    mistakes: 0,
    resultCode: "CORRECT_ARCHITECTURE",
    feedbackKey: "correctFeedback",
  };
}

export function calculateScore(params: {
  correct: boolean;
  completionTimeSeconds: number;
  maxTimeSeconds: number;
  mistakes: number;
}): number {
  if (!params.correct) return 0;

  const baseScore = 100;
  const mistakePenalty = params.mistakes * 15;
  const timeRatio = Math.max(
    0,
    (params.maxTimeSeconds - params.completionTimeSeconds) / params.maxTimeSeconds
  );
  const timeBonus = Math.floor(timeRatio * 10);

  const total = baseScore - mistakePenalty + timeBonus;
  return Math.max(10, Math.min(100, Math.round(total)));
}
