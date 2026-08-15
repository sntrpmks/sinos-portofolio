import React from "react";
import { getExperiences, getCertificates } from "@/lib/content";
import { JourneyPageClient } from "@/features/journey";

export const metadata = {
  title: "Journey & Certifications | SIN.OS",
  description: "Chronological timeline of Sinatria Pamungkas's software engineering journey, internship, and verified certifications.",
};

export default function JourneyPage() {
  const experiences = getExperiences();
  const certificates = getCertificates();

  return <JourneyPageClient experiences={experiences} certificates={certificates} />;
}
