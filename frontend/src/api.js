export const fetchItemSearch = async (
  query = "",
  queryType = "Title",
  maxResults = 8,
  start = 1,
  searchTarget = "Book"
) => {
  try {
    console.log("API call");
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
export const fetchItemList = async (
  queryType = "ItemNewSpecial",
  maxResults = 200,
  start = 1,
  searchTarget = "Book"
) => {
  try {
    console.log("API call");
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
    return data.item;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    // document.getElementById("result").innerText = "오류 발생: " + error.message;
  }
};
