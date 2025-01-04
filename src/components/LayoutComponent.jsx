"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  ChartNoAxesCombined,
  Newspaper,
} from "lucide-react";
import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

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
      url: "/ringkasan",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Administrasi",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "KTP",
          url: "/administrasi/ktp",
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
          title: "Tag",
          url: "#",
        },
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
      title: "Berita",
      url: "#",
      icon: Newspaper,
      items: [
        {
          title: "Category",
          url: "/berita/category",
        },
        {
          title: "Post",
          url: "/berita/post",
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

export default function LayoutComponent({ children, ...props }) {
  const pathname = usePathname();
  const pathsplit = pathname.split("/");

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="px-2 py-2 flex items-center justify-center truncate">
            <img
              src="/joyful-garut.png"
              alt="Image"
              className="w-1/2 dark:brightness-[0.2] dark:grayscale"
            />
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
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
                {pathsplit.length &&
                  pathsplit.map((path, id) => {
                    if (path !== "")
                      return (
                        <React.Fragment key={id}>
                          <BreadcrumbSeparator className="hidden md:block" />
                          <BreadcrumbItem>
                            <BreadcrumbPage className="capitalize">
                              {path}
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        </React.Fragment>
                      );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
