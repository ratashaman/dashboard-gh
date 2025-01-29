"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteAlert from "@/components/shared/delete-alert";
import ModalForm from "@/components/shared/modal-form";
import DataTable from "@/components/shared/data-table";
import LoadingScreen from "@/components/shared/loadingScreen";
import { cl } from "@/lib/logger";
import { formatDate } from "@/lib/utils";

export default function ListPengajuanComponent({
  listPengajuan,
  isLoading,
  editPengajuan,
  delPengajuan,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [detailPengajuan, setDetailPengajuan] = useState({});

  const columns = [
    {
      accessorKey: "type",
      header: "Jenis",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal",
      cell: ({ row }) => (
        <div className="">{formatDate(row.getValue("createdAt"))}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
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
              <DropdownMenuItem
                onClick={() => {
                  setDetailPengajuan(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Pengajuan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailPengajuan(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Pengajuan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEditPengajuan = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { type, category, status } = Object.fromEntries(formData);

      if (type === null) {
        return setErrMessage("Jenis pengajuan tidak boleh kosong");
      }

      if (category === null) {
        return setErrMessage("Kategori tidak boleh kosong");
      }

      if (status === null) {
        return setErrMessage("Status pengajuan tidak boleh kosong");
      }

      const data = await editPengajuan(detailPengajuan?.id, {
        type,
        category,
        status: status?.value,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelPengajuan = async () => {
    try {
      const data = await delPengajuan(detailPengajuan?.id);
      cl(data);
      setDetailPengajuan({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailPengajuan({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailPengajuan({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus pengajuan ini?"
        description="Periksa kembali, karena hal ini akan menghapus data pengajuan yang dipilih secara permanen."
        onAction={handleDelPengajuan}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={handleEditPengajuan}
        title="Ubah Pengajuan"
        description="Perbaiki data pengajuan. Klik simpan ketika sudah selesai."
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type">Jenis</Label>
          <Input
            defaultValue={detailPengajuan?.type}
            onChange={() => setErrMessage("")}
            type="text"
            id="type"
            name="type"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category">Kategori</Label>
          <Input
            defaultValue={detailPengajuan?.category}
            onChange={() => setErrMessage("")}
            type="text"
            id="category"
            name="category"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status">Status</Label>
          <Input
            defaultValue={detailPengajuan?.status}
            onChange={() => setErrMessage("")}
            type="text"
            id="status"
            name="status"
            className="col-span-3 bg-white"
          />
        </div>
        {errMessage !== "" && (
          <div className="p-2 rounded-md text-center border border-destructive-foreground text-destructive">
            {errMessage}
          </div>
        )}
      </ModalForm>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">List Pengajuan</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable data={listPengajuan?.items} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
