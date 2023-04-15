import { ICollectedGamePlatformDto, IGameOnPlatformDto, IPlatform } from "../types/GameTypes";
import { BaseApiClient, Config } from "./BaseApiClient";

export class ApiClient extends BaseApiClient {

    //// Games

    async getPlatformsApi(): Promise<IPlatform[]> {
        return await this.get<IPlatform[]>("/games/platforms");
    }
    getPlatforms(
        dataFunc: (data: IPlatform[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(
            this.getPlatformsApi(),
            dataFunc, { ...this.config, ...cfg }
        )
    }

    async getRandomGamesApi(platformId: number | undefined): Promise<IGameOnPlatformDto[]> {
        const query = this.encodeQueryData("/games/randomized",
            {
                platformId: platformId
            })
        return await this.get<IGameOnPlatformDto[]>(query);
    }
    getRandomGames(
        platformId: number | undefined,
        dataFunc: (data: IGameOnPlatformDto[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(
            this.getRandomGamesApi(platformId),
            dataFunc, { ...this.config, ...cfg }
        )
    }

    //// Game Collection

    async getCollectedGamesApi(): Promise<ICollectedGamePlatformDto[]> {
        return await this.get<ICollectedGamePlatformDto[]>("/games/gameCollection");
    }
    getCollectedGames(
        dataFunc: (data: ICollectedGamePlatformDto[]) => void = this.defaultDataFunc,
        cfg?: Partial<Config>
    ) {
        return this.call(
            this.getCollectedGamesApi(),
            dataFunc, { ...this.config, ...cfg }
        )
    }

    async collectGameApi(gameId: number): Promise<void> {
        return await this.post(`/games/gameCollection/${gameId}`);
    }
    collectGame(
        gameId: number,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(
            this.collectGameApi(gameId),
            dataFunc, { ...this.config, ...cfg }
        )
    }

    async updateCollectedGamePlatformApi(collectedGamePlatform: ICollectedGamePlatformDto): Promise<void> {
        return await this.put(`/games/gameCollection/${collectedGamePlatform.id}`, collectedGamePlatform);
    }
    updateCollectedGamePlatform(
        collectedGamePlatform: ICollectedGamePlatformDto,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(
            this.updateCollectedGamePlatformApi(collectedGamePlatform),
            dataFunc, { ...this.config, ...cfg }
        )
    }

    async deleteCollectedGamePlatformApi(collectedGamePlatformId: number): Promise<void> {
        return await this.delete(`/games/gameCollection/${collectedGamePlatformId}`);
    }
    deleteCollectedGamePlatform(
        collectedGamePlatformId: number,
        dataFunc: () => void = () => undefined,
        cfg?: Partial<Config>
    ) {
        return this.call(
            this.deleteCollectedGamePlatformApi(collectedGamePlatformId),
            dataFunc, { ...this.config, ...cfg }
        )
    }
}
