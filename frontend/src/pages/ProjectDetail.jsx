import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/axios";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    api
      .get(`/projects/${slug}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!project) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Title & Tags */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">{project.title}</h1>
        <div className="flex gap-2 flex-wrap">
          <span className="badge badge-outline">{project.category}</span>
          <span className="badge badge-primary">{project.difficulty}</span>
          {project.tags.map((tag, i) => (
            <span key={i} className="badge badge-secondary">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <section>
        <h2 className="text-xl font-semibold">🔍 Description</h2>
        <p className="mt-2 text-gray-700">{project.description}</p>
      </section>

      {/* Apparatus */}
      <section>
        <h2 className="text-xl font-semibold">🔧 Components Required</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-800">
          {project.components.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Circuit Diagram */}
      {project.circuitImage && (
        <section>
          <h2 className="text-xl font-semibold">🔌 Circuit Diagram</h2>
          <img
            src={project.circuitImage}
            alt="Circuit"
            className="w-full max-w-md mt-4 rounded shadow"
          />
        </section>
      )}

      {/* Code */}
      <section>
        <h2 className="text-xl font-semibold">💻 Arduino Code</h2>
        <pre className="bg-base-200 rounded p-4 mt-2 overflow-auto text-sm">
          <code>{project.code}</code>
        </pre>
      </section>

      {/* Steps */}
      <section>
        <h2 className="text-xl font-semibold">🪜 Step-by-Step Guide</h2>
        <ol className="list-decimal ml-6 mt-2 space-y-2 text-gray-800">
          {project.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Notes / Conclusion */}
      {project.notes && (
        <section>
          <h2 className="text-xl font-semibold">📝 Notes</h2>
          <p className="mt-2 text-gray-700">{project.notes}</p>
        </section>
      )}
    </div>
  );
}
