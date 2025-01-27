"use client";
import { useState } from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function ListPengajuanKtp({
    listPengajuanKtp,
    isLoading,
    addPengajuanKtp,
    editPengajuanKtp,
    delPengajuanKtp,
}) {
    const [openAlert, setOpenAlert] = useState(false);
    const [detailPengajuanKtp, setDetailPengajuanKtp] = useState({});

    const columns = [
        {
            accessorKey: "nik",
            header: "NIK",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("nik")}</div>
            ),
        },
        {
            accessorKey: "nama",
            header: "Nama Lengkap",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("nama")}</div>
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
                            <DropdownMenuItem>
                                <Button>
                                    <Eye />
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const handleAddPengajuanKtp = async (e) => {};

    const handleEditPengajuanKtp = async (e) => {};

    const handleDelPengajuanKtp = async () => {};

    const handleCloseDialog = () => {
        setDetailPengajuanKtp({});
        setOpenAlert(false);
    };

    const table = useReactTable({
        data: listPengajuanKtp?.items || [],
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
                        setDetailPengajuanKtp({});
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
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">List Pengajuan KTP</h2>
            </div>
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardContent>
                        <div className="w-full">
                            <div className="flex items-center py-4">
                                <Input
                                    placeholder="Cari pengajuan KTP..."
                                    value={table.getColumn("fullName")?.getFilterValue() ?? ""}
                                    onChange={(event) =>
                                        table
                                            .getColumn("fullName")
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
