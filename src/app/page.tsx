// app/page.tsx
"use client";

import { FC, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "../components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import FAQSection from "@/components/FAQSection";

const HomePage: FC = () => {
  return (
    <>
      <Navbar/>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <HeroSection />
        <ProductCarousel />
        <FAQSection/>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
