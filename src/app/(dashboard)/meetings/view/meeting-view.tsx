"use client";

import { DataTable } from '@/components/data-table';
import { ErrorState } from '@/components/Error-State';
import { Loader } from '@/components/Loader';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columns } from '../_components/columns';
import { EmptyState } from '@/components/empty-state';
import { useRouter } from 'next/navigation';
import { useMeetingsFilters } from '../hooks/use-meetings-filter';
import { DataPagination } from '@/components/data-pagination';

export const MeetingView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useMeetingsFilters();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ ...filters }));
    return (
        <div className=' flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
            {/* start to meeting table */}
            <DataTable
                data={data.items}
                columns={columns}
                onRowClick={(row) => router.push(`/meetings/${row.id}`)}
            />
            {/* end to meeting table */}

            {/* start to meeting pagination */}
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {/* end to meeting pagination */}

            {/* start to empty state */}
            {data.items.length === 0 &&
                <EmptyState
                    title='Create your first meeting'
                    description='Schedule a meeting to connect with. Each meeting lets you collaborate, share ideas, abd interact with participants is real time.'
                />
            }
            {/* end to empty state */}
        </div>
    )
}

export const MeetingViewLoading = () => {
    return (
        <Loader />
    )
}

export const MeetingViewError = () => {
    return (
        <ErrorState
            title="Error loading meetings"
            description="Something went wrong"
        />
    )
}