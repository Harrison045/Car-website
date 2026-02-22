const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Valuation", "General"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  details: {
    type: mongoose.Schema.Types.Mixed, // For flexible form data (e.g., car details for valuation)
    default: {},
  },
  status: {
    type: String,
    enum: ["New", "Processed", "Archived"],
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inquiry", inquirySchema);
