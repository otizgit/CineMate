import React from "react";
import WishlistCard from "./WishlistCard";

export default function WishlistWrapper({ wishlistItems, category, wishlist }) {
  console.log(wishlistItems);

  return (
    <div className="margin">
      {wishlist.length ? (
        wishlistItems.map((wishListItem, index) => (
          <WishlistCard key={index} wishListItem={wishListItem} />
        ))
      ) : (
        <p className="text-[red] custom-fz text-center font-semibold">{`You don't have any ${
          category === "Movies" ? "movie" : "TV show"
        } in your wishlist yet`}</p>
      )}
    </div>
  );
}
