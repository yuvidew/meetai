export type CallConnectProps = {
    meetingId : string;
    meetingName : string;
    userId : string;
    userName : string;
    userImage : string; 
}

export type CallProviderProps = {
    meetingId : string;
    meetingName : string;
}

export type CallUiProps = {
    meetingName : string
}

export type CallLobbyProps = {
    onJoin : () => void
}

export type CallActiveProps = {
    onLeave : () => void;
    meetingName : string
}