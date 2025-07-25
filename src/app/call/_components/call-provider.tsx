import { authClient } from '@/lib/auth-client';
import { LoaderIcon } from 'lucide-react';
import React from 'react'
import { CallProviderProps } from '../types/type';
import { CallConnect } from './call-connect';
import { generateAvatarUrl } from '@/lib/avatar';

/**
 * Renders the call provider UI for a meeting. 
 * Shows a loading spinner while the session is pending or unauthenticated.
 *
 * @param {CallProviderProps} props - The props object.
 * @param {string} props.meetingId - The ID of the meeting.
 * @param {string} props.meetingName - The name of the meeting.
 * @returns {JSX.Element} The meeting view or loading state.
 */

export const CallProvider =  ({meetingId , meetingName} : CallProviderProps) => {
    const {data , isPending} = authClient.useSession();


    if(!data || isPending){
        return (
            <div className='flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar' >
                <LoaderIcon className=' size-6 animate-spin text-white' />
            </div>
        )
    }

    return (
        <CallConnect
            meetingId={meetingId}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            userImage={
                data.user.image ?? 
                generateAvatarUrl(
                    {seed : data.user.name , variant : "initials"}
                )
            }
        />
    )
}
