export interface Image {
  id_imagen: number;
  url_imagen: string;
  id_producto: number;
}

export interface Product {
  id_producto: number;
  id_artesano: number;
  id_promocion: number | null; // Can be null based on your response
  nombre_producto: string;
  precio_producto: string; // Keeping it as string based on your response
  descripcion_producto: string;
  stock_producto: number // Changed to number
  imagen: Image[]; // Keep as an array of Image objects
  alto_producto: string; // Include based on your response
  ancho_producto: string; // Include based on your response
  largo_producto: string; // Include based on your response
  peso_producto: string; // Include based on your response
  categoria_producto: string; // Include based on your response
  envio_gratuito: number; // Keeping it as number based on your response
}

