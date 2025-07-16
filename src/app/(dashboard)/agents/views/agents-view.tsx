"use client";

import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/Error-State';

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());


    return (
        <div>{JSON.stringify(data, null, 2)}</div>
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
