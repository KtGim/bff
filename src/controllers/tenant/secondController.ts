import { Context } from 'koa';
import SecondService from '../../service/tenant/secondService';

type SecondControllerType = {
  secondService: SecondService
}

class SecondController {
  private secondService: SecondService;
  constructor({
    secondService
  }: SecondControllerType) {
    this.secondService = secondService;
  }

  async actionData(ctx: Context) {
    // 数据处理
    const result = await this.secondService.getData();
    ctx.body = {
      result
    }
  }
}

export default SecondController;