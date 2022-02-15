<template>
	<view class="containerZd">
		<view class="zdImg" v-if="!no">
			<image src="../../../assets/temp/w.jpeg">
			</image>
			<ol>
				<li>本功能依靠手机自带的三轴加速度传感器来实现，具体轴位方向见上示意图。</li>
				<li>采样频率有5Hz,16Hz,50Hz可选。</li>
				<li>导出数据仅在云端保留一天，尽快下载</li>
			</ol>


		</view>
		<toolsAzdChart ref="toolsA_zd_child" v-if="no"></toolsAzdChart>

		<view class="btn">
			<button type="primary" @click="startAcc">start</button>
			<button type="warn" @click="stopAcc">stop</button>
			<button @click="downAcc">down</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				no: false

			};
		},
		mounted() {

		},

		methods: {
			stopAcc() {
				this.$refs.toolsA_zd_child.stop()
			},
			startAcc() {
				this.no = true
			}

		}
	};
</script>

<style>
	.containerZd {
		padding: 10rpx;
		font-size: 29rpx;
		color: #808080;
	}

	.btn {
		padding: 10rpx;
		display: flex;
	}

	.zdImg {
		width: 98vw;
		height: 80vh;
	}

	.zdImg image {
		display: block;
		margin: 0 auto;
		height: 75%;
		margin-bottom: 30rpx;
	}
</style>
