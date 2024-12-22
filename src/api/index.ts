import { HttpApiClient } from './http-api.client'
import type { User, TodoItem } from '@/models'

export class ApplicationApi extends HttpApiClient {
    url: string

    constructor() {
        super()
        this.url = 'https://jsonplaceholder.typicode.com'
    }

    public async getUsers(): Promise<User[]> {
        return await this.get(this.url + '/users')
    }

    public async getTodos(): Promise<TodoItem[]> {
        return await this.get(this.url + '/todos')
    }

    public async addItem(data: TodoItem) {
        return await this.post(this.url + '/posts', data)
    }
}
