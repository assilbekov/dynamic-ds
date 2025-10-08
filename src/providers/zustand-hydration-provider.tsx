"use client";

import { useEffect, useState } from "react";

type ZustandHydrationProviderProps = {
  children: React.ReactNode;
};

/**
 * Provider to handle Zustand hydration from localStorage.
 * Prevents hydration mismatches in Next.js App Router.
 */
export function ZustandHydrationProvider({
  children,
}: ZustandHydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? children : null}</>;
}
