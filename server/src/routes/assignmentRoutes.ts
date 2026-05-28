import express from "express";

import {
  createAssignment,
  getLatestAssignment,
  getAllAssignments,
  getAssignmentById,
  deleteAssignment,
} from "../controllers/assignmentController";

const router = express.Router();

router.post("/", createAssignment);

router.get("/latest", getLatestAssignment);

router.get("/", getAllAssignments);

router.get("/:id", getAssignmentById);

router.delete("/:id", deleteAssignment);
export default router;