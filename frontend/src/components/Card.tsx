import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useApiClient } from "../contexts/ApiClientContext";
import { IGameOnPlatformDto } from "../types/GameTypes";
import { IAbstractModifier, ModifierType } from "../types/ModifierTypes";

// Game card

interface GameCardProps {
    gameOnPlatform: IGameOnPlatformDto;
    highlighted: boolean
}

export function GameCard({ gameOnPlatform, highlighted }: GameCardProps) {
    const apiClient = useApiClient();

    function collectGame(gameOnPlatform: IGameOnPlatformDto): Promise<void> {
        return apiClient.collectGame(gameOnPlatform.id)
    }

    return (
        <CommonCard<IGameOnPlatformDto>
            value={gameOnPlatform}
            title={gameOnPlatform.game?.name || 'Unknown'}
            infoLink={gameOnPlatform.game?.infoLink}
            highlighted={highlighted}
            onCollect={collectGame}
        />
    )
}

// Modifier card

interface ModifierCardProps {
    modifier: IAbstractModifier;
    highlighted: boolean
}

export function ModifierCard({ modifier, highlighted }: ModifierCardProps) {
    const apiClient = useApiClient();

    function collectModifier(modifier: IAbstractModifier): Promise<void> {
        switch (modifier.modifierType) {
            case ModifierType.EFFECT:
                return apiClient.collectEffect(modifier.id)
            case ModifierType.ITEM:
                return apiClient.collectItem(modifier.id)
            default:
                throw new Error("Unknown modifier type: " + modifier.modifierType);
        }
    }

    return (
        <CommonCard<IAbstractModifier>
            value={modifier}
            title={modifier.name}
            highlighted={highlighted}
            onCollect={collectModifier}
        />
    )
}

// Common card

interface CommonCardProps<V> {
    value: V;
    title: string
    infoLink?: string
    highlighted: boolean
    onCollect(value: V): Promise<void>
}

function CommonCard<V>({ value, title, infoLink, highlighted, onCollect }: CommonCardProps<V>) {
    return (
        <Card sx={{
            minWidth: 'sm', maxWidth: 'sm', width: 1,
            ...(highlighted && { border: "solid", borderColor: 'primary.main' })
        }} elevation={6}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title || 'Unknown'}
                </Typography>
            </CardContent>
            <CardActions>
                {infoLink!! && <Button href={infoLink}>About</Button>}
                <Button variant="outlined" style={{ marginLeft: "auto" }} onClick={() => onCollect(value)}>Add to collection</Button>
            </CardActions>
        </Card>
    )
}
