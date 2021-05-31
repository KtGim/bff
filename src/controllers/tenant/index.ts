import { route, GET } from 'awilix-koa';
import { Context } from 'koa';
import IndexController from './indexController';
import SecondController from './secondController';

@route("/tenant")
class Index {
  private indexController: IndexController;
  private secondController: SecondController;

  constructor(cradle: any) {
    this.indexController = new IndexController(cradle);
    this.secondController = new SecondController(cradle);
  }

  @route("/index")
  @GET()
  async index(ctx: Context) {
    // console.log(ctx.state.container.cradle)
    const result = await this.indexController.actionData();
    const result1 = await this.indexController.errorDemo();
    this.initResponse(ctx, result)
  }

  @route("/second")
  @GET()
  async second(ctx: Context) {
    // console.log(ctx.state.container.cradle)
    await this.secondController.actionData(ctx);
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