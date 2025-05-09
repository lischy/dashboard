"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { replace } = useRouter();

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };

  const handleSearch = debounce((searchTerm) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm.trim());
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    // router.push(`/search?query=${searchTerm}`);
    // replace(`/search?query=${searchTerm}`);
    console.log(searchTerm);
    // console.log(router, `${pathname}/search/?${params.toString()}`);
  }, 4000);
  return (
    <TextField
      size="small"
      sx={{ width: "75%" }}
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default Search;
