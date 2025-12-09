import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCart(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (productId, type) => {
    await axios.put(
      "http://localhost:8000/api/v1/cart/update",
      { productId, type },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = async (productId) => {
    await axios.delete("http://localhost:8000/api/v1/cart/remove", {
      headers: { Authorization: `Bearer ${token}` },
      data: { productId },
    });

    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const items = cart?.items || [];

  const totalPrice = items.reduce(
    (acc, item) => acc + item.productId.productPrice * item.quantity,
    0
  );

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item._id}
              className="flex gap-6 border p-4 rounded-xl mb-5 items-center"
            >
              <img
                src={item.productId.productImg?.[0]?.url}
                className="w-28 h-28 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.productId.productName}</h2>

                <p>₹{item.productId.productPrice}</p>

                <div className="flex gap-3 mt-2 items-center">
                  <button
                    onClick={() => updateQty(item.productId._id, "decrease")}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQty(item.productId._id, "increase")}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <p className="font-bold text-red-600">
                  ₹{item.productId.productPrice * item.quantity}
                </p>

                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="mt-2 bg-red-600 text-white px-4 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* ✅ TOTAL */}
          <div className="text-right mt-8">
            <h2 className="text-2xl font-bold">Total: ₹{totalPrice}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
