<template>

		<view  >
			
		<view :class="canvasShow?'hideBox':''">
			<view class="charts-box" >
				<qiun-data-charts type="gauge"    canvasId="yiyitime"  :opts="opts" :chartData="chartData" :animation="false" />
			</view>
			
			
			<view style="width: 90vw;padding: 5rpx;margin: 0 auto">
				<view style="width:80%;margin: 0 auto;">
					<u-grid :border="true" col=3>
						<u-grid-item  v-for="item in dataPanel"
							customStyle="padding-top: 10px;">
							<view style="display: flex;flex-direction:column;">
								<u--text :text="item[0]" type="info"  align="center"></u--text>
								<u--text :text="item[1]" type="info" align="center"></u--text>
							</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<view class="u-button-group">
				<view>
					<u-button :type="type" :text="btnText" @click="startRecord"></u-button>
				</view>
				<view>
					<u-button type="primary" text="存入云端" @click="endRecord"></u-button>
				</view>
			</view>
			<u-modal @confirm="noiseDataToCloud" @cancel="cancel" showCancelButton :show="show" title="请输入数据描述" cancelText="取消"
				confirmText="存入云端">
				<view class="slot-content">
					<u--input placeholder="数据名称" v-model="dataName"></u--input>
					<u-gap height="20"></u-gap>
					<u--textarea v-model="dataDis" placeholder="数据描述"></u--textarea>
				</view>
			</u-modal>
			<u-modal @confirm="login" @cancel="cancelLogin" showCancelButton :show="show3" cancelText="取消"
				confirmText="确认">
				<view class="slot-content">
					<text>请您登录，登录后，导出后数据会存档</text>
				</view>
			</u-modal>
			</view>
		</view>
	
</template>
<script>
	import myMixin from "../../../components/myMixin.js"
	const recorderManager = uni.getRecorderManager()
	export default {
		mixins: [myMixin],
		data() {
			return {
				canvasShow:false,
				show3:false,
				dataList:[],
				type:"primary",
				flag:false,
				btnText:"开始采集",
				dataDis: undefined,
				dataName: undefined,
				show:false,
				dataPanel:[
					["最小值",0],
					["当前值",0],
					["最大值",0]
					],
				chartData: {
					categories: [{"value":0.2,"color":"#1890ff"},{"value":0.8,"color":"#2fc25b"},{"value":1,"color":"#f04864"}],
					            series: [
					              {
					                name: "完成率",
					                data: 0.2
					              }
					            ]
				},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['gauge'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: undefined,
					title: {
						name: "单位:分贝/dB",
						fontSize: 15,
						color: "#7a7d88",
						offsetY: 50
					},
					subtitle: {
						name: "噪声值",
						fontSize: 18,
						color: "#666666",
						offsetY: -50
					},
					
					extra: {
						gauge: {
							type: "default",
							width: 30,
							labelColor: "#a23930",
							startAngle: 0.75,
							endAngle: 0.25,
							startNumber: 0,
							endNumber: 100,
							labelFormat: "",
							splitLine: {
								fixRadius: 0,
								splitNumber: 10,
								width: 30,
								color: "#FFFFFF",
								childNumber: 5,
								childWidth: 12
							},
							pointer: {
								width: 24,
								color: "auto"
							}
						}
					}
				}
			};
		},
		onReady() {
			//this.getServerData();
			let self = this;
			recorderManager.onStop(function(res) {
				console.log('recorder stop' + JSON.stringify(res));
			});
		},
		methods: {
			cancelLogin(){
				this.show3=false
				this.canvasShow=false
			},
			//上传数据按钮
			cancel(){
					this.show=false
					this.canvasShow=false
			},
		
			noiseDataToCloud(){
				uniCloud.callFunction({
						name: 'pushNoiseDataToCloud',
						data: {
							open_Id:getApp().globalData.g_openid,
							dataList: this.dataList,
							dataDis: this.dataDis,
							dataName: this.dataName,
							dataPanel:this.dataPanel
						}
					})
					.then(res => {
						this.show=false
						this.canvasShow=false
						uni.showToast({
							title: '已存入云端',
							duration: 1500
						});
				})
			},
			startRecord() {
				this.flag=!this.flag
				console.log(this.flag)
				this.btnText=this.flag?"停止采集":"开始采集"
				this.type=this.flag?"warning":"primary"
				if(!this.flag){
					console.log("stop")
					recorderManager.stop()
				}else{
					this.timeIsNotPro()
				}	
			},
			timeIsNotPro(){
				console.log('开始录音');
				recorderManager.start({
					duration: 60000,
					// 录音的时长，单位 ms，最大值 60000（1分钟）
					sampleRate: 16000,
					numberOfChannels:1,
					frameSize: 8,
					format: 'PCM'
				});
				recorderManager.onFrameRecorded(res => {
					const {
						frameBuffer
					} = res
					let pcmArr = new Int16Array(frameBuffer)
					let size = pcmArr.length
					let sum = 0;
					for (let i = 0; i < size; i++) {
						sum += Math.abs(pcmArr[i]);
					}
					let powerLevel = sum * 500.0 / (size * 16383);
					if (powerLevel >= 100) {
						powerLevel = 100
					}
					if (powerLevel <= 5) {
						powerLevel = 2
					}	
					let _powerLevel=parseInt(powerLevel)
					this.dataList.push(_powerLevel)
					this.dataPanel[0][1]=this.dataPanel[0][1]==0?_powerLevel:Math.min(this.dataPanel[0][1],_powerLevel)
					this.dataPanel[1][1]=_powerLevel
					this.dataPanel[2][1]=Math.max(this.dataPanel[2][1],_powerLevel)
					powerLevel =_powerLevel/100
					let chartNumber = {
						categories: [{"value":0.2,"color":"#1890ff"},{"value":0.8,"color":"#2fc25b"},{"value":1,"color":"#f04864"}],
						            series: [
						              {
						                name: "完成率",
						                data: powerLevel
						              }
						            ]
					};
					this.chartData = JSON.parse(JSON.stringify(chartNumber));
				})
				recorderManager.onStart()
			},
			
			
			endRecord() {
			
				this.canvasShow=true
				
				let result=this.checkLoginState()
			
				if (result) {
					//如果登陆了，调出“数据描述模框”,拿取得openid，调用云函数
					this.show=true
					
				} else {
					//登陆模块显示
					this.show3 = true
				}
				
				console.log('录音结束');
				this.btnText="开始采集"
				this.type="primary"
				recorderManager.stop();
				//this.show=true
			},
			login(){
				this.canvasShow=false
				let r=this.mainGetOpenId()
				
			} 
		
		}
	};
</script>

<style scoped>
	
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		margin-top: 50rpx;
		width: 100%;
		height: 300px;
	}
	.u-button-group {
		display: flex;
		justify-content: space-evenly;
		padding: 18rpx 0;
	}
	
	.u-button-group view {
		width: 35%;
	}
	.hideBox{
		position: absolute;
		top: -2000px;
	}
</style>
