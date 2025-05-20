"use client";

import * as React from "react";
import {
  LayoutDashboard,
  BarChart4,
  FileBarChart2,
  Settings2,
  Users,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Lean BI Tool Sidebar Data
const data = {
  user: {
    name: "Analyst John",
    email: "john@example.com",
    avatar: "/avatars/john.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileBarChart2,
    },
    {
      title: "KPIs",
      url: "/kpis",
      icon: BarChart4,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Sales Intelligence",
      url: "/projects/sales-intel",
      icon: FileBarChart2,
    },
    {
      name: "Customer Analytics",
      url: "/projects/customer-analytics",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="text-sm font-semibold">InsightX BI</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
