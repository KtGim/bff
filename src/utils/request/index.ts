import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import redis from '../redis';

axios.interceptors.request.use((config) => {
  config.url = `${redis.getKey('ENV')}${config.url}`
  // console.log(config.headers);
  return config;
})
axios.interceptors.response.use((config) => {
  console.log(config.headers);
  return config;
})

type methodType = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
interface RequestOptions extends AxiosRequestConfig {
  method: methodType,
}
class AxiosInstances {
  request<T>(url: string, opt: RequestOptions): Promise<AxiosResponse<T>>  {
    const {
      method,
      headers
    } = opt;
    const lowerMethodCase: methodType = method.toLowerCase() as methodType;
    return axios[lowerMethodCase]<T>(url, {
      url,
      method: lowerMethodCase,
      headers,
    });
  }
}

const axiosInstance = new AxiosInstances();
export default axiosInstance.request;