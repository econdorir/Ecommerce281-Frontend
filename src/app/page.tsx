// app/page.tsx
"use client";

import { FC } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/components/footer";

const HomePage: FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Next.js
        </h1>
        <p className="text-lg text-red-500">
          This is a basic example of a Next.js page.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
