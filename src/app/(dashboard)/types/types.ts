import { Dispatch, SetStateAction } from "react";
import {inferRouterOutputs} from "@trpc/server";
import type {AppRouter} from "@/trpc/routers/_app"
import { SearchParams } from "nuqs";

export type DashboardCommandProps = {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
}

export type NewAgentDialogProps = {
    open : boolean,
    onOpenChange : (open : boolean) => void
}

export type NewMeetingDialogProps = NewAgentDialogProps;

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];
export type AgentsGetMany = inferRouterOutputs<AppRouter>["agents"]["getMany"]["items"];
export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export type MeetingGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];

export enum MeetingStatus {
    Upcoming = "upcoming",
    Active = "active",
    Completed = "completed",
    Processing = "processing",
    Cancelled = "cancelled"
}

export type UpdateAgentDialogProps = {
    open : boolean,
    onOpenChange : (open : boolean) => void,
    initialValues : AgentGetOne;
}

export type UpdateMeetingDialogProps = {
    open : boolean,
    onOpenChange : (open : boolean) => void,
    initialValues : MeetingGetOne;
}
export type AgentFormProps = {
    onSuccess?: () => void;
    onCancel? : () => void;
    initialValues? : AgentGetOne
}

export type MeetingFromProps = {
    onSuccess?: (id? : string) => void;
    onCancel? : () => void;
    initialValues? : MeetingGetOne
};

export type AgentsPageProps = {
    searchParams : Promise<SearchParams>
}

export type DataPaginationProps = {
    page : number;
    totalPages : number;
    onPageChange : (page : number) => void
}

export type AgentIdProps = {
    params : Promise<{agentId : string}>
}

export type AgentIdViewProps = {
    agentId : string
}

export type MeetingIdViewProps =  {
    meetingId : string
}

export type MeetingIdViewHeaderProps = {
    meetingId : string;
    meetingName : string;
    onEdit : () => void;
    onRemove : () => void;
}