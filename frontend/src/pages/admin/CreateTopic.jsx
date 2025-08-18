import { useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

export default function CreateTopic() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "IoT", // Default value
    codeExample: "",
    image: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common categories that might be used for topics
  const categories = [
    "IoT",
    "MATLAB",
    "Embedded Systems",
    "Robotics",
    "Circuit Design",
    "Programming",
    "Electronics",
    "Control Systems",
    "Other",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await api.post("/topic", form);
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        📚 Create Learning Topic
      </h2>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title*</label>
          <input
            name="title"
            value={form.title}
            placeholder="Enter topic title"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category*</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description*</label>
          <textarea
            name="description"
            value={form.description}
            placeholder="Explain this topic in detail"
            onChange={handleChange}
            className="textarea textarea-bordered w-full min-h-[150px]"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Provide a comprehensive explanation of the topic
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Code Example</label>
          <textarea
            name="codeExample"
            value={form.codeExample}
            placeholder={`// Example code snippet\nconst example = "Hello World";`}
            onChange={handleChange}
            className="textarea textarea-bordered w-full min-h-[100px] font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional code example that demonstrates this topic
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="image"
            value={form.image}
            placeholder="https://example.com/diagram.png"
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional diagram or illustration URL
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Topic"}
        </button>
      </form>
    </div>
  );
}
