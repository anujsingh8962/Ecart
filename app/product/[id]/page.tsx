"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/axios";
import "./productstyle.css"; // Import the CSS file
import Spinner from "@/components/spinner/Spinner";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  images: string[];
  reviews: { rating: number; comment: string; reviewerName: string }[];
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false") {
      router.push("/login");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  if (loading) return <Spinner />;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-container">
      <div className="product-image-section">
        <div className="product-image-container">
          <img
            src={selectedImage}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="thumbnail-container">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="product-details">
        <h1 className="product-titles">{product.title}</h1>
        <p className="product-info">
          Brand: <span className="font-semibold">{product.brand}</span> |
          Category: <span className="font-semibold">{product.category}</span>
        </p>

        <div className="product-price">
          ₹{product.price}{" "}
          <span className="discount">
            <s>
              ₹
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </s>
            (-{product.discountPercentage}% OFF)
          </span>
        </div>

        <p
          className={`stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
        >
          {product.stock > 0
            ? `In Stock (${product.stock} left)`
            : "Out of Stock"}
        </p>

        <p className="rating">⭐ {product.rating} / 5</p>
        <p className="product-description">{product.description}</p>

        <div className="product-meta">
          <p>
            <strong>Warranty:</strong> {product.warrantyInformation}
          </p>
          <p>
            <strong>Shipping Info:</strong> {product.shippingInformation}
          </p>
          <p>
            <strong>Availability:</strong>
            <span
              className={`availability ${
                product.availabilityStatus === "Low Stock" ? "low" : "high"
              }`}
            >
              {product.availabilityStatus}
            </span>
          </p>
          <p>
            <strong>Return Policy:</strong> {product.returnPolicy}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="customer-reviews">
          <h2>Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            <div>
              {product.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <p className="font-semibold">
                    {review.reviewerName} - ⭐ {review.rating}/5
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
