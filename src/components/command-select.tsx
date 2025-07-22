import React, { ReactNode, useState } from 'react';

import {
    CommandResponsiveDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from './ui/button';
import { ChevronsUpDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    options: Array<{
        id: string,
        value: string,
        children: ReactNode
    }>;
    onSelect?: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string,
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
}

export const CommandSelect = (
    {  
        options,
        onSearch,
        onSelect,
        value,
        placeholder = "Select an option",
        className
    }:Props
) => {
    const [isOpen , setIsOpen] = useState(false);
    const selectOption = options.find((option) => option.value === value);

    const handleOpenChange = (open : boolean) => {
        onSearch?.("");
        setIsOpen(open)
    }

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                type='button'
                variant={"outline"}
                className={cn(
                    "h-9 justify-between font-normal px-2",
                    !selectOption && "text-muted-foreground",
                    className
                )}
            >
                <div>
                    {selectOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon/>
            </Button>
            <CommandResponsiveDialog
                shouldFilter={!onSearch}
                open ={isOpen}
                onOpenChange={handleOpenChange}
            >
                <CommandInput 
                    placeholder='Search...' 
                    onValueChange={onSearch} 
                />

                <CommandList>
                    <CommandEmpty>
                        <span className='text-muted-foreground text-sm'>
                            No option found
                        </span>
                    </CommandEmpty>
                </CommandList>
                {options.map(({children , id , value}) => (
                    <CommandItem 
                        key={id}
                        onSelect={() => {
                            onSelect?.(value)
                            setIsOpen(false)
                        }}
                    >
                        {children}
                    </CommandItem>
                ))}
            </CommandResponsiveDialog>
        </>
    )
}
