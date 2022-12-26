import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Grid from '@mui/system/Unstable_Grid';
import { useEffect, useState } from "react";
import { ApiClient } from "../services/ApiClient";
import IGame from "../types/IGame";
import IPlatform from "../types/IPlatform";
import GameCard from "./GameCard";

export default function GameWheel() {
    const apiClient = new ApiClient();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any | undefined>(undefined);
    const [platforms, setPlatforms] = useState<Array<IPlatform>>([]);
    const [selectedPlatformId, setSelectedPlatformId] = useState<number>(-1);
    const [games, setGames] = useState<Array<IGame>>([]);

    useEffect(() => {
        apiClient.getPlatforms()
            .then(data => {
                console.log(data);
                setPlatforms(data);
            })
            .catch((err) => {
                console.log(err.message);
                setError(error);
            });
    }, []);

    useEffect(() => {
        roll();
    }, []);

    const roll = () => {
        apiClient.getRandomGames(selectedPlatformId > 0 ? selectedPlatformId : undefined)
            .then(data => {
                console.log(data);
                setIsLoaded(true);
                setGames(data);
            })
            .catch((err) => {
                console.log(err.message);
                setIsLoaded(true);
                setError(error);
            });
    }

    return (
        error ?
            <div>Error: {error.message}</div>
            : !isLoaded ?
                <div>Loading...</div>
                : <Grid container spacing={4}>
                    <Grid sm={5} md={4} lg={3}>
                        <Paper elevation={2} style={{ padding: 24, borderRadius: 8 }}>
                            <Stack spacing={2}>
                                <Typography variant="h6" component="div">
                                    Game wheel
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedPlatformId}
                                        label="Platform"
                                        onChange={(event: SelectChangeEvent<number>) => {
                                            setSelectedPlatformId(event.target.value as number);
                                        }}
                                    >
                                        <MenuItem value={-1}><em>All</em></MenuItem>
                                        {platforms.map((platform) =>
                                            <MenuItem value={platform.id} key={platform.id}>{platform.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <Button onClick={roll} variant="contained" size="large">ROLL</Button>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid sm={7} md={8} lg={9}><Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        {games.slice(0, 5).map((game) =>
                            <GameCard game={game} />
                        )}
                    </Stack>
                    </Grid>
                </Grid>
    )
}
