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

export default function ListRoleComponent({
  listRole,
  isLoading,
  addRole,
  editRole,
  delRole,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [detailRole, setDetailRole] = useState({});

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "systemName",
      header: "System Name",
      cell: ({ row }) => <div className="">{row.getValue("systemName")}</div>,
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
                  setDetailRole(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Role
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailRole(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name, systemName } = Object.fromEntries(formData);

      if (name === null) {
        return setErrMessage("Name role tidak boleh kosong");
      }

      if (systemName === null) {
        return setErrMessage("System role tidak boleh kosong");
      }

      const data = await addRole({
        name,
        systemName,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleEditRole = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { name, systemName } = Object.fromEntries(formData);

      if (name === null) {
        return setErrMessage("Name role tidak boleh kosong");
      }

      if (systemName === null) {
        return setErrMessage("System role tidak boleh kosong");
      }

      const data = await editRole(detailRole?.id, {
        name,
        systemName,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleDelRole = async () => {
    try {
      const data = await delRole(detailRole?.id);
      cl(data);
      setDetailRole({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailRole({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailRole({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus role ini?"
        description="Periksa kembali, karena hal ini akan menghapus data role yang dipilih secara permanen."
        onAction={handleDelRole}
      />
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={detailRole?.name ? handleEditRole : handleAddRole}
        title={detailRole?.name ? "Ubah Role" : "Tambah Role"}
        description={
          detailRole?.name
            ? "Perbaiki data role"
            : "Masukkan data role baru" + ". Klik simpan ketika sudah selesai."
        }
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Name</Label>
          <Input
            defaultValue={detailRole?.name}
            onChange={() => setErrMessage("")}
            type="text"
            id="name"
            name="name"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="systemName">System Name</Label>
          <Input
            defaultValue={detailRole?.systemName}
            onChange={() => setErrMessage("")}
            type="text"
            id="systemName"
            name="systemName"
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
        <h2 className="text-3xl font-bold tracking-tight">List Role</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listRole?.items}
              columns={columns}
              searchColumn="name"
              searchPlaceholder="Cari role..."
              buttonLabel="Tambah Role"
              buttonOnClick={() => setOpenDialog(true)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
