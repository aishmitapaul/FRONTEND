import axios from "axios";

export async function fetchArticles(category) {
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;

  if (!apiKey) {
    throw new Error(" NewsAPI key is missing in your .env file.");
  }

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: "us",
        category,
        apiKey: apiKey,
      },
    });

    console.log("Articles fetched:", response.data.articles.length);
    return response.data.articles;
  } catch (error) {
    console.error(" Fetching articles failed:", error.response?.data || error.message);
    throw new Error("Failed to fetch articles.");
  }
}

export async function summarizeArticle(text, setSummary) {
  console.log(" Sending text to backend:", text);

  if (!text || text.trim().length === 0) {
    console.error(" Text is empty or undefined.");
    setSummary(" No valid article content to summarize.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    console.log(" Backend response:", data);

    if (data.summary) {
      setSummary(data.summary);
    } else {
      setSummary(data.error || " No summary returned.");
    }
  } catch (error) {
    console.error(" Error calling backend:", error);
    setSummary(" Backend summarization failed.");
  }
}
export async function saveSummaryToBackend(article, summary) {
  const res = await fetch("http://localhost:5000/api/save-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: article.title || "Untitled",
      source: article.source?.name || "Unknown Source",
      publishedAt: article.publishedAt || "",
      url: article.url || "",
      summary: summary || "",
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to save summary");
  return data;
}