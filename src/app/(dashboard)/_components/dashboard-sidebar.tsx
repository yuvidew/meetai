"use client";
import React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { DashboardUserButton } from './dashboard-user-button';

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    }
]

export const DashboardSidebar = () => {
    const pathname = usePathname()

    return (
        <Sidebar>
            {/* start header */}
            <SidebarHeader className=' text-sidebar-accent-foreground'>
                <Link href={"/"} className=' flex items-center gap-2 px-2 pt-2'>
                    <Image src="/logo.png" alt="meet.ai" width={30} height={30} />
                    <p className=' text-xl font-semibold'>meet.ai</p>
                </Link>
            </SidebarHeader>
            {/* end header */}

            {/* start separator */}
            <div className="px-4 py-2">
                <Separator className=' opacity-10 text-[#5d6b68]' />
            </div>
            {/* end separator */}

            {/* start sidebar content */}
            <SidebarContent>
                {/* start first section */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.label} >
                                    <SidebarMenuButton
                                        asChild
                                    className={cn(" h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        pathname === item.href && "bg-linear-to-r/oklch border-[#5d6b68]/10")}
                                    isActive={pathname === item.href}
                                >
                                    <Link href={item.href} className='flex items-center gap-2'>
                                        <item.icon className=' size-5' />
                                        <span className=' text-sm font-medium tracking-tight'>
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* end first section */}

                {/* start separator */}
                <div className="px-4 py-2">
                    <Separator className=' opacity-10 text-[#5d6b68]' />
                </div>
                {/* end separator */}

                {/* start second section */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.label} >
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(" h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                            pathname === item.href && "bg-linear-to-r/oklch border-[#5d6b68]/10")}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href} className='flex items-center gap-2'>
                                            <item.icon className=' size-5' />
                                            <span className=' text-sm font-medium tracking-tight'>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* end second section */}
            </SidebarContent>
            {/* end sidebar content */}

            {/* start footer */}
            <SidebarFooter className=' text-white'>
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}
