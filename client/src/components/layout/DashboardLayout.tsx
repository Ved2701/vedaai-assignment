import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
  assignmentCount,
}: {
  children: React.ReactNode;
  assignmentCount?: number;
}) {

  return (

    <div className="flex">

      <Sidebar
        assignmentCount={assignmentCount || 0}
      />

      <div className="flex-1">

        <Navbar />

        <main className="p-8 bg-[#f6f6f6] min-h-screen">

          {children}

        </main>

      </div>

    </div>

  );

}