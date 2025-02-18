import React from "react";
import WishlistFilter from "../components/interface/Wishlist/WishlistFilter";
import { useParams } from "react-router-dom";

export default function Wishlist() {
  const keyword = useParams().id;
  
  return (
    <div className="padding-top paddingX max-width">
      <WishlistFilter keyword={keyword} />
    </div>
  );
}
