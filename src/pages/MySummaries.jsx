import { useEffect, useState } from "react";

export default function MySummaries() {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("summaries")) || [];
    setSummaries(saved);
  }, []);

  return (
    <div className="p-4 mt-24 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 My Saved Summaries</h2>
      {summaries.length === 0 ? (
        <p className="text-gray-600">No summaries saved yet.</p>
      ) : (
        summaries.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
            <p className="text-sm text-gray-600">🕒 {new Date(item.timestamp).toLocaleString()}</p>
            <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
            <p className="text-sm text-gray-600">📌 {item.source}</p>
            <ul className="list-disc pl-5 text-gray-800 mt-2">
              {item.summary.split('\n').map((point, idx) => (
                <li key={idx}>{point.trim()}</li>
              ))}
            </ul>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 inline-block"
            >
              Read Full Article
            </a>
          </div>
        ))
      )}
    </div>
  );
}