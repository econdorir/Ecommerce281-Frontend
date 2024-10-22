"use client";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "@/context";
import { Head } from "next/document";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
