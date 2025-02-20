import React, { useState, useEffect } from "react";
import WishlistFilter from "../components/interface/Wishlist/WishlistFilter";
import { useParams } from "react-router-dom";
import WishlistWrapper from "../components/interface/Wishlist/WishlistWrapper";

export default function Wishlist() {
  const keyword = useParams().id;
  const [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishlist"))
  );
  const [category, setCategory] = useState("");
  const [wishlistItems, setWishlistItems] = useState(
    wishList.filter((items) => items.link === keyword)
  );

  useEffect(() => {
    const activeCategory = categories.filter((category) =>
      category.param === keyword ? category.name : null
    );
    setCategory(activeCategory[0].name);

    const filtered = wishList.filter((items) => items.link === keyword);
    setWishlistItems(filtered);
  }, [keyword]);

  useEffect(() => {
    setWishlistItems(wishList.filter((items) => items.link === keyword));
  }, [wishList]);

  const categories = [
    {
      name: "Movies",
      param: "movies",
      link: "/wishlist/movies",
    },
    {
      name: "TV shows",
      param: "tv_shows",
      link: "/wishlist/tv_shows",
    },
  ];

  return (
    <div className="padding-top paddingX max-width">
      <WishlistFilter
        category={category}
        categories={categories}
        keyword={keyword}
      />
      <WishlistWrapper
        wishlistItems={wishlistItems}
        category={category}
        wishList={wishList}
        setWishList={setWishList}
      />
    </div>
  );
}
