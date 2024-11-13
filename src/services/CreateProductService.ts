// services/ChangePasswordService.js
import axios from "axios";
import { API_URL } from "../libs/constants";

export const CreateProductService = async ({
  id_artesano,
  nombre_producto,
  precio_producto,
  categoria_producto,
  descripcion_producto,
  ancho_producto,
  peso_producto,
  largo_producto,
  alto_producto,
  envio_gratuito,
  stock_producto,
  images,
}) => {
  console.log(images);

  try {
    const response = await axios.post(`${API_URL}/producto`, {
      id_artesano,
      nombre_producto,
      precio_producto,
      categoria_producto,
      descripcion_producto,
      ancho_producto,
      peso_producto,
      largo_producto,
      alto_producto,
      envio_gratuito,
      stock_producto,
      images,
    });
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al subir producto."
    );
  }
};
