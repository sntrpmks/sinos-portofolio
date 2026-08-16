import { z } from "zod";

export const AppOptionSchema = z.object({
  id: z.string(),
  locales: z.object({
    en: z.object({
      label: z.string(),
    }),
    id: z.object({
      label: z.string(),
    }),
  }),
});

export type AppOption = z.infer<typeof AppOptionSchema>;

export const AppChallengeSchema = z.object({
  id: z.string(),
  order: z.number(),
  type: z.enum(["single", "multiple"]),
  options: z.array(AppOptionSchema),
  correctAnswers: z.array(z.string()),
  locales: z.object({
    en: z.object({
      intro: z.string(),
      title: z.string(),
      prompt: z.string(),
    }),
    id: z.object({
      intro: z.string(),
      title: z.string(),
      prompt: z.string(),
    }),
  }),
});

export type AppChallenge = z.infer<typeof AppChallengeSchema>;

export interface AppValidationResult {
  correct: boolean;
  score: number;
}

export const SystemStatusSchema = z.object({
  name: z.string(),
  status: z.enum(["online", "error", "checking"]),
});

export type SystemStatusItem = z.infer<typeof SystemStatusSchema>;

export const DebugOptionSchema = z.object({
  id: z.string(),
  locales: z.object({
    en: z.object({ label: z.string() }),
    id: z.object({ label: z.string() }),
  }),
});

export type DebugOption = z.infer<typeof DebugOptionSchema>;

export const DebugChallengeSchema = z.object({
  id: z.string(),
  order: z.number(),
  options: z.array(DebugOptionSchema),
  correctAnswer: z.string(),
  systemStatus: z.array(SystemStatusSchema).optional(),
  locales: z.object({
    en: z.object({
      intro: z.string(),
      title: z.string(),
      prompt: z.string(),
      hint: z.string().optional(),
    }),
    id: z.object({
      intro: z.string(),
      title: z.string(),
      prompt: z.string(),
      hint: z.string().optional(),
    }),
  }),
});

export type DebugChallenge = z.infer<typeof DebugChallengeSchema>;

export interface DebugValidationResult {
  correct: boolean;
  score: number;
}

// Ship It Game Types
export type ShipStage = "local" | "staging" | "production";

export type ShipModeState = "idle" | "playing" | "gameOver" | "result";

export interface ShipPlayer {
  x: number;
  y: number;
  size: number;
  velocity: number;
  rotation: number;
}

export interface ShipObstacle {
  id: string;
  x: number;
  topHeight: number;
  bottomHeight: number;
  gapSize: number;
  width: number;
  label: string;
  scored: boolean;
}
