"use client";

import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    // DrawerTrigger,
} from "@/components/ui/drawer";

interface ResponsiveDialogProps {
    title: string,
    description: string,
    children: ReactNode,
    open: boolean,
    onOpenChange: (open: boolean) => void;
}

/**
 * ResponsiveDialog component displays either a Dialog (desktop) or Drawer (mobile)
 * based on screen size. Useful for creating a consistent UX on all devices.
 *
 * @param {ResponsiveDialogProps} props - Component props
 * @param {string} props.title - The title displayed at the top of the dialog/drawer
 * @param {string} props.description - The description below the title
 * @param {ReactNode} props.children - The content to render inside the dialog/drawer
 * @param {boolean} props.open - Whether the dialog/drawer is open
 * @param {(open: boolean) => void} props.onOpenChange - Function to handle open/close state changes
 */

export const ResponsiveDialog = ({
    title,
    description,
    children,
    open,
    onOpenChange
}: ResponsiveDialogProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open = {open} onOpenChange={onOpenChange}>
                {/* <DrawerTrigger>Open</DrawerTrigger> */}
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">{children}</div>
                    
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open = {open} onOpenChange={onOpenChange} >
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
