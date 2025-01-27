"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingScreen from "@/components/shared/loadingScreen";

export default function ListPengajuanKtp({
  listPengajuanKtp,
  isLoading,
  addPengajuanKtp,
  editPengajuanKtp,
  delPengajuanKtp,
}) {
  const [openAlert, setOpenAlert] = useState(false);
  const [detailPengajuanKtp, setDetailPengajuanKtp] = useState({});

  const handleAddPengajuanKtp = async (e) => {};

  const handleEditPengajuanKtp = async (e) => {};

  const handleDelPengajuanKtp = async () => {};

  const handleCloseDialog = () => {
    setDetailPengajuanKtp({});
    setOpenAlert(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          List Pengajuan KTP
        </h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <div className="w-full">
              <div className="flex items-center py-4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
