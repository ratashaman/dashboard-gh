"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingScreen from "@/components/shared/loadingScreen";
import { CardContent } from "./ui/card";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

export default function ListPengajuanAkta({
  listPengajuanAkta,
  isLoading,
  addPengajuanAkta,
  editPengajuanAkta,
  delPengajuanAkta,
}) {
  const [openAlert, setOpenAlert] = useState(false);
  const [detailPengajuanAkta, setDetailPengajuanAkta] = useState({});

  const columns = [
    {
      accessorKey: "nik",
      header: "NIK",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nik")}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const detail = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Buka menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ubah Pengajuan Akta</DropdownMenuItem>
              <DropdownMenuItem>Hapus Pengajuan Akta</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddPengajuanAkta = async (e) => {};

  const handleEditPengajuanAkta = async (e) => {};

  const handleDelPengajuanAkta = async () => {};

  const handleCloseDialog = () => {
    setDetailPengajuanAkta({});
    setOpenAlert(false);
  };

  const table = useReactTable({
    data: listPengajuanAkta?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {},
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <AlertDialog
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailPengajuanAkta({});
          }
          setOpenAlert(val);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda yakin akan menghapus akun ini?
            </AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          List Pengajuan Akta
        </h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <div className="w-full">
              <div className="flex items-center py-4">
                <Input
                  placeholder="Cari pengajuan Akta..."
                  value={table.getColumn("nik")?.getFilterValue() ?? ""}
                  onChange={(event) =>
                    table.getColumn("nik")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
