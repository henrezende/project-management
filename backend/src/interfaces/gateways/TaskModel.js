const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  completedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completedAt: { type: Date },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
