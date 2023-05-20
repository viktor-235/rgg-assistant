import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, SelectProps, Stack, Typography } from "@mui/material";
import Grid from '@mui/system/Unstable_Grid';
import { useEffect, useState } from "react";
import ModifierWheel from "../components/Wheel";
import { useApiClient } from "../contexts/ApiClientContext";
import { IAbstractModifier, ModifierType } from "../types/ModifierTypes";

enum ExtendedModifierType {
    ALL = "All",
    ITEM = "Item",
    EFFECT = "Effect"
}

export default function ModifierWheelPage() {
    const apiClient = useApiClient();
    const [selectedModifierType, setSelectedModifierType] = useState<ExtendedModifierType>(ExtendedModifierType.ALL);
    const [modifiers, setModifiers] = useState<IAbstractModifier[]>([]);

    const roll = () => {
        var type: ModifierType | undefined = undefined
        switch (selectedModifierType) {
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
                            <InputLabel id="modifier-type-select-label">Modifier type</InputLabel>
                            <ModifierTypeSelect
                                labelId="modifier-type-select-label"
                                id="modifier-type-select"
                                value={selectedModifierType}
                                label="Modifier type"
                                onChange={(event: SelectChangeEvent<ExtendedModifierType>) => {
                                    setSelectedModifierType(event.target.value as ExtendedModifierType);
                                }}
                            >
                                <MenuItem value={ExtendedModifierType.ALL}><em>All</em></MenuItem>
                                <MenuItem value={ExtendedModifierType.EFFECT}>Effect</MenuItem>
                                <MenuItem value={ExtendedModifierType.ITEM}>Item</MenuItem>
                            </ModifierTypeSelect>
                        </FormControl>
                        <Button onClick={roll} variant="contained" size="large">ROLL</Button>
                    </Stack>
                </Paper>
            </Grid>
            <Grid sm={7} md={8} lg={9}>
                <ModifierWheel modifiers={modifiers} />
            </Grid>
        </Grid>
    )
}

function ModifierTypeSelect<ExtendedModifierType>(props: SelectProps<ExtendedModifierType>) {
    return (
        <Select {...props} />
    );
}
