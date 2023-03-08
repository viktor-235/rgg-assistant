import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { ApiClient } from "../../services/ApiClient";
import { IGameOnPlatformDto } from "../../types/GameTypes";

interface GameCardProps {
    gameOnPlatform: IGameOnPlatformDto;
}

export default function GameCard({ gameOnPlatform }: GameCardProps) {
    const apiClient = new ApiClient();

    function collectGame(id: number): import("react").MouseEventHandler<HTMLButtonElement> | undefined {
        apiClient.collectGame(id)
        throw new Error("Function not implemented.");
    }

    return (
        <Card sx={{ minWidth: 'sm', maxWidth: 'sm', width: 1 }} elevation={6}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {gameOnPlatform.game?.name || 'Unknown game'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={gameOnPlatform.game?.infoLink || ''}>About</Button>
                <Button variant="outlined" style={{ marginLeft: "auto" }} onClick={() => collectGame(gameOnPlatform.id)}>Add to collection</Button>
            </CardActions>
        </Card>
    )
}
