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
    const { Query, QueryType, MaxResults, Start, SearchTarget } = req.query;
    if (!Query || !QueryType || !MaxResults || !Start || !SearchTarget) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    const apiUrl = "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx";
    const response = await axios.get(apiUrl, {
      params: {
        TTBKey: process.env.API_KEY,
        Query: Query || "aladdin",
        QueryType,
        MaxResults,
        Start,
        SearchTarget,
        Cover: "Big",
        Output: "js",
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
  try {
    // console.log(req.query);
    const { QueryType, MaxResults, Start, SearchTarget } = req.query;
    if (!QueryType || !MaxResults || !Start || !SearchTarget) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    const apiUrl = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";
    const response = await axios.get(apiUrl, {
      params: {
        TTBKey: process.env.API_KEY,
        QueryType, // default: ItemNewSpecial : 주목할 만한 신간 리스트
        MaxResults,
        Start,
        SearchTarget,
        Cover: "Big",
        Output: "js",
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
