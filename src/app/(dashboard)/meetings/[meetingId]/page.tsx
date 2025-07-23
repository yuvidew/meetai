import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { MeetingIdView, MeetingIdViewError, MeetingIdViewLoading } from '../view/meeting-id-view';

interface Props {
    params: Promise<{
        meetingId: string
    }>
}

const MeetingIdPage = async ({ params }: Props) => {
    const { meetingId } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )

    // TODO : Prefetch meetings.getTranscript

    return (
        <HydrationBoundary
            state={dehydrate(queryClient)}
        >
            <Suspense fallback = {<MeetingIdViewLoading/>} >
                <ErrorBoundary fallback = {<MeetingIdViewError/>} >
                    <MeetingIdView 
                        meetingId={meetingId}
                    />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default MeetingIdPage