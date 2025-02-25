"use client";

import { useEffect, useState } from "react";
import api from "../utils/axios";
import ProductList from "@/components/productList/ProductList";
import ImageCarousel from "@/components/ImageCarousel";
import CategoryList from "@/components/categoryList/CategoryList";
import "../styles/LandingPage.css";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const LandingPage = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  const fetchAllProduct = async () => {
    const response = await api.get("/products");
    setProductData(response?.data?.products);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="landing-page">
      <CategoryList />
      <div className="landing-page__carousel">
        <ImageCarousel />
      </div>
      <div className="landing-page__product-section">
        <h1 className="landing-page__title">All Products</h1>
        <div className="landing-page__product-list">
          {productData.map((data) => (
            <ProductList key={data.id} productData={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
