"use client";

import { Loader } from "@/components/Loader";
import { authClient } from "@/lib/auth-client";
import { ChatUI } from "./chat-ui";

export const ChatProvider = ({
    meetingId,
    meetingName
}: {
    meetingId: string,
    meetingName: string
}) => {
    const { data, isPending } = authClient.useSession();

    if (isPending || !data?.user) {
        return (
            <Loader />
        )
    }

    return (
        <ChatUI
            meetingId={meetingId}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            userImage={data.user.image ?? ""}
        />
    )
}
