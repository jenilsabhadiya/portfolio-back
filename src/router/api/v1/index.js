const express = require("express");
const router = express.Router();

// http://localhost:8000/api/v1/categary

// const categary = require("./categary.router");
const project = require("./project.routes");
const contact = require("./contact");

// router.use("/category", categary);
router.use("/project", project);
router.use("/contact", contact);

module.exports = router;
