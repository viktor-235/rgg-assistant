import IGame from "../types/IGame";
import IPlatform from "../types/IPlatform";

export class ApiClient {
    private baseUrl = "";
    private headers = {};
    private defaultDataFunc: (data: any) => void = console.log;
    private defaultLoadFunc = (loaded: boolean) => console.log("Loaded: " + loaded);
    private defaultErrFunc = console.error;

    //// Games

    async getPlatformsApi(): Promise<IPlatform[]> {
        return await this.get<IPlatform[]>("/games/getPlatforms");
    }
    getPlatforms(
        dataFunc: (data: IPlatform[]) => void = this.defaultDataFunc,
        loadFunc: (loaded: boolean) => void = this.defaultLoadFunc,
        errFunc: (error: any) => void = this.defaultErrFunc
    ) {
        this.call(
            this.getPlatformsApi(),
            dataFunc, loadFunc, errFunc
        )
    }

    async getRandomGamesApi(platformId: number | undefined): Promise<IGame[]> {
        const query = this.encodeQueryData("/games/getAllRandomized",
            {
                platformId: platformId
            })
        return await this.get<IGame[]>(query);
    }
    getRandomGames(
        platformId: number | undefined,
        dataFunc: (data: IGame[]) => void = this.defaultDataFunc,
        loadFunc: (loaded: boolean) => void = this.defaultLoadFunc,
        errFunc: (error: any) => void = this.defaultErrFunc
    ) {
        this.call(
            this.getRandomGamesApi(platformId),
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
        apiCall
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
        return this._fetchJSON(
            endpoint,
            {
                ...options,
                method: 'GET'
            }
        )
    }

    async post(endpoint: string, body: any, options = {}) {
        return this._fetchJSON(
            endpoint,
            {
                ...options,
                body: JSON.stringify(body),
                method: 'POST'
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

    async _fetchJSON<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const res = await fetch(this.baseUrl + endpoint, {
            ...options,
            headers: this.headers
        });

        console.log(res);

        if (!res.ok) throw new Error(res.statusText);

        // if (parseResponse !== false && res.status !== 204)
        return res.json();

        // return undefined;
    }
}
