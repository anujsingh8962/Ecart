"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "@/app/store";
import { setSelectedCategory } from "@/app/store/categorySlice";
import { setSearchedQuery } from "@/app/store/searchSlice";
import api from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, LogOut } from "lucide-react";
import "./header.css";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    dispatch(setSearchedQuery(text));
  };

  return (
    <>
      <header className="header">
        <div
          className="header__menu"
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
        >
          <Menu className="header__menu-icon" />
        </div>

        <Image
          src="/overturned-shopping-cart-with-black-friday-ribbon.jpg"
          alt="Company Logo"
          width={40}
          height={40}
          className="header__logo"
          onClick={() => router.push("/")}
        />

        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          className="header__search"
        />

        <div className="header__notifications">
          <Bell
            className="header__bell-icon"
            onClick={() => setNotificationOpen(!isNotificationOpen)}
          />
          {isNotificationOpen && (
            <div className="header__notification-dropdown">
              <p className="header__notification-item">🔔 Notification 1</p>
              <p className="header__notification-item">🔔 Notification 2</p>
              <p className="header__notification-item">🔔 Notification 3</p>
            </div>
          )}
        </div>
      </header>

      <aside
        className={`sidebar ${
          isSidebarOpen ? "sidebar--open" : "sidebar--closed"
        }`}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <nav className="sidebar__nav">
          {pathname === "/" ? (
            <>
              <Link href="/about" className="sidebar__link">
                About
              </Link>

              <button onClick={handleLogout} className="sidebar__logout">
                <LogOut className="sidebar__logout-icon" /> Logout
              </button>
            </>
          ) : (
            <>
              <h3 className="sidebar__title">Select Category</h3>

              <div className="sidebar__category">
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
                <div key={category.slug} className="sidebar__category">
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
