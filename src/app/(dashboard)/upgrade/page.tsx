import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { UpgradeView, UpgradeViewError, UpgradeViewLoading } from './views/upgrade-view';

const UpgradePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.premium.getCurrentSubscription.queryOptions(),
    );

    void queryClient.prefetchQuery(
        trpc.premium.getProducts.queryOptions()
    )

    return (
        <HydrationBoundary
            state = {dehydrate(queryClient)}
        >
            <Suspense
                fallback = {<UpgradeViewLoading/>}
            >
                <ErrorBoundary
                    fallback = {<UpgradeViewError/>}
                >
                    <UpgradeView/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
}

export default UpgradePage;
