import React, { Suspense } from 'react'
import { AgentsView, AgentViewError, AgentViewLoading } from './views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from "react-error-boundary"
import { AgentsListHeader } from './_components/agents-list-header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';


const AgentsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in");
    }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());


    return (
        <>
            {/* start to list headers */}
            <AgentsListHeader />
            {/* end to list headers */}
            <HydrationBoundary state={dehydrate(queryClient)} >
                <Suspense
                    fallback={<AgentViewLoading />}
                >
                    <ErrorBoundary fallback={<AgentViewError />} >
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default AgentsPage
