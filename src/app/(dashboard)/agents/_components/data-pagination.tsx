import React from "react";
import { DataPaginationProps } from "../../types/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination component for navigating between pages of data.
 *
 * @param {Object} props - Component props
 * @param {number} props.page - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {(page: number) => void} props.onPageChange - Callback to handle page change
 */
export const DataPagination = ({
    page,
    totalPages,
    onPageChange,
}: DataPaginationProps) => {
    return ( 
        <div className=" flex items-center justify-between">
            <div className=" flex-1 text-sm text-muted-foreground">
                page {page} of {totalPages || 1}
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    disabled={page === 1}
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => onPageChange(Math.max(1 , page - 1))}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    disabled={page === totalPages || totalPages === 0}
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => onPageChange(Math.max(totalPages , page + 1))}
                >
                    <ChevronRight/>
                </Button>
            </div>
        </div>
    );
};
