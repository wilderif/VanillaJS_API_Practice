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

const wishList = document.getElementById("wish-list");

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
  query = "",
  queryType = "Title",
  maxResults = 8,
  start = 1,
  searchTarget = "Book"
) => {
  try {
    const url = new URL("http://localhost:3000/api/ItemSearch");
    url.searchParams.append("Query", query);
    url.searchParams.append("QueryType", queryType);
    url.searchParams.append("MaxResults", maxResults);
    url.searchParams.append("Start", start);
    url.searchParams.append("SearchTarget", searchTarget);

    const response = await fetch(url.href);

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

// 한 페이지에 최대 50개, 총 결과는 200개까지만 검색 가능
fetchItemList = async (
  queryType = "ItemNewSpecial",
  maxResults = 8,
  start = 1,
  searchTarget = "Book"
) => {
  try {
    const url = new URL("http://localhost:3000/api/ItemList");
    url.searchParams.append("QueryType", queryType);
    url.searchParams.append("MaxResults", maxResults);
    url.searchParams.append("Start", start);
    url.searchParams.append("SearchTarget", searchTarget);

    const response = await fetch(url.href);

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

// fetchItemList("ItemNewSpecial", 8, 4, "Book");

const init = () => {
  fetchItemList("ItemNewSpecial", 200, 1, "Book");
};
