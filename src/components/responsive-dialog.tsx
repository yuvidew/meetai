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
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    // DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

interface ResponsiveDialogProps {
    title: string,
    description: string,
    children: ReactNode,
    open: boolean,
    onOpenChange: (open: boolean) => void;
}

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
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
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
