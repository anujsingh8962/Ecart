import { useRouter } from "next/navigation";
import "./productList.css";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductListProps {
  productData: Product;
}

const ProductList = ({ productData }: ProductListProps) => {
  const { id, title, price, thumbnail } = productData;
  const router = useRouter();

  return (
    <div className="product-card" onClick={() => router.push(`/product/${id}`)}>
      <img src={thumbnail} alt={title} className="product-image" />
      <h3 className="product-title">{title}</h3>
      <p className="product-price">${price}</p>
    </div>
  );
};

export default ProductList;
