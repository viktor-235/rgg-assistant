import { BusinessCenter, Delete } from "@mui/icons-material";
import { Avatar, Card, CardContent, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { EffectTypeAvatar } from "../components/games/EffectTypeAvatar";
import { useApiClient } from "../contexts/ApiClientContext";
import { ICollectedEffect, ICollectedItem } from "../types/ModifierTypes";

export default function ModifierCollectionPage() {
    const apiClient = useApiClient();
    const [collectedEffects, setCollectedEffects] = useState<ICollectedEffect[]>([]);
    const [collectedItems, setCollectedItems] = useState<ICollectedItem[]>([]);

    useEffect(() => {
        apiClient.getCollectedEffects(setCollectedEffects)
        apiClient.getCollectedItems(setCollectedItems)
    }, []);

    async function deleteEffect(effect: ICollectedEffect): Promise<void> {
        await apiClient.deleteCollectedEffect(effect.id)
            .then(() => apiClient.getCollectedEffects(setCollectedEffects));
    }

    async function deleteItem(item: ICollectedItem): Promise<void> {
        await apiClient.deleteCollectedItem(item.id)
            .then(() => apiClient.getCollectedItems(setCollectedItems))
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={6} lg={6}>
                    <Card variant="outlined">
                        <CardContent sx={{ paddingBottom: 0 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Effects
                            </Typography>
                        </CardContent>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
                            {collectedEffects.map((effect) =>
                                <ListItem key={effect.id}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteEffect(effect)}>
                                            <Delete />
                                        </IconButton>
                                    }>
                                    <ListItemAvatar>
                                        <EffectTypeAvatar type={effect.effect.type} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={effect.effect.name}
                                        secondary={effect.effect.description}
                                    />
                                </ListItem>
                            )}
                        </List>
                        {/* <CardActions>
                            <Button>Add effect</Button>
                        </CardActions> */}
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={6}>
                    <Card variant="outlined">
                        <CardContent sx={{ paddingBottom: 0 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Items
                            </Typography>
                        </CardContent>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
                            {collectedItems.map((item) =>
                                <ListItem key={item.id}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item)}>
                                            <Delete />
                                        </IconButton>
                                    }>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'info.light' }}>
                                            <BusinessCenter sx={{ color: 'info.contrastText' }} />
                                        </Avatar >
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.item.name}
                                        secondary={item.item.description}
                                    />
                                </ListItem>
                            )}
                        </List>
                        {/* <CardActions>
                            <Button>Add item</Button>
                        </CardActions> */}
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
