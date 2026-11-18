"use client";

import ServerErrorPage from "./500/page";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ServerErrorPage />;
}
