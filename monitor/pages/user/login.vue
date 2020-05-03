<template>
	<view>
		<!-- 顶部标题 -->
		<view class="row justify-center logo-wrap">
			<u-icon name="pai" custom-prefix="custom-icon" size="60" color="red"></u-icon>
			<text class="app-title">树莓派监控</text>
		</view>
		
		<!-- 登录表单 -->
		<form>
			<view class="row login-form wrap">
				<view class="keyboard-field margin-top row">
					<view class="ip-prefix">http://</view><input v-model="ip" class="flex-1 field-input" placeholder="请输入树莓派IP地址或域名" confirm-type="next" />
				</view>
				<view class="keyboard-field margin-top">
					<input v-model="username" class="field-input" placeholder="请输入用户名" confirm-type="next" />
				</view>
				<view class="keyboard-field margin-top">
					<input password v-model="password" class="field-input" placeholder="请输入密码" confirm-type="done" />
				</view>
				<view class="btn-field">
					<u-button :loading="showLoginLoading" ripple type="error" shape="circle" @click="login">登录</u-button>
				</view>
			</view>
		</form>
		
		<!-- 隐藏元素 -->
		<u-top-tips ref="uTips" :navbar-height="0" type="warning"></u-top-tips>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import md5Libs from '@/uview/libs/function/md5.js'
	
	export default {
		
		name: 'Login',
		
		data() {
			return {
				ip: '',
				username: '',
				password: '',
				showLoginLoading: false
			}
		},
		
		computed: {
			...mapState({
				vuex_url: state => state.vuex_url
			})
		},
		
		onLoad() {
			if (this.vuex_url) {
				this.ip = this.vuex_url.substr(7, this.vuex_url.length - 7)
			}
		},
		
		methods: {
			
			...mapMutations(['setUrl', 'setVuexToken']),
			
			// 登录
			async login() {
				
				if (this.ip && this.username && this.password) {
					this.showLoginLoading = true
					if (this.ip.indexOf('http://') === 0) {
						this.setUrl(this.ip)
					} else {
						this.setUrl('http://' + this.ip)
					}
					
					try{
						const {token} = await this.$h.http.post('/api/v1/user/login', {
							username: this.username,
							password: md5Libs.md5(this.password)
						})
						
						this.setVuexToken(token)
						// 跳转首页
						this.$Router.push('/pages/monitor/index')
					}catch(err){
						this.$refs.uTips.show({
							title: err.message
						})
					} finally {
						this.showLoginLoading = false
					}
				} else {
					this.$refs.uTips.show({
						title: '请补充信息后登录'
					})
				}
			}
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.logo-wrap {
		margin: 80px 0;
		
		.app-title {
			font-size: 30px;
		}
	}
	
	.login-form {
		padding: 0 50rpx;
		
		.keyboard-field {
			width: 100%;
			border: 1px solid $uni-border-color;
			border-radius: 40rpx;
			background-color: white;
			
			.ip-prefix {
				padding: 10px 20rpx;
				border-top-left-radius: 40rpx;
				border-bottom-left-radius: 40rpx;
				border-right: 1px solid $u-border-color;
				font-size: 32rpx;
				background-color: $u-type-info-light;
			}
			
			.field-input {
				padding: 10px 20rpx;
			}
		}
		
		.btn-field {
			width: 100%;
			margin-top: 20px;
		}
	}
</style>
