import { BusinessCenter, InfoOutlined } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardHeader, Tooltip, Typography } from "@mui/material";
import { useApiClient } from "../contexts/ApiClientContext";
import { GamePlatformDto } from "../types/GameTypes";
import { IEffect, IItem } from "../types/ModifierTypes";
import { EffectTypeAvatar } from "./EffectTypeAvatar";

// Game card

interface GameCardProps {
    gamePlatform: GamePlatformDto;
    highlighted: boolean
}

export function GameCard({ gamePlatform, highlighted }: GameCardProps) {
    const apiClient = useApiClient();

    function collectGame(gameOnPlatform: GamePlatformDto): Promise<void> {
        return apiClient.collectGame(gameOnPlatform.id)
    }

    return (
        <CommonCard<GamePlatformDto>
            value={gamePlatform}
            title={gamePlatform.game?.name || 'Unknown'}
            infoLink={gamePlatform.game?.infoLink}
            highlighted={highlighted}
            onCollect={collectGame}
        />
    )
}

// Effect card

interface EffectCardProps {
    effect: IEffect;
    highlighted: boolean
}

export function EffectCard({ effect, highlighted }: EffectCardProps) {
    const apiClient = useApiClient();

    function collectEffect(effect: IEffect): Promise<void> {
        return apiClient.collectEffect(effect.id)
    }

    return (
        <CommonCard<IEffect>
            value={effect}
            avatar={<EffectTypeAvatar type={effect.type} />}
            title={effect.name}
            description={effect.description}
            highlighted={highlighted}
            onCollect={collectEffect}
        />
    )
}

// Item card

interface ItemCardProps {
    item: IItem;
    highlighted: boolean
}

export function ItemCard({ item, highlighted }: ItemCardProps) {
    const apiClient = useApiClient();

    function collectItem(item: IItem): Promise<void> {
        return apiClient.collectItem(item.id)
    }

    return (
        <CommonCard<IItem>
            value={item}
            avatar={
                <Avatar sx={{ bgcolor: 'info.light' }}>
                    <BusinessCenter sx={{ color: 'info.contrastText' }} />
                </Avatar >
            }
            title={item.name}
            description={item.description}
            highlighted={highlighted}
            onCollect={collectItem}
        />
    )
}

// Common card

interface CommonCardProps<V> {
    value: V
    avatar?: JSX.Element
    title: string
    description?: string
    infoLink?: string
    highlighted: boolean
    onCollect(value: V): Promise<void>
}

function CommonCard<V>({ value, avatar, title, description, infoLink, highlighted, onCollect }: CommonCardProps<V>) {
    return (
        <Card sx={{
            minWidth: 'sm', maxWidth: 'sm', width: 1,
            ...(highlighted && { border: "solid", borderColor: 'primary.main' })
        }} elevation={6}>
            <CardHeader
                avatar={avatar}
                title={
                    <Typography variant="h5" component="div">
                        {title || 'Unknown'}
                    </Typography>
                }
            />
            <CardActions>
                {infoLink!! && <Button href={infoLink}>About</Button>}
                {description!! &&
                    <Tooltip title={description} arrow>
                        <InfoOutlined color="action" />
                    </Tooltip>
                }
                <Button variant="outlined" style={{ marginLeft: "auto" }} onClick={() => onCollect(value)}>Add to collection</Button>
            </CardActions>
        </Card>
    )
}
