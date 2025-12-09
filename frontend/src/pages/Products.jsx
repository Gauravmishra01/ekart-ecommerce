import FilterSidebar from "@/components/ui/FilterSidebar";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import ProductCard from "@/components/ui/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productsSlice";

const Products = () => {
  const { products } = useSelector((store) => store.product);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();

  // ✅ FETCH PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/api/v1/product/getallproducts"
      );

      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTER + SORT LOGIC
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    // ✅ SEARCH
    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ✅ CATEGORY
    if (category !== "all") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // ✅ BRAND
    if (brand !== "all") {
      filtered = filtered.filter(
        (p) => p.brand?.toLowerCase() === brand.toLowerCase()
      );
    }

    // ✅ PRICE RANGE
    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]
    );

    // ✅ SORTING
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, priceRange, sortOrder, allProducts, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* ✅ SIDEBAR */}
        <FilterSidebar
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
          setPriceRange={setPriceRange}
          allProducts={allProducts}
          priceRange={priceRange}
        />

        {/* ✅ MAIN PRODUCT SECTION */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select onValueChange={setSortOrder}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort By Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
