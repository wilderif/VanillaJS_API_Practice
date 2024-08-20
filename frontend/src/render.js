import { handlePagination } from "./index.js";
import {
  saveToStorage,
  removeFromStorage,
  isItemInStorage,
} from "./storage.js";

const toggleWishlist = (bookData, likeBtn) => {
  if (isItemInStorage("wishList", bookData)) {
    removeFromStorage("wishList", bookData);
    likeBtn.classList.remove("active");
  } else {
    saveToStorage("wishList", bookData);
    likeBtn.classList.add("active");
  }
};

export const renderBook = (bookData) => {
  const liElement = document.createElement("li");
  const formattedPrice = parseInt(bookData.priceStandard, 10).toLocaleString();

  liElement.innerHTML = `
    <div class="book-container">
      <div class="book-container-cover">
        <img
          src="${bookData.cover}"
          alt="${bookData.title}"
          class="book-cover"
        />
        <div class="book-description">
          <p>${bookData.description}</p>
        </div>
      </div>
      <div class="book-container-footer">
        <div class="book-info">
          <p class="book-name">${bookData.title}</p>
          <p class="book-price">${formattedPrice} 원</p>
          <p class="book-publisher">${bookData.publisher}</p>
        </div>
        <button class="like-btn">
          <img src="./assets/images/icons/like_button.png" alt="Like Button" />
        </button>
      </div>
    </div>
  `;

  const likeBtnEl = liElement.querySelector(".like-btn");
  const bookContainerCoverEl = liElement.querySelector(".book-container-cover");

  if (isItemInStorage("wishList", bookData)) {
    likeBtnEl.classList.add("active");
  }

  likeBtnEl.addEventListener("click", () => {
    toggleWishlist(bookData, likeBtnEl);
  });

  bookContainerCoverEl.addEventListener("click", () => {
    window.open(bookData.link, "_blank"); // 새 탭에서 링크 열기
  });

  return liElement;
};

const pageNumbersEl = document.getElementById("page-numbers");

export const renderPaginationNum = (curPage, pageNum) => {
  const pageEl = document.createElement("button");
  pageEl.innerText = pageNum;
  pageEl.classList.add("page-number");
  if (pageNum === curPage) {
    pageEl.classList.add("current-page");
  }
  pageEl.addEventListener("click", () => handlePagination(pageNum));
  pageNumbersEl.appendChild(pageEl);
};

export const renderPaginationDots = () => {
  const dotEl = document.createElement("span");
  dotEl.innerText = "...";
  dotEl.classList.add("page-number");
  pageNumbersEl.appendChild(dotEl);
};
