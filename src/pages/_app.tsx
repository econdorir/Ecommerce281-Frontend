"use client";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import { AppProvider } from "@/context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

