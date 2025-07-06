const LearningTopic = require("../models/Topic");
const slugify = require("slugify");

exports.createTopic = async (req, res)   => {
  try {
    const { title, description, category, codeExample, image } = req.body;
    const slug = slugify(title, { lower: true });

    const topic = await LearningTopic.create({
      title,
      slug,
      description,
      category,
      codeExample,
      image,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Topic created", topic });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await LearningTopic.find().sort({ createdAt: -1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getTopicBySlug = async (req, res) => {
  try {
    const topic = await LearningTopic.findOne({ slug: req.params.slug });
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const updated = await LearningTopic.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Topic not found" });
    res.json({ message: "Topic updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const deleted = await LearningTopic.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deleted) return res.status(404).json({ message: "Topic not found" });
    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
