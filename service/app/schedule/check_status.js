module.exports = {
  schedule: {
    interval: '10m', // 5秒检测一次状态
    type: 'worker',
    immediate: true
  },
  async task(ctx) {
    const os = require('os')
    const dayjs = require('dayjs')
    // 当前ip  当前时间  运行时间uptime  当前用户userInfo().username 系统类型type  主机名hostname
    const basic = {
      ip: '127.0.0.1',
      currentTime: dayjs().format('yyyy-MM-dd HH:mm:ss'),
      uptime: dayjs(os.uptime()).format('d H:mm:ss'),
      username: os.userInfo().username,
      osType: os.type(),
      hostname: os.hostname()
    }
    // ctx.logger.info(basic)
  },
};