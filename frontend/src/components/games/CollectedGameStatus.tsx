import { Done, DoNotDisturbOn, Error, FiberNew, QuestionMark } from "@mui/icons-material";
import { Avatar, AvatarProps, Typography, TypographyProps } from "@mui/material";
import { CollectedGameStatus } from "../../types/GameTypes";

interface CollectedGameAvatarProps extends AvatarProps {
    status: CollectedGameStatus
}

export function CollectedGameAvatar({ status, ...props }: CollectedGameAvatarProps) {
    const sxArray = props.sx ? Array.isArray(props.sx) ? props.sx : [props.sx] : [];
    return (
        CollectedGameStatus.UNKNOWN === status ?
            <Avatar {...props} sx={[...sxArray, { bgcolor: 'grey' }]}>
                <QuestionMark sx={{ color: 'info.contrastText' }} />
            </Avatar >
            : CollectedGameStatus.NEW === status ?
                <Avatar {...props} sx={[...sxArray, { bgcolor: 'info.light' }]}>
                    <FiberNew sx={{ color: 'info.contrastText' }} />
                </Avatar >
                : CollectedGameStatus.DROPPED === status ?
                    <Avatar {...props} sx={[...sxArray, { bgcolor: 'warning.light' }]}>
                        <DoNotDisturbOn sx={{ color: 'warning.contrastText' }} />
                    </Avatar>
                    : CollectedGameStatus.DONE === status ?
                        <Avatar {...props} sx={[...sxArray, { bgcolor: 'success.light' }]}>
                            <Done sx={{ color: 'success.contrastText' }} />
                        </ Avatar >
                        :
                        <Avatar {...props} sx={[...sxArray, { bgcolor: 'error.light' }]}>
                            <Error sx={{ color: 'error.contrastText' }} />
                        </Avatar >
    )
}

interface CollectedGameStatusTextProps extends TypographyProps {
    status: CollectedGameStatus
}

export function CollectedGameStatusText({ status, ...props }: CollectedGameStatusTextProps) {
    return (
        CollectedGameStatus.UNKNOWN === status ?
            <Typography {...props}>Unknown</Typography>
            :
            CollectedGameStatus.NEW === status ?
                <Typography {...props}>New</Typography>
                : CollectedGameStatus.DROPPED === status ?
                    <Typography {...props}>Dropped</Typography>
                    : CollectedGameStatus.DONE === status ?
                        <Typography {...props}>Done</Typography>
                        :
                        <Typography {...props}>Error</Typography>
    )
}
