import BaseService from '../index';
import { handleClass, handleResponse } from '@/utils/prerequest';
@handleClass(__dirname) // 包裹方法的错误处理方式
class IndexService extends BaseService {

  constructor() {
    super()
  }

  @handleResponse(__dirname) //包裹方法的错误处理方式
  async login() {
    return 
  }

}

export default IndexService;