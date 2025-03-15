"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import SelectSearch from "react-tailwindcss-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalForm from "@/components/shared/modal-form";
import DataTable from "@/components/shared/data-table";
import LoadingScreen from "@/components/shared/loadingScreen";
import { cl } from "@/lib/logger";

export default function ListPengajuanKtpComponent({
  listPengajuan,
  isLoading,
  editPengajuan,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [detailPengajuan, setDetailPengajuan] = useState({});
  const [verifStatus, setVerifStatus] = useState(null);

  const getStatus = (status) => {
    switch (status) {
      case "RESIDENT_ON_PROCESS":
        return "Menunggu Verifikasi";

      case "RESIDENT_ACTIVE":
        return "Pengajuan Aktif";

      case "RESIDENT_REJECTED":
        return "Pengajuan Ditolak";

      case "RESIDENT_VERIFIER_DRAFT":
        return "Verifikasi Draf";

      case "RESIDENT_VERIFIER_VALIDATION_PROCESS":
        return "Proses Validasi";

      case "RESIDENT_VERIFIER_NOT_COMPLETE":
        return "Tidak Lengkap";

      case "RESIDENT_VERIFIER_APPROVED":
        return "Verifikasi Diterima";

      case "RESIDENT_VERIFIER_REJECT":
        return "Verifikasi Ditolak";

      default:
        break;
    }
  };

  const listVerif = [
    {
      value: "RESIDENT_VERIFIER_DRAFT",
      label: "Verifikasi Draf",
    },
    {
      value: "RESIDENT_VERIFIER_VALIDATION_PROCESS",
      label: "Proses Validasi",
    },
    {
      value: "RESIDENT_VERIFIER_NOT_COMPLETE",
      label: "Tidak Lengkap",
    },
    {
      value: "RESIDENT_VERIFIER_APPROVED",
      label: "Verifikasi Diterima",
    },
    {
      value: "RESIDENT_VERIFIER_REJECT",
      label: "Verifikasi Ditolak",
    },
  ];

  const columns = [
    {
      accessorKey: "citizenId",
      header: "No. KTP",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("citizenId")}</div>
      ),
    },
    {
      accessorKey: "familyId",
      header: "No. KK",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("familyId")}</div>
      ),
    },
    {
      accessorKey: "fullName",
      header: "Nama Lengkap",
      cell: ({ row }) => <div className="">{row.getValue("fullName")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{getStatus(row.getValue("status"))}</div>
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
                  setDetailPengajuan(detail);
                  setOpenDialog(true);
                }}
              >
                Verifikasi Pengajuan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEditPengajuan = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { reason } = Object.fromEntries(formData);

      if (verifStatus === null) {
        return setErrMessage("Status pengajuan tidak boleh kosong");
      }

      if (reason === "") {
        return setErrMessage("Alasan tidak boleh kosong");
      }

      const data = await editPengajuan(detailPengajuan?.id, {
        status: verifStatus.value,
        reason,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setDetailPengajuan({});
    setVerifStatus(null);
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={handleEditPengajuan}
        title="Ubah Status"
        description="Pilih status pengajuan. Klik simpan ketika sudah selesai."
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status">Status</Label>
          <div className="col-span-3">
            <SelectSearch
              primaryColor={"sky"}
              isSearchable={true}
              isClearable={false}
              isMultiple={false}
              placeholder="Pilih status pengajuan..."
              searchInputPlaceholder="Cari status pengajuan..."
              noOptionsMessage="Data tidak ditemukan."
              value={verifStatus}
              onChange={(v) => {
                setVerifStatus(v);
              }}
              options={listVerif}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="reason">Alasan</Label>
          <Input
            onChange={() => setErrMessage("")}
            type="text"
            id="reason"
            name="reason"
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
          List Pengajuan KTP
        </h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              searchPlaceholder="Cari No. KTP..."
              searchColumn="citizenId"
              data={listPengajuan?.items}
              columns={columns}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
