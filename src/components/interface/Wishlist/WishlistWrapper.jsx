import React from "react";

export default function WishlistWrapper({ category, wishlist }) {
  return (
    <div className="margin">
      {wishlist.length ? (
        <div></div>
      ) : (
        <p className="text-[red] custom-fz text-center font-semibold">{`You don't have any ${
          category === "Movies" ? "movie" : "TV show"
        } in your wishlist yet`}</p>
      )}
    </div>
  );
}
