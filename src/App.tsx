import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./assets/components/SearchBar";
import ProductList from "./assets/components/ProductList";
import ProductDetails from "./assets/components/ProductDetails";
import { Product, ApiResponse } from "./assets/components/types";
import { debounce } from "lodash";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(
          "https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd"
        );
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedSearch) ||
          product.category.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredProducts(filtered);
    }, 300);

    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchTerm, products]);

  return (
    <Router>
      <div className="flex flex-col items-center justify-center w-screen h-full">
        <div className="flex flex-col items-center justify-center w-9/12 h-full gap-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                  <ProductList products={filteredProducts} loading={loading} />
                </>
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
