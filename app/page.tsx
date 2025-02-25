"use client";

import { useEffect, useState } from "react";
import api from "../utils/axios";
import ProductList from "@/components/productList/ProductList";
import ImageCarousel from "@/components/ImageCarousel";
import CategoryList from "@/components/categoryList/CategoryList";

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
    <div className="p-5">
      <CategoryList />
      <div className="p-8">
        <ImageCarousel />
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="flex flex-wrap gap-6 cursor pointer">
          {productData.map((data) => (
            <ProductList key={data.id} productData={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
