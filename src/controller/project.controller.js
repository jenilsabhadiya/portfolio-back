import Project from "../model/project.model.js";
// const { updateCloudinary, deleteCloudinary } = require("../utlis/cloud");
import { updateCloudinary, deleteCloudinary } from "../utlis/cloud.js";

// const fs = require("fs");

// ➤ Create project

export const createProject = async (req, res) => {
  console.log("wwwwww", req.body, req.file);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Project image is required",
    });
  }

  try {
    const cData = await updateCloudinary(req.file.path, "project");
    console.log("cdata", cData);

    // const project = await Project.create({
    //   ...req.body,
    //   project_image: req.file.path,
    // });
    // console.log(project);

    //? Cloud useing data.
    const project = await Project.create({
      ...req.body,
      project_image: {
        public_id: cData.public_id,
        url: cData.url,
      },
    });
    console.log(project);

    if (!project) {
      res.status(400).json({
        success: false,
        data: {},
        message: "Project not created",
      });
    }

    // try {
    //   await sentMail(
    //     "sabhadiyajenil61@gmail.com",
    //     "Category done",
    //     "Category created successfully"
    //   );
    // } catch (error) {
    //   res.status(500).json({
    //     success: false,
    //     data: {},
    //     message: "Category created but error in send email." + error.message,
    //   });
    // }

    res.status(201).json({
      success: true,
      data: project,
      message: "Project created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Project data not working." + error.message,
    });
  }

  console.log("Done!");
};

// ➤ Get all projects 
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects) {
      res.status(404).json({
        success: false,
        data: [],
        message: "Projects not found",
      });
    }
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get a single project
export const getProjectById = async (req, res) => {
  console.log("Get a single projects");

  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ➤ Update project

export const updateProject = async (req, res) => {
  console.log("Updata Project", req.params.id, req.body, req.file);

  const updataData = { ...req.body };
  const projectData = await Project.findById(req.params.id);
  console.log(projectData);

  if (req.file) {
    try {
      // fs.unlinkSync(projectData.project_image);
      deleteCloudinary(projectData.project_image.public_id);
      const cData = await updateCloudinary(req.file.path, "project");
      updataData.project_image = {
        public_id: cData.public_id,
        url: cData.url,
      };
    } catch (error) {
      return res.status(400).json({
        success: false,
        data: {},
        message: "Project image not Delete.",
      });
    }
  }

  console.log(updataData);

  try {
    const projects = await Project.findByIdAndUpdate(
      req.params.id,
      updataData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    if (!projects) {
      res.status(404).json({
        success: false,
        data: {},
        message: "Project not Updated.",
      });
    }

    res.status(200).json({
      success: true,
      data: projects,
      message: "Project Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Project Update data not working." + error.message,
    });
  }
};

// ➤ Delete project

export const deleteProject = async (req, res) => {
  console.log("Delete Project");

  try {
    const projectData = await Project.findById(req.params.id);
    console.log(projectData);

    deleteCloudinary(projectData.project_image.public_id);

    // fs.unlink(projectData.project_image, (error) => {
    //   if (error) {
    //     return res.status(400).json({
    //       success: false,
    //       data: {},
    //       message: "Project image not Delete.",
    //     });
    //   }
    // });

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      res.status(404).json({
        success: false,
        data: {},
        message: "Project not Delete.",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
      message: "Project Delete",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Project Delete data not working." + error.message,
    });
  }
};
