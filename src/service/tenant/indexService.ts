import BaseService from '../index';
import { handleClass, handleResponse } from '../../utils/request';
// @handleClass(__dirname) // 包裹方法的错误处理方式
class IndexService extends BaseService {
  constructor() {
    super()
  }

  @handleResponse(__dirname) //包裹方法的错误处理方式
  async getData() {
    const res = await this.commonRequest.get('/wechat/user/otCj31fU0ob5IE9nqbLgpJhwF7BI?customerId=1001');
    return res.data;
  }

  @handleResponse(__dirname)
  async error() {
    throw new Error("手动抛错2");
  }

}

export default IndexService;