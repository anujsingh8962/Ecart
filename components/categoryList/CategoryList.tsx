"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
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
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get("/products/categories");
        setAllCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryChange = (slug: string) => {
    dispatch(setSelectedCategory(slug));
    router.push(`/category/${slug}`);
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

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
          <CategoryImgList
            key={data.slug}
            slug={data.slug}
            selected={selectedCategory === data.slug}
            onSelect={handleCategoryChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
