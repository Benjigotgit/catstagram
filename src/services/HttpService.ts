import axios from 'axios'
import {BASE_URL_API, BASE_URL_IMAGE} from 'services'
export class HttpService {
  static httpService: HttpService

  constructor() {}

  static getInstance(): HttpService {
    if(!HttpService.httpService){
      HttpService.httpService = new HttpService()
    }
    return HttpService.httpService
  }
  
  create = (api: string, isImage?: boolean) => {

    const a = axios.create({
      baseURL: isImage ? BASE_URL_IMAGE : BASE_URL_API,
      timeout: 15000,
    })
    return a
  }
  get = (api: string, isImage?: boolean) => {
    console.log('HTTPService get url ==>', api)
    const call = this.create(api, isImage)
    return call.get(api)
  }
  post = (api: string, body?: boolean, isImage?: boolean) => {
    const call = this.create(api, isImage)
    return call.post(api, body)
  }
}