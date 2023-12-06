import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product, ApiResponse } from "./types";
import axios from "axios";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Simulate fetching product details by ID
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
    <div className="max-w-2xl p-4 mx-auto my-8 bg-white rounded-lg shadow-lg">
      <img
        src="src\assets\images\placeholder.png"
        alt={product.name}
        className="object-cover object-center w-full bg-white"
      />
      <h2 className="mb-4 text-2xl font-bold">
        {product.name} {product.id}
      </h2>
      <p className="mb-2 text-lg text-gray-800">Category: {product.category}</p>
      <p className="mb-2 text-lg text-gray-800">
        Price: {product.price} {product.currency}
      </p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
