import BaseService from '../index';
import { handleResponse } from '../../utils/request';
class IndexService extends BaseService {
  constructor() {
    super()
  }

  @handleResponse()
  async getData() {
    const res = await this.commonRequest.get('/wechat/user/otCj31fU0ob5IE9nqbLgpJhwF7BI?customerId=1001');
    return res.data;
  }

  @handleResponse()
  async error() {
    throw new Error("手动抛错2");
  }

}

export default IndexService;