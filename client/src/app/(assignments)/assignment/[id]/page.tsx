"use client";

import axios from "axios";

import { useEffect, useState, useRef } from "react";

import { useParams } from "next/navigation";

import { Download } from "lucide-react";

import html2pdf from "html2pdf.js";

import DashboardLayout
  from "../../../../components/layout/DashboardLayout";

export default function AssignmentPage() {

  const { id } = useParams();

  const [assignment, setAssignment] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const paperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const fetchAssignment = async () => {

      try {

        const response =
          await axios.get(
            `http://localhost:5000/api/assignments/${id}`
          );

        setAssignment(
          response.data.assignment
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    if (id) {

      fetchAssignment();

    }

  }, [id]);

  const handleDownloadPDF = async () => {
  if (!paperRef.current) return;

  const element = paperRef.current;

  const options = {
    margin: 0,
    filename: `${assignment.subject}-assignment.pdf`,
    image: { type: "jpeg" as const, quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: 794,
      scrollX: 0,  
      scrollY: 0,  
      onclone: (clonedDoc: Document) => {
        const allElements = clonedDoc.querySelectorAll("*");

        allElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const computed = window.getComputedStyle(el);

          // Helper: convert any color to a safe RGB hex via canvas
          const toSafeColor = (color: string): string => {
            if (!color || color === "transparent" || color === "inherit") return color;
            // If it already looks like rgb/rgba/hex, return as-is
            if (/^(rgb|rgba|#)/.test(color)) return color;
            // For modern color functions (lab, oklch, etc.), use canvas to convert
            try {
              const canvas = document.createElement("canvas");
              canvas.width = canvas.height = 1;
              const ctx = canvas.getContext("2d")!;
              ctx.fillStyle = color;
              ctx.fillRect(0, 0, 1, 1);
              const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
              return a < 255 ? `rgba(${r},${g},${b},${a / 255})` : `rgb(${r},${g},${b})`;
            } catch {
              return color;
            }
          };

          htmlEl.style.color = toSafeColor(computed.color);
          htmlEl.style.backgroundColor = toSafeColor(computed.backgroundColor);
          htmlEl.style.borderColor = toSafeColor(computed.borderColor);
        });
      },
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait" as const,
    },
    pagebreak: {
      mode: ["css", "legacy"],
      avoid: [".break-inside-avoid", ".break-inside-avoid-page"],
    },
  };

  await html2pdf().set(options).from(element).save();
};

  if (loading) {

    return (

      <div className="p-10 text-xl">

        Loading...

      </div>

    );

  }

  if (!assignment) {

    return (

      <div className="p-10 text-xl">

        Assignment not found.

      </div>

    );

  }

  const totalMarks =
    assignment.generatedPaper.sections.reduce(
      (sectionAcc: number, section: any) =>
        sectionAcc +
        section.questions.reduce(
          (questionAcc: number, question: any) =>
            questionAcc + question.marks,
          0
        ),
      0
    );

  const estimatedTime =
    Math.max(
      30,
      Math.ceil(totalMarks * 1.5)
    );

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto py-6">

        {/* AI Banner */}

        <div className="bg-[#1d1d1d] rounded-[28px] p-8 text-white mb-8">

          <h2 className="text-xl font-semibold leading-relaxed">

            Certainly, Ved! Here are customized Question Papers
            generated using AI.

          </h2>

          <button
            onClick={handleDownloadPDF}
            className="
              mt-6
              bg-white
              text-black
              px-5
              py-3
              rounded-full
              text-sm
              font-medium
              flex
              items-center
              gap-2
              hover:scale-[1.02]
              transition
            "
          >

            <Download size={16} />

            Download as PDF

          </button>

        </div>

        {/* Printable Paper */}

        <div
          ref={paperRef}
          style={{
            width: "794px",
            maxWidth: "794px",
            background: "white",
          }}
          className="
            bg-white
            min-h-[1123px]
            mx-auto
            p-8
            text-black
          "
        >

          {/* Heading */}

          <div className="text-center border-b border-gray-300 pb-8">

            <h1 className="text-4xl font-bold text-gray-900">

              Delhi Public School, Delhi

            </h1>

            <p className="mt-4 text-xl text-gray-700">

              Subject: {assignment.subject}

            </p>

            <p className="mt-2 text-xl text-gray-700">

              Class: {assignment.classLevel}

            </p>

          </div>

          {/* Meta */}

          <div
            className="
              flex
              items-center
              justify-between
              mt-10
              text-gray-800
              font-medium
            "
          >

            <p>

              Time Allowed:
              {" "}
              {estimatedTime} minutes

            </p>

            <p>

              Maximum Marks:
              {" "}
              {totalMarks}

            </p>

          </div>

          {/* Instructions */}

          <div className="mt-8">

            <p className="text-gray-700 leading-relaxed">

              All questions are compulsory unless stated otherwise.

            </p>

          </div>

          {/* Student Info */}

          <div className="mt-10 space-y-6 text-gray-800">

            <div className="flex items-center gap-4">

              <span className="font-medium">
                Name:
              </span>

              <div className="border-b border-black flex-1"></div>

            </div>

            <div className="flex items-center gap-4">

              <span className="font-medium">
                Roll Number:
              </span>

              <div className="border-b border-black flex-1"></div>

            </div>

            <div className="flex items-center gap-4">

              <span className="font-medium">
                Class:
              </span>

              <div className="border-b border-black w-32"></div>

              <span className="font-medium">
                Section:
              </span>

              <div className="border-b border-black w-32"></div>

            </div>

          </div>

          {/* Sections */}

          <div className="mt-12 space-y-12">

            {assignment.generatedPaper.sections.map(
              (section: any, index: number) => (

                <div
                  key={index}
                  className="break-inside-avoid-page"
                >

                  {/* Section Title */}

                  <div className="mb-8">

                    <h2
                      className="
                        text-3xl
                        font-bold
                        text-gray-900
                      "
                    >

                      {section.title}

                    </h2>

                    <p className="text-gray-600 mt-2">

                      {section.instruction}

                    </p>

                  </div>

                  {/* Questions */}

                  <div className="space-y-6">

                    {section.questions.map(
                      (question: any, qIndex: number) => (

                        <div
                          key={qIndex}
                          className="
                            border
                            border-gray-300
                            rounded-2xl
                            p-5
                            break-inside-avoid
                          "
                        >

                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-6
                            "
                          >

                            <div className="flex-1">

                              <p
                                className="
                                  text-lg
                                  text-gray-900
                                  leading-relaxed
                                "
                              >

                                <span
                                  className="
                                    font-semibold
                                    mr-2
                                  "
                                >

                                  {qIndex + 1}.

                                </span>

                                {question.question}

                              </p>

                              {/* Options */}

                              {question.options && (

                                <div
                                  className="
                                    mt-5
                                    ml-6
                                    space-y-3
                                  "
                                >

                                  {question.options.map(
                                    (
                                      option: string,
                                      optionIndex: number
                                    ) => (

                                      <p
                                        key={optionIndex}
                                        className="
                                          text-gray-700
                                        "
                                      >

                                        {String.fromCharCode(
                                          65 + optionIndex
                                        )}. {option}

                                      </p>

                                    )
                                  )}

                                </div>

                              )}

                            </div>

                            {/* Badges */}

                            <div
                              className="
                                flex
                                flex-col
                                items-end
                                gap-3
                              "
                            >

                              <div
                                className={`
                                  px-4
                                  py-2
                                  rounded-full
                                  text-sm
                                  font-medium
                                  ${
                                    question.difficulty === "Easy"
                                      ? "bg-green-100 text-green-700"
                                      : question.difficulty === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }
                                `}
                              >

                                {question.difficulty}

                              </div>

                              <div
                                className="
                                  bg-gray-100
                                  px-4
                                  py-2
                                  rounded-full
                                  text-sm
                                  font-semibold
                                  text-gray-700
                                "
                              >

                                {question.marks} Marks

                              </div>

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}