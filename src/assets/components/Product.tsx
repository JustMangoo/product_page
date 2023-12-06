import React from "react";
import { Link } from "react-router-dom";
import { Product as ProductType } from "./types";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-100">
        <img
          src="src\assets\images\placeholder.png"
          alt={product.name}
          className="object-cover object-center w-full bg-white"
        />
        <div className="flex justify-between w-full">
          <h3 className="text-lg">
            <b>{product.name}</b>
          </h3>
          <p>
            {product.price} {product.currency}
          </p>
        </div>
        <p className="px-2 py-1 bg-gray-200 rounded-full">{product.category}</p>
      </div>
    </Link>
  );
};

export default Product;
