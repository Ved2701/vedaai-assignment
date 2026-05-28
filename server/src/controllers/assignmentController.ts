import { Request, Response } from "express";

import Assignment
  from "../models/Assignment";

import { assignmentQueue }
  from "../queues/assignmentQueue";

export const createAssignment =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {

        subject,
        classLevel,
        dueDate,
        additionalInfo,
        questionTypes,

      } = req.body;

      await assignmentQueue.add(

        "generate-assignment",

        {
          subject,
          classLevel,
          dueDate,
          additionalInfo,
          questionTypes,
        }

      );

      res.status(201).json({

        success: true,

        message:
          "Assignment generation started",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to create assignment",

      });

    }

  };

export const getLatestAssignment =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const assignment =
        await Assignment.findOne()
          .sort({ createdAt: -1 });

      res.status(200).json(
        assignment
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch assignment",

      });

    }

  };

export const getAllAssignments =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const assignments =
        await Assignment.find()
          .sort({ createdAt: -1 });

      res.status(200).json(
        assignments
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch assignments",

      });

    }

  };

export const getAssignmentById =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const assignment =
        await Assignment.findById(
          req.params.id
        );

      res.status(200).json({

        success: true,
        assignment,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch assignment",

      });

    }

  };

export const deleteAssignment =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      await Assignment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Assignment deleted",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Delete failed",

      });

    }

  };