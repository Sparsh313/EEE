import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        setProjects(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const result = projects.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [search, projects]);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / projectsPerPage);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">📦 All EEE Projects</h1>
        <p className="text-gray-500">
          Explore hand-picked projects with step-by-step guides
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by project title..."
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Project Grid */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentProjects.map((project) => (
          <div
            key={project._id}
            className="card bg-base-100 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 rounded-xl overflow-hidden"
          >
            {/* Optional Image */}
            {project.thumbnail && (
              <figure>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
            )}

            <div className="card-body space-y-3">
              <div>
                <h2 className="card-title text-lg font-bold text-primary">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {project.description?.slice(0, 100)}...
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="badge badge-outline">
                  {project.difficulty || "Beginner"}
                </span>
                <span className="badge badge-info">{project.category}</span>
                {(project.tags || []).slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="badge bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Created At */}
              <p className="text-xs text-gray-400">
                📅 Created on:{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>

              <div className="card-actions justify-end">
                <Link
                  to={`/projects/${project.slug}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  View Details
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
