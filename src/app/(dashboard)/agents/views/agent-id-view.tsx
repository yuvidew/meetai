"use client";
import React from 'react'
import { AgentIdViewProps } from '../../types/types'
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/Error-State';
import { AgentIdViewHeader } from '../_components/agent-id-view-header';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { VideoIcon } from 'lucide-react';

export const AgentIdView = ({agentId} : AgentIdViewProps) => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getOne.queryOptions({id : agentId}))
    return (
        <div className=' flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
            {/* start to header */}
            <AgentIdViewHeader
                agentId={agentId}
                agentName={data.name}
                onEdit={() => {}}
                onRemove={() => {}}
            />
            {/* end to header */}

            {/* start to  */}
            <div className=' bg-white rounded-lg border'>
                <div className=' px-4 py-5 gap-y-5 flex flex-col col-span-5'>
                    <div className=' flex items-center gap-x-3'>
                        <GeneratedAvatar
                            variant="botttsNeutral"
                            seed = {data.name}
                            className='size-10'
                        />

                        <h2 className=' text-2xl font-medium'>{data.name}</h2>
                    </div>
                    <Badge 
                        variant={"outline"}
                        className='flex items-center gap-x-2 [&>svg]:size-4'
                    >
                        <VideoIcon className=' text-blue-700'/>
                        {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings"}
                    </Badge>
                    <div className='flex flex-col gap-y-4'>
                        <p className='text-lg font-medium'>Instructions</p>
                        <p className=' text-neutral-800'>{data.instruction}</p>
                    </div>
                </div>
            </div> 
            {/* end to  */}
        </div>
    )
}

export const AgentIdViewLoading = () => {
    return (
        <Loader />
    )
}

export const AgentIdViewError = () => {
    return (
        <ErrorState
            title="Error loading agents"
            description="Something went wrong"
        />
    )
}