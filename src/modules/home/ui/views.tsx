"use client"
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export const HomeView = () => {
    const router = useRouter()
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
            <Button  onClick={() => authClient.signOut({
                fetchOptions: {
                    onSuccess: () => router.push("/sign-in"),
                }
            })}>
                Click Me
            </Button>
        </div>
    );
}
