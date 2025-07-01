const axios = require("axios");

exports.handler = async (event) => {
  const category = event.queryStringParameters?.category || "business";
  const apiKey = process.env.VITE_NEWSAPI_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing NewsAPI key in environment variables" }),
    };
  }

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: "us",
        category,
        apiKey,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.articles),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch articles",
        details: error.response?.data || error.message,
      }),
    };
  }
};
