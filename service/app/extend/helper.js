module.exports = {

  /**
   * 返回错误
   * @param {String} msg 错误信息
   */
  returnError(msg, code = 500) {
    return {
      status: 'error',
      message: msg,
      code: code
    };
  },

}