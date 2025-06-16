// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'نبضك - منصة الشعور اللحظي',
  description: 'شارك مشاعرك اللحظية مع العالم',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gradient-to-b from-blue-50 to-purple-100 min-h-screen">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}