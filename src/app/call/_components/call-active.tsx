import React from 'react'
import { CallActiveProps } from '../types/type'
import {
    CallControls,
    SpeakerLayout
} from '@stream-io/video-react-sdk';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Renders the active call interface with controls and meeting information.
 *
 * @param {CallActiveProps} props - The props object.
 * @param {() => void} props.onLeave - Callback function invoked when the user leaves the call.
 * @param {string} props.meetingName - The name of the meeting.
 * @returns {JSX.Element} The active call UI.
 */

export const CallActive = ({ onLeave, meetingName }: CallActiveProps) => {
    return (
        <div className=' flex flex-col justify-between p-4 h-full text-white'>
            <div className=' bg-[#101213] rounded-full p-4 flex  items-center gap-4' >
                <Link
                    href={"/"}
                    className='flex items-center justify-center p-1 bg-white/10 rounded-full w-fit'
                >
                    <Image
                        src={"/logo.png"}
                        alt='Logo'
                        width={22}
                        height={22}
                    />
                </Link>

                <h4 className=' text-base'>
                    {meetingName}
                </h4>
            </div>

            <SpeakerLayout />
            <div className=' bg-[#101213] rounded-full px-4'>
                <CallControls onLeave={onLeave} />
            </div>
        </div>
    )
}
