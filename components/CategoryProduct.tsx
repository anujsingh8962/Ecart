"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import "../styles/categoryProduct.css";

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
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(url);
        setProducts(response.data.products);
      } catch (err) {
        setError("Error fetching products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      <div className="product-container">
        {products.length > 0 ? (
          products.map((product) => (
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
