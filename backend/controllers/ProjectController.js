const Project = require("../models/Product");
const slugify = require("slugify");

exports.createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      difficulty,
      description,
      components,
      code,
      steps,
      videoLink,
    } = req.body;
    const circuitImage = req.file ? req.file.path : null;
    const slug = slugify(title, { lower: true });


    // ERROR HANDLING

    // Check required fields
    if (!title || !category || !difficulty || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields (title, category, difficulty, description)",
      });
    }
    // Duplicate project
        const existingProject = await Project.findOne({ slug });
        if (existingProject) {
          return res.status(400).json({
            success: false,
            message: "Project with this name already exists",
          });
        }

    const project = await Project.create({
      title,
      slug,
      category,
      difficulty,
      description,
      components,
      code,
      steps,
      circuitImage,
      videoLink,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Project created", project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updates = req.body;
    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      updates,
      {
        new: true,
      }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project updated", project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
