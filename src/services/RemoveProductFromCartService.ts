// services/ChangePasswordService.js
import axios from "axios";
import { API_URL } from "../libs/constants";

export const RemoveProductFromCartService = async (
  id_producto,
) => {
  try {
    const response = await axios.delete(`${API_URL}/carrito/producto/${id_producto}`, {
      id_producto: id_producto,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al añadir al carrito."
    );
  }
};
