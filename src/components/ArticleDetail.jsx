import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { summarizeArticle } from "../api/newsApi"; 

export default function ArticleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!article) {
    return (
      <div className="p-6 mt-24 text-center">
        <p className="text-red-500 text-lg"> Article not found. Please go back and select an article.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          🔙 Back to Home
        </button>
      </div>
    );
  }

  const handleSummarize = async () => {
    setError("");
    setSummary("");
    setSaveSuccess(false);
    setLoading(true);

    try {
      const content = article.content || article.description || article.title;
      await summarizeArticle(content, setSummary);
    } catch (err) {
      console.error("Summarize error:", err);
      setError("Unexpected error during summarization.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToLocal = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("summaries")) || [];
      const newSummary = {
        title: article.title || "Untitled",
        source: article.source?.name || "Unknown",
        publishedAt: article.publishedAt || "",
        url: article.url || "",
        summary,
        timestamp: Date.now(),
      };

      localStorage.setItem("summaries", JSON.stringify([...saved, newSummary]));
      setSaveSuccess(true);
    } catch (err) {
      console.error("Saving to localStorage failed:", err);
      setError(" Failed to save locally.");
    }
  };

  return (
    <div className="p-6 border rounded shadow mb-6 max-w-3xl mx-auto mt-24 bg-white">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt="Article"
          className="w-full max-h-96 object-cover rounded mb-4"
        />
      )}

      <p className="text-gray-600 mb-1">
        <strong>Source:</strong> {article.source?.name || "Unknown"}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Published:</strong> {article.publishedAt || "N/A"}
      </p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded mb-4 mr-2"
      >
        🔗 Read Full Article
      </a>

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="inline-block bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? " Summarizing..." : " Summarize"}
      </button>

      {loading && <Loader />}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {saveSuccess && <p className="text-green-600 mt-2"> Saved to local storage!</p>}

      {summary && (
        <>
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-semibold mb-2"> Summary:</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {summary.split("\n").map((point, idx) => (
                <li key={idx}>{point.trim()}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleSaveToLocal}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Save to My Summaries
          </button>
        </>
      )}
    </div>
  );
}