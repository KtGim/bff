import { Context } from 'koa';
import IndexService from 'src/service/tenant/indexService';

type IndexControllerType = {
  indexService: IndexService
}

class IndexController {
  private indexService: IndexService;
  constructor({
    indexService
  }: IndexControllerType) {
    this.indexService = indexService;
  }

  async actionData(ctx: Context) {
    // 数据处理
    const result = await this.indexService.getData();
    ctx.body = {
      result
    }
  }
}

export default IndexController;