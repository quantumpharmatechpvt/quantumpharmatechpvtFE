"use client";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Container } from "@mui/material";
import Products from "@/components/ProductCard.tsx/Product";
import Products1 from "@/components/ProductCard.tsx/product1";
import Products2 from "@/components/ProductCard.tsx/product2";
import { fetchClientUsers } from "@/components/slices/usersSlice";
import { store } from "@/components/redux/store";

export default function TitlebarBelowImageList() {
  const getUsers = () => {
    store.dispatch(fetchClientUsers()).then((res) => {
      console.log(res, "res");
    });
  };
  React.useEffect(() => {
    getUsers();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Products />
      <Products1 />
      <Products2 />
    </div>
  );
}
