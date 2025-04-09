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
import SelectSearch from "react-tailwindcss-select";
import LoadingScreen from "@/components/shared/loadingScreen";
import { cl } from "@/lib/logger";
import { formatDate } from "@/lib/utils";

export default function ListPengaduanComponent({
  listComplaint,
  listDepartment,
  listType,
  isLoading,
  editComplaint,
  editStatus,
  delComplaint,
}) {
  const [openDialogDetail, setOpenDialogDetail] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [type, setType] = useState(null);
  const [department, setDepartment] = useState(null);
  const [status, setStatus] = useState(null);
  const [detailComplaint, setDetailComplaint] = useState({});

  const complaintStatus = [
    {
      value: "COMPLAINT_DRAFT",
      label: "Pengajuan Awal",
    },
    {
      value: "COMPLAINT_VALIDATION_PROCESS",
      label: "Proses Validasi",
    },
    {
      value: "COMPLAINT_VALIDATED",
      label: "Validasi Selesai",
    },
    {
      value: "COMPLAINT_DELIVERED",
      label: "Diterima",
    },
    {
      value: "COMPLAINT_FINISH",
      label: "Selesai",
    },
    {
      value: "COMPLAINT_REJECT",
      label: "Ditolak",
    },
  ];

  const columns = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "complaintType",
      header: "Jenis",
      cell: ({ row }) => (
        <div className="capitalize">{row?.original?.complaintType?.name}</div>
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {
            complaintStatus.find((a) => a.value === row.getValue("status"))
              ?.label
          }
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
                  setDetailComplaint(detail);
                  setOpenDialogDetail(true);
                }}
              >
                Detail Pengaduan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const type = listType.find(
                    (item) => item.value === detail?.complaintType?.id
                  );
                  const department = listDepartment.find(
                    (item) => item.value === detail?.relatedDepartment?.id
                  );
                  const status = complaintStatus.find(
                    (item) => item.value === detail?.status
                  );
                  setType(type);
                  setDepartment(department);
                  setStatus(status);
                  setDetailComplaint(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Pengaduan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const status = complaintStatus.find(
                    (item) => item.value === detail?.status
                  );
                  setStatus(status);
                  setDetailComplaint(detail);
                  setOpenDialog(true);
                }}
              >
                Ubah Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDetailComplaint(detail);
                  setOpenAlert(true);
                }}
              >
                Hapus Pengaduan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEditComplaint = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { title } = Object.fromEntries(formData);

      if (title === "") {
        return setErrMessage("Judul pengaduan tidak boleh kosong");
      }

      if (type === null) {
        return setErrMessage("Jenis pengaduan tidak boleh kosong");
      }

      if (department === null) {
        return setErrMessage("Departemen tidak boleh kosong");
      }

      if (status === null) {
        return setErrMessage("Status pengaduan tidak boleh kosong");
      }

      const data = await editComplaint(detailComplaint?.id, {
        citizenId: detailComplaint?.citizenId,
        complaintTypeId: type?.value,
        title,
        relatedDepartmentId: department?.value,
        status: status?.value,
      });
      cl(data);
      if (data?.status === "OK") handleCloseDialog();
    } catch (error) {
      cl("error");
      cl(error);
      setErrMessage(error?.message);
    }
  };

  const handleEditStatus = async (e) => {
    e.preventDefault();
    try {
      if (status === null) {
        return setErrMessage("Status pengaduan tidak boleh kosong");
      }

      const data = await editStatus(detailComplaint?.id, {
        status: status?.value,
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
      const data = await delComplaint(detailComplaint?.id);
      cl(data);
      setDetailComplaint({});
    } catch (error) {
      cl(error?.message);
    }
  };

  const handleCloseDialog = () => {
    setErrMessage("");
    setType(null);
    setDepartment(null);
    setStatus(null);
    setDetailComplaint({});
    setOpenDialog(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DeleteAlert
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailComplaint({});
          }
          setOpenAlert(val);
        }}
        title="Apakah Anda yakin akan menghapus pengaduan ini?"
        description="Periksa kembali, karena hal ini akan menghapus data pengaduan yang dipilih secara permanen."
        onAction={handleDelUser}
      />
      <ModalForm
        open={openDialogDetail}
        onOpenChange={setOpenDialogDetail}
        onSubmit={false}
        description="Data lengkap terkait pengaduan."
        submitLabel="Kembali"
        title="Detail Pengaduan"
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="">Judul</div>
          <div className="col-span-3">{detailComplaint?.title}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="">Alamat</div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${detailComplaint?.latitude},${detailComplaint?.longitude}`}
            className="col-span-3 hover:underline"
          >
            {detailComplaint?.address}
          </a>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="">Nama Pelapor</div>
          <div className="col-span-3">
            {detailComplaint?.createdBy?.fullName}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="">No. HP Pelapor</div>
          <div className="col-span-3">
            {detailComplaint?.createdBy?.phone.length
              ? detailComplaint?.createdBy?.phone
              : "-"}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="">No. KTP Pelapor</div>
          <div className="col-span-3">{detailComplaint?.citizenId}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="">Jenis</div>
          <div className="col-span-3">
            {detailComplaint?.complaintType?.name}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="">Status</div>
          <div className="col-span-3">
            {
              complaintStatus.find(
                (item) => item.value === detailComplaint?.status
              )?.label
            }
          </div>
        </div>
      </ModalForm>
      <ModalForm
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            handleCloseDialog();
          }
          setOpenDialog(val);
        }}
        onSubmit={
          type !== null && department !== null
            ? handleEditComplaint
            : handleEditStatus
        }
        title="Ubah Pengaduan"
        description="Perbaiki data pengaduan. Klik simpan ketika sudah selesai."
      >
        {type !== null && department !== null && (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title">Judul</Label>
              <Input
                defaultValue={detailComplaint?.title}
                onChange={() => setErrMessage("")}
                type="text"
                id="title"
                name="title"
                className="col-span-3 bg-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role">Jenis</Label>
              <div className="col-span-3">
                <SelectSearch
                  primaryColor={"sky"}
                  isSearchable={true}
                  isClearable={false}
                  isMultiple={false}
                  placeholder="Pilih jenis pengaduan..."
                  searchInputPlaceholder="Cari jenis pengaduan..."
                  noOptionsMessage="Data tidak ditemukan."
                  value={type}
                  onChange={(v) => {
                    setType(v);
                  }}
                  options={listType}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role">Departemen</Label>
              <div className="col-span-3">
                <SelectSearch
                  primaryColor={"sky"}
                  isSearchable={true}
                  isClearable={false}
                  isMultiple={false}
                  placeholder="Pilih departemen pengaduan..."
                  searchInputPlaceholder="Cari departemen pengaduan..."
                  noOptionsMessage="Data tidak ditemukan."
                  value={department}
                  onChange={(v) => {
                    setDepartment(v);
                  }}
                  options={listDepartment}
                />
              </div>
            </div>
          </>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role">Status</Label>
          <div className="col-span-3">
            <SelectSearch
              primaryColor={"sky"}
              isSearchable={true}
              isClearable={false}
              isMultiple={false}
              placeholder="Pilih status pengaduan..."
              searchInputPlaceholder="Cari status pengaduan..."
              noOptionsMessage="Data tidak ditemukan."
              value={status}
              onChange={(v) => {
                setStatus(v);
              }}
              options={complaintStatus}
            />
          </div>
        </div>
        {errMessage !== "" && (
          <div className="p-2 rounded-md text-center border border-destructive-foreground text-destructive">
            {errMessage}
          </div>
        )}
      </ModalForm>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">List Pengaduan</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTable
              data={listComplaint?.items}
              columns={columns}
              searchPlaceholder="Cari pengaduan..."
              searchColumn="title"
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
