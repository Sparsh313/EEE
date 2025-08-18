// import { useState } from "react";
// import api from "../../services/axios";
// import { useNavigate } from "react-router-dom";

// export default function CreateProject() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     title: "",
//     category: "IoT", // Default value
//     difficulty: "Beginner", // Default value
//     description: "",
//     components: "",
//     code: "",
//     steps: "",
//     circuitImage: "",
//     videoLink: "",
//   });

//   const [file, setFile] = useState(null); //IMG upload
//   const [errorMsg, setErrorMsg] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setIsSubmitting(true);

//     try {
//       await api.post("/projects", {
//         ...form,
//         components: form.components
//           .split(",")
//           .map((item) => item.trim())
//           .filter((item) => item), // Clean up components
//         steps: form.steps.split("\n").filter((step) => step.trim()), // Remove empty steps
//       });
//       navigate("/admin/dashboard");
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setErrorMsg(error.response.data.message);
//       } else {
//         setErrorMsg("Something went wrong. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Categories and difficulties from your model
//   const categories = [
//     "IoT",
//     "MATLAB",
//     "Embedded",
//     "Robotics",
//     "Analog",
//     "Other",
//   ];
//   const difficulties = ["Beginner", "Intermediate", "Advanced"];

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-6 text-center">
//         🚀 Create Project
//       </h2>

//       {errorMsg && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//           {errorMsg}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Title*</label>
//           <input
//             name="title"
//             value={form.title}
//             placeholder="Enter project title"
//             onChange={handleChange}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Category*</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="select select-bordered w-full"
//               required
//             >
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Difficulty*
//             </label>
//             <select
//               name="difficulty"
//               value={form.difficulty}
//               onChange={handleChange}
//               className="select select-bordered w-full"
//               required
//             >
//               {difficulties.map((diff) => (
//                 <option key={diff} value={diff}>
//                   {diff}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Description*</label>
//           <textarea
//             name="description"
//             value={form.description}
//             placeholder="Write a detailed description of the project"
//             onChange={handleChange}
//             className="textarea textarea-bordered w-full min-h-[100px]"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Components</label>
//           <input
//             name="components"
//             value={form.components}
//             placeholder="Comma separated (e.g., Arduino, LDR, 220Ω Resistor)"
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Separate components with commas. Example: NodeMCU, Relay Module, 5V
//             Power Supply
//           </p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Steps</label>
//           <textarea
//             name="steps"
//             value={form.steps}
//             placeholder={`1. Connect the components as shown in the diagram\n2. Upload the provided code\n3. Test the circuit`}
//             onChange={handleChange}
//             className="textarea textarea-bordered w-full min-h-[100px]"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Enter one step per line. These will be displayed as a numbered list.
//           </p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Code Repository
//           </label>
//           <input
//             name="code"
//             value={form.code}
//             placeholder="https://github.com/username/project-repo"
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Link to GitHub or other code repository
//           </p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Circuit Image URL
//           </label>
//           <input
//             name="circuitImage"
//             value={form.circuitImage}
//             placeholder="https://example.com/circuit-image.jpg"
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             URL of the circuit diagram or photo
//           </p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Video Tutorial URL
//           </label>
//           <input
//             name="videoLink"
//             value={form.videoLink}
//             placeholder="https://youtube.com/watch?v=..."
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Link to YouTube or other video platform
//           </p>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary w-full"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Creating..." : "Create Project"}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "IoT",
    difficulty: "Beginner",
    description: "",
    components: "",
    code: "",
    steps: "",
    videoLink: "",
  });

  const [file, setFile] = useState(null); // 🔹 For image upload
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (file) formData.append("circuitImage", file); // 🔹 Image file

      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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

  const categories = [
    "IoT",
    "MATLAB",
    "Embedded",
    "Robotics",
    "Analog",
    "Other",
  ];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        🚀 Create Project
      </h2>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title*</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter project title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category & Difficulty */}
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
                <option key={cat}>{cat}</option>
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
                <option key={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description*</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a detailed description"
            className="textarea textarea-bordered w-full min-h-[100px]"
            required
          />
        </div>

        {/* Components */}
        <div>
          <label className="block text-sm font-medium mb-1">Components</label>
          <input
            name="components"
            value={form.components}
            onChange={handleChange}
            placeholder="Arduino, LDR, Resistor..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Steps */}
        <div>
          <label className="block text-sm font-medium mb-1">Steps</label>
          <textarea
            name="steps"
            value={form.steps}
            onChange={handleChange}
            placeholder={`1. Connect components\n2. Upload code\n3. Test circuit`}
            className="textarea textarea-bordered w-full min-h-[100px]"
          />
        </div>

        {/* Code Repo */}
        <div>
          <label className="block text-sm font-medium mb-1">Code Repo</label>
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
            className="input input-bordered w-full"
          />
        </div>

        {/* Circuit Image (Upload) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Circuit Image*
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        {/* Video Link */}
        <div>
          <label className="block text-sm font-medium mb-1">Video Link</label>
          <input
            name="videoLink"
            value={form.videoLink}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
