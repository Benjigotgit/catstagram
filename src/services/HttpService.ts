import axios from 'axios'
import {BASE_URL_API, BASE_URL_IMAGE, API_FORMATTER} from 'services'
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
    a.interceptors.request.use(config => {
      return config;})
    return a
  }
  get = (api: string, isImage?: boolean) => {
    console.log('HTTPService get url ==>', api)
    const call = this.create(api, isImage)
    return call.get(api)
  }
  post = (api: string, body?: any, isImage?: boolean) => {
    console.log('HTTPService post url ==>', api+API_FORMATTER)
    console.log('HTTPService post body ==>', body)
    const call = this.create(api, isImage)
    return call.post(api+API_FORMATTER, body)
  }
  put = (api: string, body?: any, isImage?: boolean) => {
    console.log('HTTPService post url ==>', api)
    console.log('HTTPService post body ==>', body)
    const call = this.create(api, isImage)
    return call.put(api+API_FORMATTER, body)
  }
}