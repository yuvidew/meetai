"use client";

import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/Error-State';
import { columns } from '../_components/columns';
import { EmptyState } from '@/components/empty-state';
import { useAgentsFilters } from '../hooks/use-agents-filter';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { DataPagination } from '@/components/data-pagination';

export const AgentsView = () => {
    const router = useRouter();
    const [filters, setFilters] = useAgentsFilters();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }));



    return (
        <div className=' flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
            {/* start to agent table */}
            <DataTable
                data={data.items}
                columns={columns}
                onRowClick={(row) => router.push(`/agents/${row.id}`)}
            />
            {/* end to agent table */}

            {/* start to table pagination */}
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {/* end to table pagination */}
            
            {/* start to empty state */}
            {data.items.length === 0 &&
                <EmptyState
                    title='Create your first agent'
                    description='Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.'
                />
            }
            {/* end to empty state */}
        </div>
    )
}

export const AgentViewLoading = () => {
    return (
        <Loader />
    )
}

export const AgentViewError = () => {
    return (
        <ErrorState
            title="Error loading agents"
            description="Something went wrong"
        />
    )
}
