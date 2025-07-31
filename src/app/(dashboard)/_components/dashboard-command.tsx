import React, { useState } from 'react'
import { CommandResponsiveDialog, CommandInput, CommandList, CommandItem, CommandGroup, CommandEmpty } from '@/components/ui/command'
import { DashboardCommandProps } from '../types/types'
import { useRouter } from 'next/navigation'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { GeneratedAvatar } from '@/components/generated-avatar'
/**
 * DashboardCommand component renders a searchable command dialog for the dashboard.
 *
 * @param {DashboardCommandProps} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {(open: boolean) => void} props.setOpen - Function to set the dialog open state
 */
export const DashboardCommand = ({
    open,
    setOpen
}: DashboardCommandProps) => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const trpc = useTRPC();

    const meetings = useQuery(
        trpc.meetings.getMany.queryOptions({
            search,
            pageSize: 100,
        })
    );

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            search,
            pageSize: 100
        })
    );
    return (
        <CommandResponsiveDialog
            open={open}
            onOpenChange={setOpen}
            shouldFilter={false}
        >
            <CommandInput
                placeholder='Find a meeting or agent...'
                value={search}
                onValueChange={(value) => setSearch(value)}
            />

            <CommandList>
                <CommandGroup heading="Meetings" >
                    <CommandEmpty>
                        <span className=' text-muted-foreground text-sm'>
                            No meetings found
                        </span>
                    </CommandEmpty>
                    {meetings.data?.items.map((meeting) => (
                        <CommandItem
                            key={meeting.id}
                            onSelect={() => {
                                router.push(`/meetings/${meeting.id}`);
                                setOpen(false);
                            }}
                        >
                            {meeting.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Agents" >
                    <CommandEmpty>
                        <span className=' text-muted-foreground text-sm'>
                            No agents found
                        </span>
                    </CommandEmpty>
                    {agents.data?.items.map((agent) => (
                        <CommandItem
                            key={agent.id}
                            onSelect={() => {
                                router.push(`/agents/${agent.id}`);
                                setOpen(false);
                            }}
                        >
                            <GeneratedAvatar
                                seed={agent.name}
                                variant="botttsNeutral"
                                className=' size-5'
                            />
                            {agent.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandResponsiveDialog>
    )
}
