"use client";
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import { DashboardCommand } from './dashboard-command';

export const DashboardNavbar = () => {
    const {state , toggleSidebar , isMobile} = useSidebar();
    const [isOpen , setIsOpen] = useState<boolean>(false);

    useEffect(() => {
    const down = (e: globalThis.KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
        }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
}, []);

    return (
        <>
            {/* start to dashboard command */}
            <DashboardCommand
                open = {isOpen}
                setOpen={setIsOpen}
            />
            {/* end to dashboard command */}
            <header className='flex px-4 gap-x-2 items-center py-2 border-b bg-background'>
                {/* start to sidebar collapse button */}
                <Button 
                    className=' size-9 cursor-pointer' 
                    variant={"outline"}
                    onClick={toggleSidebar}
                >
                    {(state === "collapsed" || isMobile) 
                        ? <PanelLeftIcon className=' size-4' /> 
                        : <PanelLeftCloseIcon className=' size-4' />
                    }
                </Button>
                {/* end to sidebar collapse button */}

                {/* start to search box */}
                <Button
                    className='h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground'
                    variant={"outline"}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <SearchIcon className=' size-4' />
                    Search
                    <kbd className='ml-auto pointer-events-none inline-flex items-center gap-1 rounded border select-none bg-muted px-1.5 font-mono py-0.5 text-[10px] font-medium text-muted-foreground'>
                        <span className='text-xs'>&#8984;</span>K
                    </kbd>
                </Button>
                {/* end to search box */}
            </header>
        </>
    )
}
