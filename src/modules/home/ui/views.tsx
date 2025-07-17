"use client"


import { Loader } from "@/components/Loader";
import { authClient } from "@/lib/auth-client";


export const HomeView = () => {
    // const router = useRouter()
    const { data: session } = authClient.useSession();

    if (!session) {
        return (
            <Loader/>
        )
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            Home View
        </div>
    );
}
