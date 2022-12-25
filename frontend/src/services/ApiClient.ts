import IGame from "../types/IGame";

export class ApiClient {
    private baseUrl = "";
    private headers = {};

    async getRandomGames(): Promise<IGame[]> {
        return await this.get<IGame[]>("/games/getAllRandomized");
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

    async _fetchJSON<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const res = await fetch(this.baseUrl + endpoint, {
            ...options,
            headers: this.headers
        });

        if (!res.ok) throw new Error(res.statusText);

        // if (parseResponse !== false && res.status !== 204)
        return res.json();

        // return undefined;
    }
}
