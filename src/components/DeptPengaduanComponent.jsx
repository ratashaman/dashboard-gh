"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/shared/phone-input";
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
import { formatDate, validateEmail, validatePhone } from "@/lib/utils";

export default function DeptPengaduanComponent({
  listDept,
  isLoading,
  addDept,
  editDept,
  delDept,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [detailDept, setDetailDept] = useState({});

  const columns = [
    {
      accessorKey: "name",
      header: "Nama Departemen",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Telepon",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("website")}</div>
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
                  setDetailDept(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Departemen
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailDept(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Departemen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddDept = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name, phone, email, website } = Object.fromEntries(formData);

      if (name === "") {
        return setErrMessage("Nama departemen tidak boleh kosong");
      }

      if (phone === "") {
        return setErrMessage("No. Telepon tidak boleh kosong");
      }

      if (website === "") {
        return setErrMessage("Website tidak boleh kosong");
      }

      if (!validateEmail(email)) {
        return setErrMessage(
          "Format email tidak sesuai, silakan periksa kembali"
        );
      }

      const data = await addDept({
        name,
        phone,
        email,
        website,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      setErrMessage(error?.message);
    }
  };

  const handleEditDept = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name, phone, email, website } = Object.fromEntries(formData);

      if (name === "") {
        return setErrMessage("Nama departemen tidak boleh kosong");
      }

      if (phone === "") {
        return setErrMessage("No. Telepon tidak boleh kosong");
      }

      if (website === "") {
        return setErrMessage("Website tidak boleh kosong");
      }

      if (!validateEmail(email)) {
        return setErrMessage(
          "Format email tidak sesuai, silakan periksa kembali"
        );
      }

      const data = await editDept(detailDept?.id, {
        name,
        phone,
        email,
        website,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelDept = async () => {
    try {
      const data = await delDept(detailDept?.id);
      cl(data);
      setDetailDept({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailDept({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailDept({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus departemen ini?"
        description="Periksa kembali, karena hal ini akan menghapus departemen yang dipilih secara permanen."
        onAction={handleDelDept}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            setErrMessage("");
            setDetailDept({});
          }
          setOpenDialog(val);
        }}
        onSubmit={detailDept?.id ? handleEditDept : handleAddDept}
        title={detailDept?.id ? "Ubah Departemen" : "Tambah Departemen"}
        description={
          detailDept?.id
            ? "Perbaiki data departemen"
            : "Masukkan data departemen baru" +
              ". Klik simpan ketika sudah selesai."
        }
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Nama Departemen</Label>
          <Input
            defaultValue={detailDept?.name}
            onChange={() => setErrMessage("")}
            type="text"
            id="name"
            name="name"
            placeholder="Contoh: Masalah Infrastruktur"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone">No. Telepon</Label>
          <Input
            defaultValue={detailDept?.phone}
            onChange={() => setErrMessage("")}
            type="tel"
            id="phone"
            name="phone"
            placeholder="Contoh: 081234567890"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            defaultValue={detailDept?.email}
            onChange={() => setErrMessage("")}
            type="email"
            id="email"
            name="email"
            placeholder="Contoh: siti.nurhayati@gmail.com"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="website">Website</Label>
          <Input
            defaultValue={detailDept?.website}
            onChange={() => setErrMessage("")}
            type="text"
            id="website"
            name="website"
            placeholder="Contoh: http://contoh.com"
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
          Departemen Pengaduan
        </h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listDept?.items}
              columns={columns}
              searchPlaceholder="Cari Departemen..."
              searchColumn="name"
              buttonLabel="Tambah Departemen"
              buttonOnClick={() => setOpenDialog(true)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
