"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import "../categoryList/categoryList.css";

interface CategoryImgListProps {
  slug: string;
  selected: boolean;
  onSelect: (slug: string) => void;
}

const CategoryImgList = ({
  slug,
  selected,
  onSelect,
}: CategoryImgListProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
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
    fetchCategoryImage();
  }, [slug]);

  return (
    <div
      className={`category-item ${selected ? "selected" : ""}`}
      onClick={() => onSelect(slug)}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={slug} className="category-image" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CategoryImgList;
