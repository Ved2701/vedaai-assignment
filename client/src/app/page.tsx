import DashboardLayout from "../components/layout/DashboardLayout";

export default function Home() {

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Assignments
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and create assignments for your classes.
          </p>

        </div>

        <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 border">

          <button className="text-gray-500 text-sm">
            Filter By
          </button>

          <input
            type="text"
            placeholder="Search Assignment"
            className="w-[280px] rounded-full border px-4 py-2 outline-none text-gray-700 placeholder:text-gray-400"
          />

        </div>

        <div className="grid grid-cols-2 gap-6">

          <a
            href="/assignments"
            className="
              bg-white
              rounded-3xl
              p-8
              border
              hover:shadow-md
              transition
            "
          >

            <h2 className="text-2xl font-bold text-gray-900">

              View Assignments

            </h2>

            <p className="text-gray-500 mt-3">

              Open all AI-generated assignments.

            </p>

          </a>

        </div>

      </div>

    </DashboardLayout>

  );

}