const Controller = require('egg').Controller;

class MachineInfosController extends Controller {
  async index() {
    const {ctx, app} = this;
    const os = require('os')
    // 当前ip  当前时间  运行时间uptime  当前用户userInfo().username 系统类型type  主机名hostname
    const ip = await app.cache.get('publicIp', '127.0.0.1')
    ctx.body = {
      ip: ip,
      currentTime: new Date().getTime(),
      uptime: os.uptime(),
      username: os.userInfo().username,
      osType: os.type(),
      hostname: os.hostname()
    }
  }

  async control() {
    const {ctx} = this
    const machine = ctx.request.body
    const child_process = require('child_process')
    if (machine.action === 'shutdown') {
      ctx.logger.info('执行关机操作')
      child_process.execSync('shutdown now')
    } else if (machine.action === 'reboot') {
      ctx.logger.info('执行重启操作')
      child_process.execSync('reboot')
    }
  }
}
module.exports = MachineInfosController;