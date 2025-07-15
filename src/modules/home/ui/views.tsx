"use client"

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import { authClient } from "@/lib/auth-client";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";


export const HomeView = () => {
    const trpc = useTRPC();
    const {data} = useQuery(trpc.hello.queryOptions(({
        text : "Yuvi dew"
    })))
    // const router = useRouter()
    const { data: session } = authClient.useSession();

    if (!session) {
        return (
            <main className=" flex items-center justify-center h-screen">
                <Spinner color="default" size="lg" />
            </main>
        )
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {/* <Button  onClick={() => authClient.signOut({
                fetchOptions: {
                    onSuccess: () => router.push("/sign-in"),
                }
            })}>
                Click Me
            </Button> */}
            {data?.greeting}
        </div>
    );
}
