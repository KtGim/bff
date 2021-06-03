import BaseService from '../index';
import { handleClass, handleResponse } from '@/utils/prerequest';
import { getUserOpenId } from '@/apis/tenant/TenantTicket'
@handleClass(__dirname) // 包裹方法的错误处理方式
class IndexService extends BaseService {
  constructor() {
    super()
  }

  @handleResponse(__dirname) //包裹方法的错误处理方式
  async getData() {
    return await getUserOpenId({
      openId: 'o5HTy6Dh3o94WMQ8tFeE8ZGOP1ck',
      query: {
        customerId: 1000,
      }
    });
  }

  @handleResponse(__dirname)
  async error() {
    return await new Promise<{data: string, status: number}>(res => {
      throw Error('抛出错误')
      res({data: 'error', status: 200})
    });
  }

}

export default IndexService;