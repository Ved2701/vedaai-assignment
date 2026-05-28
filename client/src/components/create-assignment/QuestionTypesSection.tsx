"use client";

import { useState } from "react";
import { useAssignmentStore } from "../../store/assignmentStore";
import { useEffect } from "react";
const initialQuestions = [
  {
    type: "Multiple Choice Questions",
    questions: 4,
    marks: 1,
  },
  {
    type: "Short Questions",
    questions: 3,
    marks: 2,
  },
  {
    type: "Diagram/Graph-Based Questions",
    questions: 5,
    marks: 5,
  },
  {
    type: "Numerical Problems",
    questions: 5,
    marks: 5,
  },
];

export default function QuestionTypesSection() {

  const { setQuestionTypes } = useAssignmentStore();

  const [questionTypes, setLocalQuestionTypes] =
    useState(initialQuestions);
    useEffect(() => {
      setQuestionTypes(initialQuestions);
    }, [setQuestionTypes]);

  const handleChange = (
    index: number,
    field: "type" | "questions" | "marks",
    value: string
  ) => {

    const updated = [...questionTypes];

    if (field === "questions" || field === "marks") {
      updated[index][field] = Math.max(0, Number(value));
    } else {
      updated[index][field] = value;
    }

    setLocalQuestionTypes(updated);

    setQuestionTypes(updated);
  };

  const totalQuestions = questionTypes.reduce(
    (acc, item) => acc + item.questions,
    0
  );

  const totalMarks = questionTypes.reduce(
    (acc, item) => acc + item.questions * item.marks,
    0
  );

  return (
    <div className="mt-10">

      <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-semibold text-gray-800">

        <div className="col-span-6">
          Question Type
        </div>

        <div className="col-span-3 text-center">
          No. of Questions
        </div>

        <div className="col-span-3 text-center">
          Marks
        </div>

      </div>

      {questionTypes.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-4 items-center mb-4"
        >

          <select
            value={item.type}
            onChange={(e) =>
              handleChange(index, "type", e.target.value)
            }
            className="col-span-6 border border-gray-300 rounded-2xl px-4 py-4 text-gray-700 bg-white outline-none"
          >

            <option>Multiple Choice Questions</option>

            <option>Short Questions</option>

            <option>Numerical Problems</option>

            <option>Diagram/Graph-Based Questions</option>

          </select>

          <input
            type="number"
            min="0"
            value={item.questions}
            onChange={(e) =>
              handleChange(index, "questions", e.target.value)
            }
            className="col-span-3 border border-gray-300 rounded-2xl px-4 py-4 text-center text-gray-700 outline-none"
          />

          <input
            type="number"
            min="0"
            value={item.marks}
            onChange={(e) =>
              handleChange(index, "marks", e.target.value)
            }
            className="col-span-3 border border-gray-300 rounded-2xl px-4 py-4 text-center text-gray-700 outline-none"
          />

        </div>
      ))}

      <button className="mt-3 text-sm font-medium text-black hover:opacity-70 transition">
        + Add Question Type
      </button>

      <div className="mt-8 flex justify-end">

        <div className="text-right">

          <p className="text-gray-800 font-medium">
            Total Questions: {totalQuestions}
          </p>

          <p className="text-gray-800 font-medium mt-1">
            Total Marks: {totalMarks}
          </p>

        </div>

      </div>

    </div>
  );
}