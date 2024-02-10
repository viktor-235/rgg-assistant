import { IAbstractWheelElement } from "./CommonTypes"

export interface IPlatform {
    id: number,
    name: string,
    shortName: string,
    releaseDate?: Date,
    sourceType: SourceType,
    sourceId: string
}

export interface IGame {
    id: number,
    name: string,
    infoLink?: string,
    sourceType: SourceType,
    sourceId: string,
    gamePlatform: IGamePlatform
}

export interface IGamePlatform {
    id: number,
    sourceType: SourceType,
    sourceId: string
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

export enum SourceType {
    MANUAL = "MANUAL",
    IGDB = "IGDB"
}
