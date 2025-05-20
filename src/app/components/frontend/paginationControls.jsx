"use client";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 5;
const MAX_PER_PAGE = 5;
const MAX_PAGE = 10;

const getClampedPage = (page) => {
  //   console.log(typeof page, isNaN(page));
  if (isNaN(page) || page < 1) {
    console.log("executed");
    return DEFAULT_PAGE;
  } else if (page > MAX_PAGE) {
    return MAX_PAGE;
  } else {
    return page;
  }
};

const getClampedPerPage = (per_page) => {
  //   console.log(typeof per_page, isNaN(per_page));
  if (isNaN(per_page) || per_page < 1) {
    return DEFAULT_PER_PAGE;
  } else if (per_page > MAX_PER_PAGE) {
    return MAX_PER_PAGE;
  } else {
    return per_page;
  }
};
const PaginationControls = ({ total_pages }) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const [page, setPage] = useState(
    getClampedPage(Number(searchParams.get("page"))) ?? 1
  );
  const [perPage, setPerPage] = useState(
    getClampedPerPage(Number(searchParams.get("per_page"))) ?? 3
  );
  const updateParams = (newPage, newPerPage) => {
    params.set("page", newPage);
    params.set("per_page", newPerPage);

    replace(`${pathname}?${params}`, { scroll: false });
  };

  useEffect(() => {
    if (
      parseInt(params.get("page")) !== page ||
      parseInt(params.get("per_page")) !== perPage
    ) {
      console.log(page, perPage, "called");
      updateParams(Number(page), Number(perPage));

      //   params.set("page", page);
      //   params.set("per_page", perPage);
      //   router.replace(`${pathname}?${params}`, { scroll: false });
    }
  }, [page, perPage]);

  const handleChange = (event, value) => {
    setPage(value);
    updateParams(Number(value), Number(perPage));
    // params.set("page", Number(value));
    // params.set("per_page", Number(per_page));
    // replace(`${pathname}?${params}`, { scroll: false });
    // router.push(`/?page=${Number(value)}&per_page=${per_page}`);
  };

  return <Pagination count={total_pages} page={page} onChange={handleChange} />;
};

export default PaginationControls;
