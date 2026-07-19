import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import AppFooter from "@/components/layout/AppFooter";
import QueryProvider from "@/providers/QueryProvider";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyMate AI",
  description: "Your AI-powered study companion",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-900">
        <QueryProvider>
          <Toaster position="top-center" />
          <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
