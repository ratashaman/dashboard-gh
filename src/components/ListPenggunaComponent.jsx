"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/password-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LoadingScreen from "@/components/shared/loadingScreen";
import { cl } from "@/lib/logger";
import { validateEmail } from "@/lib/utils";

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
  const [roleIds, setRoleIds] = useState([]);
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
                  const roles = detail.roles.map((item) => item.id);
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
      const { fullName, phone, email, password, passwordConf } =
        Object.fromEntries(formData);

      if (password !== passwordConf)
        return setErrMessage("Password dan konfirmasi password tidak sama");

      if (!validateEmail(email)) {
        return setErrMessage(
          "Format email tidak sesuai, silakan periksa kembali"
        );
      }

      const data = await addUser({
        fullName,
        phone,
        email,
        password,
        roleIds,
      });
      cl(data);
      if (data?.status === "OK") setOpenDialog(false);
    } catch (error) {
      setErrMessage(error?.message);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { fullName, phone, email } = Object.fromEntries(formData);

      if (!validateEmail(email)) {
        return setErrMessage(
          "Format email tidak sesuai, silakan periksa kembali"
        );
      }

      const data = await editUser(detailUser?.id, {
        fullName,
        phone,
        email,
        roleIds,
      });
      cl(data);
      if (data?.status === "OK") setOpenDialog(false);
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
    } catch (error) {
      cl(error?.message);
    }
  };

  const table = useReactTable({
    data: listUser?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {},
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <AlertDialog
        open={openAlert}
        onOpenChange={(val) => {
          if (!val) {
            setDetailUser({});
          }
          setOpenAlert(val);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda yakin akan menghapus akun ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Periksa kembali, karena hal ini akan menghapus data pengguna yang
              dipilih secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => handleDelUser()}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog
        open={openDialog}
        onOpenChange={(val) => {
          if (!val) {
            setErrMessage("");
            setRoleIds([]);
            setDetailUser({});
          }
          setOpenDialog(val);
        }}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {detailUser?.id ? "Ubah Pengguna" : "Tambah Pengguna"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {detailUser?.id
              ? "Perbaiki data pengguna"
              : "Masukkan data pengguna baru"}
            . Klik simpan ketika sudah selesai.
          </DialogDescription>
          <form onSubmit={detailUser?.id ? handleEditUser : handleAddUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  defaultValue={detailUser?.fullName}
                  onChange={() => setErrMessage("")}
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Nama Lengkap Pengguna"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone">No. Telepon</Label>
                <Input
                  defaultValue={detailUser?.phone}
                  onChange={() => setErrMessage("")}
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="No. Telepon Pengguna"
                  className="col-span-3"
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
                  placeholder="Email Pengguna"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role">Role Pengguna</Label>
                <Combobox
                  id="role"
                  value={roleIds}
                  onValueChange={setRoleIds}
                  className="w-full col-span-3"
                  multiple
                >
                  <ComboboxAnchor className="h-full min-h-10 flex-wrap px-3 py-2">
                    <ComboboxBadgeList>
                      {roleIds.map((item) => {
                        const option = listRole.find(
                          (role) => role.id === item
                        );
                        if (!option) return null;

                        return (
                          <ComboboxBadgeItem key={item} value={item}>
                            {option.name}
                          </ComboboxBadgeItem>
                        );
                      })}
                    </ComboboxBadgeList>
                    <ComboboxInput
                      placeholder="Pilih role pengguna..."
                      className="h-auto min-w-20 flex-1"
                    />
                    <ComboboxTrigger className="absolute top-3 right-2">
                      <ChevronDown className="h-4 w-4" />
                    </ComboboxTrigger>
                  </ComboboxAnchor>
                  <ComboboxContent>
                    <ComboboxEmpty>Role tidak ditemukan.</ComboboxEmpty>
                    {listRole.map((role) => (
                      <ComboboxItem key={role.id} value={role.id}>
                        {role.name}
                      </ComboboxItem>
                    ))}
                  </ComboboxContent>
                </Combobox>
              </div>
              {!detailUser?.id && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      onChange={(e) => setErrMessage("")}
                      id="password"
                      name="password"
                      placeholder="Password Pengguna"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passwordConf">Konfirmasi Password</Label>
                    <PasswordInput
                      onChange={(e) => setErrMessage("")}
                      id="passwordConf"
                      name="passwordConf"
                      placeholder="Konfirmasi Password Pengguna"
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
              {errMessage !== "" && (
                <div className="p-2 rounded-md text-center border border-destructive-foreground text-destructive">
                  {errMessage}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="secondary" type="submit">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">List Pengguna</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <div className="w-full">
              <div className="flex items-center py-4">
                <Input
                  placeholder="Cari pengguna..."
                  value={table.getColumn("fullName")?.getFilterValue() ?? ""}
                  onChange={(event) =>
                    table
                      .getColumn("fullName")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
                <Button
                  variant="secondary"
                  className="ml-auto"
                  onClick={() => setOpenDialog(true)}
                >
                  Tambah Pengguna
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end mt-4">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                      value={`${table.getState().pagination.pageSize}`}
                      onValueChange={(value) => {
                        table.setPageSize(Number(value));
                      }}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue
                          placeholder={table.getState().pagination.pageSize}
                        />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      className="hidden h-8 w-8 p-0 lg:flex"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <span className="sr-only">Go to first page</span>
                      <ChevronsLeft />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <span className="sr-only">Go to previous page</span>
                      <ChevronLeft />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="sr-only">Go to next page</span>
                      <ChevronRight />
                    </Button>
                    <Button
                      variant="outline"
                      className="hidden h-8 w-8 p-0 lg:flex"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="sr-only">Go to last page</span>
                      <ChevronsRight />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
