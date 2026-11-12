import type { Metadata } from "next";
import { Suspense } from "react";

import EventCheckin from "@/components/events/EventCheckin";

const IRG_EVENT_SLUG = "irg-2026";

export const metadata: Metadata = {
  title: "Check-in & Registration | International Refresh Gathering (IRG) 2026",
  description:
    "Check in or register for the International Refresh Gathering (IRG) 2026, Thursday 26 – Sunday 29 November in Benin City. Free admission.",
};

export default function IrgCheckinPage() {
  return (
    <Suspense fallback={null}>
      <EventCheckin
        slug={IRG_EVENT_SLUG}
        fallbackName="International Refresh Gathering 2026"
        shortName="IRG 2026"
        backHref="/"
        backLabel="Back to Refresh"
      />
    </Suspense>
  );
}
