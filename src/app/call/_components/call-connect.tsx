"use client"
import React, { useEffect, useState } from 'react'
import { CallConnectProps } from '../types/type'
import {
    Call,
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { CallUi } from './call-ui';

/**
 * Connects the user to a specific meeting session.
 *
 * @param {CallConnectProps} props - The props object.
 * @param {string} props.meetingId - The ID of the meeting.
 * @param {string} props.meetingName - The name of the meeting.
 * @param {string} props.userId - The ID of the user joining the call.
 * @param {string} props.userImage - The user's profile image URL.
 * @param {string} props.userName - The name of the user.
 * @returns {JSX.Element} The call connection interface.
 */

export const CallConnect = ({
    meetingId,
    meetingName,
    userId,
    userImage,
    userName
}: CallConnectProps) => {
    const trpc = useTRPC();
    const { mutateAsync: generateToken } = useMutation(
        trpc.meetings.generatedToken.mutationOptions(),
    );

    const [client, setClient] = useState<StreamVideoClient>();

    useEffect(() => {
        const _client = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
            user: {
                id: userId,
                name: userName,
                image: userImage
            },
            tokenProvider: generateToken
        });

        setClient(_client);

        return () => {
            _client.disconnectUser();
            setClient(undefined)
        }
    }, [userId, userName, userImage, generateToken]);

    const [call, setCall] = useState<Call>();

    useEffect(() => {
        if (!client) return;

        const _call = client.call("default", meetingId);
        _call.camera.disable();
        _call.microphone.disable();

        setCall(_call);

        return () => {
            if (_call.state.callingState !== CallingState.LEFT) {
                _call.leave();
                _call.endCall();
                setCall(undefined);
            }
        }

    }, [client, meetingId])

    if (!call || !client) {
        return (
            <div className='flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar' >
                <LoaderIcon className=' size-6 animate-spin text-white' />
            </div>
        )
    }

    return (
        <StreamVideo client={client}>
            <StreamCall call={call} >
                <CallUi
                    meetingName={meetingName}
                />
            </StreamCall>
        </StreamVideo>
    )
}
