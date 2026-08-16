import fs from "fs";
import path from "path";
import { Locale } from "@/lib/i18n";
import { AppChallenge, AppChallengeSchema } from "@/types/lab";

const experimentsDir = path.join(process.cwd(), "content", "experiments");

export function getRawAppChallenges(): AppChallenge[] {
  const filePath = path.join(experimentsDir, "stack-builder.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(rawData);

  const challenges: AppChallenge[] = (json.challenges || []).map((c: unknown) =>
    AppChallengeSchema.parse(c)
  );

  return challenges;
}

export function getLocalizedAppChallenge(
  challenge: AppChallenge,
  locale: Locale = "en"
) {
  const loc = challenge.locales?.[locale] || challenge.locales?.en;

  const localizedOptions = challenge.options.map((opt) => ({
    ...opt,
    label: opt.locales?.[locale]?.label || opt.locales?.en?.label || opt.id,
  }));

  return {
    ...challenge,
    intro: loc?.intro || "",
    title: loc?.title || challenge.id,
    prompt: loc?.prompt || "",
    options: localizedOptions,
  };
}

export function getAppChallengesData(locale: Locale = "en") {
  const raw = getRawAppChallenges();
  return raw
    .map((c) => getLocalizedAppChallenge(c, locale))
    .sort((a, b) => a.order - b.order);
}
