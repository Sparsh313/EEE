import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/axios";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/projects/${slug}`)
      .then((res) => {
        setProject(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [slug]);

  const Card = ({ title, icon, children }) => (
    <div className="relative p-6 bg-white/5 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl border border-white/10 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(30,144,255,0.2)]">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-xl text-white shadow-lg">
          {icon}
        </div>
        <h2 className="text-3xl font-extrabold text-white">{title}</h2>
      </div>
      <div className="text-gray-300">{children}</div>
    </div>
  );

  const StatusMessage = ({
    title,
    children,
    icon,
    bgColor,
    textColor,
    buttonText,
    buttonLink,
  }) => (
    <div
      className={`flex flex-col justify-center items-center min-h-screen text-center p-4 bg-gradient-to-br from-gray-950 to-black ${textColor}`}
    >
      <div className={`p-6 rounded-full ${bgColor} mb-6`}>{icon}</div>
      <h2 className="text-4xl font-bold mb-3">{title}</h2>
      <p className="max-w-md text-lg mb-8">{children}</p>
      {buttonLink && (
        <Link
          to={buttonLink}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-12 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <StatusMessage
        title="Loading Project"
        icon={
          <span className="loading loading-spinner loading-lg text-white"></span>
        }
        bgColor="bg-blue-600"
        textColor="text-white"
      >
        <p className="text-gray-300">Please wait while we fetch the details.</p>
      </StatusMessage>
    );
  }

  if (!project) {
    return (
      <StatusMessage
        title="Project Not Found"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        }
        bgColor="bg-red-600"
        textColor="text-white"
        buttonText="Browse All Projects"
        buttonLink="/projects"
      >
        We couldn't find the project you're looking for. It may have been
        removed or the URL is incorrect.
      </StatusMessage>
    );
  }

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = project.circuitImage;
    link.download = `${project.slug}-circuit.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 to-black min-h-screen text-white font-sans relative overflow-hidden">
      {/* Background blobs for a premium effect */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-blob -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 -z-10"></div>

      <div className="max-w-6xl mx-auto py-16 px-4 relative z-10">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Projects
        </Link>

        {/* HERO SECTION - Glassmorphism style */}
        <section className="relative p-10 bg-white/10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transform transition-transform duration-500 hover:scale-[1.01]">
          <div className="relative z-10 text-center">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="badge badge-lg bg-white/20 text-white font-semibold border-none backdrop-filter backdrop-blur-sm">
                {project.category}
              </span>
              <span className="badge badge-lg bg-green-500/50 text-white font-semibold border-none backdrop-filter backdrop-blur-sm">
                {project.difficulty}
              </span>
            </div>
            <p className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-200">
              {project.description}
            </p>
          </div>
        </section>

        {/* PROJECT DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-10">
            {/* Project Overview Card */}
            <Card
              title="Project Overview"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            >
              <p className="text-lg leading-relaxed">{project.description}</p>
            </Card>

            {/* Steps to Build Card */}
            <Card
              title="Steps to Build"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              }
            >
              <ol className="space-y-6">
                {project.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                        {idx + 1}
                      </div>
                      {idx < project.steps.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-700 my-1"></div>
                      )}
                    </div>
                    <p className="text-lg pt-1 text-gray-300">{step}</p>
                  </li>
                ))}
              </ol>
            </Card>

            {/* Circuit Diagram Card */}
            {project.circuitImage && (
              <Card
                title="Circuit Diagram"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                }
              >
                <div className="flex flex-col items-center gap-6">
                  <a
                    href={project.circuitImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <img
                      src={project.circuitImage}
                      alt="Circuit Diagram"
                      className="w-full max-h-[400px] object-contain rounded-xl border-4 border-white/20 transition-transform hover:scale-[1.02] cursor-pointer shadow-lg"
                    />
                  </a>
                  <button
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Diagram
                  </button>
                </div>
              </Card>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-10">
            {/* Source Code Card */}
            <Card
              title="Source Code"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              }
            >
              {project.code ? (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              ) : (
                <p>Code not available.</p>
              )}
            </Card>

            {/* Video Tutorial Card */}
            {project.videoLink && (
              <Card
                title="Video Tutorial"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                }
              >
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                  <iframe
                    src={project.videoLink}
                    title="YouTube video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card>
            )}

            {/* Project Details Card */}
            <Card
              title="Project Details"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Created</h3>
                  <p className="text-lg">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Difficulty
                  </h3>
                  <p className="text-lg capitalize">{project.difficulty}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Category
                  </h3>
                  <p className="text-lg capitalize">{project.category}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="text-center pt-20 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Project Hub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
