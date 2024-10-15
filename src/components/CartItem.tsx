// components/CartItem.js

const CartItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-2">
      <div>
        <h3 className="text-lg font-semibold">{item.nombre_producto}</h3>
        <p className="text-gray-600">Cantidad: {item.cantidad}</p>
      </div>
      <div className="text-lg font-semibold">${item.precio_producto * item.cantidad}</div>
    </div>
  );
};

export default CartItem;
