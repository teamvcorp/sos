
import { ClientSessionProvider } from '../components/client-session-provider'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth'; // Path to your NextAuth configuration
import { Lato } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session data from the server
  const session = await getServerSession(authOptions)
  return (
    <ClientSessionProvider session={session}>
      <html lang="en">
        <body className={lato.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClientSessionProvider>
  );
}
