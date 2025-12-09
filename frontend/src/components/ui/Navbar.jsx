import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Button } from "../button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  // ✅ Fetch Cart Count
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setCartCount(0);
        return;
      }

      const res = await axios.get("http://localhost:8000/api/v1/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = res.data?.cart?.items || [];

      const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

      console.log("✅ NAVBAR CART COUNT =", total); // DEBUG LINE

      setCartCount(total);
    } catch (error) {
      console.log(
        "❌ NAVBAR CART ERROR:",
        error.response?.data || error.message
      );
      setCartCount(0);
    }
  };

  // ✅ Auto Update Cart Badge Live
  useEffect(() => {
    fetchCartCount(); // ✅ Runs AFTER login now

    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, [user, accessToken]); // ✅ THIS IS THE REAL FIX

  // ✅ Logout
  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        await axios.post(
          "http://localhost:8000/api/v1/user/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.warn("Logout API failed, forcing local logout");
    } finally {
      // ✅ FORCE LOGOUT EVEN IF API FAILS
      localStorage.removeItem("accessToken");
      dispatch(setUser(null));
      setCartCount(0);
      toast.success("Logged out");
      navigate("/login");
    }
  };

  // ✅ Safe User ID
  const resolvedUserId = user?._id || user?.id;

  return (
    <header className="bg-red-50 fixed w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-5">
        {/* ✅ Logo */}
        <div>
          <img src="/Ekart.png" alt="Ekart" className="w-[100px]" />
        </div>

        {/* ✅ Navigation */}
        <nav className="flex gap-10 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <Link to="/">
              <li>Home</li>
            </Link>

            <Link to="/products">
              <li>Products</li>
            </Link>

            {resolvedUserId ? (
              <Link to={`/profile/${resolvedUserId}`}>
                <li>Hello, {user?.firstName}</li>
              </Link>
            ) : (
              <Link to="/login">
                <li>Login</li>
              </Link>
            )}
          </ul>

          {/* ✅ CART WITH LIVE COUNT */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* ✅ AUTH BUTTON */}
          {resolvedUserId ? (
            <Button
              onClick={logoutHandler}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white"
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
