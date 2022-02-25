<template>
	<view class="containerZd" >
		<view class="zdImg" v-if="!no">

			<image src="../../../assets/temp/w.jpeg">
			</image>


		</view>
		<view v-if="!no">
			<ol>
				<li>本功能依靠手机自带的三轴加速度传感器来实现，具体轴位方向见上示意图。</li>
				<li>采样频率有5Hz,16Hz,50Hz可选。</li>
				<li>导出数据仅在云端保留一天，尽快下载</li>
			</ol>
		</view>
		<!-- 加速度图表组件-->

		<toolsAzdChart :radio_value="whichRadio" @maxPost="maxPost" ref="toolsA_zd_childa" v-if="no"></toolsAzdChart>

		<!--最大加速度，模块-->
		<view class="maxpanel">
			<view v-show="whichRadio=='X'&&no" class="maxpanelx">
				X轴最大加速度：{{max.x.toFixed(2)}}
			</view>
			<view v-show="whichRadio=='Y'&&no" class="maxpanely">
				Y轴最大加速度：{{max.y.toFixed(2)}}
			</view>
			<view v-show="whichRadio=='Z'&&no" class="maxpanelz">
				Z轴最大加速度：{{max.z.toFixed(2)}}
			</view>
		</view>
		<view class="btngroup">
			<view class="radioview">
				<radio-group @change="radioChange">
					<radio v-for="(item,index) in radioItems" :value="item.radiovalue" :checked="item.checked">
						{{item.radiovalue}}轴
					</radio>
				</radio-group>
			</view>
			<view class="btn">
				<button type="primary" @click="startAcc" :disabled="startOrStop">start</button>
				<button type="warn" @click="stopAcc" :disabled="!startOrStop">stop</button>
				<button @click="downAcc">导出</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//设备屏幕宽度
				pageHeight1: "200px",
				no: false,
				radioItems: [{
						radiovalue: "X",
						checked: "true"
					},
					{
						radiovalue: "Y"
					},
					{
						radiovalue: "Z"
					}
				],
				whichRadio: "X",
				//禁用start和stop按钮
				startOrStop: false,
				//chart中的最大值
				max: {
					x: 0,
					y: 0,
					z: 0
				}
			};
		},
		mounted() {
			//获取计算器页面的可用屏幕尺寸
			
			
			
		},

		methods: {
			//接受toolsAzdChart子组件中的最大值，取绝对值，再赋值给本页面data
			maxPost(e) {

				this.max.x = e.x >= 0 ? e.x : -e.x
				this.max.y = e.y >= 0 ? e.y : -e.y
				this.max.z = e.z >= 0 ? e.z : -e.z

			},
			startAcc() {
				this.startOrStop = !this.startOrStop
				if (!this.no) {
					this.no = true
				} else {
					this.$refs.toolsA_zd_childa.start()
				}
			},
			stopAcc() {
				this.startOrStop = !this.startOrStop
				this.$refs.toolsA_zd_childa.stop()

			},
			radioChange(e) {
				//whichRadio传递到图表组件内部
				this.whichRadio = e.detail.value
			}
		}
	};
</script>

<style>
	.containerZd {
		padding-bottom: 5rpx;
		font-size: 29rpx;
		color: #808080;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.btngroup {
		text-align: center;
		padding-bottom: 25rpx;
	}

	radio {
		margin: 15rpx 42rpx;
		padding-bottom: 15rpx;
	}

	.btn {
		padding: 10rpx;
		display: flex;
	}



	.zdImg image {
		padding: 30rpx;
		display: block;
		margin: 0 auto;
		width: 620rpx;
		height: 800rpx;
		margin-bottom: 30rpx;
	}

	.maxpanel {
		text-align: center;
		font-size: 39rpx;
		color: #DD524D;
	}

	.maxpanel .maxpanely {
		color: #1890FF;
	}

	.maxpanel .maxpanelz {
		color: #91CB74;

	}
</style>
