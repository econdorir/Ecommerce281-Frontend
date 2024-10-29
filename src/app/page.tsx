"use client";

import { FC } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import FAQSection from "@/components/FAQSection";
import AddProduct from '../pages/addProduct'; 
import Footer from "@/components/Footer";


const HomePage: FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 pb-20">
        <HeroSection />
        <ProductCarousel />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
