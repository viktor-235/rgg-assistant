import { IAbstractWheelElement } from "./CommonTypes"

export interface IPlatform {
    id: number,
    name: string,
    releaseDate?: Date
}

export interface IGame {
    id: number,
    name: string,
    infoLink?: string
    gamePlatform: IGamePlatform
}

export interface IGamePlatform {
    id: number
}

export interface IGameOnPlatformDto extends IAbstractWheelElement {
    game?: IGame,
    platform: IPlatform
}

export interface ICollectedGamePlatformDto {
    id: number,
    collectionDate: Date,
    status: CollectedGameStatus,
    spentTime?: string, // Duration
    comment?: string
    gamePlatform: IGameOnPlatformDto
}

export enum CollectedGameStatus {
    UNKNOWN = "UNKNOWN",
    NEW = "NEW",
    DROPPED = "DROPPED",
    DONE = "DONE"
}
