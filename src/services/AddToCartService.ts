// services/ChangePasswordService.js
import axios from "axios";
import { API_URL } from "../libs/constants";

export const AddToCartService = async (
  id_producto,
  id_carrito,
  cantidad
) => {
  try {
    const response = await axios.post(`${API_URL}/aniade`, {
      id_producto: id_producto,
      id_carrito: id_carrito,
      cantidad: cantidad,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al añadir al carrito."
    );
  }
};
