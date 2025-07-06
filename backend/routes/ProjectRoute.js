const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} = require("../controllers/ProjectController");

// Public routes
router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);

// Admin-only routes
router.post("/", adminAuth, createProject);
router.put("/:slug", adminAuth, updateProject);
router.delete("/:slug", adminAuth, deleteProject);

module.exports = router;
