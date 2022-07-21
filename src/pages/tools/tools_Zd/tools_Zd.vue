<template>
	<view :class="show?'hideBox':''">
	<view class="containerZd" :style="'height: '+_Height+'rpx'">
		<!--登录模态框 -->
		<view class="zdImg" v-if="!no" >
			<image  :style="'height: '+_Height*0.7+'rpx'" src="https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/zdpic/1021650182995_.pic.jpg">
			</image>
		</view>
		<!-- 加速度图表组件-->
		
			<toolsAzdChart  :_Height='_Height' :radio_value="whichRadio" @maxPost="maxPost" ref="toolsA_zd_childa" v-if="no"></toolsAzdChart>
		
		<!--最大加速度，模块-->
		<view class="btngroup">
			<view class="radioview">
				<radio-group @change="radioChange">
					<radio color="#3F67F3" v-for="(item,index) in radioItems"  :value="item.radiovalue" :checked="item.checked">
						{{item.radiovalue}}轴
					</radio>
				</radio-group>
			</view>
			<view class="btn">
				<view>
					<u-button  color="#3F67F3"  @click="startAcc" :disabled="startOrStop">start</u-button>
				</view>
				<view>
					<u-button color="#f10006"   @click="stopAcc" :disabled="!startOrStop">stop</u-button>
				</view>
				<view>
					<u-button  color="#f4acf1" @click="downAcc">导出</u-button>
				</view>
			</view>
		</view>
		<view>
			<u-modal   @confirm="confirm" @cancel="cancel" showCancelButton :show="show" :title="title" cancelText="取消"
				confirmText="确认">
				<view class="slot-content">
					<text>请您登录，登录后，导出后数据会存档</text>											
				</view>
			</u-modal>
		</view>
	</view>
	</view>
	
</template>

<script>
	import myMixin from "../../../components/myMixin.js"
	export default {
	
		mixins: [myMixin],
		data() {
			
			return {
				_Height:undefined,
				show: false,
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
		beforeMount() {
			//获取计算器页面的可用屏幕尺寸
			let that=this
			if(getApp().globalData.noTarBarHright){
				this._Height=getApp().globalData.noTarBarHright
			}else{
				uni.getSystemInfo({
				    success: function(res) {
				        /* console.log(res.screenHeight); //屏幕高度  注意这里获得的高度宽度都是px 需要转换rpx
				        console.log(res.windowWidth); //可使用窗口宽度
				        console.log(res.windowHeight); //可使用窗口高度
				        console.log(res.screenWidth); //屏幕宽度 */
						that._Height = (res.windowHeight * (750 / res.windowWidth)) //将px 转换rpx
				        getApp().globalData.noTarBarHright=that._Height
				    }
				});
			}
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
			},
			//导出数据
			downAcc(){
				this.stopAcc()
				let result=this.checkLoginState()
				if(result){
					let e=getApp().globalData.g_openid
					this.$refs.toolsA_zd_childa.postAccData(e)
				}else{
					this.show = true
				}
			},
			//登录模态框的关闭与开启
			confirm() {
				this.show = false
				let user
				wx.getUserProfile({
					desc: '授权登录',
					success: (res) => {
						this.getUserInfo(res.userInfo).then(res => {
							this.$refs.toolsA_zd_childa.postAccData(res)
						})
						//this.$refs.toolsA_zd_childa.postAccData(res.userInfo)
					}
				})
			},
			cancel() {
				this.show = false
			},
			
		},
		
		}
</script>

<style>
	.containerZd {
		
		
		padding-bottom: 5rpx;
		font-size: 29rpx;
		color: #8f8e90;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.btngroup {
		text-align: center;
		padding-bottom: 40rpx;
		
	}

	radio {
		margin: 5rpx 42rpx;
		padding-bottom: 5rpx;
	}

	.btn {
		padding: 5rpx;
		display: flex;
		width: 85vw;
		justify-content: space-evenly;
	}
	



	.zdImg image {
		
		display: block;
		margin: 0 auto;
		

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
	.hideBox{
		position: absolute;
		top: -2000px;
	}
</style>
