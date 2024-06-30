//@ts-nocheck
import type { Metadata } from "next";
import "./globals.css";

import { GeistMono } from "geist/font/mono";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ThemeProvider } from "@/components/provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "E-Library",
  description: "Eigen - Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
