// 초기 화면 최신 도서 목록
// fetch 1번만 한 뒤에 반복해서 사용
// 날짜 바뀌면 새로운 데이터로 갱신
// 책 한권 당 data 1000byte 이하 이므로 5000권 저장 가능?
// 책 data에서 필요한 부분만 추출해서 저장

// 검색 시 쿼리
// 검색 후 텍스트 변경
// 하트 클릭 시 wishList에 추가 및 삭제
// wishList에 추가된 도서는 localStorage에 저장
// wishList 누르면 모달창으로 wishList 목록 확인 가능
// 메인로고 클릭 시 초기 화면으로 이동
// api 오류 예외처리
// jsDoc 주석 추가
// 검색어 없을 때 예외처리

// localStorage의 index에 따라 pagination 생성

// 전체 로직 설명하는 DOC 잘 작성할 것

// import init from "./init.js";

import { fetchItemList, fetchItemSearch } from "./api.js";
import { saveToStorage } from "./storage.js";
import { renderBookList, renderPagination } from "./render.js";

const wishListEl = document.getElementById("wish-list");
const searchKeywordEl = document.getElementById("search-keyword-text");

const searchBarEl = document.getElementById("search-bar");
const searchBtnEl = document.getElementById("search-btn");

const pagePrevBtnEl = document.getElementById("page-prev-btn");
const pageNextBtnEl = document.getElementById("page-next-btn");
const pageNumbersEl = document.getElementById("page-numbers");

let currentPage = 1;
let currentTotalResults;
let currentPageData;

// 기존 로컬 스토리지에 저장된 데이터 삭제 및 추가
const handleSubmit = async () => {
  const searchKeyword = searchBarEl.value.trim();
  console.log("handleSubmit called", searchKeyword);
  // 예외 범위 alert 변경할 것
  if (!searchKeyword) {
    alert("검색어를 입력해주세요.");
    return;
  }

  searchKeywordEl.innerText = searchKeyword;

  searchBarEl.value = "";
  [currentTotalResults, currentPageData] = await fetchItemSearch(
    searchKeyword,
    "Title",
    1,
    8,
    "Book"
  );
  // console.log(currentTotalResults, currentPageData);
};

// 검색 두번 되는 버그 수정
searchBarEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.isComposing === false) {
    handleSubmit();
  }
});

searchBtnEl.addEventListener("click", (event) => {
  handleSubmit();
});

// 초기 화면 최신 도서 목록
// 200개 fetch한 뒤에 localStorage에 8개씩 페이지 나누어 저장
// 페이지 이동 시 localStorage에서 데이터 불러오기
// localStorage에 data 없을 때 or 날짜 바뀔 때 초기화 한 뒤 다시 fetch
// book data 개수 따라 pagination 변경

// 로컬 스토리지에 좋아요 컨테이너 추가할 것
const init = async () => {
  [currentTotalResults, currentPageData] = await fetchItemList(
    "ItemNewSpecial",
    1,
    8,
    "Book"
  );
  searchKeywordEl.innerText = "주목할 만한 신간 리스트";
};

// init();
