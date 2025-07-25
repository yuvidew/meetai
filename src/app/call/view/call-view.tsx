"use client";

import { ErrorState } from '@/components/Error-State';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { CallProvider } from '../_components/call-provider';

interface Props {
    meetingId : string;
}

/**
 * Renders the call view for a meeting.
 *
 * @param {Props} props - The props object.
 * @param {string} props.meetingId - The ID of the meeting to fetch and display.
 * @returns {JSX.Element} The rendered call view component or an error message if the meeting has ended.
 */

export const CallView = ({meetingId} : Props) => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id : meetingId})
    );

    if(data.status === "completed"){
        return (
            <div className=' flex h-screen items-center justify-center'>
                <ErrorState 
                    title='Meeting has ended'
                    description='You can no longer join this meeting'
                />
            </div>
        )
    }

    return <CallProvider meetingId={meetingId} meetingName={data.name} />
}
