import { ResponsiveDialog } from "@/components/responsive-dialog";
import { NewMeetingDialogProps } from "../../types/types";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";



export const MeetingListDialog = ({
    open,
    onOpenChange,
}: NewMeetingDialogProps) => {
    const router = useRouter()
    return (
        <ResponsiveDialog
            title="New Meeting"
            description="Create a new meeting"
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingForm
                onSuccess={(id) => {
                    onOpenChange(false)
                    router.push(`/meetings/${id}`)
                }}

                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
};
