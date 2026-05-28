import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    classLevel: {
      type: String,
      required: true,
    },

    dueDate: {
      type: String,
      required: true,
    },

    additionalInfo: {
      type: String,
    },

    questionTypes: [
      {
        type: {
          type: String,
        },

        questions: Number,

        marks: Number,
      },
    ],

    generatedPaper: {
      type: Object,
    },

    status: {
      type: String,
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Assignment",
  AssignmentSchema
);