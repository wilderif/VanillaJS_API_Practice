// 책 클릭 시 알라딘 도서 상세 페이지로 이동

// jsDoc 주석 추가
// 전체 로직 설명하는 DOC 잘 작성할 것

// import init from "./init.js";

import { fetchItemList, fetchItemSearch } from "./api.js";
import { getWishlist } from "./storage.js";
import {
  renderBook,
  renderPaginationNum,
  renderPaginationDots,
} from "./render.js";

const wishListBtnEl = document.getElementById("wish-list-btn");
const wishListModalContainerEl = document.getElementById(
  "wish-list-modal-container"
);

const logoEl = document.getElementById("logo");

const modalCloseBtnEl = document.getElementById("modal-close-btn");

const searchKeywordEl = document.getElementById("search-keyword-text");

const searchBarEl = document.getElementById("search-bar");
const searchBtnEl = document.getElementById("search-btn");

const pagePrevBtnEl = document.getElementById("page-prev-btn");
const pageNextBtnEl = document.getElementById("page-next-btn");
const pageNumbersEl = document.getElementById("page-numbers");

// -1: fetchItemList
//  0: fetchItemSearch(search keyword 사용한 검색)
//  1: wish list 검색 (모달 닫았을 때 like 정보를 동기화하기 위하여, isModalOpen으로 대체)
export let curSearchType = -1;
let isModalOpen = false;

let currentPage = 1;
let currentTotalResults;
let currentTotalPages;
let currentPageData;
let searchKeyword = "";

const displayBookList = () => {
  let toRenderData = isModalOpen ? getWishlist() : currentPageData;
  const whereToRender = isModalOpen
    ? document.querySelector("#wish-list-modal-container .list-container ul")
    : document.querySelector("main .list-container ul");

  whereToRender.innerHTML = "";
  toRenderData.forEach((bookData) => {
    whereToRender.appendChild(renderBook(bookData));
  });
};

export const handlePagination = async (targetPage) => {
  if (curSearchType === -1) {
    [currentTotalResults, currentPageData] = await fetchItemList(
      "ItemNewSpecial",
      targetPage,
      8,
      "Book"
    );
  } else if (curSearchType === 0) {
    [currentTotalResults, currentPageData] = await fetchItemSearch(
      searchKeyword,
      "Title",
      targetPage,
      8,
      "Book"
    );
  }

  currentPage = targetPage;

  displayBookList();
  displayPagination(currentPage, currentTotalPages);
};

const displayPagination = (curPage, totalPages) => {
  pageNumbersEl.innerHTML = "";

  // prev button
  if (curPage > 1) {
    pagePrevBtnEl.style.cursor = "pointer";
    pagePrevBtnEl.style.opacity = "1";
    pagePrevBtnEl.onclick = () => handlePagination(curPage - 1);
  } else {
    pagePrevBtnEl.style.cursor = "not-allowed";
    pagePrevBtnEl.style.opacity = "0.5";
    pagePrevBtnEl.onclick = null;
  }

  // next button
  if (curPage < totalPages) {
    pageNextBtnEl.style.cursor = "pointer";
    pageNextBtnEl.style.opacity = "1";
    pageNextBtnEl.onclick = () => handlePagination(curPage + 1);
  } else {
    pageNextBtnEl.style.cursor = "not-allowed";
    pageNextBtnEl.style.opacity = "0.5";
    pageNextBtnEl.onclick = null;
  }

  if (totalPages <= 5) {
    // 총 페이지 수가 5 이하일 때 모든 페이지 번호를 표시
    for (let i = 1; i <= totalPages; i++) {
      renderPaginationNum(curPage, i);
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      renderPaginationNum(curPage, i);
    }

    if (4 < curPage) {
      renderPaginationDots();
    }

    for (
      let i = Math.max(3, curPage - 1);
      i <= Math.min(totalPages - 2, curPage + 1);
      i++
    ) {
      renderPaginationNum(curPage, i);
    }

    if (curPage < totalPages - 3) {
      renderPaginationDots();
    }

    for (let i = totalPages - 1; i <= totalPages; i++) {
      renderPaginationNum(curPage, i);
    }
  }
};

const handleSubmit = async () => {
  searchKeyword = searchBarEl.value.trim();

  if (!searchKeyword) {
    alert("검색어를 입력해주세요.");
    return;
  }

  if (searchKeyword.length > 25) {
    alert("검색어는 25자 이내로 입력해주세요.");
    return;
  }

  curSearchType = 0;
  searchKeywordEl.innerText = searchKeyword;

  searchBarEl.value = "";
  [currentTotalResults, currentPageData] = await fetchItemSearch(
    searchKeyword,
    "Title",
    1,
    8,
    "Book"
  );
  currentTotalPages = Math.ceil(currentTotalResults / 8);
  displayBookList();
  displayPagination(1, currentTotalPages);
};

const handleCloseModal = () => {
  wishListModalContainerEl.classList.remove("active");
  document.body.style.overflow = ""; // 모달 닫힐 때 배경 스크롤 해제
  isModalOpen = false;
  displayBookList();
  displayPagination(currentPage, currentTotalPages);
};

searchBarEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.isComposing === false) {
    handleSubmit();
  }
});

searchBtnEl.addEventListener("click", (event) => {
  handleSubmit();
});

wishListBtnEl.addEventListener("click", (event) => {
  wishListModalContainerEl.classList.add("active");
  document.body.style.overflow = "hidden"; // 모달 열릴 때 배경 스크롤 잠금
  isModalOpen = true;
  displayBookList();
});

modalCloseBtnEl.addEventListener("click", handleCloseModal);

// 외부 클릭으로 모달 닫기
wishListModalContainerEl.addEventListener("click", (event) => {
  if (event.target === wishListModalContainerEl) {
    handleCloseModal();
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    wishListModalContainerEl.classList.contains("active")
  ) {
    handleCloseModal();
  }
});

const init = async () => {
  [currentTotalResults, currentPageData] = await fetchItemList(
    "ItemNewSpecial",
    1,
    8,
    "Book"
  );
  searchKeywordEl.innerText = "주목할 만한 신간 리스트";
  currentTotalPages = Math.ceil(currentTotalResults / 8);
  curSearchType = -1;
  displayBookList();
  displayPagination(1, currentTotalPages);
};

// init();

logoEl.addEventListener("click", init);
