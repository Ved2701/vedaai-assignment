import {
  House,
  Users,
  BookOpen,
  Bot,
  Library,
  Settings,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

export default function Sidebar({
  assignmentCount,
}: {
  assignmentCount: number;
}) {

  return (

    <div className="w-[290px] h-screen bg-[#f7f7f7] border-r border-gray-200 px-6 py-8 flex flex-col justify-between">

      <div>

        <h1 className="text-4xl font-bold text-gray-900 mb-14">
          VedaAI
        </h1>

        <Link
          href="/create-assignment"
          className="w-full bg-[#1f1f1f] text-white rounded-full py-4 font-medium mb-12 border-4 border-orange-400 hover:scale-[1.02] transition flex items-center justify-center gap-2"
        >

          <Sparkles size={18} />

          Create Assignment

        </Link>

        <div className="space-y-3">

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition"
          >

            <House size={18} />

            Home

          </Link>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition">

            <Users size={18} />

            My Groups

          </div>

          <Link
            href="/assignments"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#ececec] text-black font-medium hover:bg-gray-200 transition"
          >

            <div className="flex items-center gap-3">

              <BookOpen size={18} />

              Assignments

            </div>

            <div className="bg-orange-500 text-white text-xs px-2 py-[2px] rounded-full">

              {assignmentCount}

            </div>

          </Link>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition">

            <Bot size={18} />

            AI Teacher Toolkit

          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition">

            <Library size={18} />

            My Library

          </div>

        </div>

      </div>

      <div className="space-y-4">

        <div className="flex items-center gap-2 text-gray-600 px-2">

          <Settings size={18} />

          <span>Settings</span>

        </div>

        <div className="bg-[#efefef] rounded-2xl p-4">

          <h2 className="font-semibold text-gray-900 text-lg">

            Delhi Public School

          </h2>

          <p className="text-sm text-gray-600 mt-1">
            Delhi
          </p>

        </div>

      </div>

    </div>

  );

}