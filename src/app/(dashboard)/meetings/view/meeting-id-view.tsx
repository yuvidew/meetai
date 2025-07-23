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
                //TODO: invalidate free tier usage

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