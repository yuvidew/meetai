"use client";
import React from 'react';
import { authClient } from '@/lib/auth-client';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
// import Image from 'next/image';

export const DashboardUserButton = () => {
    const router = useRouter();
    const isMobile = useIsMobile()
    const { data, isPending } = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/sign-in"),
            }
        });
    };

    if (!data?.user && isPending) {
        return null;
    }

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className=' rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>
                    {data?.user?.image ? (
                        <Avatar className='mr-3 size-9 rounded-md'>

                            <AvatarImage
                                src={data.user.image}
                                alt={data.user.name}
                                className="size-9 rounded-md "
                            />
                        </Avatar>
                    ) : (
                        <GeneratedAvatar
                            seed={data?.user.name as string || "User"}
                            className="mr-3 size-9 rounded-md"
                            variant="initials"
                        />
                    )}

                    <div className=' flex flex-col gap-0.5  text-left overflow-hidden flex-1 min-w-0'>
                        <p className=' text-sm truncate w-full '>
                            {data?.user.name}
                        </p>
                        <p className='text-xs truncate w-full'>
                            {data?.user.email}
                        </p>
                    </div>
                    <ChevronDownIcon className=' size-4 shrink-0' />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader className=' flex flex-col items-start'>
                        <DrawerTitle>
                            {data?.user.name}
                        </DrawerTitle>
                        <DrawerDescription>
                            {data?.user.email}
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                            variant={"outline"}
                            onClick={() => {}}
                        >
                            <CreditCardIcon className=' size-4 text-black'/>
                            Billing
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={onLogout}
                        >
                            <LogOutIcon className=' size-4 text-red-500'/>
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className=' rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden' >
                {data?.user?.image ? (
                    <Avatar className='mr-3 size-9 rounded-md'>

                        <AvatarImage
                            src={data.user.image}
                            alt={data.user.name}
                            className="size-9 rounded-md "
                        />
                    </Avatar>
                ) : (
                    <GeneratedAvatar
                        seed={data?.user.name as string || "User"}
                        className="mr-3 size-9 rounded-md"
                        variant="initials"
                    />
                )}

                <div className=' flex flex-col gap-0.5  text-left overflow-hidden flex-1 min-w-0'>
                    <p className=' text-sm truncate w-full '>
                        {data?.user.name}
                    </p>
                    <p className='text-xs truncate w-full'>
                        {data?.user.email}
                    </p>
                </div>
                <ChevronDownIcon className=' size-4 shrink-0' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side="right" className='w-72'>
                <DropdownMenuLabel>
                    <div className=' flex flex-col gap-1'>
                        <p className='truncate font-medium'>{data?.user.name}</p>
                        <p className='text-sm font-normal text-muted-foreground truncate'>{data?.user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className=' flex items-center gap-1 cursor-pointer justify-between'>Billing <CreditCardIcon className='size-4' /></DropdownMenuItem>
                <DropdownMenuItem
                    className=' flex items-center gap-1 cursor-pointer justify-between'
                    onClick={onLogout}
                >
                    Logout <LogOutIcon className='size-4 text-red-500' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
