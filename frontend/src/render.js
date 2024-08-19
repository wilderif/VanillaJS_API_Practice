// storage에서 가져와서 parse한 뒤 render

import { handlePagination, curSearchType } from "./index.js";

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
