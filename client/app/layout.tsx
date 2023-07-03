"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

interface IProps {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <SessionProvider session={session}>{children}</SessionProvider>
    </html>
  );
}
