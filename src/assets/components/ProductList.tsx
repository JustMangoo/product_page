import React from "react";
import Product from "./Product";
import { Product as ProductType } from "./types";

interface ProductListProps {
  products: ProductType[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
