import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/axios";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
    api.get("/topic").then((res) => setTopics(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px8 space-y-20">
      {/* 🔥 HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-4 ">
        {/* Left Side (Text) */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-extrabold leading-tight text-primary">
            Learn. Build. Conquer. ⚡
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto md:mx-0">
            The easiest way for EEE & ECE students to build real projects with
            step-by-step guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/projects" className="btn btn-primary btn-lg">
              🔧 Browse Projects
            </Link>
            <Link to="/learning" className="btn btn-outline btn-lg">
              📚 Start Learning
            </Link>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="hidden md:block">
          <img
            src="https://www.kaggle.com/static/images/home/logged-out/hero-illo@3x.png"
            alt="EEE Project Illustration"
            className="w-full mx-auto"
          />
        </div>
      </section>

      {/* ✅ WHY BUILD HERE */}
      <section className="text-center space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Why Build with Us?
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-primary p-6 hover:shadow-2xl transition-all">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl">📚</div>
              <h3 className="text-xl font-semibold text-primary">
                Step-by-Step Projects
              </h3>
              <p className="text-sm text-gray-600 text-center">
                From circuit design to final code — every project comes with
                guided steps, images, and explanation.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-primary p-6 hover:shadow-2xl transition-all">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl">🧠</div>
              <h3 className="text-xl font-semibold text-primary">
                Concept with Application
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Understand sensors, modules & real-world circuits with theory
                and code. Learn why, not just how.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-primary p-6 hover:shadow-2xl transition-all">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl">🎓</div>
              <h3 className="text-xl font-semibold text-primary">
                Made for Students
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Every topic and project is tailored for EEE/ECE students in
                2nd–4th year — no extra fluff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 LATEST PROJECTS (SCROLL) */}
      {/* <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              🔧 Featured Projects
            </h2>
            <p className="text-gray-600 text-sm px-10">
              Explore beginner to advanced EEE/ECE projects with complete
              guidance.
            </p>
          </div>
          <Link to="/projects" className="btn btn-sm btn-outline">
            See All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-6 py-4">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project._id}
                className="min-w-[320px] min-h-[170px] bg-base-100 rounded-xl shadow-md p-4 shadow hover:shadow-2xl "
              >
                <h3 className="font-semibold text-primary text-lg py-1.5">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {project.description?.slice(0, 80)}...
                </p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="btn btn-xs mt-3 btn-outline btn-primary"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              🔧 Featured Projects
            </h2>
            <p className="text-gray-600 text-sm">
              Explore beginner to advanced EEE/ECE projects with complete
              guidance.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-sm text-blue-600 hover:underline"
          >
            → View all
          </Link>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 pb-2 snap-x snap-mandatory scroll-smooth">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project.slug}`}
                className="min-w-[260px] max-w-[280px] bg-base-100 border border-base-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 snap-start"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-md text-primary line-clamp-2">
                    {project.title}
                  </h3>
                  <img
                    src={
                      project.icon ||
                      "https://img.icons8.com/fluency/48/000000/electronics.png"
                    }
                    alt="project icon"
                    className="w-7 h-7"
                  />
                </div>

                <p className="text-xs text-gray-500 mb-1">
                  {project.difficulty || "Beginner Level"}
                </p>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {project.description?.slice(0, 63)}...
                </p>

                <div className="mt-3 flex flex-wrap gap-1 text-xs">
                  {(project.tags || []).slice(0, 2).map((tag, i) => (
                    <span key={i} className="badge badge-outline">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 📚 TOPICS SECTION */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              📚 Learning Topics
            </h2>
            <p className="text-gray-600 text-sm">
              Understand core electrical concepts with simple, short
              explanations and real-world use.
            </p>
          </div>
          <Link
            to="/learning"
            className="text-sm text-blue-600 hover:underline"
          >
            → View all
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic._id}
              to={`/learning/${topic.slug}`}
              className="border border-base-200 bg-base-100 rounded-xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-md text-primary">
                  {topic.title}
                </h3>
                {/* Optional Icon */}
                <img
                  src={
                    topic.icon ||
                    "https://img.icons8.com/fluency/48/circuit.png"
                  }
                  alt="topic"
                  className="w-8 h-8"
                />
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {topic.estimatedTime || "5 min read"}
              </p>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {topic.summary?.slice(0, 100)}...
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-white rounded-xl p-10 text-center space-y-4">
        <h2 className="text-3xl font-bold">Start Your First Project Today!</h2>
        <p>Learning by doing is the best way to master engineering skills.</p>
        <Link to="/projects" className="btn btn-accent">
          Get Started →
        </Link>
      </section>
    </div>
  );
}
