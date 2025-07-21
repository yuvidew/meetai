"use client";

import { DataTable } from '@/components/data-table';
import { ErrorState } from '@/components/Error-State';
import { Loader } from '@/components/Loader';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columns } from '../_components/columns';
import { EmptyState } from '@/components/empty-state';

export const MeetingView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div className=' flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
            <DataTable
                data={data.items}
                columns={columns}
            />

            {data.items.length === 0 &&
                <EmptyState
                    title='Create your first meeting'
                    description='Schedule a meeting to connect with. Each meeting lets you collaborate, share ideas, abd interact with participants is real time.'
                />
            }
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