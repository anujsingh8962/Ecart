"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "@/app/store";
import { setSelectedCategory } from "@/app/store/categorySlice";
import api from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, LogOut } from "lucide-react";

interface Category {
  slug: string;
  name: string;
}

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isSidebarOpen) {
      const fetchCategories = async () => {
        try {
          const response = await api.get("/products/categories");
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    }
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    router.push("/login");
  };

  const handleCategoryChange = (slug: string) => {
    dispatch(setSelectedCategory(slug));
    router.push(slug === "all" ? "/" : `/category/${slug}`);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-[100] flex items-center px-6 py-2 gap-4">
        <div
          className="relative group"
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
        >
          <Menu className="w-8 h-8 cursor-pointer mr-4" />
        </div>

        <Image
          src="/overturned-shopping-cart-with-black-friday-ribbon.jpg"
          alt="Company Logo"
          width={40}
          height={40}
          className="w-12 h-12 object-contain rounded-full border border-gray-300"
          onClick={() => router.push("/")}
        />

        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-[1500px] mx-6"
        />

        <div className="relative">
          <Bell
            className="w-8 h-8 cursor-pointer"
            onClick={() => setNotificationOpen(!isNotificationOpen)}
          />
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4 z-[200]">
              <p className="text-gray-700">🔔 Notification 1</p>
              <p className="text-gray-700">🔔 Notification 2</p>
              <p className="text-gray-700">🔔 Notification 3</p>
            </div>
          )}
        </div>
      </header>
      <aside
        className={`absolute top-[60px] left-0 h-screen w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-[90]`}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <nav className="p-4">
          {pathname === "/" ? (
            <>
              <Link
                href="/about"
                className="block py-3 hover:bg-gray-700 px-4 rounded"
              >
                About
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 mt-4 w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">Select Category</h3>

              <div className="category-filter flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={!selectedCategory}
                  onChange={() => {
                    dispatch(setSelectedCategory(null));
                    router.push("/");
                  }}
                />
                <label>All Products</label>
              </div>

              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="category-filter flex items-center gap-2"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.slug}
                    onChange={() => handleCategoryChange(category.slug)}
                  />
                  <label>{category.name}</label>
                </div>
              ))}
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Header;
