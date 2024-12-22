import qs from 'qs'
import axios from 'axios'

const httpClient = axios.create({})

function initHttp(config: any) {
    httpClient.defaults.baseURL = config.apiBaseUrl
    httpClient.defaults.paramsSerializer = (params: any) => qs.stringify(params, { indices: false })
}

export { httpClient, initHttp }
