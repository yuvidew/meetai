"use client";
import React, { useState } from 'react'
import { MeetingFromProps } from '../../types/types'
import { useTRPC } from '@/trpc/client'
// import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import { meetingsInsertSchema } from '@/modules/meetings/schema';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { CommandSelect } from '@/components/command-select';
import { AgentListDialog } from '../../agents/_components/agent-dialog';

/**
 * Form component to create or update a meeting.
 *
 * @param {Object} props - Props for the MeetingForm component
 * @param {() => void} [props.onCancel] - Optional callback to execute when the user cancels
 * @param {(id? : string) => void} [props.onSuccess] - Optional callback to execute on successful submission
 * @param {{ id?: string; name?: string; agentId?: string }} [props.initialValues] - Initial values to pre-fill the form (used for editing)
 */

export const MeetingForm = ({
    onCancel,
    onSuccess,
    initialValues
}: MeetingFromProps) => {
    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient = useQueryClient();

    const [openNewAgentDialog , setOpenNewAgentDialog] = useState(false);
    const [agentSearch , setAgentSearch] = useState("")
    
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize : 100,
            search : agentSearch
        })
    )

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => { 
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                );

                // TODO: Invalidate free tier usage
                onSuccess?.(data.id)
            },
            onError: (error) => { 
                toast.error(error.message);

                //TODO : check is error code is "FORBIDDEN" , redirect to "/update"
            }
        })
    );

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            agentId: initialValues?.agentId ?? ""
        }
    });

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => { 
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                );

                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({
                            id : initialValues.id
                        })
                    )
                }
                onSuccess?.()
            },
            onError: (error) => { 
                toast.error(error.message);

                //TODO : check is error code is "FORBIDDEN" , redirect to "/update"
            }
        })
    );

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending;


    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({...values , id : initialValues.id});
        } else {
            createMeeting.mutate(values);
        }
    };
    return (
        <>
            <AgentListDialog 
                open = {openNewAgentDialog} 
                onOpenChange={setOpenNewAgentDialog} 
            />
            <Form {...form}>
                <form
                    className=' space-y-4'
                    onSubmit={form.handleSubmit(onSubmit)}
                >

                    {/* start to agent name  */}
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="e.g. Math Consultation"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* end to agent name  */}

                    {/* start to agent id  */}
                    <FormField
                        name="agentId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent</FormLabel>
                                <FormControl>
                                    <CommandSelect
                                        options={(agents.data?.items ?? []).map((agent) => ({
                                            id : agent.id,
                                            value : agent.id,
                                            children : (
                                                <div className=' flex items-center gap-x-2'>
                                                    <GeneratedAvatar
                                                        seed={agent.name}
                                                        variant="botttsNeutral"
                                                        className='border size-6'
                                                    />
                                                    <span>
                                                        {agent.name}
                                                    </span>
                                                </div>
                                            )
                                        }))}
                                        onSelect={field.onChange}
                                        onSearch = {setAgentSearch}
                                        value={field.value}
                                        placeholder="Select an agent"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Not found what you&apos;re looking for {" "}
                                    <button
                                        type='button'
                                        className='text-primary hover:underline'
                                        onClick = {() => setOpenNewAgentDialog(true)}
                                    >
                                        Create new agent
                                    </button>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* end to agent id  */}


                    <div className='flex items-center justify-between gap-x-2'>
                        {onCancel && (
                            <Button
                                variant={"ghost"}
                                disabled={isPending}
                                type='button'
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            disabled={isPending}
                            type='submit'
                        >
                            {isPending ? <Spinner size="sm" color="white" /> : isEdit ? "Update" : "Create"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
