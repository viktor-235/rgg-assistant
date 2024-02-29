import {
    CollectedGamePlatformDto,
    CollectedGamePlatformUpdateDto,
    GameDto,
    GamePlatformDto,
    PlatformDto
} from "../types/GameTypes";
import { IAbstractModifier, ICollectedEffect, ICollectedItem, ModifierType } from "../types/ModifierTypes";
import { BaseApiClient, Config } from "./BaseApiClient";

export class ApiClient extends BaseApiClient {

    protected baseUrl="api/"

    //// Games

    async getPlatformsApi(): Promise<PlatformDto[]> {
        return await this.get<PlatformDto[]>("/games/platforms");
    }
    getPlatforms(
        dataFunc: (data: PlatformDto[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(this.getPlatformsApi(), dataFunc, cfg)
    }

    async getRandomGamesApi(platformId: number | undefined): Promise<GamePlatformDto[]> {
        const query = this.encodeQueryData("/games/randomized",
            {
                platformId: platformId
            })
        return await this.get<GamePlatformDto[]>(query);
    }
    getRandomGames(
        platformId: number | undefined,
        dataFunc: (data: GamePlatformDto[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(this.getRandomGamesApi(platformId), dataFunc, cfg)
    }

    async getGamesApi(): Promise<GameDto[]> {
        return await this.get<GameDto[]>("/games");
    }
    getGames(
        dataFunc: (data: GameDto[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(this.getGamesApi(), dataFunc, cfg)
    }

    //// Game Collection

    async getCollectedGamesApi(): Promise<CollectedGamePlatformDto[]> {
        return await this.get<CollectedGamePlatformDto[]>("/games/gameCollection");
    }
    getCollectedGames(
        dataFunc: (data: CollectedGamePlatformDto[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(this.getCollectedGamesApi(), dataFunc, cfg)
    }

    async collectGameApi(gameId: number): Promise<void> {
        return await this.post(`/games/gameCollection/${gameId}`);
    }
    collectGame(
        gameId: number,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(this.collectGameApi(gameId), dataFunc, cfg)
    }

    async updateCollectedGamePlatformApi(collectedGamePlatform: CollectedGamePlatformUpdateDto): Promise<void> {
        return await this.put(`/games/gameCollection/${collectedGamePlatform.id}`, collectedGamePlatform);
    }
    updateCollectedGamePlatform(
        collectedGamePlatform: CollectedGamePlatformUpdateDto,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(this.updateCollectedGamePlatformApi(collectedGamePlatform), dataFunc, cfg)
    }

    async deleteCollectedGamePlatformApi(collectedGamePlatformId: number): Promise<void> {
        return await this.delete(`/games/gameCollection/${collectedGamePlatformId}`);
    }
    deleteCollectedGamePlatform(
        collectedGamePlatformId: number,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(this.deleteCollectedGamePlatformApi(collectedGamePlatformId), dataFunc, cfg)
    }

    //// Modifiers

    async getRandomModifiersApi(modifierType: ModifierType | undefined): Promise<IAbstractModifier[]> {
        const query = this.encodeQueryData("/modifiers/randomized",
            {
                modifierType: modifierType
            })
        return await this.get<IAbstractModifier[]>(query);
    }
    getRandomModifiers(
        modifierType: ModifierType | undefined,
        dataFunc: (data: IAbstractModifier[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(this.getRandomModifiersApi(modifierType), dataFunc, cfg)
    }

    //// Effect Collection

    async getCollectedEffectsApi(): Promise<ICollectedEffect[]> {
        return await this.get<ICollectedEffect[]>("/modifiers/effectCollection");
    }
    getCollectedEffects(
        dataFunc: (data: ICollectedEffect[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(this.getCollectedEffectsApi(), dataFunc, cfg)
    }

    async collectEffectApi(effectId: number): Promise<void> {
        return await this.post(`/modifiers/effectCollection/${effectId}`);
    }
    collectEffect(
        effectId: number,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(this.collectEffectApi(effectId), dataFunc, cfg)
    }

    async deleteCollectedEffectApi(collectedEffectId: number): Promise<void> {
        return await this.delete(`/modifiers/effectCollection/${collectedEffectId}`);
    }
    deleteCollectedEffect(
        collectedEffectId: number,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(this.deleteCollectedEffectApi(collectedEffectId), dataFunc, cfg)
    }

    //// Item Collection

    async getCollectedItemsApi(): Promise<ICollectedItem[]> {
        return await this.get<ICollectedItem[]>("/modifiers/itemCollection");
    }
    getCollectedItems(
        dataFunc: (data: ICollectedItem[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(this.getCollectedItemsApi(), dataFunc, cfg)
    }

    async collectItemApi(itemId: number): Promise<void> {
        return await this.post(`/modifiers/itemCollection/${itemId}`);
    }
    collectItem(
        itemId: number,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(this.collectItemApi(itemId), dataFunc, cfg)
    }

    async deleteCollectedItemApi(collectedItemId: number): Promise<void> {
        return await this.delete(`/modifiers/itemCollection/${collectedItemId}`);
    }
    deleteCollectedItem(
        collectedItemId: number,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(this.deleteCollectedItemApi(collectedItemId), dataFunc, cfg)
    }
}
