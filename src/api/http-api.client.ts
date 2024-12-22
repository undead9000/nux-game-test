import { httpClient } from './http.client'

export abstract class HttpApiClient {
    protected async post(url: string, fields: any): Promise<any> {
        return await httpClient({ method: 'post', url, ...{ data: fields } })
    }

    protected async get(url: string, fields: any = {}): Promise<any> {
        return (await httpClient({ method: 'get', url, ...{ params: fields } })).data
    }

    protected async put(url: string, fields: any): Promise<any> {
        return await httpClient({ method: 'put', url, ...{ data: fields } })
    }

    protected async delete(url: string, fields: any = {}): Promise<any> {
        return (await httpClient({ method: 'delete', url, ...{ params: fields } })).data
    }
}
