import { Worker } from "bullmq";

import redis
  from "../config/redis";

import Assignment
  from "../models/Assignment";

import { generateAssignment }
  from "../services/aiService";

import { io }
  from "../index";

new Worker(

  "assignment-generation",

  async (job) => {

    const {
      subject,
      classLevel,
      dueDate,
      additionalInfo,
      questionTypes,
    } = job.data;

    const generatedPaper =
      await generateAssignment({
        subject,
        classLevel,
        additionalInfo,
        questionTypes,
      });

    const assignment =
      await Assignment.create({
        subject,
        classLevel,
        dueDate,
        additionalInfo,
        questionTypes,
        generatedPaper,
      });

    io.emit(
      "assignment-generated",
      {
        assignmentId:
          assignment._id,
      }
    );

    console.log(
      "Assignment generated successfully"
    );

  },
  {
  connection: {
    host: process.env.REDISHOST,
    port: Number(process.env.REDISPORT),
    password: process.env.REDISPASSWORD,
  },
}  
);