import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        {/* Info Section */}
        <div>
          <Link to="/">
            <img src="/Ekart.png" alt="Logo" className="w-32" />
          </Link>

          <p className="mt-3 text-sm">
            Powering your world with the best in electronics.
          </p>
          <p className="mt-2 text-sm">
            123 Electronics St, Style City, NY 10001
          </p>
          <p className="text-sm">Email: support@zaptro.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
          <ul className="text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaPinterest className="hover:text-red-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more.
          </p>

          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 rounded-r-md hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-pink-600">Ekart</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
