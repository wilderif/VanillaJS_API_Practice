// jsDoc 주석 추가
// 전체 로직 설명하는 DOC 잘 작성할 것

// 파일을 기능 단위로 나눌지 컴포넌트 단위로 나눌지 구현 전에 고민하고 시작할 것

import { fetchItemList, fetchItemSearch } from "./api.js";
import { getStorage } from "./storage.js";
import {
  renderBook,
  renderPaginationNum,
  renderPaginationDots,
} from "./render.js";

/**
 * DOM Elements
 */
// logo element
const logoEl = document.getElementById("logo");
// search bar elements
const searchBarEl = document.getElementById("search-bar");
const searchBtnEl = document.getElementById("search-btn");
const searchKeywordEl = document.getElementById("search-keyword-text");
// modal elements
const wishListBtnEl = document.getElementById("wish-list-btn");
const wishListModalContainerEl = document.getElementById(
  "wish-list-modal-container"
);
const modalCloseBtnEl = document.getElementById("modal-close-btn");
// pagination elements
const pagePrevBtnEl = document.getElementById("page-prev-btn");
const pageNextBtnEl = document.getElementById("page-next-btn");
const pageNumbersEl = document.getElementById("page-numbers");

/**
 * Global Variables
 */
/**
 * curSearchType:
 *   -1: fetchItemList
 *    0: fetchItemSearch(search keyword 사용한 검색)
 *    1: wish list 검색 (모달 닫았을 때 like 정보를 동기화하기 위하여, isModalOpen으로 대체)
 */
let curSearchType = -1;
let isModalOpen = false;
let currentPage = 1;
let currentTotalResults;
let currentTotalPages;
let currentPageData;
let searchKeyword = "";

/**
 * displayBookList()
 * 화면에 나타날 책 목록을 순회하며, renderBook() 함수를 통해 생성
 * isModalOpen 상태에 때라 data와 render 위치가 달라짐
 */
const displayBookList = () => {
  let toRenderData = isModalOpen ? getStorage("wishList") : currentPageData;
  const whereToRender = isModalOpen
    ? document.querySelector("#wish-list-modal-container .list-container ul")
    : document.querySelector("main .list-container ul");

  whereToRender.innerHTML = "";
  toRenderData.forEach((bookData) => {
    whereToRender.appendChild(renderBook(bookData));
  });
};

/**
 * displayPagination()
 * curPage와 totalPages를 받아 페이지네이션을 렌더링
 * totalPage와 curPage에 따라 페이지네이션을 다르게 처리
 * renderPaginationNum()과 renderPaginationDots() 함수를 통해 생성
 * pagenation의 prev, next 버튼에, 조건에 맞게 event listener 추가
 */
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
  // 총 페이지 수가 5 이하일 때 모든 페이지 번호를 표시
  if (totalPages <= 5) {
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

/**
 * handlePagination()
 * 페이지네이션 클릭 시, 해당 페이지의 데이터를 fetch
 * curSearchType에 따라 fetchItemList() 또는 fetchItemSearch() 호출
 * fetch 완료되면 displayBookList()와 displayPagination()를 통해 화면에 렌더링
 */
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

/**
 * handleSubmit()
 * 검색어를 받아 fetchItemSearch() 함수를 통해,
 * 화면에 출력될 currentPageData와 pagination을 위한 currentTotalResults를 업데이트
 * fetch가 완료되면 displayBookList()와 displayPagination()을 통해 화면에 렌더링
 */
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

/**
 * handleCloseModal()
 * modal을 닫을 때, modal 관련 style을 초기화
 * isModalOpen false로 변경
 * modal에서 like 버튼 클릭 했을 때, 동기화하기 위하여
 * displayBookList()와 displayPagination()을 통해 현재 페이지 다시 화면에 렌더링
 */
const handleCloseModal = () => {
  wishListModalContainerEl.classList.remove("active");
  document.body.style.overflow = ""; // 모달 닫힐 때 배경 스크롤 잠금 해제
  isModalOpen = false;
  displayBookList();
  displayPagination(currentPage, currentTotalPages);
};

/**
 * init()
 * 초기화, Logo 클릭 시 호출
 * ItemNewSpecial를 통해 "주목할 만한 신간 리스트"를 fetch
 * fetch가 완료되면 displayBookList()와 displayPagination()을 통해 화면에 렌더링
 */
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

/**
 * Event Listener
 */

// search bar event listener
searchBarEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.isComposing === false) {
    handleSubmit();
  }
});

searchBtnEl.addEventListener("click", () => {
  handleSubmit();
});

// Modal Event Listener
wishListBtnEl.addEventListener("click", () => {
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

logoEl.addEventListener("click", init);

// init();
