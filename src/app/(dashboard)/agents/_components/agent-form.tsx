"use client";
import React from 'react'
import { AgentFormProps } from '../../types/types'
import { useTRPC } from '@/trpc/client'
// import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { agentsInsertSchema } from '@/modules/agents/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';

/**
 * AgentForm component for creating or editing an agent.
 *
 * @param {Object} props - Component props
 * @param {() => void} [props.onCancel] - Optional callback when cancel button is clicked
 * @param {() => void} [props.onSuccess] - Optional callback after successful submission
 * @param {{ id?: string, name?: string, instruction?: string }} [props.initialValues] - Optional initial values for editing
 */

export const AgentForm = ({
    onCancel,
    onSuccess,
    initialValues
}: AgentFormProps) => {
    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => { 
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                );

                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({
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

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instruction: initialValues?.instruction ?? ""
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            // TODO : update the agent
            console.log("Todo : update the agent");
        } else {
            createAgent.mutate(values)
        }
    };
    return (
        <Form {...form}>
            <form
                className=' space-y-4'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* start generated avatar comp */}
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant="botttsNeutral"
                    className='border size-16 rounded-full'
                />
                {/* end generated avatar comp */}

                {/* start to agent name  */}
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    // id="name"
                                    // type="text"
                                    // value={field.value}
                                    // onChange={field.onChange}
                                    // required
                                    {...field}
                                    placeholder="e.g. Math tutor"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* end to agent name  */}

                {/* start to agent instruction  */}
                <FormField
                    name="instruction"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instruction</FormLabel>
                            <FormControl>
                                <Textarea
                                    // id="name"
                                    // type="text"
                                    // value={field.value}
                                    // onChange={field.onChange}
                                    // required
                                    {...field}
                                    placeholder="You are a helpful math assistant that can answer questions and help with assignments."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* end to agent instruction  */}

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
    )
}
