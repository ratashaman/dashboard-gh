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

export default function PerekrutComponent({
  listPerekrut,
  isLoading,
  editPerekrut,
  delPerekrut,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [detailPerekrut, setDetailPerekrut] = useState({});

  const columns = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Alamat",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("address")}</div>
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
                  setDetailPerekrut(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Perekrut
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailPerekrut(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Perekrut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEditPerekrut = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name, description, address } = Object.fromEntries(formData);

      if (name === null) {
        return setErrMessage("Nama perekrut tidak boleh kosong");
      }

      if (description === null) {
        return setErrMessage("Deskripsi perekrut tidak boleh kosong");
      }

      if (address === null) {
        return setErrMessage("Alamat perekrut tidak boleh kosong");
      }

      const data = await editPerekrut(detailPerekrut?.id, {
        name,
        description,
        address,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelPerekrut = async () => {
    try {
      const data = await delPerekrut(detailPerekrut?.id);
      cl(data);
      setDetailPerekrut({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailPerekrut({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailPerekrut({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus perekrut ini?"
        description="Periksa kembali, karena hal ini akan menghapus data perekrut yang dipilih secara permanen."
        onAction={handleDelPerekrut}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={handleEditPerekrut}
        title="Ubah Perekrut"
        description="Perbaiki data perekrut. Klik simpan ketika sudah selesai."
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Nama</Label>
          <Input
            defaultValue={detailPerekrut?.name}
            onChange={() => setErrMessage("")}
            type="text"
            id="name"
            name="name"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description">Deskripsi</Label>
          <Input
            defaultValue={detailPerekrut?.description}
            onChange={() => setErrMessage("")}
            type="text"
            id="description"
            name="description"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address">Alamat</Label>
          <Input
            defaultValue={detailPerekrut?.address}
            onChange={() => setErrMessage("")}
            type="text"
            id="address"
            name="address"
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
        <h2 className="text-3xl font-bold tracking-tight">Perekrut Kerja</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listPerekrut?.items}
              columns={columns}
              searchColumn="name"
              searchPlaceholder="Cari perekrut..."
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
