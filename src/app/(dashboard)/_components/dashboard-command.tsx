import React from 'react'
import { CommandDialog, CommandInput , CommandList , CommandItem} from '@/components/ui/command'
import { DashboardCommandProps } from '../types'

export const DashboardCommand = ({
    open,
    setOpen
}: DashboardCommandProps) => {
    return (
        <CommandDialog
            open = {open}
            onOpenChange={setOpen}
        >
            <CommandInput
                placeholder='Find a meeting or agent'
            />

            <CommandList>
                <CommandItem>
                    Text
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}
