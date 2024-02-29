import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Grid from '@mui/system/Unstable_Grid';
import { useEffect, useState } from "react";
import { GameWheel } from "../components/Wheel";
import { useApiClient } from "../contexts/ApiClientContext";
import { GamePlatformDto, PlatformDto } from "../types/GameTypes";

export default function GameWheelPage() {
    const apiClient = useApiClient();
    const [platforms, setPlatforms] = useState<Array<PlatformDto>>([]);
    const [selectedPlatformId, setSelectedPlatformId] = useState<number>(-1);
    const [gamePlatforms, setGamePlatforms] = useState<Array<GamePlatformDto>>([]);

    useEffect(() => {
        apiClient.getPlatforms(setPlatforms)
    }, []);

    const roll = () => {
        apiClient.getRandomGames(
            selectedPlatformId > 0 ? selectedPlatformId : undefined,
            setGamePlatforms
        )
    }

    return (
        <Grid container spacing={4}>
            <Grid sm={5} md={4} lg={3}>
                <Paper elevation={2} style={{ padding: 24, borderRadius: 8 }}>
                    <Stack spacing={2}>
                        <Typography variant="h6" component="div">
                            Game wheel
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="platform-select-label">Platform</InputLabel>
                            <Select
                                labelId="platform-select-label"
                                id="platform-select"
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
            <Grid sm={7} md={8} lg={9}>
                <GameWheel games={gamePlatforms} />
            </Grid>
        </Grid>
    )
}
