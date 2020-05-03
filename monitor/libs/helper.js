import http from './http.interceptor.js'
import h5Copy from './junyi-h5-copy.js'

export default {
	http,
	
	// 验证ip是否正确
	isValidIP(ip) {
		const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
		return reg.test(ip);
	},
	
	// 验证域名是否正确
	isValidDomain(domain) {
		const reg = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
		return reg.test(domain)
	},
	
	// 设置剪切板数据
	setClipboard(txt) {
		return new Promise((resolve, reject) => {
			if (typeof(txt) === 'number' || typeof(txt) === 'string') {
				txt += ''
				//#ifdef H5
				if (h5Copy(txt)) {
					resolve()
				} else {
					reject(new Error('剪切板操作不支持该浏览器版本'))
				}
				//#endif
				//#ifndef H5
				uni.setClipboardData({
					data: txt,
					success: () => {
						resolve()
					},
					fail: () => {
						reject(new Error('设置剪切板内容失败'))
					}
				})
				//#endif
			} else {
				reject(new Error('不支持的数据类型（仅可设置字符串）'))
			}
		})
		
	}
}
