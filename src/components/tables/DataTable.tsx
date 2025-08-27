"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Input from "../form/Input"
import { Button } from "../ui/button"
import { ChevronDown, Search } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import Typography from "../Typography"
import { FormProvider, useForm } from "react-hook-form"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchColumns?: boolean;
    searchNameColumn?: string;
    filterColumns?: boolean;
    page?: number;
    setPage?: (page: number) => void;
    totalPages?: number;
    isLoading: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchColumns = false,
    searchNameColumn,
    filterColumns = false,
    page,
    setPage,
    totalPages,
    isLoading,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [selectedFilter, setSelectedFilter] = React.useState("Filter by status");

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    const statusColumn = filterColumns ? table.getColumn("status") : undefined;
    const uniqueStatusValues = statusColumn
        ? Array.from(new Set(data.map((row) => (row as { status?: string }).status).filter(Boolean)))
        : [];

    const methods = useForm();

    return (
        <div className="w-full">
            <div className="flex flex-col w-full lg:w-fit md:flex-row mb-6 gap-3">
                {searchColumns && (
                    isLoading ? (
                        <Skeleton className="h-10 w-full md:w-[180px] rounded-md" />
                    ) : (
                        <div className="relative">
                            <FormProvider {...methods}>
                                <form>
                                    <Input
                                        id="search"
                                        placeholder="Cari nama"

                                        value={(searchNameColumn && table.getColumn(searchNameColumn)?.getFilterValue() as string) ?? ""}
                                        onChange={(event) => {
                                            if (searchNameColumn) {
                                                const searchColumn = table.getColumn(searchNameColumn);
                                                if (searchColumn) {
                                                    searchColumn.setFilterValue(event.target.value);
                                                }
                                            }
                                        }}
                                        className="pl-12 py-2 h-full"
                                    />
                                </form>
                            </FormProvider>
                            <Search className="absolute left-3 w-5 h-5 top-1/2 transform -translate-y-1/2" />
                        </div>
                    ))}

                {filterColumns && (
                    isLoading ? (
                        <Skeleton className="h-10 w-full md:w-[180px] rounded-md" />

                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="flex h-full justify-between">
                                <Button variant="disabled-outline">
                                    {selectedFilter} <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-h-[200px] overflow-y-auto min-w-[var(--radix-dropdown-menu-trigger-width)]">
                                {uniqueStatusValues.map((status) => (
                                    <DropdownMenuCheckboxItem
                                        key={status}
                                        checked={table.getColumn("status")?.getFilterValue() === status}
                                        onCheckedChange={(checked) => {
                                            table.getColumn("status")?.setFilterValue(checked ? status : undefined);
                                            setSelectedFilter(checked ? `${status}` : "Filter by status");
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {status}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
            </div>

            <Table className="border-1 border-typo-outline-2 rounded-xl overflow-clip min-w-[1200px] md:min-w-full">
                <TableHeader>
                    {isLoading ? (
                        <TableRow className="animate-pulse">
                            {columns.map((col, colIndex) => (
                                <TableHead key={colIndex} className="text-center bg-input border-b border-input">
                                    <Skeleton className="h-6 w-24 rounded-md justify-self-center" />
                                </TableHead>
                            ))}
                        </TableRow>
                    ) : (
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-center bg-input text-typo-white border-b border-input"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        // Skeleton Loading
                        [...Array(10)].map((_, index) => (
                            <TableRow key={index} className="animate-pulse">
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex} className="text-center border-b border-input">
                                        <Skeleton className="h-6 w-full rounded-md" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : table.getRowModel().rows.length > 0 ? (
                        // Tampilkan Data
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-center font-medium border-b border-input">
                                        {[
                                            "Management",
                                            "Dosen",
                                            "Pemonev",
                                            "Ditolak",
                                            "Diterima",
                                            "Belum Diverifikasi"
                                        ].includes(cell.getValue() as string) ? (
                                            <div
                                                className={`justify-self-center py-1 w-[102px] rounded-lg ${{
                                                    Management: "bg-green-100 text-info-main-normal",
                                                    Dosen: "bg-yellow-100 text-info-main-normal",
                                                    Pemonev: "bg-red-100 text-warning-main-normal",
                                                    Diterima: "bg-green-100 text-green-500",
                                                    "Belum Diverifikasi": "bg-yellow-100 text-yellow-500 w-fit px-3",
                                                    Ditolak: "bg-red-100 text-destructive",
                                                }[cell.getValue() as string] || ""
                                                    }`}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        ) : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        // Jika tidak ada hasil
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                <div className="w-full flex flex-col justify-center items-center p-8">
                                    <Typography
                                        variant="t1"
                                        weight="semibold"
                                        className="text-foreground"
                                    >
                                        Data Tidak Ada
                                    </Typography>

                                    <Typography
                                        variant="l2"
                                        weight="medium"
                                        className="md:text-md text-muted-foreground"
                                    >
                                        Belum melakukan pengajuan
                                    </Typography>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>

            {!isLoading && totalPages !== undefined && totalPages > 1 && (
                <div className="space-x-2 py-4">
                    <Pagination className="flex justify-end">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => setPage && page && setPage(page - 1)}
                                    disabled={page === 1}
                                />
                            </PaginationItem>

                            {page && table.getRowModel().rows.length > 0 && (() => {
                                let pagesToShow = [];
                                if (totalPages <= 5) {
                                    pagesToShow = [...Array(totalPages).keys()].map((p) => p + 1);
                                } else if (page <= 2) {
                                    pagesToShow = [1, 2, "...", totalPages];
                                } else if (page >= totalPages - 1) {
                                    pagesToShow = [1, "...", page, "...", totalPages];
                                } else {
                                    pagesToShow = [1, "...", page - 1, page, page + 1, "...", totalPages];
                                }

                                return pagesToShow.map((p, index) => (
                                    <PaginationItem key={index}>
                                        {typeof p === "number" ? (
                                            <PaginationLink
                                                href="#"
                                                onClick={() => setPage && setPage(p)}
                                                className={page === p ? "bg-success-main-normal text-white" : ""}
                                            >
                                                {p}
                                            </PaginationLink>
                                        ) : (
                                            <PaginationEllipsis />
                                        )}
                                    </PaginationItem>
                                ));
                            })()}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => setPage && page && setPage(page + 1)}
                                    disabled={page === totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div >
    )
}
