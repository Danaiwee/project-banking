import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const IBMPlexSerif = localFont({
  src: "./fonts/IBMPlexSerifVF.ttf",
  variable: "--font-IBMPlexSerif",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Next Banking",
  description:
    "Next Banking is a modern and secure online banking application built with Next.js. Designed for performance, scalability, and user convenience, Next Banking allows users to manage their finances seamlessly in a single, intuitive platform. With robust authentication, real-time transaction tracking, and responsive design, users can securely view account balances, transfer funds, and review transaction history from any device.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${IBMPlexSerif.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
