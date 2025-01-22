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
  DialogTrigger,
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
  ComboboxLabel,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import LoadingScreen from "@/components/shared/loadingScreen";
import { cl } from "@/lib/logger";

export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
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
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ubah Pengguna</DropdownMenuItem>
            <DropdownMenuItem>Hapus Pengguna</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ListPenggunaComponent({
  listUser,
  listRole,
  isLoading,
  addUser,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [roles, setRoles] = useState([]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { fullName, email, password, passwordConf } =
      Object.fromEntries(formData);
    cl(fullName);
    cl(email);
    cl(password);
    cl(passwordConf);
    setErrMessage("test");

    // try {
    //   const { data } = await post("user-management/authentication/signin", {
    //     email,
    //     password,
    //   });
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    //   setErrMessage(error?.message);
    // }
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
                <Dialog
                  open={openDialog}
                  onOpenChange={(val) => {
                    if (val) {
                      setRoles([]);
                      setErrMessage("");
                    }
                    setOpenDialog(val);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="ml-auto">
                      Tambah Pengguna
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Tambah Pengguna</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Masukkan data pengguna baru. Klik simpan ketika sudah
                      selesai.
                    </DialogDescription>
                    <form onSubmit={handleAddUser}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="fullName">Nama Lengkap</Label>
                          <Input
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
                            value={roles}
                            onValueChange={setRoles}
                            className="w-full col-span-3"
                            multiple
                          >
                            <ComboboxAnchor className="h-full min-h-10 flex-wrap px-3 py-2">
                              <ComboboxBadgeList>
                                {roles.map((item) => {
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
                              <ComboboxEmpty>
                                Role tidak ditemukan.
                              </ComboboxEmpty>
                              {listRole.map((role) => (
                                <ComboboxItem key={role.id} value={role.id}>
                                  {role.name}
                                </ComboboxItem>
                              ))}
                            </ComboboxContent>
                          </Combobox>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password Pengguna"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="passwordConf">
                            Konfirmasi Password
                          </Label>
                          <Input
                            type="password"
                            id="passwordConf"
                            name="passwordConf"
                            placeholder="Konfirmasi Password Pengguna"
                            className="col-span-3"
                          />
                        </div>
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
