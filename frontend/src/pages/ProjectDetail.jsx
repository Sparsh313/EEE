import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/axios";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  console.log(slug);
  useEffect(() => {
    api
      .get(`/projects/${slug}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 px-4">
      {/* HERO */}
      <section className="bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl p-8 text-white text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
        <div className="flex justify-center gap-3 mb-4">
          <span className="badge badge-outline">{project.category}</span>
          <span className="badge badge-accent">{project.difficulty}</span>
        </div>
        <p className="max-w-2xl mx-auto text-lg">{project.description}</p>
      </section>

      {/* DESCRIPTION */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary">
          📜 Project Overview
        </h2>
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <p>{project.description}</p>
        </div>
      </section>

      {/* STEPS */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary">
          🛠 Steps to Build
        </h2>
        <ol className="list-decimal list-inside space-y-2 bg-base-100 p-6 rounded-xl shadow">
          {project.steps.map((step, idx) => (
            <li key={idx} className="text-gray-700">
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* CIRCUIT IMAGE */}
      {project.circuitImage && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">
            🔌 Circuit Diagram
          </h2>
          <div className="bg-base-100 p-6 rounded-xl shadow flex justify-center">
            <img
              src={project.circuitImage}
              alt="Circuit Diagram"
              className="max-h-96 object-contain rounded-lg border"
            />
          </div>
        </section>
      )}

      {/* CODE */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary">💻 Code</h2>
        {project.code ? (
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View Code on GitHub
          </a>
        ) : (
          <p className="text-gray-500">Code not available</p>
        )}
      </section>

      {/* VIDEO */}
      {project.videoLink && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">
            🎥 Video Tutorial
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={project.videoLink}
              title="YouTube video"
              className="w-full h-96 rounded-xl shadow"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="text-sm text-gray-500 text-center">
        📅 Created on: {new Date(project.createdAt).toLocaleDateString()}
      </footer>
    </div>
  );
}
