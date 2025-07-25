import React, { Suspense } from 'react'
import { AgentIdProps } from '../../types/types';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { AgentIdView, AgentIdViewError, AgentIdViewLoading } from '../views/agent-id-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const AgentPage = async ({ params }: AgentIdProps) => {
    const { agentId } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId })
    )
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentIdViewLoading />}>
                <ErrorBoundary fallback={<AgentIdViewError />}>
                    <AgentIdView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default AgentPage; 
