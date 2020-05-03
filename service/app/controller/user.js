const Controller = require('egg').Controller;

const loginRules = {
  username: 'string',
  password: 'string'
}

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate(loginRules, ctx.request.body)
  // post请求传来的参数
  const { username, password } = ctx.request.body;
  // 判断数据库里面是否存在该用户
  ctx.body = ctx.service.user.login(username, password);
  }
}

module.exports = UserController;