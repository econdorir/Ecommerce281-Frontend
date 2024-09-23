import React from "react";
import styles from "../styles/productCard.module.css";

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  onAddToCart: () => void;
  onViewDetail: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  onAddToCart,
  onViewDetail,
}) => {
  return (
    <div className={`relative h-96 w-full m-2 ${styles.card}`}>
      <div
        className={`${styles.cover} absolute h-full w-full`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={`${styles.front} h-full w-full flex flex-col items-center justify-center`}>
          <h1 className={`${styles.title} text-white text-xl font-semibold mb-2`}>{title}</h1>
          <span className="text-white text-2xl font-light">${price}</span>
        </div>
        <div className={`${styles.cardBack} absolute h-full w-full flex items-center justify-center`}>
          <div className="flex flex-col">
            <button
              onClick={onAddToCart}
              className="bg-transparent border border-white text-white px-4 py-2 rounded transition duration-200 hover:bg-white hover:text-black"
            >
              Add to cart
            </button>
            <button
              onClick={onViewDetail}
              className="mt-2 bg-transparent border border-white text-white px-4 py-2 rounded transition duration-200 hover:bg-white hover:text-black"
            >
              View detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
