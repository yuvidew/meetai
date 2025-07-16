import React, { Suspense } from 'react'
import { AgentsView, AgentViewError, AgentViewLoading } from './views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import {ErrorBoundary} from "react-error-boundary"


const AgentsPage = async() => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());


    return (
        <HydrationBoundary state={dehydrate(queryClient)} >
            <Suspense 
                fallback = {<AgentViewLoading/>}
            >
                <ErrorBoundary fallback = {<AgentViewError/>} >
                    <AgentsView/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default AgentsPage
