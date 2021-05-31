import Request from '../utils/request';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import redis from '../utils/redis';

type RequestType = 'COMMON';

class BaseService {
  protected commonRequest: AxiosInstance;
  baseUrl: string;
  constructor() {
    this.baseUrl = redis.getKey('ENV')
    this.commonRequest = this.create('COMMON', {
      baseURL: this.baseUrl,
    });
  }
  
  create(type: RequestType = 'COMMON', opts: AxiosRequestConfig = {}): AxiosInstance {
    switch(type) {
      case 'COMMON':
        this.commonRequest = new Request(opts).getInstance();
        return this.commonRequest
    }
  }

  getRequestInstance(type: RequestType = 'COMMON') {
    switch(type) {
      case 'COMMON':
        return this.commonRequest
    }
  }
}

export default BaseService;
