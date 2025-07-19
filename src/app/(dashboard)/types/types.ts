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

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]

export type AgentFormProps = {
    onSuccess?: () => void;
    onCancel? : () => void;
    initialValues? : AgentGetOne
}

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

export type AgentIdViewHeaderProps = {
    agentId : string;
    agentName : string;
    onEdit : () => void;
    onRemove : () => void;
}