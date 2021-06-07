import IndexService from '@/service/tenant/indexService';

type IndexControllerType = {
  tenantIndexService: IndexService
}

class IndexController {
  private tenantIndexService: IndexService;
  constructor({
    tenantIndexService
  }: IndexControllerType) {
    this.tenantIndexService = tenantIndexService;
  }

  async actionData() {
    // 数据处理
    return await this.tenantIndexService.getData();
  }

  async errorDemo() {
    // console.log(ctx, process.env);
    // 数据处理
    return await this.tenantIndexService.error();
  }
}

export default IndexController;