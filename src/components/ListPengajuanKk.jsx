"use client";
import { useState } from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";

export default function ListPengajuanKk({
    listPengajuanKk,
    isLoading,
    addPengajuanKk,
    editPengajuanKk,
    delPengajuanKk,
}) {
    const [openAlert, setOpenAlert] = useState(false);
    const [detailPengajuanKk, setDetailPengajuanKk] = useState({});

    const columns = [
        {
            accessorKey: "nik",
            header: "NIK",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("nik")}</div>
            ),
        },
        {
            id: "action",
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
                    </DropdownMenu>
                )
            }
        },
    ];

    const handleAddPengajuanKk = async (e) => {};

    const handleEditPengajuanKk = async (e) => {};

    const handleDelPengajuanKk = async () => {};

    const handleCloseDialog = () => {
        setDetailPengajuanKk({});
        setOpenAlert(false);
    };

    const table = useReactTable({
        data: listPengajuanKk?.items || [],
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
                        setDetailPengajuanKk({});
                    }
                    setOpenAlert(val);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Apakah Anda yakin akan menghapus akun ini?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    List Pengajuan KK
                </h2>
            </div>
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardContent>
                        <div className="w-full">
                            <div className="flex items-center py-4">
                                <Input
                                    placeholder="Cari pengajuan KK..."
                                    value={table.getColumn("nik")?.getFilterValue() ?? ""}
                                    onChange={(event) =>
                                        table
                                            .getColumn("nik")
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

