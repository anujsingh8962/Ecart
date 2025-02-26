"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/app/store/categorySlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import CategoryImgList from "./CategoryImgList";
import "../categoryList/categoryList.css";

interface Category {
  slug: string;
}

const CategoryList = () => {
  const dispatch = useDispatch();
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //function to fetch categories.
  const fetchCategory = async () => {
    try {
      const response = await api.get("/products/categories");
      setAllCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  //Function to change selected category and navigates to the category-specific page
  const handleCategoryChange = (slug: string) => {
    dispatch(setSelectedCategory(slug));
    router.push(`/category/${slug}`);
  };

  //Moves the category list left by 200px.
  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  //Moves the category list right by 200px.
  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="category-container">
      <h2 className="category-title">All Categories</h2>

      <button onClick={scrollLeft} className="arrow-button left-arrow">
        <ChevronLeft size={24} />
      </button>

      <button onClick={scrollRight} className="arrow-button right-arrow">
        <ChevronRight size={24} />
      </button>

      <div ref={carouselRef} className="carousel-container">
        {allCategory.map((data) => (
          //CategoryImgList component to show category images.
          <CategoryImgList
            key={data.slug}
            slug={data.slug}
            onSelect={handleCategoryChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
