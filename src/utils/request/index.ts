import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import chalk from 'chalk';
import { errorLog, infoLog } from '../Logger'

class AxiosRequest {
  private opts: AxiosRequestConfig;
  private instance: AxiosInstance;

  constructor(opts: AxiosRequestConfig) {
    this.opts = opts;
    this.instance = this.create();
  }

  create(): AxiosInstance  {

    this.instance = axios.create(this.opts);
    return this.instance;
  }

  getInstance(): AxiosInstance {
    if(this.instance) {
      return this.instance
    }
    return this.create(); 
  }

}

const green = (str: string) => chalk.green(str);
const red = (str: string) => chalk.red(str);

const handleResponse = () => {
  return (target: any, name: any, descriptor: any) => {
    const functionName = target.constructor.name;
    let value = async function (...args: any[]) {
      let data;
      try {
        // 获取到调用方法的 this
        data = await descriptor.value.apply(target.constructor(), args);
        infoLog.logOut && infoLog.logOut(`${green('Success')} Time:`, new Date(), `${green(`${functionName} -> ${name}`)} 请求成功`)
      } catch(err) {
        // console.log(err);
        data = {
          data: null,
          status: 500,
          errorMsg: err,
          success: false
        }
        errorLog.logOut && errorLog.logOut(`${red('Fail')} Time:`, new Date(), `${red(`${functionName} -> ${name}`)} 请求失败`)
      }
      return data
    }
    return {
      ...descriptor,
      value
    }
  }
}

export {
  handleResponse
};

export default AxiosRequest;

