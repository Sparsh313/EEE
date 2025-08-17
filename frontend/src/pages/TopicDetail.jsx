// src/pages/LearningDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/axios";

export default function LearningDetail() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/topic/${slug}`)
      .then((res) => {
        setTopic(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-950 to-black">
        <span className="loading loading-spinner loading-lg text-blue-400"></span>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-950 to-black text-white p-4">
        <p className="text-gray-400 text-xl font-medium">Topic not found.</p>
        <Link
          to="/learning"
          className="mt-8 px-10 py-4 font-bold text-lg rounded-full text-white bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
        >
          Back to Learning
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-950 to-black min-h-screen text-gray-100 py-20 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="relative bg-[#1a1f29] rounded-3xl shadow-2xl shadow-[rgba(15,20,30,0.5)] border border-[#2c3340] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(30,40,50,0.8)]">
          {topic.image && (
            <div className="relative">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-80 object-cover rounded-t-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f29] to-transparent"></div>
            </div>
          )}
          <div className="p-12 space-y-6">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 leading-tight">
              {topic.title}
            </h1>
            <span className="inline-block px-5 py-2 bg-blue-500/10 text-blue-300 font-bold text-sm rounded-full tracking-wide uppercase border border-blue-600/30">
              {topic.category}
            </span>
            <p className="text-gray-300 text-xl leading-relaxed">
              {topic.description}
            </p>
          </div>
        </section>

        {/* Code Example */}
        {topic.codeExample && (
          <section className="relative bg-[#1a1f29] p-10 rounded-3xl shadow-inner shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-[#2c3340] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(30,40,50,0.8)]">
            <h2 className="text-3xl font-bold text-blue-400 mb-6 flex items-center gap-4">
              💻 Code Example
            </h2>
            <div className="relative">
              <pre className="bg-gray-900 text-green-300 p-8 rounded-2xl overflow-x-auto text-sm leading-relaxed border border-gray-700">
                <code>{topic.codeExample}</code>
              </pre>
              <div className="absolute top-0 right-0 p-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
                {/* Add copy icon or any other premium feature here */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7v-1h9v-1H8v1zM6 9h11v11H6V9z"
                  />
                </svg>
              </div>
            </div>
          </section>
        )}

        {/* Footer Info */}
        <footer className="text-md text-gray-500 border-t border-gray-800 pt-8 text-center">
          📅 Created on: {new Date(topic.createdAt).toLocaleDateString()}
        </footer>

        {/* Back Button */}
        <div className="pt-10 text-center">
          <Link
            to="/learning"
            className="inline-flex items-center px-10 py-4 font-bold text-lg rounded-full text-white bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Learning
          </Link>
        </div>
      </div>
    </div>
  );
}
