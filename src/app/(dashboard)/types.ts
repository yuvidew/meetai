import { Dispatch, SetStateAction } from "react";

export type DashboardCommandProps = {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
}