"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import "../categoryList/categoryList.css";
import Spinner from "../spinner/Spinner";

interface CategoryImgListProps {
  slug: string;
  onSelect: (slug: string) => void;
}

const CategoryImgList = ({ slug, onSelect }: CategoryImgListProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  //function to pick first product’s thumbnail as the category image.
  const fetchCategoryImage = async () => {
    try {
      const response = await api.get(`/products/category/${slug}`);
      if (response.data.products.length > 0) {
        setImageUrl(response.data.products[0].thumbnail);
      }
    } catch (error) {
      console.error("Error fetching category image:", error);
    }
  };

  useEffect(() => {
    fetchCategoryImage();
  }, [slug]);

  return (
    <div className="category-item" onClick={() => onSelect(slug)}>
      {imageUrl ? (
        <img src={imageUrl} alt={slug} className="category-image" />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CategoryImgList;
