"use client";

import * as React from "react";
import { BookOpen, Bot, UserCheck, SquareTerminal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/ringkasan/overview";
import { RecentSales } from "@/components/ringkasan/recent-sales";
import LoadingScreen from "@/components/shared/loadingScreen";
import { useUserStore } from "@/store";

export default function RingkasanComponent({
  totalPengajuan,
  totalComplaint,
  isLoading,
  totalLamaran,
  totalUser,
}) {
  const { users } = useUserStore();

  const checkRole = (roles = []) => {
    if (users?.roles?.length) {
      return users.roles.some((role) => roles.includes(role.systemName));
    } else {
      return false;
    }
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Ringkasan</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {checkRole(["admin", "superadmin", "complaint"]) && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengaduan</CardTitle>
              <Bot className="text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {totalComplaint}
              </div>
              <p className="text-xs text-muted-foreground">Laporan</p>
            </CardContent>
          </Card>
        )}
        {checkRole(["admin", "superadmin"]) && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Administrasi
                </CardTitle>
                <SquareTerminal className="text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {totalPengajuan}
                </div>
                <p className="text-xs text-muted-foreground">Pengajuan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lowongan Kerja
                </CardTitle>
                <BookOpen className="text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {totalLamaran}
                </div>
                <p className="text-xs text-muted-foreground">Lamaran</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengguna</CardTitle>
                <UserCheck className="text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {totalUser}
                </div>
                <p className="text-xs text-muted-foreground">Orang</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ikhtisar</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pengguna Terbaru</CardTitle>
            <CardDescription>
              Total 265 pengguna baru bulan ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div> */}
    </>
  );
}
