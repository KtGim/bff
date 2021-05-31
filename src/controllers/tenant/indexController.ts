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

  async actionData() {
    // console.log(ctx, process.env);
    // 数据处理
    return await this.indexService.getData();
  }

  async errorDemo() {
    // console.log(ctx, process.env);
    // 数据处理
    return await this.indexService.error();
  }
}

export default IndexController;