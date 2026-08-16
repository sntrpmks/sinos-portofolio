import { z } from "zod";

export const StackComponentTypeSchema = z.enum([
  "frontend",
  "api",
  "backend",
  "database",
  "auth",
  "cache",
  "queue",
]);

export type StackComponentType = z.infer<typeof StackComponentTypeSchema>;

export const LocalizedTextSchema = z.object({
  en: z.string(),
  id: z.string(),
});

export const StackComponentSchema = z.object({
  id: z.string(),
  type: StackComponentTypeSchema,
  locales: z.object({
    en: z.object({
      label: z.string(),
      description: z.string(),
    }),
    id: z.object({
      label: z.string(),
      description: z.string(),
    }),
  }),
});

export type StackComponent = z.infer<typeof StackComponentSchema>;

export const StackChallengeSchema = z.object({
  id: z.string(),
  order: z.number(),
  maxTimeSeconds: z.number().default(45),
  availableComponents: z.array(z.string()),
  expectedArchitecture: z.array(z.string()),
  optionalComponents: z.array(z.string()).optional(),
  locales: z.object({
    en: z.object({
      title: z.string(),
      description: z.string(),
      hint: z.string(),
    }),
    id: z.object({
      title: z.string(),
      description: z.string(),
      hint: z.string(),
    }),
  }),
});

export type StackChallenge = z.infer<typeof StackChallengeSchema>;

export type ValidationResultCode =
  | "CORRECT_ARCHITECTURE"
  | "EMPTY_STACK"
  | "MISSING_COMPONENTS"
  | "INVALID_ORDER"
  | "UNNECESSARY_COMPONENTS";

export interface ValidationResult {
  correct: boolean;
  score: number;
  mistakes: number;
  resultCode: ValidationResultCode;
  feedbackKey: string;
}

export type GameStatus = "idle" | "playing" | "checking" | "success" | "complete";
