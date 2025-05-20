"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/sidebar/appslider";
import { Menu } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex w-full  mx-auto ">
      <AppSidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      {/* Main content wrapper */}
      <div className="flex-1 bg-white  overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-gray-800">Insight X</span>
        </header>

        <main className=" overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
}
