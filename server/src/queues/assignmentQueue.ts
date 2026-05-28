import { Queue } from "bullmq";

export const assignmentQueue =
  new Queue(
    "assignment-generation",
    {
      connection: {
        host: process.env.REDISHOST,
        port: Number(process.env.REDISPORT),
      },
    }
  );