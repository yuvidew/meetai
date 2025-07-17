import React from 'react'
import { CommandResponsiveDialog, CommandInput , CommandList , CommandItem} from '@/components/ui/command'
import { DashboardCommandProps } from '../types/types'
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
