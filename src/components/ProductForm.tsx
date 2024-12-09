"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CreateProductService } from "@/services/CreateProductService";

interface ProductFormData {
  id_artesano: number;
  nombre_producto: string;
  precio_producto: number;
  categoria_producto: string;
  descripcion_producto: string;
  ancho_producto: number;
  peso_producto: number;
  largo_producto: number;
  alto_producto: number;
  envio_gratuito: number;
  stock_producto: number;
  images: {
    image1?: string; // Opcional
    image2?: string; // Opcional
    image3?: string; // Opcional
  };
}

export default function ProductForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Guardar archivos de imagen
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMaxImage, setErrorMaxImage] = useState<string | null>(null);
  const [freeShipping, setFreeShipping] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const [formData, setFormData] = useState<ProductFormData>({
    id_artesano: 1,
    nombre_producto: "",
    precio_producto: 0,
    descripcion_producto: "",
    stock_producto: 0,
    categoria_producto: "",
    peso_producto: 0,
    largo_producto: 0,
    ancho_producto: 0,
    alto_producto: 0,
    envio_gratuito: 0,
    images: {},
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);
    if (files.length + selectedFiles.length > 3) {
      setErrorMaxImage("Puedes subir un máximo de 3 imágenes.");
      return;
    }
    setErrorMaxImage(null);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index, event) => {
    event.preventDefault();
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const urls: string[] = []; // Arreglo temporal para almacenar URLs

      // Subir imágenes y obtener URLs
      for (const file of selectedFiles) {
        const imageFormData = new FormData();
        imageFormData.append("image", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error: ${response.status} ${errorMessage}`);
        }

        const data = await response.json();
        urls.push(data.url);
      }

      // Actualizar formData con las nuevas imágenes
      const updatedFormData = {
        ...formData,
        images: {
          image1: imageUrls[0] || undefined,
          image2: imageUrls[1] || undefined,
          image3: imageUrls[2] || undefined,
        },
        envio_gratuito: freeShipping ? 1 : 0,
      };

      // Enviar el producto
      const productResponse = await CreateProductService(updatedFormData);

      if (productResponse) {
        setSuccessMessage("El producto ha sido subido exitosamente.");
        setErrorMessage(null);
      } else {
        setErrorMessage("Ha ocurrido un error al subir el producto.");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Error durante la subida:", error);
      setErrorMessage("Error de servidor. Inténtalo de nuevo más tarde.");
      setSuccessMessage(null);
    }

    // Reiniciar formulario
    setFormData({
      id_artesano: 1,
      nombre_producto: "",
      precio_producto: 0,
      descripcion_producto: "",
      stock_producto: 0,
      categoria_producto: "",
      peso_producto: 0,
      largo_producto: 0,
      ancho_producto: 0,
      alto_producto: 0,
      envio_gratuito: 0,
      images: {},
    });
    setSelectedFiles([]);
  };

  const handleUpload = (result) => {
    // La respuesta de la carga contiene la URL de la imagen en `result.info.secure_url`
    console.log("result of upload", result);
    const uploadedImageUrl = result.info.secure_url;

    // Use the functional form of setImageUrls to correctly update the state
    setImageUrls((prevImageUrls) => {
      const updatedImageUrls = [...prevImageUrls, uploadedImageUrl];
      console.log("Updated Image URLs:", updatedImageUrls);
      return updatedImageUrls;
    });

    console.log("the state :o",imageUrls);
    
    console.log("Image uploaded successfully. URL:", uploadedImageUrl);
  };

  return (
    <form
      className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-buttonpagecolor2 to-gray-800 text-white shadow-lg rounded-lg space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-semibold text-center text-tertiarypagecolor">
        Añadir Producto
      </h2>

      {/* Nombre */}
      <div>
        <label className="block text-white font-medium">
          Nombre del Producto
        </label>
        <input
          type="text"
          name="nombre_producto"
          value={formData.nombre_producto}
          onChange={handleChange}
          className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          minLength={2}
          maxLength={50}
        />
      </div>

      {/* Precio */}
      <div>
        <label className="block text-white font-medium">Precio</label>
        <input
          type="number"
          name="precio_producto"
          value={formData.precio_producto}
          onChange={handleChange}
          className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          min={1}
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-white font-medium">Descripción</label>
        <textarea
          name="descripcion_producto"
          value={formData.descripcion_producto}
          onChange={handleChange}
          className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          rows={4}
          minLength={10}
          maxLength={100}
        ></textarea>
      </div>

      {/* Stock */}
      <div>
        <label className="block text-white font-medium">Stock</label>
        <input
          type="number"
          name="stock_producto"
          value={formData.stock_producto}
          onChange={handleChange}
          className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-white font-medium">Categoría</label>
        <input
          type="text"
          name="categoria_producto"
          value={formData.categoria_producto}
          onChange={handleChange}
          className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          minLength={2}
          maxLength={50}
        />
      </div>

      {/* Peso */}
      <div>
        <label className="block text-white font-medium">Peso (kg)</label>
        <input
          type="number"
          name="peso_producto"
          value={formData.peso_producto}
          onChange={handleChange}
          className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          min={1}
        />
      </div>

      {/* Dimensiones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-white font-medium">Largo (cm)</label>
          <input
            type="number"
            name="largo_producto"
            value={formData.largo_producto}
            onChange={handleChange}
            className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            min={1}
          />
        </div>
        <div>
          <label className="block text-white font-medium">Ancho (cm)</label>
          <input
            type="number"
            name="ancho_producto"
            value={formData.ancho_producto}
            onChange={handleChange}
            className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            min={1}
          />
        </div>
        <div>
          <label className="block text-white font-medium">Alto (cm)</label>
          <input
            type="number"
            name="alto_producto"
            value={formData.alto_producto}
            onChange={handleChange}
            className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            min={1}
          />
        </div>
      </div>

      {/* <div className="mb-4">
        <label className="block text-white">Imágenes</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full bg-extrapagecolor2 text-buttonpagecolor2 mt-1 p-2 border border-gray-300 rounded-md"
        />
        {errorMaxImage && <p className="text-red-500 mt-2">{errorMaxImage}</p>}{" "}
        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-white">Selected Images:</h3>
            <div className="flex flex-wrap mt-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative w-24 h-24 m-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    onClick={(event) => handleRemoveFile(index, event)}
                    className="w-9 absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-700 "
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}

      <CldUploadWidget
        options={{ sources: ["local", "url", "camera"] }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={handleUpload}
      >
        {({ open }) => {
          return (
            <button
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => open()}
              type="button"
            >
              Elegir Archivos
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Etiquetas */}
      {/* <div className="mb-4">
        <label className="block text-white">Etiquetas (separadas por comas)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div> */}

      {/* Envío gratuito */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="freeShipping"
            onChange={handleChange}
            className="mr-2"
          />
          Envío gratuito
        </label>
      </div>

      {/* A partir de qué cantidad se habilita el envío gratuito */}
      {/* {formData.freeShipping && (
        <div className="mb-4">
          <label className="block text-white">A partir de qué cantidad</label>
          <input
            type="number"
            name="shippingThreshold"
            value={formData.shippingThreshold}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      )} */}

      {/* Ubicación */}
      {/* <div className="mb-4">
        <label className="block text-white">Ubicación</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div> */}
      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <button
        type="submit"
        className="w-full bg-extrapagecolor text-black p-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Añadir Producto
      </button>
    </form>
  );
}
