"use client";

import { FC } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/components/footer";
import HeroSection from "../components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import FAQSection from "@/components/FAQSection";
import AddProduct from '../pages/addProduct'; 
import ProductForm from '../components/ProductForm'; // Corregido el nombre del componente

const HomePage: FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <HeroSection />
        <ProductCarousel />
        <ProductForm /> 
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
