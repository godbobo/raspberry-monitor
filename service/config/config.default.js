module.exports = {

  // cookies
  keys: 'j9fds8fs8v6s89',

  // 安全配置
  jwt: {
    secret: '9d8d7d7',
    username: 'admin',
    password: '1'
  },

  security: {
    csrf: {
      enable: false
    }
  },

  cors: {
    origin: '*',
    allowMethods: '*'
  },

  middleware: [ 'logRequest', 'parseResult' ],

  // 自定义日志记录
  customLogger: {
    scheduleLogger: {
      consoleLevel: 'INFO'
    }
  },

  // httpClient配置
  httpclient: {

    request: {
      timeout: 10000
    }

  },

  // 全局缓存
  cache: {
    default: 'memory',
    stores: {
      memory: {
        driver: 'memory',
        max: 100,
        ttl: 0
      }
    }
  },

  // 异常处理
  onerror: {
    all(err, ctx) {
      ctx.body = JSON.stringify(ctx.helper.returnError(err.message, ctx.status));
    },
  }
}