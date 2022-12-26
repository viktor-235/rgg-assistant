import IGame from "../types/IGame";
import IPlatform from "../types/IPlatform";

export class ApiClient {
    private baseUrl = "";
    private headers = {};

    //// Games

    async getPlatforms(): Promise<IPlatform[]> {
        return await this.get<IPlatform[]>("/games/getPlatforms");
    }

    async getRandomGames(platformId: number | undefined): Promise<IGame[]> {
        const query = this.encodeQueryData("/games/getAllRandomized",
            {
                platformId: platformId
            })
        return await this.get<IGame[]>(query);
    }

    //// Helpers

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
