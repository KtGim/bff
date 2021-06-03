import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import redis from '../redis';

axios.interceptors.request.use((config) => {
  config.url = `${redis.getKey('ENV')}${config.url}`
  return config;
})
axios.interceptors.response.use((config) => {
  return config;
})

type methodType = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
interface RequestOptions extends AxiosRequestConfig {
  method: methodType,
}
class AxiosInstances {
  request<T>(url: string, opt: RequestOptions): Promise<AxiosResponse<T>>  {
    const {
      method
    } = opt;
    const lowerMethodCase: methodType = method.toLowerCase() as methodType;
    return axios[lowerMethodCase]<T>(url, opt);
  }
}

const axiosInstance = new AxiosInstances();
export default axiosInstance.request;