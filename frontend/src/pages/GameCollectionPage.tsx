import { Button, Card, CardActions, CardContent, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import CollectedGameDialog from "../components/games/CollectedGameDialog";
import { CollectedGameAvatar } from "../components/games/CollectedGameStatus";
import { useApiClient } from "../contexts/ApiClientContext";
import { CollectedGamePlatformDto, PlatformDto } from "../types/GameTypes";

export default function GameCollectionPage() {
    const apiClient = useApiClient();
    const [platforms, setPlatforms] = useState<Array<PlatformDto>>([]);
    const [collectedGames, setCollectedGames] = useState<Array<CollectedGamePlatformDto>>([]);
    const [gameMap, setGameMap] = useState<{ [id: string]: Array<CollectedGamePlatformDto> }>({});
    const [selectedGame, setSelectedGame] = useState<CollectedGamePlatformDto | undefined>(undefined);

    useEffect(() => {
        apiClient.getPlatforms(setPlatforms).then(() => {
            return updateGames()
        })
    }, []);

    useEffect(() => {
        if (platforms.length === 0) return

        setGameMap({})
        var data: { [id: string]: Array<CollectedGamePlatformDto> } = {}
        platforms.map((platform) => {
            data[platform.name] = []
        })

        collectedGames.map((gamePlatform) => {
            gamePlatform.collectionDate = new Date(gamePlatform.collectionDate) // Parse date
            data[gamePlatform.gamePlatform.platform.name].push(gamePlatform)
        })
        setGameMap(data)
    }, [platforms, collectedGames]);

    const updateGames = () => {
        return apiClient.getCollectedGames(setCollectedGames)
    }

    async function deleteGame(gamePlatform: CollectedGamePlatformDto): Promise<void> {
        await apiClient.deleteCollectedGamePlatform(gamePlatform.id)
            .then(() => apiClient.getCollectedGames(setCollectedGames));
    }

    return (
        <>
            <Grid container spacing={2}>
                {Object.entries(gameMap).map(([platformName, cgps]) => (
                    <Grid xs={12} sm={12} md={6} lg={4} key={platformName}>
                        <Card variant="outlined">
                            <CardContent sx={{ paddingBottom: 0 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {platformName}
                                </Typography>
                            </CardContent>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
                                {cgps.map((cgp) =>
                                    <ListItem key={cgp.id} disablePadding>
                                        <ListItemButton dense onClick={() => {
                                            setSelectedGame(cgp)
                                        }} >
                                            <ListItemAvatar>
                                                <CollectedGameAvatar status={cgp.status} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={cgp.gamePlatform.game?.name || 'Unknown'}
                                                secondary={cgp.comment}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                            <CardActions>
                                <Button>Add game</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedGame &&
                <CollectedGameDialog
                    game={selectedGame}
                    onClose={() => setSelectedGame(undefined)}
                    onUpdate={updateGames}
                    onDelete={() => deleteGame(selectedGame)}
                />
            }
        </>
    )
}
