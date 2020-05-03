const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '你好，树莓派';
  }
}

module.exports = HomeController;