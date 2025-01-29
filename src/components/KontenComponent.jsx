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

export default function KontenComponent({
  listKonten,
  isLoading,
  addKonten,
  editKonten,
  delKonten,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [statusChecked, setStatusChecked] = useState(false);
  const [detailKonten, setDetailKonten] = useState({});

  const columns = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => <div className="">{row.getValue("category")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="">{row.getValue("status") ? "Published" : "Draft"}</div>
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
                  setDetailKonten(detail);
                  setStatusChecked(detail.status);
                  setOpenDialog(true);
                }}
              >
                Ubah Konten
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailKonten(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Konten
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddKonten = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { title, category } = Object.fromEntries(formData);

      if (title === null) {
        return setErrMessage("Judul konten tidak boleh kosong");
      }

      if (category === null) {
        return setErrMessage("Kategori konten tidak boleh kosong");
      }

      const data = await addKonten(detailKonten?.id, {
        title,
        category,
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

  const handleEditKonten = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { title, category } = Object.fromEntries(formData);

      if (title === null) {
        return setErrMessage("Judul konten tidak boleh kosong");
      }

      if (category === null) {
        return setErrMessage("Kategori konten tidak boleh kosong");
      }

      const data = await editKonten(detailKonten?.id, {
        title,
        category,
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

  const handleDelKonten = async () => {
    try {
      const data = await delKonten(detailKonten?.id);
      cl(data);
      setDetailKonten({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailKonten({});
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
            setDetailKonten({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus konten ini?"
        description="Periksa kembali, karena hal ini akan menghapus data konten yang dipilih secara permanen."
        onAction={handleDelKonten}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={detailKonten?.name ? handleEditKonten : handleAddKonten}
        title={detailKonten?.name ? "Ubah Konten" : "Tambah Konten"}
        description={
          detailKonten?.name
            ? "Perbaiki data konten"
            : "Masukkan data konten baru" +
              ". Klik simpan ketika sudah selesai."
        }
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title">Judul</Label>
          <Input
            defaultValue={detailKonten?.title}
            onChange={() => setErrMessage("")}
            type="text"
            id="title"
            name="title"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category">Kategori</Label>
          <Input
            defaultValue={detailKonten?.category}
            onChange={() => setErrMessage("")}
            type="text"
            id="category"
            name="category"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category">Kategori</Label>
          <div className="col-span-3 flex items-center">
            <Switch
              checked={statusChecked}
              onCheckedChange={setStatusChecked}
              id="status"
              name="status"
              className="bg-white mr-4"
            />
            <Label htmlFor="category">
              {statusChecked ? "Published" : "Draft"}
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
        <h2 className="text-3xl font-bold tracking-tight">Konten Berita</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listKonten?.items}
              columns={columns}
              searchColumn="title"
              searchPlaceholder="Cari konten..."
              buttonLabel="Tambah Konten"
              buttonOnClick={() => setOpenDialog(true)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
