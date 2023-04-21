import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, SelectProps, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useApiClient } from "../contexts/ApiClientContext";
import { IAbstractModifier, ModifierType } from "../types/ModifierTypes";

export default function ModifierWheelPage() {
    const apiClient = useApiClient();
    const [selectedModifierType, setSelectedModifierType] = useState<ExtendedModifierType>(ExtendedModifierType.ALL);
    const [modifiers, setModifiers] = useState<IAbstractModifier[]>([]);

    const roll = () => {
        // const mtype = selectedModifierType as ModifierType

        var type: ModifierType | undefined = undefined
        switch (selectedModifierType) {
            // case ExtendedModifierType.ALL:
            //     type = undefined
            //     break
            case ExtendedModifierType.EFFECT:
                type = ModifierType.EFFECT
                break
            case ExtendedModifierType.ITEM:
                type = ModifierType.ITEM
                break

            default:
                type = undefined
        }
        apiClient.getRandomModifiers(
            type,
            setModifiers
        )
    }

    return (
        <Grid container spacing={4}>
            <Grid sm={5} md={4} lg={3}>
                <Paper elevation={2} style={{ padding: 24, borderRadius: 8 }}>
                    <Stack spacing={2}>
                        <Typography variant="h6" component="div">
                            Modifier wheel
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Modifier type</InputLabel>
                            <CustomSelect
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedModifierType}
                                label="Modifier type"
                                onChange={(event: SelectChangeEvent<ExtendedModifierType>) => {
                                    setSelectedModifierType(event.target.value as ExtendedModifierType);
                                }}
                            >
                                <MenuItem value={ExtendedModifierType.ALL}><em>All</em></MenuItem>
                                <MenuItem value={ExtendedModifierType.EFFECT}>Effect</MenuItem>
                                <MenuItem value={ExtendedModifierType.ITEM}>Item</MenuItem>

                                {/* {Object.keys(Stooges).map(key => (
                                    <MenuItem value={key} key={key}>{Stooges[key].name}</MenuItem>
                                ))} */}

                                {/* {platforms.map((platform) =>
                                    <MenuItem value={platform.id} key={platform.id}>{platform.name}</MenuItem>
                                )} */}
                            </CustomSelect>
                        </FormControl>
                        <Button onClick={roll} variant="contained" size="large">ROLL</Button>
                    </Stack>
                </Paper>
            </Grid>
            <Grid sm={7} md={8} lg={9}>
                {/* <GameWheel games={gameOnPlatforms} /> */}

                {modifiers.map((mod) =>
                    <p>{mod.name}</p>
                )}
            </Grid>
        </Grid>
    )
}

export enum ExtendedModifierType {
    ALL = "All",
    ITEM = "Item",
    EFFECT = "Effect"
}

function CustomSelect<ExtendedModifierType>(props: SelectProps<ExtendedModifierType>) {
    return (
        <Select {...props} />
    );
}