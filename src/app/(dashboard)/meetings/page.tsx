import React, { Suspense } from 'react'
import { MeetingView, MeetingViewError, MeetingViewLoading } from './view/meeting-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const MeetingPage = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    );

    return (
        <HydrationBoundary state = {dehydrate(queryClient)}>
            <Suspense fallback = {<MeetingViewLoading/>}>
            <ErrorBoundary fallback = {<MeetingViewError/>}>
                <MeetingView/>
            </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default MeetingPage