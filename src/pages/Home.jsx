import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchArticles } from "../api/newsApi";
import CategoryTabs from "../components/CategoryTabs";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import HeroBanner from "../components/HeroBanner"; 

export default function Home() {
  const categories = ["business", "technology", "sports", "health"];
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchArticles(selectedCategory)
      .then((data) => {
        if (data.length === 0) {
          setError("No articles found.");
        }
        setArticles(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch articles.");
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  
  const filteredArticles = searchQuery
    ? articles.filter((article) =>
        (article.title || "").toLowerCase().includes(searchQuery)
      )
    : articles;

  return (
    <main className="px-6 mt-24">
      {}
      <HeroBanner />

      {}
      <div id="categories">
        <CategoryTabs
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {}
      {loading && <Loader />}

      {}
      {error && (
        <div className="text-center text-red-600 my-10">{error}</div>
      )}

      {}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <ArticleCard
                key={article.url}
                article={article}
                onClick={() =>
                  navigate(`/article/${index}`, { state: { article } })
                }
              />
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              No articles match your search.
            </div>
          )}
        </div>
      )}
    </main>
  );
}