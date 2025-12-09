import React from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/add`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Added to cart");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error(error);
      toast.error("Login first to add product");
    }
  };

  return (
    <div className="shadow-lg rounded-xl overflow-hidden bg-white">
      <img
        src={product.productImg?.[0]?.url}
        alt={product.productName}
        className="w-full h-60 object-cover"
      />

      <div className="p-4 space-y-2">
        <h1 className="font-semibold text-sm line-clamp-2">
          {product.productName}
        </h1>

        <p className="font-bold text-red-600">₹{product.productPrice}</p>

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2 rounded-md"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
