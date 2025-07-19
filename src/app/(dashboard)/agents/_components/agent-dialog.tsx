import { ResponsiveDialog } from "@/components/responsive-dialog";
import { NewAgentDialogProps } from "../../types/types";
import { AgentForm } from "./agent-form";

export const AgentListDialog = ({
    open,
    onOpenChange,
}: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="New Agent"
            description="Create a new agent"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm 
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
};
