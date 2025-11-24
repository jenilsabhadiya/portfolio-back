const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    technology: { type: String, required: true },
    description: { type: String, required: true },
    action: {
      type: Boolean,
      default: true,
    },
    project_image: {
      type: {
        public_id: String,
        url: String,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const Project = mongoose.model("projects", projectSchema);
module.exports = Project;
