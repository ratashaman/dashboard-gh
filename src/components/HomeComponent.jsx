"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  ChartNoAxesCombined,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@garuthebat.com",
    avatar: "/placeholder.svg",
  },
  navMain: [
    {
      title: "Ringkasan",
      url: "/home",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Administrasi",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "KTP",
          url: "#",
        },
        {
          title: "KK",
          url: "#",
        },
        {
          title: "Akta",
          url: "#",
        },
      ],
    },
    {
      title: "Pengaduan",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Infrastruktur",
          url: "#",
        },
        {
          title: "Administrasi",
          url: "#",
        },
      ],
    },
    {
      title: "Job Portal",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Recruiter",
          url: "#",
        },
        {
          title: "Seeker",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "User",
          url: "#",
        },
        {
          title: "Admin",
          url: "#",
        },
      ],
    },
  ],
};

export default function HomeComponent({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-2 py-2 text-xl text-center font-bold truncate">
          Garut Hebat
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
