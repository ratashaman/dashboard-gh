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

export default function KategoriComponent({
  listKategori,
  isLoading,
  addKategori,
  editKategori,
  delKategori,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [detailKategori, setDetailKategori] = useState({});

  const columns = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <div className="">{row.getValue("slug")}</div>,
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
                  setDetailKategori(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Kategori
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailKategori(detail);
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

  const handleAddKategori = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name, slug } = Object.fromEntries(formData);

      if (name === null) {
        return setErrMessage("Nama kategori tidak boleh kosong");
      }

      if (slug === null) {
        return setErrMessage("Slug kategori tidak boleh kosong");
      }

      const data = await addKategori(detailKategori?.id, {
        name,
        slug,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleEditKategori = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name, slug } = Object.fromEntries(formData);

      if (name === null) {
        return setErrMessage("Nama kategori tidak boleh kosong");
      }

      if (slug === null) {
        return setErrMessage("Slug kategori tidak boleh kosong");
      }

      const data = await editKategori(detailKategori?.id, {
        name,
        slug,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelKategori = async () => {
    try {
      const data = await delKategori(detailKategori?.id);
      cl(data);
      setDetailKategori({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailKategori({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailKategori({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus kategori ini?"
        description="Periksa kembali, karena hal ini akan menghapus data kategori yang dipilih secara permanen."
        onAction={handleDelKategori}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={detailKategori?.name ? handleEditKategori : handleAddKategori}
        title={detailKategori?.name ? "Ubah Kategori" : "Tambah Kategori"}
        description={
          detailKategori?.name
            ? "Perbaiki data kategori"
            : "Masukkan data kategori baru" +
              ". Klik simpan ketika sudah selesai."
        }
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Nama</Label>
          <Input
            defaultValue={detailKategori?.name}
            onChange={() => setErrMessage("")}
            type="text"
            id="name"
            name="name"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="slug">Slug</Label>
          <Input
            defaultValue={detailKategori?.slug}
            onChange={() => setErrMessage("")}
            type="text"
            id="slug"
            name="slug"
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
        <h2 className="text-3xl font-bold tracking-tight">Kategori Berita</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listKategori?.items}
              columns={columns}
              searchColumn="name"
              searchPlaceholder="Cari kategori..."
              buttonLabel="Tambah Kategori"
              buttonOnClick={() => setOpenDialog(true)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
