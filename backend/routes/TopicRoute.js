const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");

const {
  createTopic,
  getAllTopics,
  getTopicBySlug,
  updateTopic,
  deleteTopic,
} = require("../controllers/TopicController");

// Public
router.get("/", getAllTopics);
router.get("/:slug", getTopicBySlug);

// Admin-only
router.post("/", adminAuth, upload.single("image"), createTopic);
router.put("/:slug", adminAuth, updateTopic);
router.delete("/:slug", adminAuth, deleteTopic);

module.exports = router;
