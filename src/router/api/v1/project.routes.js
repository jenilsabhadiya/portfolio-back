const express = require("express");
const { ProjectController } = require("../../../controller");
const upload = require("../../../middleware/upload");
const router = express.Router();

router.post(
  "/create-project",
  upload.single("project_image"), // <-- FIX HERE
  ProjectController.createProject
);

router.get("/list-project", ProjectController.getProjects);
router.get("/get-project/:id", ProjectController.getProjectById);

router.put(
  "/update-project/:id",
  upload.single("project_image"),
  ProjectController.updateProject
);

router.delete("/delete-project/:id", ProjectController.deleteProject);

module.exports = router;
