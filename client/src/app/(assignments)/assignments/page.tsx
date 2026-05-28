"use client";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import axios from "axios";

import { useEffect, useState } from "react";

import Link from "next/link";

interface Assignment {
  _id: string;
  subject: string;
  classLevel: string;
  dueDate: string;
}

export default function AssignmentsPage() {

  const [assignments, setAssignments] =
    useState<Assignment[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchAssignments = async () => {

      try {

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/assignments`
        );

        setAssignments(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchAssignments();

  }, []);

  const handleDelete = async (
    id: string
  ) => {

    try {

      await axios.delete(
  `${process.env.NEXT_PUBLIC_API_URL}/api/assignments/${id}`
);

      setAssignments(
        assignments.filter(
          (assignment) =>
            assignment._id !== id
        )
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <DashboardLayout assignmentCount={assignments.length}>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Assignments
          </h1>

          <p className="text-gray-700 mt-2">
            Manage and create assignments.
          </p>

        </div>

        {loading ? (

          <p className="text-gray-700">
            Loading assignments...
          </p>

        ) : assignments.length === 0 ? (

          <p className="text-gray-700">
            No assignments found.
          </p>

        ) : (

          <div className="grid grid-cols-2 gap-6">

            {assignments.map((assignment) => (

              <Link
                href={`/assignment/${assignment._id}`}
                key={assignment._id}
              >

                <div
                  className="
                    bg-white
                    border
                    rounded-3xl
                    p-8
                    shadow-sm
                    hover:shadow-md
                    transition
                    cursor-pointer
                  "
                >

                  <div className="flex justify-end">

                    <button
                      onClick={(e) => {

                        e.preventDefault();

                        handleDelete(
                          assignment._id
                        );

                      }}
                      className="
                        text-red-500
                        text-sm
                        font-medium
                        hover:text-red-700
                      "
                    >

                      Delete

                    </button>

                  </div>

                  <h2 className="text-3xl font-bold text-gray-900">
                    {assignment.subject}
                  </h2>

                  <p className="text-gray-700 mt-2">
                    Class {assignment.classLevel}
                  </p>

                  <div className="mt-8">

                    <p className="font-semibold text-gray-900">
                      Due Date
                    </p>

                    <p className="text-gray-700">
                      {assignment.dueDate}
                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}