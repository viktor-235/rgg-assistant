import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { WheelHandler } from "../helpers/WheelHandler";
import { IGameOnPlatformDto } from "../types/GameTypes";
import GameCard from "./games/GameCard";

interface GameWheelProps {
    games: IGameOnPlatformDto[]
}

export default function GameWheel({ games }: GameWheelProps) {
    const [shownGames, setShownGames] = useState<IGameOnPlatformDto[]>()
    const [spinning, setSpinning] = useState<boolean>(false)

    const wheelHandler: WheelHandler<IGameOnPlatformDto> = new WheelHandler({
        onScroll: (window: IGameOnPlatformDto[]) => {
            setSpinning(true)
            setShownGames(window)
        },
        afterLastScroll: () => {
            setSpinning(false)
        }
    })

    useEffect(() => {
        setSpinning(false)
        if (games && games.length) {
            wheelHandler.start(games)
        }
        return () => wheelHandler.stop();
    }, [games]);

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            {shownGames && shownGames.length ?
                shownGames.map((gameOnPlatform, index) => gameOnPlatform &&
                    <GameCard
                        key={gameOnPlatform.id}
                        gameOnPlatform={gameOnPlatform}
                        highlighted={!spinning && index == Math.floor(shownGames.length / 2)}
                    />
                )
                :
                <div>
                    Roll the wheel!!!
                </div>
            }
        </Stack >
    )
}
