<template>
	<view>
		<u-navbar :is-back="false" :title="title" :background="background" title-color="white"></u-navbar>

		<view class="info-wrap bg-white margin-top radius padding">
			<view class="row host-wrap">
				<u-icon :name="hostIconName" custom-prefix="custom-icon" size="40"></u-icon>
				<text class="host-txt margin-h-gap">{{ machineInfos.hostname }}</text>
				<view class="flex-1 text-right">
					<u-icon name="setting" size="40" @click="showMachineOption = true"></u-icon>
				</view>
			</view>
			<u-cell-group>
				<u-cell-item icon="account" :title="machineInfos.username" :arrow="false" :hover="false"></u-cell-item>
				<u-cell-item :title="machineInfos.ip" :arrow="false" :hover="false">
					<u-icon slot="icon" size="36" name="ip" custom-prefix="custom-icon"></u-icon>
					<u-icon slot="right" size="36" name="copy" custom-prefix="custom-icon" @tap="copyToClipboard"></u-icon>
				</u-cell-item>
				<u-cell-item :hover="false" :arrow="false" :value="currentTimeString" icon="clock" title="当前时间"></u-cell-item>
				<u-cell-item :hover="false" :arrow="false" :value="upTimeString" icon="clock" title="运行时间"></u-cell-item>
			</u-cell-group>
		</view>

		<!-- 隐藏元素 -->
		<u-popup v-model="showMachineOption" mode="bottom">
			<view class="row btn-wrap">
				<view class="flex-1 column items-center justify-center" @tap="showShutdownModal">
					<u-icon name="shutdown" custom-prefix="custom-icon" size="60" color="red"></u-icon>
					<view>关机</view>
				</view>
				<view class="flex-1 column items-center justify-center" @tap="showRebootModal">
					<u-icon name="reboot" custom-prefix="custom-icon" size="60" color="orange"></u-icon>
					<view>重启</view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="showModal" show-cancel-button :content="content" @confirm="controlMachine"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import dayjs from '@/libs/dayjs/index.js'

	export default {
		data() {
			return {
				title: '信息监控',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				machineInfos: {},
				currentTime: null,
				upTime: null,
				showMachineOption: false,
				showModal: false,
				content: '',
				optType: ''
			}
		},

		computed: {

			// 主机图标名
			hostIconName() {
				if (this.machineInfos.osType === 'Darwin') {
					return 'mac'
				} else if (this.machineInfos.osType === 'Linux') {
					return 'linux'
				} else if (this.machineInfos.osType === 'Windows_NT') {
					return 'win'
				} else {
					return 'host'
				}
			},

			// 当前时间
			currentTimeString() {
				if (this.currentTime) {
					return this.currentTime.format('YYYY-MM-DD HH:mm:ss')
				} else {
					return ''
				}
			},

			// 运行时间
			upTimeString() {
				if (this.upTime) {
					var days = Math.floor(this.upTime / (24 * 3600))
					var leave1 = this.upTime % (24 * 3600) //计算天数后剩余的毫秒数  
					var hours = Math.floor(leave1 / 3600)
					//计算相差分钟数  
					var leave2 = leave1 % 3600 //计算小时数后剩余的毫秒数  
					var minutes = Math.floor(leave2 / 60)
					//计算相差秒数  
					var leave3 = leave2 % 60 //计算分钟数后剩余的毫秒数  
					var seconds = Math.round(leave3)
					return `${days}天 ${hours}小时${minutes}分${seconds}秒`
				} else {
					return ''
				}
			}
		},

		onLoad() {
			this.getMachineInfo()
		},
		methods: {

			// 获取服务器信息
			async getMachineInfo() {
				try {
					const res = await this.$h.http.get('/api/v1/machine/infos')
					this.machineInfos = res
					this.currentTime = dayjs(res.currentTime)
					this.upTime = res.uptime
					setTimeout(this.ticker, 1000)
				} catch (e) {
					console.error(e)
				}
			},

			ticker() {
				this.currentTime = this.currentTime.add(1, 'second')
				this.upTime++
				setTimeout(this.ticker, 1000)
			},

			showShutdownModal() {
				this.showMachineOption = false
				this.content = '关机后需要手动开机，你确定要这么做吗'
				this.showModal = true
				this.optType = 'shutdown'
			},

			showRebootModal() {
				this.showMachineOption = false
				this.content = '重启后将有一段时间无法操作，你确定要这么做吗'
				this.showModal = true
				this.optType = 'reboot'
			},

			async controlMachine() {
				try {
					await this.$h.http.put('/api/v1/machine/control', { action: this.optType })
					this.$refs.uToast.show({
						title: '操作成功',
						type: 'success'
					})
				} catch (e) {
					console.error(e)
					this.$refs.uToast.show({
						title: '操作失败',
						type: 'error'
					})
				}
			},

			async copyToClipboard() {
				try {
					await this.$h.setClipboard(this.machineInfos.ip)
					//#ifdef H5
					this.$refs.uToast.show({
						title: '复制成功',
						type: 'success'
					})
					//#endif
				} catch (e) {
					console.error(e)
					this.$refs.uToast.show({
						title: '复制失败',
						type: 'error'
					})
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.info-wrap {

		.host-wrap {
			border-bottom: 1px solid $u-border-color;
			padding: 5px 0;

			.host-txt {
				font-size: 20px;
			}
		}
	}

	.btn-wrap {
		padding: 30px 0;
	}
</style>
