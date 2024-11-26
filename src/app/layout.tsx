"use client";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "@/context";
import Head from "next/head"; // Importa desde next/head, no next/document

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <title>Mi Aplicación</title>
        <link rel="manifest" href="/manifest.json"/>
      </head>
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

