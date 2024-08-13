// 초기 화면 최신 도서 목록
// 검색 시 쿼리
// 검색 후 텍스트 변경
// 하트 클릭 시 wishList에 추가 및 삭제
// wishList에 추가된 도서는 localStorage에 저장
// wishList 누르면 모달창으로 wishList 목록 확인 가능
// 메인로고 클릭 시 초기 화면으로 이동

const API_KEY = "";

const wishList = document.getElementById("wish-list");

const init = () => {};

// fetch(
//   "https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbwoojuro31011001&QueryType=ItemNewAll&MaxResults=16&start=1&cover=Big&SearchTarget=Book&output=js&Version=20131101",
//   {
//     method: "GET",
//   }
// )
//   .then((response) => {
//     response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
