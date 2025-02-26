"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import "./categoryProduct.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Spinner from "../spinner/Spinner";

interface CategoryProductProps {
  url: string;
}

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
}

const CategoryProduct = ({ url }: CategoryProductProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchedQuery =
    useSelector((state: RootState) => state.search.searchedQuery) || "";
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(url);
        setProducts(response.data.products);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  const filteredData =
    searchedQuery === ""
      ? products
      : products.filter((data) =>
          data.title.toLowerCase().includes(searchedQuery.toLowerCase())
        );

  if (loading) return <Spinner />;

  return (
    <div className="product-list">
      <div className="product-containers">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
