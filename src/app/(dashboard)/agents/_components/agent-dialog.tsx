import { ResponsiveDialog } from "@/components/responsive-dialog";
import { NewAgentDialogProps } from "../../types/types";
import { AgentForm } from "./agent-form";

/**
 * Dialog component to create a new agent.
 *
 * @param {Object} props - Props for the AgentListDialog component
 * @param {boolean} props.open - Whether the dialog is open
 * @param {(open: boolean) => void} props.onOpenChange - Callback to handle opening/closing the dialog
 */

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
