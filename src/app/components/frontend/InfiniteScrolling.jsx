"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ProductCard from "./productCard";
import { fetchProducts } from "@/app/lib/data";

const InfiniteScrolling = ({ search, initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalPages = products[0]?.total_pages || 0;
  const hideLoader = totalPages === pageNumber;
  // console.log(totalPages, pageNumber, hideLoader);
  const observer = useRef(null);

  useEffect(() => {
    setProducts([]);
  }, [search]);

  const end = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && pageNumber < totalPages) {
          // console.log("VISIBLe", pageNumber);
          const nextPage = pageNumber + 1;
          setPageNumber(nextPage);
          // console.log(pageNumber);
          setLoading(true);
          const response = await fetchProducts({
            search: search,
            page_number: nextPage,
          });
          // console.log(response?.data);
          setProducts((prevProducts) => [...prevProducts, ...response?.data]);
          setLoading(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          src={`mint.jpg`}
          product={product}
        />
      ))}
      {!hideLoader && <CircularProgress ref={end} />}
    </>
  );
};

export default InfiniteScrolling;
