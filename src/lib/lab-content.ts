import fs from "fs";
import path from "path";
import { Locale } from "@/lib/i18n";
import {
  StackComponent,
  StackComponentSchema,
  StackChallenge,
  StackChallengeSchema,
} from "@/types/lab";

const experimentsDir = path.join(process.cwd(), "content", "experiments");

export function getRawStackBuilderData() {
  const filePath = path.join(experimentsDir, "stack-builder.json");
  if (!fs.existsSync(filePath)) {
    return { components: [], challenges: [] };
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(rawData);

  const components: StackComponent[] = (json.components || []).map((c: unknown) =>
    StackComponentSchema.parse(c)
  );

  const challenges: StackChallenge[] = (json.challenges || []).map((c: unknown) =>
    StackChallengeSchema.parse(c)
  );

  return { components, challenges };
}

export function getLocalizedStackComponent(
  component: StackComponent,
  locale: Locale = "en"
) {
  const loc = component.locales?.[locale] || component.locales?.en;
  return {
    ...component,
    label: loc?.label || component.id,
    description: loc?.description || "",
  };
}

export function getLocalizedStackChallenge(
  challenge: StackChallenge,
  locale: Locale = "en"
) {
  const loc = challenge.locales?.[locale] || challenge.locales?.en;
  return {
    ...challenge,
    title: loc?.title || challenge.id,
    description: loc?.description || "",
    hint: loc?.hint || "",
  };
}

export function getStackBuilderData(locale: Locale = "en") {
  const { components, challenges } = getRawStackBuilderData();

  const localizedComponents = components.map((c) =>
    getLocalizedStackComponent(c, locale)
  );

  const localizedChallenges = challenges
    .map((c) => getLocalizedStackChallenge(c, locale))
    .sort((a, b) => a.order - b.order);

  return {
    components: localizedComponents,
    challenges: localizedChallenges,
  };
}
