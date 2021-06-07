import BaseService from '../index';
import { handleClass, handleResponse } from '@/utils/prerequest';
import { getUsersInfo } from '@/apis/tenant/wechat-pay'
import { Context } from 'koa';
@handleClass(__dirname) // 包裹方法的错误处理方式
class IndexService extends BaseService {

  constructor() {
    super()
  }

  @handleResponse(__dirname) //包裹方法的错误处理方式
  async login() {
    return 
  }

  @handleResponse(__dirname) //包裹方法的错误处理方式
  async getUser(ctx: Context) {
    const headers = {...ctx.headers};
    headers.host = 'rc-app.creams.io';
    return await getUsersInfo({
      query: {},
      opt: {
        headers: headers,
      }
    })
  }
}

export default IndexService;