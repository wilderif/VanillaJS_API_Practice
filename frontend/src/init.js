import { fetchItemList } from "./api.js";
import { saveToStorage } from "./storage.js";

// 초기 화면 최신 도서 목록
// 200개 fetch한 뒤에 localStorage에 8개씩 페이지 나누어 저장
// 페이지 이동 시 localStorage에서 데이터 불러오기
// localStorage에 data 없을 때 or 날짜 바뀔 때 초기화 한 뒤 다시 fetch
const init = async () => {
  const initBooks = await fetchItemList("ItemNewSpecial", 200, 1, "Book");
  saveToStorage("ItemNewSpecial", initBooks);
};

export default init;
