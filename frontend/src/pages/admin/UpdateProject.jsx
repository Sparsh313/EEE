import { useEffect, useState } from "react";
import api from "../../services/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProject() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories and difficulties from your model
  const categories = [
    "IoT",
    "MATLAB",
    "Embedded",
    "Robotics",
    "Analog",
    "Other",
  ];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    api
      .get(`/projects/${slug}`)
      .then((res) => {
        const project = res.data;
        setForm({
          ...project,
          components: project.components.join(", "),
          steps: project.steps.join("\n"),
        });
      })
      .catch((error) => {
        setErrorMsg("Failed to load project. Please try again.");
        console.error("Error fetching project:", error);
      });
  }, [slug]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await api.put(`/projects/${slug}`, {
        ...form,
        components: form.components
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
        steps: form.steps.split("\n").filter((step) => step.trim()),
      });
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

  if (!form)
    return <div className="p-6 max-w-2xl mx-auto text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        ✏️ Edit Project
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
            placeholder="Enter project title"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium mb-1">
              Difficulty*
            </label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description*</label>
          <textarea
            name="description"
            value={form.description}
            placeholder="Write a detailed description of the project"
            onChange={handleChange}
            className="textarea textarea-bordered w-full min-h-[100px]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Components</label>
          <input
            name="components"
            value={form.components}
            placeholder="Comma separated (e.g., Arduino, LDR, 220Ω Resistor)"
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate components with commas. Example: NodeMCU, Relay Module, 5V
            Power Supply
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Steps</label>
          <textarea
            name="steps"
            value={form.steps}
            placeholder={`1. Connect the components as shown in the diagram\n2. Upload the provided code\n3. Test the circuit`}
            onChange={handleChange}
            className="textarea textarea-bordered w-full min-h-[100px]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter one step per line. These will be displayed as a numbered list.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Code Repository
          </label>
          <input
            name="code"
            value={form.code}
            placeholder="https://github.com/username/project-repo"
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Link to GitHub or other code repository
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Circuit Image URL
          </label>
          <input
            name="circuitImage"
            value={form.circuitImage}
            placeholder="https://example.com/circuit-image.jpg"
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL of the circuit diagram or photo
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Video Tutorial URL
          </label>
          <input
            name="videoLink"
            value={form.videoLink}
            placeholder="https://youtube.com/watch?v=..."
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Link to YouTube or other video platform
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
