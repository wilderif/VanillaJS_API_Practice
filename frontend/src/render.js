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

/**
 * renderBook()
 * bookData를 받아, 책 정보를 담은 li element를 반환
 * li element 내부 cover element에 알라딘 페이지로 이동하기 위한 click event 추가
 * li element 내부 like button element에 wish list 관련 click event 추가
 */
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

  const bookContainerCoverEl = liElement.querySelector(".book-container-cover");
  bookContainerCoverEl.addEventListener("click", () => {
    window.open(bookData.link, "_blank"); // 새 탭에서 링크 열기
  });

  const likeBtnEl = liElement.querySelector(".like-btn");
  if (isItemInStorage("wishList", bookData)) {
    likeBtnEl.classList.add("active");
  }
  likeBtnEl.addEventListener("click", () => {
    toggleWishlist(bookData, likeBtnEl);
  });

  return liElement;
};

const pageNumbersEl = document.getElementById("page-numbers");

/**
 * renderPaginationNum()
 * curPage와 pageNum을 받아, 해당 pagination 숫자를 생성
 * pageNum이 curPage와 같으면, current-page class 추가
 */
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

/**
 * renderPaginationDots()
 * pagination ...을 생성
 */
export const renderPaginationDots = () => {
  const dotEl = document.createElement("span");
  dotEl.innerText = "...";
  dotEl.classList.add("page-number");
  pageNumbersEl.appendChild(dotEl);
};
