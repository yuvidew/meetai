import { ResponsiveDialog } from "@/components/responsive-dialog";
import { UpdateMeetingDialogProps } from "../../types/types";
import { MeetingForm } from "./meeting-form";

export const UpdateMeetingDialog = ({
    open,
    onOpenChange,
    initialValues
}: UpdateMeetingDialogProps) => {
    return (
        <ResponsiveDialog
            title="Edit Meeting"
            description="Edit the meeting details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    );
};
