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

/**
 * @param path 文件处理路径, 建议赋值 __dirname
 */
const handleResponse = (path: string) => {
  return (target: any, name: any, descriptor: any) => {
    const functionName = target.constructor.name;
    let value = async function (...args: any[]) {
      const info = `${path}: ${functionName}服务 ${name}方法`;
      let data;
      try {
        // 获取到调用方法的 this
        data = await descriptor.value.apply(new target.constructor(), args);
        infoLog.logOut && infoLog.logOut(`${green('Success')} Time:`, new Date(), `${green(info)}`)
      } catch(err) {
        data = {
          data: null,
          status: 500,
          errorMsg: err,
          success: false
        }
        errorLog.logOut && errorLog.logOut(`${red('Fail')} Time:`, new Date(), `${red(info)}`)
        console.log(err);
      }
      return data
    }
    return {
      ...descriptor,
      value
    }
  }
}
/**
 * @param path 文件处理路径
 */
function handleClass(path: string) {
  return (t: any) => {
    const proto = t.prototype;
    const fName = proto.constructor.name;
    Object.keys(proto).forEach(prop => {
      if (prop !== 'constructor' && proto.hasOwnProperty(prop)) {
        const value = Reflect.get(proto, prop);
        const info = `${path}: ${fName}服务 ${prop}方法`;
        if (typeof value === 'function') {
          let val = async function(...params: any[]) {
            let data;
            try {
              data = await value.apply(new proto.constructor(), params);
              infoLog.logOut && infoLog.logOut(`${green('Success')} Time:`, new Date(), `${green(info)}`)
            } catch(e) {
              data = {
                data: null,
                status: 500,
                errorMsg: e.message,
                success: false
              }
              errorLog.logOut && errorLog.logOut(`${red('Fail')} Time:`, new Date(), `${red(info)}`)
            }
            return data;
          }
          Reflect.set(proto, prop, val, proto)
        } else {
          Reflect.set(proto, prop, value, proto)
        }
      }
    })
  };
}


export {
  handleResponse,
  handleClass
};

export default AxiosRequest;