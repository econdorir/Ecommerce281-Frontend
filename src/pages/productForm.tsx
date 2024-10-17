import ProductForm from "@/components/ProductForm";
import Navbar from "@/components/Navbar";

export default function ProductFormPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 mt-28 py-10">
        <ProductForm />
      </div>
    </>
  );
}
