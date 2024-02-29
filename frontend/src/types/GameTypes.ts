import { IAbstractWheelElement } from "./CommonTypes"

export interface PlatformDto {
    id: number,
    name: string,
    shortName: string,
    releaseDate?: Date,
    sourceType: SourceType,
    sourceId: string
}

export interface GameDto {
    id: number,
    name: string,
    infoLink?: string,
    sourceType: SourceType,
    sourceId: string,
    platformsOfGame: PlatformOfGameDto[]
}

export interface PlatformOfGameDto {
    id: number,
    platform: PlatformDto,
    sourceType: SourceType,
    sourceId: string
}

export interface GamePlatformDto extends IAbstractWheelElement {
    game?: GameDto,
    platform: PlatformDto,
    sourceType: SourceType,
    sourceId: string
}

export interface CollectedGamePlatformDto {
    id: number,
    collectionDate: Date,
    status: CollectedGameStatus,
    spentTime?: string, // Duration
    comment?: string,
    gamePlatform: GamePlatformDto
}

export interface CollectedGamePlatformUpdateDto {
    id: number,
    collectionDate: Date,
    status: CollectedGameStatus,
    spentTime?: string,
    comment?: string,
    gamePlatformId: number
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
