const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
