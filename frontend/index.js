// 초기 화면 최신 도서 목록
// 검색 시 쿼리
// 검색 후 텍스트 변경
// 하트 클릭 시 wishList에 추가 및 삭제
// wishList에 추가된 도서는 localStorage에 저장
// wishList 누르면 모달창으로 wishList 목록 확인 가능
// 메인로고 클릭 시 초기 화면으로 이동
// api 오류 예외처리

const API_KEY = "";

const wishList = document.getElementById("wish-list");

const init = () => {};

// fetch("http://localhost:3000/api/search?query=aladdin")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("API 응답 데이터:", data.item);
//   })
//   .catch((error) => {
//     console.error("API 요청 중 오류 발생:", error);
//     document.getElementById("result").innerText = "오류 발생: " + error.message;
//   });

fetchItemSearch = async (
  query,
  queryType,
  maxResults,
  start,
  searchTarget
) => {};

fetchItemList = async (
  queryType = "ItemNewSpecial",
  maxResults = 8,
  start = 1,
  searchTarget = "Book"
) => {
  try {
    const url = new URL("http://localhost:3000/api/ItemList");
    console.log(1);
    const response = await fetch(url.href);
    console.log(2);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API 응답 데이터:", data.item);
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    // document.getElementById("result").innerText = "오류 발생: " + error.message;
  }
};

// fetchItemList();
