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

export default function KatPengaduanComponent({
  listCat,
  isLoading,
  addCat,
  editCat,
  delCat,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [detailCat, setDetailCat] = useState({});

  const columns = [
    {
      accessorKey: "name",
      header: "Nama Kategori",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal Pembuatan",
      cell: ({ row }) => (
        <div className="lowercase">{formatDate(row.getValue("createdAt"))}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Tanggal Perubahan",
      cell: ({ row }) => (
        <div className="lowercase">{formatDate(row.getValue("updatedAt"))}</div>
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
                  setDetailCat(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Kategori
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailCat(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Kategori
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddCat = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name } = Object.fromEntries(formData);

      if (name === "") {
        return setErrMessage("Nama kategori tidak boleh kosong");
      }

      const data = await addCat({
        name,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      setErrMessage(error?.message);
    }
  };

  const handleEditCat = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name } = Object.fromEntries(formData);

      if (name === "") {
        return setErrMessage("Nama kategori tidak boleh kosong");
      }

      const data = await editCat(detailCat?.id, {
        name,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelCat = async () => {
    try {
      const data = await delCat(detailCat?.id);
      cl(data);
      setDetailCat({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailCat({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailCat({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus kategori ini?"
        description="Periksa kembali, karena hal ini akan menghapus kategori yang dipilih secara permanen."
        onAction={handleDelCat}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            setErrMessage("");
            setDetailCat({});
          }
          setOpenDialog(val);
        }}
        onSubmit={detailCat?.id ? handleEditCat : handleAddCat}
        title={detailCat?.id ? "Ubah Kategori" : "Tambah Kategori"}
        description={
          detailCat?.id
            ? "Perbaiki data kategori"
            : "Masukkan data kategori baru" +
              ". Klik simpan ketika sudah selesai."
        }
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Nama Kategori</Label>
          <Input
            defaultValue={detailCat?.name}
            onChange={() => setErrMessage("")}
            type="text"
            id="name"
            name="name"
            placeholder="Contoh: Masalah Infrastruktur"
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
        <h2 className="text-3xl font-bold tracking-tight">
          Kategori Pengaduan
        </h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listCat?.items}
              columns={columns}
              searchPlaceholder="Cari Kategori..."
              searchColumn="name"
              buttonLabel="Tambah Kategori"
              buttonOnClick={() => setOpenDialog(true)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
