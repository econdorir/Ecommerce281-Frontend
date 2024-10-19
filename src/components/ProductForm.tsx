import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function ProductForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Guardar archivos de imagen

  const [formData, setFormData] = useState({
    id_artesano: 1,
    id_promocion: 1,
    nombre_producto: "",
    precio_producto: "",
    descripcion_producto: "",
    stock_producto: "",
    categoria_producto: "",
    peso_producto: "",
    largo_producto: "",
    ancho_producto: "",
    alto_producto: "",
    envio_gratuito: -1,
  });

  const handleUpload = (result) => {
    console.log("Upload result:", result); // Log the result
  
    if (result && result.info) {
      // Since the response is a single object, get the secure_url directly
      const uploadedImageUrl = result.info.secure_url;
      setImageUrls([uploadedImageUrl]); // Store the URL in an array if needed
      console.log("Uploaded image URL:", uploadedImageUrl);
    } else {
      console.error("Unexpected upload result format");
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files); // Almacenar archivos seleccionados
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product Data:", formData);

    const uploadedImageUrls = [];

    // Subir imágenes a Cloudinary
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME);

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }

        const data = await response.json();
        uploadedImageUrls.push(data.secure_url); // Guardar la URL de la imagen
      } catch (error) {
        console.error("Error en la subida:", error);
      }
    }

    const numericFormData = {
      ...formData,
      precio_producto: Number(formData.precio_producto),
      stock_producto: Number(formData.stock_producto),
      peso_producto: Number(formData.peso_producto),
      largo_producto: Number(formData.largo_producto),
      ancho_producto: Number(formData.ancho_producto),
      alto_producto: Number(formData.alto_producto),
      imagen: uploadedImageUrls, // Añadir las URLs de las imágenes
    };

    console.log("Datos del formulario:", numericFormData);

    try {
      const response = await fetch("http://localhost:5000/api/v1/producto/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(numericFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("Producto agregado:", data);
      alert("Producto agregado con éxito!");

      // Resetear el formulario y los archivos de imagen
      setFormData({
        id_artesano: 1,
        id_promocion: 1,
        nombre_producto: "",
        precio_producto: "",
        descripcion_producto: "",
        stock_producto: "",
        categoria_producto: "",
        peso_producto: "",
        largo_producto: "",
        ancho_producto: "",
        alto_producto: "",
        envio_gratuito: -1,
      });
      setImageFiles([]); // Limpiar archivos de imágenes
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-white shadow-lg rounded-lg space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Añadir Producto
      </h2>

      {/* Nombre */}
      <div>
        <label className="block text-gray-700 font-medium">
          Nombre del Producto
        </label>
        <input
          type="text"
          name="nombre_producto"
          value={formData.nombre_producto}
          onChange={handleChange}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          minLength={2}
          maxLength={50}
          required
        />
      </div>

      {/* Precio */}
      <div>
        <label className="block text-gray-700 font-medium">Precio</label>
        <input
          type="number"
          name="precio_producto"
          value={formData.precio_producto}
          onChange={handleChange}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          min={1}
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-gray-700 font-medium">Descripción</label>
        <textarea
          name="descripcion_producto"
          value={formData.descripcion_producto}
          onChange={handleChange}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          rows={4}
          minLength={10}
          maxLength={100}
          required
        ></textarea>
      </div>

      {/* Stock */}
      <div>
        <label className="block text-gray-700 font-medium">Stock</label>
        <input
          type="number"
          name="stock_producto"
          value={formData.stock_producto}
          onChange={handleChange}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-gray-700 font-medium">Categoría</label>
        <input
          type="text"
          name="categoria_producto"
          value={formData.categoria_producto}
          onChange={handleChange}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          minLength={2}
          maxLength={50}
          required
        />
      </div>

      {/* Peso */}
      <div>
        <label className="block text-gray-700 font-medium">Peso (kg)</label>
        <input
          type="number"
          name="peso_producto"
          value={formData.peso_producto}
          onChange={handleChange}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          min={1}
        />
      </div>

      {/* Dimensiones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium">Largo (cm)</label>
          <input
            type="number"
            name="largo_producto"
            value={formData.largo_producto}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            min={1}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Ancho (cm)</label>
          <input
            type="number"
            name="ancho_producto"
            value={formData.ancho_producto}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            min={1}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Alto (cm)</label>
          <input
            type="number"
            name="alto_producto"
            value={formData.alto_producto}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            min={1}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Imágenes</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* <CldUploadWidget
        options={{ sources: ["local", "url", "camera"] }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={handleUpload}
      >
        {({ open }) => {
          return (
            <button
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => open()}
            >
              Elegir Archivos
            </button>
          );
        }}
      </CldUploadWidget> */}

      {/* Etiquetas */}
      {/* <div className="mb-4">
        <label className="block text-gray-700">Etiquetas (separadas por comas)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div> */}

      {/* Envío gratuito */}
      {/* <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="freeShipping"
            checked={formData.freeShipping}
            onChange={handleChange}
            className="mr-2"
          />
          Envío gratuito
        </label>
      </div> */}

      {/* A partir de qué cantidad se habilita el envío gratuito */}
      {/* {formData.freeShipping && (
        <div className="mb-4">
          <label className="block text-gray-700">A partir de qué cantidad</label>
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
        <label className="block text-gray-700">Ubicación</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div> */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Añadir Producto
      </button>
    </form>
  );
}
