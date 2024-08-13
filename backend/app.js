const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/ItemSearch", async (req, res, next) => {
  console.log("in");
  try {
    const { query, queryType, maxResults, start, searchTarget } = req.query;
    const apiUrl = "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx";

    const response = await axios.get(apiUrl, {
      params: {
        ttbkey: process.env.API_KEY,
        Query: query || "aladdin",
        QueryType: queryType || "Title",
        MaxResults: maxResults || 8,
        start: start || 1,
        SearchTarget: searchTarget || "Book",
        output: "js",
        Version: "20131101",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Aladin API" });
  }
});

app.get("/api/ItemList", async (req, res, next) => {
  console.log("in");
  console.log("req.query:", req.query);
  try {
    const { queryType, maxResults, start, searchTarget } = req.query;
    const apiUrl = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";

    const response = await axios.get(apiUrl, {
      params: {
        ttbkey: process.env.API_KEY,
        QueryType: queryType || "ItemNewSpecial", // default: ItemNewSpecial : 주목할 만한 신간 리스트
        MaxResults: maxResults || 8,
        start: start || 1,
        SearchTarget: searchTarget || "Book",
        output: "js",
        Version: "20131101",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Aladin API" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
