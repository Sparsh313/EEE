    import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/axios";

export default function Learn() {
  const [topics, setTopics] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 6;

  // Fetch topics from backend
  useEffect(() => {
    api
      .get("/topic")
      .then((res) => {
        setTopics(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter on search input
  useEffect(() => {
    const result = topics.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [search, topics]);

  const indexOfLast = currentPage * topicsPerPage;
  const indexOfFirst = indexOfLast - topicsPerPage;
  const currentTopics = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / topicsPerPage);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">📘 Learning Topics</h1>
        <p className="text-gray-500">
          Master EEE concepts from basics to advanced with simple, short, and contextual content.
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by topic title..."
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Topics Grid */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentTopics.map((topic) => (
          <div
            key={topic._id}
            className="card bg-base-100 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 rounded-xl overflow-hidden"
          >
            <div className="card-body space-y-3">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-lg font-bold text-primary">
                  {topic.title}
                </h2>
                <img
                  src={
                    topic.icon ||
                    "https://img.icons8.com/fluency/48/physics.png"
                  }
                  alt="topic icon"
                  className="w-7 h-7"
                />
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">
                {topic.summary?.slice(0, 100)}...
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="badge badge-outline">
                  {topic.category || "EEE Core"}
                </span>
                {topic.tags?.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="badge bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-400">
                🕒 {topic.estimatedTime || "5-10 min read"}
              </p>

              <div className="card-actions justify-end">
                <Link
                  to={`/learning/${topic.slug}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="btn btn-sm"
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span className="text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="btn btn-sm"
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
