"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AgendaFormPage from "@/app/calendar/events/form/page";

// EVT-03 is explicitly defined as an alias entry point to CAL-04 with source=events context
export default function EventFormAliasPage() {
  return <AgendaFormPage />;
}
