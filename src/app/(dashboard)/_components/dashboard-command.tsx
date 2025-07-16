import React from 'react'
import { CommandResponsiveDialog, CommandInput , CommandList , CommandItem} from '@/components/ui/command'
import { DashboardCommandProps } from '../types/types'

export const DashboardCommand = ({
    open,
    setOpen
}: DashboardCommandProps) => {
    return (
        <CommandResponsiveDialog
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
        </CommandResponsiveDialog>
    )
}
