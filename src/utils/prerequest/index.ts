import { AxiosResponse } from 'axios';
import chalk from 'chalk';
import { Context } from 'koa';
import { errorLog, infoLog } from '../Logger'

const green = (str: string) => chalk.green(str);
const red = (str: string) => chalk.red(str);

interface AxiosResponseType<T = any> extends AxiosResponse<T> {
  errorMsg?: string;
  data: any;
  success: boolean;
}

export interface CustomerResponseType<T = any> extends Partial<AxiosResponseType<T>> {}

/**
 * @param path 文件处理路径, 建议赋值 __dirname
 */
const handleResponse = (path: string) => {
  return (target: any, name: any, descriptor: any) => {
    const functionName = target.constructor.name;
    let value = async function<T> (...args: any[]): Promise<CustomerResponseType<T>> {
      // const headers = {...ctx.headers};
      // console.log(headers.host, '----')
      // headers.host = 'rc-app.creams.io';
      // http1.1 host 必须要带
      
      
      if (args && args[0]) {
        const ctx: Context = args[0];

        const {
          host,
          ...headers
        } = ctx.headers;
        const tempCtx = {
          ...ctx,
          headers
        }
        args[0] = tempCtx;
      }

      const info = `${path}: ${functionName}服务 ${name}方法`;
      let data: CustomerResponseType<T>;
      try {
        // 获取到调用方法的 this
        data = await descriptor.value.apply(new target.constructor(), args);
        infoLog.logOut && infoLog.logOut(`${green('请求成功: ')}`, new Date(), `${green(info)}`)
      } catch(err) {
        data = {
          errorMsg: err.message,
          success: false
        }
        errorLog.logOut && errorLog.logOut(`${red('请求失败: ')}`, new Date(), `${red(info)}`)
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
          let val = async function(...args: any[]) {

            if (args && args[0]) {
              const ctx: Context = args[0];
              
              const {
                host,
                ...headers
              } = ctx.headers;
              const tempCtx = {
                ...ctx,
                headers
              }
              args[0] = tempCtx;
            }

            let data;
            try {
              data = await value.apply(new proto.constructor(), args);
              infoLog.logOut && infoLog.logOut(`${green('请求成功: ')}`, new Date(), `${green(info)}`)
            } catch(e) {
              data = {
                errorMsg: e.message,
                success: false
              }
              errorLog.logOut && errorLog.logOut(`${red('请求失败: ')}`, new Date(), `${red(info)}\n`)
              console.log(e)
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