"use client";

import { ErrorState } from '@/components/Error-State';
import { Loader } from '@/components/Loader';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

export const MeetingView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div>
            {JSON.stringify(data?.items)}
            TODO :add the data
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