import axios, { AxiosResponse } from 'axios'

interface RetryPostParams {
  body: any,
  options?: any,
  url: string,
}

interface RetryGetParams {
  options?: any,
  url: string,
}

export async function post(params: RetryPostParams): Promise<AxiosResponse<any>> {
  return axios.post(
    params.url,
    params.body,
    params.options,
  )
}

export async function get(params: RetryGetParams): Promise<AxiosResponse<any>> {
  return axios.get(params.url, params.options)
}