import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleDeleteTopic = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    await api.delete(`/topic/${slug}`);
    setTopics(topics.filter((t) => t.slug !== slug));
  };

  const handleDeleteProject = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    await api.delete(`/projects/${slug}`);
    setProjects(projects.filter((p) => p.slug !== slug));
  };

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
    api.get("/topic").then((res) => setTopics(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ⚡ Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Manage Learning Section */}
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="text-2xl font-semibold mb-4">📘 Manage Learning</h2>
          <div className="flex justify-end mb-2">
            <Link to="/admin/topic/create">
              <button className="btn btn-primary btn-sm">+ Create Topic</button>
            </Link>
          </div>
          <ul className="divide-y">
            {topics.map((t) => (
              <li
                key={t._id}
                className="flex justify-between items-center py-2"
              >
                <span>{t.title}</span>
                <div className="flex gap-2">
                  <Link to={`/admin/topic/edit/${t.slug}`}>
                    <button className="btn btn-warning btn-xs">Edit</button>
                  </Link>

                  <button
                    onClick={() => handleDeleteTopic(t.slug)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Manage Projects Section */}
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="text-2xl font-semibold mb-4">🚀 Manage Projects</h2>
          <div className="flex justify-end mb-2">
            <Link to="/admin/project/create">
              <button className="btn btn-primary btn-sm">
                + Create Project
              </button>
            </Link>
          </div>
          <ul className="divide-y">
            {projects.map((p) => (
              <li
                key={p._id}
                className="flex justify-between items-center py-2"
              >
                <span>{p.title}</span>
                <div className="flex gap-2">
                  <Link to={`/admin/project/edit/${p.slug}`}>
                    <button className="btn btn-warning btn-xs">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteProject(p.slug)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
