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
    Promise.all([
      await this.indexController.actionData(),
      await this.indexController.errorDemo()
    ]).then((res) => {
      const [a1, a2] = res;
      if (res.every(r => this.validateStatus(r.status))) {
        this.initResponse(ctx, '成功', true)
      } else {
        this.initResponse(ctx, null, false, '请求失败')
      }
    })
    // const {data: result, status} = await this.indexController.actionData();
    // const res = await this.indexController.errorDemo();
    // this.initResponse(ctx, res.data, error)
  }

  @route("/second")
  @GET()
  async second(ctx: Context) {
    // console.log(ctx.state.container.cradle)
    await this.secondController.actionData(ctx);
  }

  private initResponse(ctx: Context, data: any, success: boolean = true, error?: string) {
    ctx.body = {
      data: data ? data : null,
      status: 200,
      success,
      error: error || undefined
    }
  }

  private validateStatus(code: number) {
    return code >= 200 && code < 300
  }
}

export default Index;