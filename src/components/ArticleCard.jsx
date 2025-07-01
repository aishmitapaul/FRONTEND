export default function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt=""
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{article.title}</h3>
        <p className="text-sm text-gray-500">{article.source.name}</p>
      </div>
    </div>
  );
}