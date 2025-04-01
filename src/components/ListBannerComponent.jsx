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
import { convertToBase64, imageUrlToBase64 } from "@/lib/utils";

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
  const [statusChecked, setStatusChecked] = useState("BANNER_HIDE");
  const [detailBanner, setDetailBanner] = useState({});

  const columns = [
    {
      accessorKey: "caption",
      header: "Judul",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("caption")}</div>
      ),
    },
    {
      accessorKey: "attachment",
      header: "Gambar",
      cell: ({ row }) => (
        <div className="">
          <img
            src={row.getValue("attachment")}
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
          {row.getValue("status") === "BANNER_SHOW"
            ? "ditampilkan"
            : "disembunyikan"}
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
      const { caption, attachment } = Object.fromEntries(formData);

      if (caption === null) {
        return setErrMessage("Judul banner tidak boleh kosong");
      }

      if (attachment?.name === "" || attachment?.size === 0) {
        return setErrMessage("Gambar banner tidak boleh kosong");
      }

      const img64 = await convertToBase64(attachment);
      console.log(img64);

      const data = await addBanner({
        caption,
        attachment: img64,
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
      const { caption, attachment } = Object.fromEntries(formData);

      if (caption === null) {
        return setErrMessage("Judul banner tidak boleh kosong");
      }

      const img64 =
        attachment?.name === "" || attachment?.size === 0
          ? await imageUrlToBase64(detailBanner?.attachment)
          : await convertToBase64(attachment);
      console.log(img64);

      const data = await editBanner(detailBanner?.id, {
        caption,
        attachment: img64,
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
    setStatusChecked("BANNER_HIDE");
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
        onSubmit={detailBanner?.caption ? handleEditBanner : handleAddBanner}
        title={detailBanner?.caption ? "Ubah Banner" : "Tambah Banner"}
        description={
          detailBanner?.caption
            ? "Perbaiki data banner"
            : "Masukkan data banner baru" +
              ". Klik simpan ketika sudah selesai."
        }
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="caption">Judul</Label>
          <Input
            defaultValue={detailBanner?.caption}
            onChange={() => setErrMessage("")}
            type="text"
            id="caption"
            name="caption"
            className="col-span-3 bg-white"
          />
        </div>
        {!!detailBanner?.attachment && (
          <div className="flex justify-center items-center gap-4">
            <img
              src={detailBanner?.attachment}
              alt="Attachment"
              className="w-1/2 dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="attachment">Gambar</Label>
          <Input
            onChange={() => setErrMessage("")}
            type="file"
            accept="image/png, image/jpeg"
            id="attachment"
            name="attachment"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status">Status</Label>
          <div className="col-span-3 flex items-center">
            <Switch
              checked={statusChecked === "BANNER_SHOW"}
              onCheckedChange={(e) =>
                setStatusChecked(e ? "BANNER_SHOW" : "BANNER_HIDE")
              }
              id="status"
              name="status"
              className="bg-white mr-4"
            />
            <Label htmlFor="status">
              {statusChecked === "BANNER_SHOW" ? "Tampilkan" : "Sembunyikan"}
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
              searchColumn="caption"
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
