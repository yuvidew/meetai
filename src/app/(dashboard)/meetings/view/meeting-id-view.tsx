"use client"

import React, { useState } from 'react';
import { ErrorState } from '@/components/Error-State'
import { Loader } from '@/components/Loader'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MeetingIdViewProps } from '../../types/types'
import { MeetingIdViewHeader } from '../_components/meeting-id-view-header'
import { toast } from 'sonner'
import { useConfirm } from '@/hooks/use-confirm'
import { UpdateMeetingDialog } from '../_components/update-meeting-dialog'
import { UpcomingState } from '../_components/upcoming-state';
import { ProcessingState } from '../_components/processing-state';
import { CancelledState } from '../_components/cancelled-state';
import { ActiveState } from '../_components/active-state';
import { CompletedState } from '../_components/completed-state';

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [updateMeetingsDialogOpen , setUpdateMeetingsDialogOpen] = useState(false)
    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you Sure?",
        "The following action will remove this meeting"
    );
    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    );

    const onRemoveMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                
                await queryClient.invalidateQueries(
                    trpc.premium.getFreeUsage.queryOptions()
                );

                router.push("/meetings");
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    );

    const onHandleRemoveMeeting = async () => {
        const ok = await confirmRemove();

        if(!ok) return ;

        await onRemoveMeeting.mutate({id : meetingId})
    }

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCancelled = data.status === "cancelled";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog
                open = {updateMeetingsDialogOpen}
                onOpenChange={setUpdateMeetingsDialogOpen}
                initialValues={data}
            />
            <div
                className=' flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'
            >
                {/* start to meeting id header */}
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingsDialogOpen(true)}
                    onRemove={onHandleRemoveMeeting}
                />
                {/* end to meeting id header */}

                {/* start to status component */}
                {isUpcoming && 
                    (
                        <UpcomingState
                            meetingId={meetingId}
                        />
                    )
                }
                {isActive && (
                    <ActiveState meetingId={meetingId} />
                )}
                {isProcessing && <ProcessingState/>}
                {isCancelled && <CancelledState/>}
                {isCompleted && <CompletedState data = {data} />}
                {/* end to status component */}
            </div>
        </>
    )
}

export const MeetingIdViewLoading = () => {
    return (
        <Loader />
    )
}

export const MeetingIdViewError = () => {
    return (
        <ErrorState
            title="Error loading meeting"
            description="Something went wrong"
        />
    )
}