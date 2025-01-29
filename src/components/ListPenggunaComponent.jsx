"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/password-input";
import { PhoneInput } from "@/components/shared/phone-input";
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
import SelectSearch from "react-tailwindcss-select";
import LoadingScreen from "@/components/shared/loadingScreen";
import { cl } from "@/lib/logger";
import { validateEmail, validatePhone } from "@/lib/utils";

export default function ListPenggunaComponent({
  listUser,
  listRole,
  isLoading,
  addUser,
  editUser,
  delUser,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [roleIds, setRoleIds] = useState(null);
  const [detailUser, setDetailUser] = useState({});

  const columns = [
    {
      accessorKey: "fullName",
      header: "Nama Lengkap",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("fullName")}</div>
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
      accessorKey: "roles",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">
          {row
            .getValue("roles")
            .map((x) => x.name)
            .join(", ")}
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
                  const roles = detail.roles.map((item) => {
                    return { value: item.id, label: item.name };
                  });
                  setRoleIds(roles);
                  setDetailUser(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Pengguna
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailUser(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Pengguna
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const {
        fullName,
        phone: rawPhone,
        email,
        password,
        passwordConf,
      } = Object.fromEntries(formData);
      const phone = rawPhone.replace(/ /g, "");

      if (fullName === "") {
        return setErrMessage("Nama lengkap pengguna tidak boleh kosong");
      }

      if (password.length < 6)
        return setErrMessage("Password minimal 6 karakter");

      if (password !== passwordConf)
        return setErrMessage("Password dan konfirmasi password tidak sama");

      if (!validateEmail(email)) {
        return setErrMessage(
          "Format email tidak sesuai, silakan periksa kembali"
        );
      }

      if (!validatePhone(phone)) {
        return setErrMessage(
          "Format telepon tidak sesuai, silakan periksa kembali"
        );
      }

      if (roleIds === null || !roleIds?.length) {
        return setErrMessage("Role pengguna tidak boleh kosong");
      }

      const reformatList = roleIds.map((item) => {
        return item.value;
      });

      const data = await addUser({
        fullName,
        phone,
        email,
        password,
        roleIds: reformatList,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      setErrMessage(error?.message);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { fullName, phone: rawPhone, email } = Object.fromEntries(formData);
      const phone = rawPhone.replace(/ /g, "");

      if (fullName === "") {
        return setErrMessage("Nama lengkap pengguna tidak boleh kosong");
      }

      if (!validateEmail(email)) {
        return setErrMessage(
          "Format email tidak sesuai, silakan periksa kembali"
        );
      }

      if (!validatePhone(phone)) {
        return setErrMessage(
          "Format telepon tidak sesuai, silakan periksa kembali"
        );
      }

      if (roleIds === null || !roleIds?.length) {
        return setErrMessage("Role pengguna tidak boleh kosong");
      }

      const reformatList = roleIds.map((item) => {
        return item.value;
      });

      const data = await editUser(detailUser?.id, {
        fullName,
        phone,
        email,
        roleIds: reformatList,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelUser = async () => {
    try {
      const data = await delUser(detailUser?.id);
      cl(data);
      setDetailUser({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setRoleIds(null);
    setDetailUser({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailUser({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus akun ini?"
        description="Periksa kembali, karena hal ini akan menghapus data pengguna yang dipilih secara permanen."
        onAction={handleDelUser}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            setErrMessage("");
            setRoleIds(null);
            setDetailUser({});
          }
          setOpenDialog(val);
        }}
        onSubmit={detailUser?.id ? handleEditUser : handleAddUser}
        title={detailUser?.id ? "Ubah Pengguna" : "Tambah Pengguna"}
        description={
          detailUser?.id
            ? "Perbaiki data pengguna"
            : "Masukkan data pengguna baru" +
              ". Klik simpan ketika sudah selesai."
        }
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fullName">Nama Lengkap</Label>
          <Input
            defaultValue={detailUser?.fullName}
            onChange={() => setErrMessage("")}
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Contoh: Siti Nurhayati"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone">No. Telepon</Label>
          <PhoneInput
            defaultCountry="ID"
            value={detailUser?.phone}
            onChange={() => setErrMessage("")}
            type="tel"
            id="phone"
            name="phone"
            placeholder="Contoh: +6281234567890"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            defaultValue={detailUser?.email}
            onChange={() => setErrMessage("")}
            type="email"
            id="email"
            name="email"
            placeholder="Contoh: siti.nurhayati@gmail.com"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role">Role Pengguna</Label>
          <div className="col-span-3">
            <SelectSearch
              primaryColor={"sky"}
              isSearchable={true}
              isClearable={true}
              isMultiple={true}
              placeholder="Pilih role pengguna..."
              searchInputPlaceholder="Cari role pengguna..."
              noOptionsMessage="Data tidak ditemukan."
              value={roleIds}
              onChange={(v) => {
                setRoleIds(v);
              }}
              options={listRole}
            />
          </div>
        </div>
        {!detailUser?.id && (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                onChange={(e) => setErrMessage("")}
                id="password"
                name="password"
                placeholder="Pastikan password aman dan mudah diingat"
                className="col-span-3 bg-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="passwordConf">Konfirmasi Password</Label>
              <PasswordInput
                onChange={(e) => setErrMessage("")}
                id="passwordConf"
                name="passwordConf"
                placeholder="Ketik ulang password diatas"
                className="col-span-3 bg-white"
              />
            </div>
          </>
        )}
        {errMessage !== "" && (
          <div className="p-2 rounded-md text-center border border-destructive-foreground text-destructive">
            {errMessage}
          </div>
        )}
      </ModalForm>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">List Pengguna</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listUser?.items}
              columns={columns}
              searchPlaceholder="Cari pengguna..."
              searchColumn="fullName"
              buttonLabel="Tambah Pengguna"
              buttonOnClick={() => setOpenDialog(true)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
