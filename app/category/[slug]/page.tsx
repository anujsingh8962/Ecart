"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CategoryProduct from "@/components/categoryProduct/CategoryProduct";
import "../../../components/categoryProduct/categoryProduct.css";
import Spinner from "@/components/spinner/Spinner";

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryUrl, setCategoryUrl] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      setCategoryUrl(`/products/category/${slug}`);
    }
  }, [slug]);

  if (!categoryUrl) return <Spinner />;

  return (
    <div>
      <h1 className="category-title">Category: {slug}</h1>
      <CategoryProduct url={categoryUrl} />
    </div>
  );
};

export default CategoryPage;
