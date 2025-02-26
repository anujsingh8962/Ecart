"use client";

import { SetStateAction, useEffect, useState } from "react";
import api from "../utils/axios";
import ProductList from "@/components/productList/ProductList";
import ImageCarousel from "@/components/ImageCarousel";
import CategoryList from "@/components/categoryList/CategoryList";
import "../styles/LandingPage.css";
import Header from "@/components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const LandingPage = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const searchedQuery =
    useSelector((state: RootState) => state.search.searchedQuery) || "";

  const fetchAllProduct = async () => {
    const response = await api.get("/products");
    setProductData(response?.data?.products);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const filteredData =
    searchedQuery === ""
      ? productData
      : productData.filter((data) =>
          data.title.toLowerCase().includes(searchedQuery.toLowerCase())
        );

  return (
    <div className="landing-page">
      <Header />
      {searchedQuery === "" && (
        <>
          <CategoryList />
          <div className="landing-page__carousel">
            <ImageCarousel />
          </div>
        </>
      )}

      <div className="landing-page__product-section">
        <h1 className="landing-page__title">All Products</h1>
        <div className="landing-page__product-list">
          {filteredData.map((data) => (
            <ProductList key={data.id} productData={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
