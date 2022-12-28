import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import IGame from "../types/IGame";

interface GameCardProps {
    game: IGame;
}

export default function GameCard({ game }: GameCardProps) {
    return (
        <Card sx={{ minWidth: 'sm', maxWidth: 'sm', width: 1 }} elevation={6} key={game.id}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {game.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={game.infoLink}>About</Button>
                <Button variant="outlined" style={{ marginLeft: "auto" }}>Add to inventory</Button>
            </CardActions>
        </Card>
    )
}
