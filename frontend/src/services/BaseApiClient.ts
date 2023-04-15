const { freeze } = Object;

export type Config = {
    onLoaded: (loaded: boolean) => void,
    onError: (error: Error) => void,
}

export const DEFAULT_CONFIG: Config = freeze({
    onLoaded: (loaded: boolean) => console.trace("Loaded: " + loaded),
    onError: console.error
});

export abstract class BaseApiClient {
    protected config: Config;
    protected baseUrl = "";
    protected headers = {};
    protected defaultDataFunc: (data: any) => void = console.log;

    constructor(cfg?: Partial<Config>) {
        this.config = cfg ? freeze({ ...DEFAULT_CONFIG, ...cfg }) : DEFAULT_CONFIG;
    }

    call<T>(
        apiCall: Promise<T>,
        dataFunc: (data: T) => void = console.log,
        cfg: Config
    ) {
        return apiCall
            .then(data => {
                console.log(data);
                cfg.onLoaded(true);
                dataFunc(data);
            })
            .catch((err) => {
                console.error(err);
                cfg.onLoaded(true);
                cfg.onError(err);
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

    async _fetchJSON(endpoint: string, options: RequestInit = {}): Promise<void> {
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