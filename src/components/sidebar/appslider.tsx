"use client";

import {
  LayoutDashboard,
  FileBarChart2,
  BarChart4,
  Settings2,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect } from "react";

const navLinks = [
  { title: "Dashboard", href: "/overview", icon: LayoutDashboard },
  { title: "Reports", href: "/reports", icon: FileBarChart2 },
  { title: "KPIs", href: "/kpis", icon: BarChart4 },
  { title: "Settings", href: "/settings", icon: Settings2 },
];

const projectLinks = [
  {
    title: "Sales Intelligence",
    href: "/projects/sales-intel",
    icon: FileBarChart2,
  },
  {
    title: "Customer Analytics",
    href: "/projects/customer-analytics",
    icon: Users,
  },
];

export function AppSidebar({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle();
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [toggle]);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("session");
    router.push("/");
    toast.info("You’ve been logged out due to inactivity");
  };

  return (
    <>
      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggle}
        />
      )}

      <aside
        className={`
          fixed top-0  border-2  left-0 z-40 bg-white border-r border-gray-200
          transform  transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 max-phoneL:h-screen
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold text-blue-700">InsightX</span>
          <button
            onClick={toggle}
            className="md:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 py-2">
          <h3 className="text-xs text-gray-500 mb-2">Main</h3>
          {navLinks.map(({ title, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
            >
              <Icon className="w-4 h-4" />
              <span className="max-phoneP:text-[10px]">{title}</span>
            </Link>
          ))}

          <h3 className="text-xs text-gray-500 mt-6 mb-2 ">Projects</h3>
          {projectLinks.map(({ title, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
            >
              <Icon className="w-4 h-4" />
              <span className="max-phoneP:text-[10px]">{title}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full text-sm text-red-600 hover:underline  max-phoneP:text-[10px]"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
