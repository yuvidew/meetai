import React , { useState } from 'react';
import { StreamTheme , useCall } from '@stream-io/video-react-sdk';
import { CallUiProps } from '../types/type';
import { CallLobby } from './call-lobby';
import { CallActive } from './call-active';
import { CallEnded } from './call-ended';

/**
 * Renders the UI elements for an ongoing call.
 *
 * @param {CallUiProps} props - The props object.
 * @param {string} props.meetingName - The name of the meeting.
 * @returns {JSX.Element} The call UI component.
 */

export const CallUi = ({ meetingName} : CallUiProps) => {
    const call = useCall();
    const [show , setShow] = useState<"lobby" | "call" | "ended">("lobby");

    const handleJoin = async () => {
        if(!call) return ;

        await call.join();

        setShow("call");
    }

    const handleLeave = () => {
        if(!call) return ;

        call.endCall();

        setShow("ended")
    }

    return (
        <StreamTheme className='h-full'>
            {show === "lobby" && <CallLobby onJoin={handleJoin} />}
            {show === "call" && 
                <CallActive 
                    onLeave={handleLeave} 
                    meetingName={meetingName} 
                />
            }
            {show === "ended" && <CallEnded/>}
        </StreamTheme>
    )
}
