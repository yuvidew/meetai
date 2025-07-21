"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    onRowClick? : (row : TData) => void;
}

/**
 * DataTable component
 *
 * @template TData - The type of each row's data
 * @template TValue - The type of each cell's value
 *
 * @param {Object} props - Component props
 * @param {ColumnDef<TData, TValue>[]} props.columns - Table column definitions
 * @param {TData[]} props.data - Data to display in the table
 * @param {(row: TData) => void} [props.onRowClick] - Optional callback when a row is clicked
 */

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-lg bg-background overflow-hidden border">
            <Table>
                {/* <TableHeader>
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
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader> */}
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                onClick={() => onRowClick?.(row.original)}
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className=" cursor-pointer "
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className=" text-sm p-4">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-19 text-center text-muted-foreground">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}