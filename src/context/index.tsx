import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Image {
  id_imagen: number;
  url_imagen: string;
  id_producto: number;
}

export interface Product {
  id_producto: number;
  id_artesano: number;
  id_promocion: number | null;
  nombre_producto: string;
  precio_producto: string; // Este es un string en tu JSON
  descripcion_producto: string;
  stock_producto: number; // Este es un number en tu JSON
  imagen: Image[]; // Correcto
  alto_producto: string; // Este es un string en tu JSON
  ancho_producto: string; // Este es un string en tu JSON
  largo_producto: string; // Este es un string en tu JSON
  peso_producto: string; // Este es un string en tu JSON
  categoria_producto: string; // Este es un string en tu JSON
  envio_gratuito: number; // Este es un number en tu JSON
}



interface AppContextType {
  idUser: string;
  setIdUser: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  numberOfProductsInCart: number;
  setNumberOfProductsInCart: React.Dispatch<React.SetStateAction<number>>; 
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>; 
  idCarrito: string;
  setIdCarrito: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [idUser, setIdUser] = useState<string>('');
  const [idCarrito, setIdCarrito] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [numberOfProductsInCart, setNumberOfProductsInCart] = useState<number>(0);
  const [cart, setCart] = useState<Product[]>([]); // Asegúrate de que Product esté importado


  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setIdUser(userData.id_usuario);
      setUsername(userData.nombre_usuario);
      setEmail(userData.email);
      setRole(userData.tipo_usuario);
      setIsLoggedIn(true);
    }
  }, []);
  

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        role,
        setRole,
        isLoggedIn,
        setIsLoggedIn,
        password,
        setPassword,
        numberOfProductsInCart,
        setNumberOfProductsInCart, 
        idUser,
        setIdUser,
        cart,
        setCart,
        idCarrito,
        setIdCarrito
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
