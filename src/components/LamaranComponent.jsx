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

export default function LamaranComponent({
  listLamaran,
  isLoading,
  editLamaran,
  delLamaran,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [detailLamaran, setDetailLamaran] = useState({});

  const columns = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "position",
      header: "Posisi",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("position")}</div>
      ),
    },
    {
      accessorKey: "recruiter",
      header: "Perekrut",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("recruiter")}</div>
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
                  setDetailLamaran(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Lamaran
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailLamaran(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Lamaran
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEditLamaran = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { position, recruiter } = Object.fromEntries(formData);

      if (position === null) {
        return setErrMessage("Posisi lamaran tidak boleh kosong");
      }

      if (recruiter === null) {
        return setErrMessage("Perekrut tidak boleh kosong");
      }

      const data = await editLamaran(detailLamaran?.id, {
        position,
        recruiter,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelLamaran = async () => {
    try {
      const data = await delLamaran(detailLamaran?.id);
      cl(data);
      setDetailLamaran({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailLamaran({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailLamaran({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus lamaran ini?"
        description="Periksa kembali, karena hal ini akan menghapus data lamaran yang dipilih secara permanen."
        onAction={handleDelLamaran}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={handleEditLamaran}
        title="Ubah Lamaran"
        description="Perbaiki data lamaran. Klik simpan ketika sudah selesai."
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="position">Posisi</Label>
          <Input
            defaultValue={detailLamaran?.position}
            onChange={() => setErrMessage("")}
            type="text"
            id="position"
            name="position"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="recruiter">Perekrut</Label>
          <Input
            defaultValue={detailLamaran?.recruiter}
            onChange={() => setErrMessage("")}
            type="text"
            id="recruiter"
            name="recruiter"
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
        <h2 className="text-3xl font-bold tracking-tight">Lamaran Masuk</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listLamaran?.items}
              columns={columns}
              searchColumn="name"
              searchPlaceholder="Cari lamaran..."
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
