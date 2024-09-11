'use client'; // Ensure this is a client component

import { SessionProvider } from 'next-auth/react';

export function ClientSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any; // This type is flexible depending on your session type
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
