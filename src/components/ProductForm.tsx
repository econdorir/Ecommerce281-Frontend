import { useState } from 'react';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    tags: '',
    freeShipping: false,
    shippingThreshold: '',
    stock: '',
    location: '',
    weight: '',
    length: '',
    width: '',
    depth: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', formData);
    // Aquí podrías añadir la lógica para enviar los datos del formulario a tu backend
  };

  return (
    <form className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Añadir Producto</h2>

      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-gray-700">Nombre del Producto</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Input para imágenes */}
      <div className="mb-4">
        <label className="block text-gray-700">Imágenes</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Categoría */}
      <div className="mb-4">
        <label className="block text-gray-700">Categoría</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Precio */}
      <div className="mb-4">
        <label className="block text-gray-700">Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Etiquetas */}
      <div className="mb-4">
        <label className="block text-gray-700">Etiquetas (separadas por comas)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Envío gratuito */}
      <div className="mb-4">
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
      </div>

      {/* A partir de qué cantidad se habilita el envío gratuito */}
      {formData.freeShipping && (
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
      )}

      {/* Stock */}
      <div className="mb-4">
        <label className="block text-gray-700">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Ubicación */}
      <div className="mb-4">
        <label className="block text-gray-700">Ubicación</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Peso */}
      <div className="mb-4">
        <label className="block text-gray-700">Peso (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Dimensiones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700">Largo (cm)</label>
          <input
            type="number"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Ancho (cm)</label>
          <input
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Profundidad (cm)</label>
          <input
            type="number"
            name="depth"
            value={formData.depth}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Añadir Producto
      </button>
    </form>
  );
}
