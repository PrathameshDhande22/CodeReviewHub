"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type ProvidersProps = {
  children: React.ReactNode;
  session?: Session | null;
};

const queryClient = new QueryClient();

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>{children}</SessionProvider>;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
