import { route, GET } from 'awilix-koa';
import { Context } from 'koa';

import AuthController from './authController';

@route("/oauth")
class Index {
  private authController: AuthController;

  constructor(cradle: any) {
    this.authController = new AuthController(cradle);
  }

  @route("/token")
  @GET()
  async index(ctx: Context) {
    // console.log(ctx.state.container.cradle)
    const result = await this.authController.login();
    this.initResponse(ctx, result)
  }

  private initResponse(ctx: Context, data: any, ) {
    ctx.body = {
      data,
      status: 200,
      success: true,
    }
  }
}

export default Index;