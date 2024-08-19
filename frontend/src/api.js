// data.totalResults 활용할 것

export const fetchItemSearch = async (
  query = "",
  queryType = "Title",
  start = 1,
  maxResults = 8,
  searchTarget = "Book"
) => {
  try {
    console.log("API call");
    const url = new URL("http://localhost:3000/api/ItemSearch");
    url.searchParams.append("Query", query);
    url.searchParams.append("QueryType", queryType);
    url.searchParams.append("Start", start);
    url.searchParams.append("MaxResults", maxResults);
    url.searchParams.append("SearchTarget", searchTarget);

    const response = await fetch(url.href);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    console.log("API 응답 데이터:", data.item);

    return [data.totalResults, data.item];
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    // document.getElementById("result").innerText = "오류 발생: " + error.message;
  }
};

export const fetchItemList = async (
  queryType = "ItemNewSpecial",
  maxResults = 8,
  start = 1,
  searchTarget = "Book"
) => {
  try {
    console.log("API call");
    const url = new URL("http://localhost:3000/api/ItemList");
    url.searchParams.append("QueryType", queryType);
    url.searchParams.append("Start", start);
    url.searchParams.append("MaxResults", maxResults);
    url.searchParams.append("SearchTarget", searchTarget);

    const response = await fetch(url.href);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return [data.totalResults, data.item];
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    // document.getElementById("result").innerText = "오류 발생: " + error.message;
  }
};
