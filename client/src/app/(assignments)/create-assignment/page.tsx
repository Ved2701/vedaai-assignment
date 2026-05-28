"use client";

import { socket } from "@/lib/socket";

import axios from "axios";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import DashboardLayout
  from "../../../components/layout/DashboardLayout";

import QuestionTypesSection
  from "../../../components/create-assignment/QuestionTypesSection";

import { useAssignmentStore }
  from "../../../store/assignmentStore";

export default function CreateAssignmentPage() {

  const router = useRouter();

  const {

    subject,
    classLevel,

    dueDate,
    additionalInfo,
    questionTypes,

    setSubject,
    setClassLevel,

    setDueDate,
    setAdditionalInfo,
    setQuestionTypes,

  } = useAssignmentStore();

  useEffect(() => {

    socket.on(
      "assignment-generated",
      (data) => {

        console.log(
          "Assignment generated:",
          data
        );

      }
    );

    return () => {

      socket.off(
        "assignment-generated"
      );

    };

  }, []);

  const handleSubmit = async () => {

  try {

    if (
      !subject ||
      !classLevel ||
      !dueDate
    ) {

      alert(
        "Please fill all required fields"
      );

      return;

    }

    socket.emit(
      "assignment-generating",
      {
        subject,
      }
    );

    const response = await axios.post(
      "http://localhost:5000/api/assignments",
      {

        subject,
        classLevel,

        dueDate,
        additionalInfo,
        questionTypes,

      }
    );

    console.log(response.data);

    alert(
      "Assignment generation started!"
    );

    router.push("/assignments");

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }

};

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto py-6">

        {/* Header */}

        <div className="mb-8">

          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
            "
          >

            Create Assignment

          </h1>

          <p className="text-gray-600 mt-2">

            Set up a new assignment
            for your students

          </p>

        </div>

        {/* Progress Bar */}

        <div
          className="
            w-full
            h-2
            bg-gray-200
            rounded-full
            mb-10
          "
        >

          <div
            className="
              w-1/2
              h-2
              bg-black
              rounded-full
            "
          ></div>

        </div>

        {/* Main Card */}

        <div
          className="
            bg-white
            rounded-[32px]
            p-8
            border
            border-gray-200
            shadow-sm
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >

            Assignment Details

          </h2>

          <p
            className="
              text-gray-600
              text-sm
              mt-1
              mb-8
            "
          >

            Basic information
            about your assignment

          </p>

          {/* Upload */}

          <div
            className="
              border-2
              border-dashed
              border-gray-300
              rounded-3xl
              p-12
              text-center
            "
          >

            <div className="text-4xl mb-4">

              ⬆️

            </div>

            <p
              className="
                text-gray-800
                font-medium
              "
            >

              Choose a file or
              drag & drop it here

            </p>

            <p
              className="
                text-gray-500
                text-sm
                mt-2
              "
            >

              JPEG, PNG, upto 10MB

            </p>

            <button
              className="
                mt-6
                bg-gray-100
                px-6
                py-3
                rounded-full
                text-sm
                font-medium
                text-gray-700
                hover:bg-gray-200
                transition
              "
            >

              Browse Files

            </button>

          </div>

          <p
            className="
              text-center
              text-sm
              text-gray-500
              mt-4
            "
          >

            Upload images of your
            preferred document/image

          </p>

          {/* Subject */}

          <div className="mt-10">

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-800
                mb-3
              "
            >

              Subject

            </label>

            <input
              type="text"
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              placeholder="e.g Science"
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-5
                py-4
                text-gray-700
                outline-none
              "
            />

          </div>

          {/* Class */}

          <div className="mt-6">

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-800
                mb-3
              "
            >

              Class

            </label>

            <input
              type="text"
              value={classLevel}
              onChange={(e) =>
                setClassLevel(
                  e.target.value
                )
              }
              placeholder="e.g 8th"
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-5
                py-4
                text-gray-700
                outline-none
              "
            />

          </div>

          {/* Due Date */}

          <div className="mt-10">

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-800
                mb-3
              "
            >

              Due Date

            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-5
                py-4
                text-gray-700
                outline-none
              "
            />

          </div>

          {/* Question Types */}

          <QuestionTypesSection />

          {/* Additional Info */}

          <div className="mt-10">

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-800
                mb-3
              "
            >

              Additional Information
              (For better output)

            </label>

            <textarea
              rows={5}
              value={additionalInfo}
              onChange={(e) =>
                setAdditionalInfo(
                  e.target.value
                )
              }
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              className="
                w-full
                border
                border-gray-300
                rounded-3xl
                px-5
                py-4
                text-gray-700
                placeholder:text-gray-500
                outline-none
                resize-none
              "
            />

          </div>

        </div>

        {/* Bottom Buttons */}

        <div
          className="
            flex
            items-center
            justify-between
            mt-8
          "
        >

          <button
            className="
              bg-gray-100
              text-gray-800
              px-6
              py-3
              rounded-full
              font-medium
              hover:bg-gray-200
              transition
            "
          >

            ← Previous

          </button>

          <button
            onClick={handleSubmit}
            className="
              bg-black
              text-white
              px-8
              py-4
              rounded-full
              font-medium
              hover:bg-gray-900
              transition
            "
          >

            Next →

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}