"use client";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      <div className="flex items-center gap-3">

        <button
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ArrowLeft 
            size={22}
            className="text-gray-700 cursor-pointer"
          />
        </button>

        <h1 className="text-gray-700 font-medium text-lg">
          Assignment
        </h1>

      </div>

      <div className="flex items-center gap-6">

        <Bell
          size={20}
          className="text-gray-600 cursor-pointer"
        />

        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-10 h-10 rounded-full bg-orange-200" />

          <p className="font-medium text-gray-900">
            Ved
          </p>

          <ChevronDown
            size={18}
            className="text-gray-600"
          />

        </div>

      </div>

    </div>
  );
}