import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { WheelHandler } from "../helpers/WheelHandler";
import { IAbstractWheelElement } from "../types/CommonTypes";
import { IGameOnPlatformDto } from "../types/GameTypes";
import { IAbstractModifier, ModifierType } from "../types/ModifierTypes";
import { GameCard, ModifierCard } from "./Card";

export enum WheelElementType {
    GAME,
    MODIFIER
}

// Game wheel

interface GameWheelProps {
    games: IGameOnPlatformDto[]
}

export function GameWheel({ games }: GameWheelProps) {
    return (
        <Wheel
            elements={games}
            type={WheelElementType.GAME}
        />
    )
}

// Modifier wheel

interface ModifierWheelProps {
    modifiers: IAbstractModifier[]
}

export default function ModifierWheel({ modifiers }: ModifierWheelProps) {
    return (
        <Wheel
            elements={modifiers}
            type={WheelElementType.MODIFIER}
        />
    )
}

// Common wheel

interface WheelProps {
    elements: IAbstractWheelElement[]
    type: WheelElementType
}

export function Wheel({ elements, type }: WheelProps) {
    const [shownElements, setShownElements] = useState<IAbstractWheelElement[]>()
    const [spinning, setSpinning] = useState<boolean>(false)

    const wheelHandler: WheelHandler<IAbstractWheelElement> = new WheelHandler({
        onScroll: (window: IAbstractWheelElement[]) => {
            setSpinning(true)
            setShownElements(window)
        },
        afterLastScroll: () => {
            setSpinning(false)
        }
    })

    useEffect(() => {
        setSpinning(false)
        if (elements && elements.length) {
            wheelHandler.start(elements)
        }
        return () => wheelHandler.stop();
    }, [elements]);

    function renderCards(window: IAbstractWheelElement[], type: WheelElementType) {
        switch (type) {
            case WheelElementType.GAME:
                return window?.map((value, index) => value &&
                    <GameCard
                        key={index}
                        gameOnPlatform={value as IGameOnPlatformDto}
                        highlighted={!spinning && index === Math.floor(window.length / 2)}
                    />
                )
            case WheelElementType.MODIFIER:
                return window?.map((value, index) =>
                    (value as IAbstractModifier).modifierType === ModifierType.EFFECT ?
                        <ModifierCard
                            key={index}
                            modifier={value as IAbstractModifier}
                            highlighted={!spinning && index === Math.floor(window.length / 2)}
                        />
                        : (value as IAbstractModifier).modifierType === ModifierType.ITEM ?
                            <ModifierCard
                                key={index}
                                modifier={value as IAbstractModifier}
                                highlighted={!spinning && index === Math.floor(window.length / 2)}
                            />
                            : "Unknown modifier type: " + (value as IAbstractModifier).modifierType
                )
            default:
                return "Unknown wheel element type: " + type
        }
    }

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            {shownElements && shownElements.length ?
                renderCards(shownElements, type)
                :
                <div>
                    Roll the wheel!!!
                </div>
            }
        </Stack >
    )
}
