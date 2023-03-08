import { ICollectedGamePlatformDto, IGameOnPlatformDto, IPlatform } from "../types/GameTypes";

export class ApiClient {
    private baseUrl = "";
    private headers = {};
    private defaultDataFunc: (data: any) => void = console.log;
    private defaultLoadFunc = (loaded: boolean) => console.log("Loaded: " + loaded);
    private defaultErrFunc = console.error;

    //// Games

    async getPlatformsApi(): Promise<IPlatform[]> {
        return await this.get<IPlatform[]>("/games/platforms");
    }
    getPlatforms(
        dataFunc: (data: IPlatform[]) => void = this.defaultDataFunc,
        loadFunc: (loaded: boolean) => void = this.defaultLoadFunc,
        errFunc: (error: any) => void = this.defaultErrFunc
    ) {
        return this.call(
            this.getPlatformsApi(),
            dataFunc, loadFunc, errFunc
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
        loadFunc: (loaded: boolean) => void = this.defaultLoadFunc,
        errFunc: (error: any) => void = this.defaultErrFunc
    ) {
        return this.call(
            this.getRandomGamesApi(platformId),
            dataFunc, loadFunc, errFunc
        )
    }

    //// Game Collection

    async getCollectedGamesApi(): Promise<ICollectedGamePlatformDto[]> {
        return await this.get<ICollectedGamePlatformDto[]>("/games/gameCollection");
    }
    getCollectedGames(
        dataFunc: (data: ICollectedGamePlatformDto[]) => void = this.defaultDataFunc,
        loadFunc: (loaded: boolean) => void = this.defaultLoadFunc,
        errFunc: (error: any) => void = this.defaultErrFunc
    ) {
        return this.call(
            this.getCollectedGamesApi(),
            dataFunc, loadFunc, errFunc
        )
    }

    async collectGameApi(gameId: number): Promise<void> {
        return await this.post(`/games/gameCollection/${gameId}`);
    }
    collectGame(
        gameId: number,
        dataFunc: () => void = () => undefined,
        loadFunc: (loaded: boolean) => void = this.defaultLoadFunc,
        errFunc: (error: any) => void = this.defaultErrFunc
    ) {
        return this.call(
            this.collectGameApi(gameId),
            dataFunc, loadFunc, errFunc
        )
    }

    async updateCollectedGamePlatformApi(collectedGamePlatform: ICollectedGamePlatformDto): Promise<void> {
        return await this.put(`/games/gameCollection/${collectedGamePlatform.id}`, collectedGamePlatform);
    }
    updateCollectedGamePlatform(
        collectedGamePlatform: ICollectedGamePlatformDto,
        dataFunc: () => void = () => undefined,
        loadFunc: (loaded: boolean) => void = this.defaultLoadFunc,
        errFunc: (error: any) => void = this.defaultErrFunc
    ) {
        return this.call(
            this.updateCollectedGamePlatformApi(collectedGamePlatform),
            dataFunc, loadFunc, errFunc
        )
    }

    async deleteCollectedGamePlatformApi(collectedGamePlatformId: number): Promise<void> {
        return await this.delete(`/games/gameCollection/${collectedGamePlatformId}`);
    }
    deleteCollectedGamePlatform(
        collectedGamePlatformId: number,
        dataFunc: () => void = () => undefined,
        loadFunc: (loaded: boolean) => void = this.defaultLoadFunc,
        errFunc: (error: any) => void = this.defaultErrFunc
    ) {
        return this.call(
            this.deleteCollectedGamePlatformApi(collectedGamePlatformId),
            dataFunc, loadFunc, errFunc
        )
    }

    //// Helpers

    call<T>(
        apiCall: Promise<T>,
        dataFunc: (data: T) => void = console.log,
        loadFunc: (loaded: boolean) => void = (loaded) => console.log("Loaded: " + loaded),
        errFunc: (error: T) => void = console.error
    ) {
        return apiCall
            .then(data => {
                console.log(data);
                loadFunc(true);
                dataFunc(data);
            })
            .catch((err) => {
                console.error(err);
                loadFunc(true);
                errFunc(err);
            });
    }

    async get<T = any>(endpoint: string, options = {}): Promise<T> {
        return this._fetchJSONWithResult(
            endpoint,
            {
                ...options,
                method: 'GET'
            }
        )
    }

    async post(endpoint: string, body: any = undefined, options = {}) {
        return this._fetchJSON(
            endpoint,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                ...options,
                body: JSON.stringify(body),
                method: 'POST'
            }
        )
    }

    async put(endpoint: string, body: any, options = {}) {
        return this._fetchJSON(
            endpoint,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                ...options,
                body: JSON.stringify(body),
                method: 'PUT'
            }
        )
    }

    async delete(endpoint: string, options = {}) {
        return this._fetchJSON(
            endpoint,
            {
                ...options,
                method: 'DELETE'
            },
            // false
        )
    }

    encodeQueryData(query: string, params: any): string {
        for (const [key, value] of Object.entries(params))
            if (!value)
                delete params[key];

        var paramStr = new URLSearchParams(params).toString();
        return paramStr ? query + "?" + paramStr : query;
    }

    async _fetchJSONWithResult<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const res = await fetch(this.baseUrl + endpoint, {
            headers: this.headers,
            ...options
        });

        console.log(res);

        if (!res.ok) throw new Error(res.statusText);

        // if (parseResponse !== false && res.status !== 204)
        return res.json();

        // return undefined;
    }

    async _fetchJSON<T = any>(endpoint: string, options: RequestInit = {}): Promise<void> {
        const res = await fetch(this.baseUrl + endpoint, {
            headers: this.headers,
            ...options
        });

        console.log(res);

        if (!res.ok) throw new Error(res.statusText);

        // if (parseResponse !== false && res.status !== 204)
        return;
    }
}
