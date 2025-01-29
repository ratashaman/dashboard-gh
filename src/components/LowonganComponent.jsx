"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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

export default function LowonganComponent({
  listLowongan,
  isLoading,
  editLowongan,
  delLowongan,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [statusChecked, setStatusChecked] = useState(false);
  const [detailLowongan, setDetailLowongan] = useState({});

  const columns = [
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("status") ? "Aktif" : "Non-Aktif"}
        </div>
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
                  setDetailLowongan(detail);
                  setStatusChecked(detail.status);
                  setOpenDialog(true);
                }}
              >
                Ubah Lowongan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailLowongan(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Lowongan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEditLowongan = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { position, recruiter } = Object.fromEntries(formData);

      if (position === null) {
        return setErrMessage("Posisi lowongan tidak boleh kosong");
      }

      if (recruiter === null) {
        return setErrMessage("Perekrut tidak boleh kosong");
      }

      const data = await editLowongan(detailLowongan?.id, {
        position,
        recruiter,
        status: statusChecked,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelLowongan = async () => {
    try {
      const data = await delLowongan(detailLowongan?.id);
      cl(data);
      setDetailLowongan({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailLowongan({});
    setStatusChecked(false);
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailLowongan({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus lowongan ini?"
        description="Periksa kembali, karena hal ini akan menghapus data lowongan yang dipilih secara permanen."
        onAction={handleDelLowongan}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={handleEditLowongan}
        title="Ubah Lowongan"
        description="Perbaiki data lowongan. Klik simpan ketika sudah selesai."
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="position">Posisi</Label>
          <Input
            defaultValue={detailLowongan?.position}
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
            defaultValue={detailLowongan?.recruiter}
            onChange={() => setErrMessage("")}
            type="text"
            id="recruiter"
            name="recruiter"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status">Status</Label>
          <div className="col-span-3 flex items-center">
            <Switch
              checked={statusChecked}
              onCheckedChange={setStatusChecked}
              id="status"
              name="status"
              className="bg-white mr-4"
            />
            <Label htmlFor="status">
              {statusChecked ? "Aktif" : "Non-Aktif"}
            </Label>
          </div>
        </div>
        {errMessage !== "" && (
          <div className="p-2 rounded-md text-center border border-destructive-foreground text-destructive">
            {errMessage}
          </div>
        )}
      </ModalForm>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Lowongan</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listLowongan?.items}
              columns={columns}
              searchColumn="position"
              searchPlaceholder="Cari lowongan..."
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
