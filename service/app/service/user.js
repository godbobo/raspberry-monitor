const Service = require('egg').Service;

class UserService extends Service {

  login(username, password) {
    const {app} = this
    const crypto = require('crypto')
    const loginResult = username === app.config.jwt.username && password === crypto.createHash('md5').update(app.config.jwt.password).digest('hex')

    if (loginResult) {
      const token = app.jwt.sign({ name: username}, app.config.jwt.secret, {expiresIn: '7d'});
      return {token}
    } else {
      throw new Error('用户名或密码错误')
    }
  }

}

module.exports = UserService;