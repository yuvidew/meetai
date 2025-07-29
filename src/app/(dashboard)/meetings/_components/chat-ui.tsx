// import { StreamClient } from '@stream-io/node-sdk';
import type { Channel as StreamClient } from "stream-chat";
import {
    useCreateChatClient,
    Chat,
    Channel,
    MessageInput,
    MessageList,
    Thread,
    Window
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css"
import { ChatUIProps } from "../../types/types";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";


export const ChatUI = ({ 
    meetingId,
    meetingName,
    userId,
    userName,
    userImage
}: ChatUIProps) => {
    const trpc = useTRPC();
    const {mutateAsync : generateChatToken} = useMutation(
        trpc.meetings.generateChatToken.mutationOptions()
    );

    const [channel , setChannel] = useState<StreamClient>();

    const client = useCreateChatClient({
        apiKey : process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
        tokenOrProvider : generateChatToken,
        userData : {
            id : userId,
            name : userName,
            image : userImage
        }
    })

    useEffect(() => {
        if(!client) return;

        const channel = client.channel("messaging" , meetingId , {
            members : [userId]
        })

        setChannel(channel)

    } , [client , meetingId , meetingName , userId]);

    if(!client){
        return <Loader/>
    }

    return (
        <div className=" bg-white rounded-lg border overflow-hidden">
            <Chat client={client}>
                <Channel channel={channel} >
                    <Window>
                        <div className=" flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
                            <MessageList/>
                        </div>
                        <MessageInput/>
                    </Window>
                    <Thread/>
                </Channel>
            </Chat>
        </div>
    )
}
