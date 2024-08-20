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

    let totalResults = data.totalResults <= 200 ? data.totalResults : 200;

    return [totalResults, data.item];
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    alert("API 요청 중 오류 발생, 잠시 후 다시 시도해주세요.");
  }
};

export const fetchItemList = async (
  queryType = "ItemNewSpecial",
  start = 1,
  maxResults = 8,
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

    let totalResults = data.totalResults <= 200 ? data.totalResults : 200;

    return [totalResults, data.item];
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    alert("API 요청 중 오류 발생, 잠시 후 다시 시도해주세요.");
  }
};
