const mongoose = require("mongoose");

const learningTopicSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      // enum: ["Microcontroller", "IoT", "Control System", "Embedded", "Other"],
      required: true,
    },
    codeExample: String, // Optional
    image: String, // Optional: diagram/image URL
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", learningTopicSchema);
