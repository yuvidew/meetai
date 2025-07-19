import { ResponsiveDialog } from '@/components/responsive-dialog';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { JSX, useState } from 'react';
import React from 'react';

export const useConfirm = (
    title: string,
    description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const [loading, setLoading] = useState(false);

    const confirm = () => {
        setLoading(false);
        return new Promise((resolve) => {
            setPromise({ resolve });
        });
    };

    const onClose = () => {
        setLoading(false);
        setPromise(null);
    };

    const onConfirm = () => {
        setLoading(true);
        // Delay resolving slightly to allow UI to show spinner
        setTimeout(() => {
            promise?.resolve(true);
            onClose();
        }, 300);
    };

    const onCancel = () => {
        promise?.resolve(false);
        onClose();
    };

    const ConfirmationDialog = () => (
        <ResponsiveDialog
            open={promise !== null}
            onOpenChange={onClose}
            title={title}
            description={description}
        >
            <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                <Button
                    onClick={onCancel}
                    variant={'outline'}
                    className="w-full lg:w-auto"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant={'destructive'}
                    className="w-full lg:w-auto"
                    disabled={loading}
                >
                    {loading ? <Spinner color='white' size='sm' /> : 'Confirm'}
                </Button>
            </div>
        </ResponsiveDialog>
    );

    return [ConfirmationDialog, confirm];
};
