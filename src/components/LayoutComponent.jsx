"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { useUserStore } from "@/store";
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
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import LoadingScreen from "@/components/shared/loadingScreen";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Ringkasan",
      url: "/dashboard/ringkasan",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Administrasi",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "KTP",
          url: "/dashboard/administrasi/ktp",
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
      title: "Lowongan Pekerjaan",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Tag",
          url: "#",
        },
        {
          title: "Perekrut Kerja",
          url: "#",
        },
        {
          title: "Pencari Kerja",
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
          title: "Kategori",
          url: "/dashboard/berita/kategori",
        },
        {
          title: "List Berita",
          url: "/dashboard/berita/list-berita",
        },
      ],
    },
    {
      title: "Pengaturan",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "List Pengguna",
          url: "/dashboard/pengaturan/list-pengguna",
        },
      ],
    },
  ],
};

export default function LayoutComponent({ children, ...props }) {
  const router = useRouter();
  const pathname = usePathname();
  const pathsplit = pathname.split("/");
  const { users, isLoading, fetchUsers } = useUserStore();

  React.useEffect(() => {
    const checkToken = async () => {
      const isValid = await fetchUsers();

      if (!isValid) {
        router.push("/"); // Redirect jika token tidak valid
      }
    };

    checkToken();
  }, [fetchUsers]);

  // if (isLoading) return <LoadingScreen />;

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
          <NavUser user={users} />
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
                {pathsplit.length &&
                  pathsplit.map((path, id) => {
                    if (path !== "")
                      return (
                        <React.Fragment key={id}>
                          <BreadcrumbSeparator className="hidden md:block" />
                          <BreadcrumbItem>
                            <BreadcrumbPage className="capitalize">
                              {path.replace("-", " ")}
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
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.cakra_chat_api_id = 261; //Mandatory
                window.cakra_chat_api_key = "5d812383-fd34-438f-b9ca-0f42fb9b4be6"; //Mandatory
                window.cakra_personal_data = ""; //Optional
                window.cakra_initial_message = "Halo, ada yang bisa saya bantu?"; //Optional
                window.cakra_use_tts = "true"; //Optional(true or false, default=true)
                window.cakra_use_stt = "false"; //Optional(true or false, default=false)
                window.cakra_show_feedback = "false"; //Optional(true or false, default=false)
              `,
            }}
          />
          <Script
            async
            src="https://stag-saas.cakra.ai/static/js/widget_cakra.min.js"
            strategy="afterInteractive"
            onError={(e) =>
              console.error(`ChatBot Script failed to load for`, e)
            }
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
