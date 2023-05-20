import { Error, SentimentNeutral, SentimentSatisfiedAlt, SentimentVeryDissatisfied } from "@mui/icons-material";
import { Avatar, AvatarProps } from "@mui/material";
import { EffectType } from "../types/ModifierTypes";

interface EffectTypeProps extends AvatarProps {
    type: EffectType
}

export function EffectTypeAvatar({ type, ...props }: EffectTypeProps) {
    const sxArray = props.sx ? Array.isArray(props.sx) ? props.sx : [props.sx] : [];
    return (
        EffectType.POSITIVE === type ?
            <Avatar {...props} sx={[...sxArray, { bgcolor: 'success.light' }]}>
                <SentimentSatisfiedAlt sx={{ color: 'success.contrastText' }} />
            </Avatar >
            : EffectType.NEGATIVE === type ?
                <Avatar {...props} sx={[...sxArray, { bgcolor: 'error.light' }]}>
                    <SentimentVeryDissatisfied sx={{ color: 'error.contrastText' }} />
                </Avatar >
                : EffectType.NEUTRAL === type ?
                    <Avatar {...props} sx={[...sxArray, { bgcolor: 'grey' }]}>
                        <SentimentNeutral sx={{ color: 'info.contrastText' }} />
                    </Avatar>
                    :
                    <Avatar {...props} sx={[...sxArray, { bgcolor: 'error.light' }]}>
                        <Error sx={{ color: 'error.contrastText' }} />
                    </Avatar >
    )
}
