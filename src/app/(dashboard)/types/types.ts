import { Dispatch, SetStateAction } from "react";
import {inferRouterOutputs} from "@trpc/server";
import type {AppRouter} from "@/trpc/routers/_app"

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