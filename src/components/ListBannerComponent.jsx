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

export default function ListBannerComponent({
  listBanner,
  isLoading,
  addBanner,
  editBanner,
  delBanner,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [statusChecked, setStatusChecked] = useState(false);
  const [detailBanner, setDetailBanner] = useState({});

  const columns = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "img",
      header: "Gambar",
      cell: ({ row }) => (
        <div className="">
          <img
            src={row.getValue("img")}
            alt="Image"
            className="w-1/2 dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="">
          {row.getValue("status") ? "tampilkan" : "sembunyikan"}
        </div>
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
                  setDetailBanner(detail);
                  setStatusChecked(detail.status);
                  setOpenDialog(true);
                }}
              >
                Ubah Banner
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailBanner(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Banner
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddBanner = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { title, category } = Object.fromEntries(formData);

      if (title === null) {
        return setErrMessage("Judul banner tidak boleh kosong");
      }

      if (category === null) {
        return setErrMessage("Kategori banner tidak boleh kosong");
      }

      const data = await addBanner(detailBanner?.id, {
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

  const handleEditBanner = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { title, category } = Object.fromEntries(formData);

      if (title === null) {
        return setErrMessage("Judul banner tidak boleh kosong");
      }

      if (category === null) {
        return setErrMessage("Kategori banner tidak boleh kosong");
      }

      const data = await editBanner(detailBanner?.id, {
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

  const handleDelBanner = async () => {
    try {
      const data = await delBanner(detailBanner?.id);
      cl(data);
      setDetailBanner({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailBanner({});
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
            setDetailBanner({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus banner ini?"
        description="Periksa kembali, karena hal ini akan menghapus data banner yang dipilih secara permanen."
        onAction={handleDelBanner}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={detailBanner?.name ? handleEditBanner : handleAddBanner}
        title={detailBanner?.name ? "Ubah Banner" : "Tambah Banner"}
        description={
          detailBanner?.name
            ? "Perbaiki data banner"
            : "Masukkan data banner baru" +
              ". Klik simpan ketika sudah selesai."
        }
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title">Judul</Label>
          <Input
            defaultValue={detailBanner?.title}
            onChange={() => setErrMessage("")}
            type="text"
            id="title"
            name="title"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="img">Gambar</Label>
          <Input
            defaultValue={detailBanner?.img}
            onChange={() => setErrMessage("")}
            type="file"
            id="img"
            name="img"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status">Kategori</Label>
          <div className="col-span-3 flex items-center">
            <Switch
              checked={statusChecked}
              onCheckedChange={setStatusChecked}
              id="status"
              name="status"
              className="bg-white mr-4"
            />
            <Label htmlFor="status">
              {statusChecked ? "Tampilkan" : "Sembunyikan"}
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
        <h2 className="text-3xl font-bold tracking-tight">List Banner</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listBanner?.items}
              columns={columns}
              searchColumn="title"
              searchPlaceholder="Cari banner..."
              buttonLabel="Tambah Banner"
              buttonOnClick={() => setOpenDialog(true)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
