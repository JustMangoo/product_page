import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product, ApiResponse } from "./types";
import axios from "axios";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(
          "https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd"
        );
        const foundProduct = res.data.products.find(
          (p) => p.id.toString() === id
        );
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-8 my-4 bg-gray-100 md:flex-row">
      <img
        src="src\assets\images\placeholder.png"
        alt={product.name}
        className="object-cover object-center w-full bg-white aspect-[4/3]"
      />
      <div className="flex flex-col w-full gap-4 my-4 justify-top">
        <h3 className="text-2xl md:text-3xl ">
          <b>{product.name}</b>
        </h3>
        <p className="text-xl ">
          {product.price} {product.currency}
        </p>
        <div>
          <p className="px-3 py-1 text-sm bg-gray-200 rounded-full w-fit h-fit">
            {product.category}
          </p>
        </div>
        <p className="text-xl">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
