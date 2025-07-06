const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["IoT", "MATLAB", "Embedded", "Robotics", "Analog", "Other"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    components: [String], // ["NodeMCU", "Relay", "Bulb"]
    circuitImage: String, // cloudinary or /uploads/
    code: String, // or GitHub link
    steps: [String], // ["Connect NodeMCU", "Upload code", "Test with bulb"]
    videoLink: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
