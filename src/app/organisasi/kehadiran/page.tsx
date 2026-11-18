"use client";

import CheckInDeskOverviewPage from "@/app/organization/events/[eventId]/check-in/page";

export default function KehadiranAliasPage() {
  const dummyParams = Promise.resolve({ eventId: "evt-business-expo" });
  return <CheckInDeskOverviewPage params={dummyParams} />;
}
