export const saveToWishlist = (bookData) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.push(bookData);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const removeFromWishlist = (bookData) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((book) => book.itemId !== bookData.itemId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const isBookInWishlist = (bookData) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  return wishlist.some((book) => book.itemId === bookData.itemId);
};

export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};
