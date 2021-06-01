import IndexService from 'src/service/auth/indexService';

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
}

export default AuthController;