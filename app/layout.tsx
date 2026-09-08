import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'The European Strategy Institute',
  description:
    'An independent strategic think tank connecting Central and Eastern European business with European policymaking.',
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
