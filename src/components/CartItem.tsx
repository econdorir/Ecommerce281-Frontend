// components/CartItem.js

const CartItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-2">
      <div>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">Cantidad: {item.quantity}</p>
      </div>
      <div className="text-lg font-semibold">${item.price * item.quantity}</div>
    </div>
  );
};

export default CartItem;
