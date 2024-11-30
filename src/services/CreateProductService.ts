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
  console.log(JSON.stringify(id_artesano));
  console.log(JSON.stringify(nombre_producto));
  console.log(JSON.stringify(precio_producto));
  console.log(JSON.stringify(categoria_producto));
  console.log(JSON.stringify(descripcion_producto));
  console.log(JSON.stringify(ancho_producto));
  console.log(JSON.stringify(peso_producto));
  console.log(JSON.stringify(largo_producto));
  console.log(JSON.stringify(alto_producto));
  console.log(JSON.stringify(envio_gratuito));
  console.log(JSON.stringify(stock_producto));
  console.log(JSON.stringify(images));
  

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
