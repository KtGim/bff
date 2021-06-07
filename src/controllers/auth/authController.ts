import IndexService from '@/service/auth/indexService';
import { Context } from 'koa';

type IndexControllerType = {
  authIndexService: IndexService
}

class AuthController {
  private authIndexService: IndexService;
  constructor({
    authIndexService
  }: IndexControllerType) {
    this.authIndexService = authIndexService;
  }

  async login() {
    return await this.authIndexService.login();
  }

  async getUser(ctx: Context) {
    const res = await this.authIndexService.getUser(ctx);
    return res.data;
  }
}

export default AuthController;