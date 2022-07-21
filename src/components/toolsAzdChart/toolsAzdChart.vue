<template>
	<view :class="show||copyModalShow||show_popup?'hideBox':''">

		<view class="charts-box" :style="'height: '+_Height*0.7+'rpx'">
			<qiun-data-charts :optsWatch="false" type="line" :chartData="chartData" background="none"
				:disableScroll="false" :opts="{yAxis:{data:[{tofix:3}]},color:lineColor}" :animation="false" />
		</view>
		
		<!-- 弹出层 -->
		<u-popup :show="show_popup" mode="center" @close="close" :round="10">

			<view style="width: 90vw;text-align: center;padding: 5rpx;">
				<h2 style="color:#2979ff;">运行参数</h2>
				
				
				<view style="border-bottom: 1px solid gainsboro;margin-bottom: 35rpx;" v-for="item_Panel,name,index in dataPanel">
					<h3>{{name[name.length-1]}}轴</h3>
						<u-grid :border="true" col=5>
							<u-grid-item  v-for="dateName in item_Panel"
								customStyle="padding-top: 10px; padding-bottom: 10px">
								<view style="display: flex;flex-direction:column;">
									<view >{{dateName[0]}}</view>
									<view>{{dateName[1].toFixed(4)}}</view>
									
								</view>
							</u-grid-item>
						</u-grid>
				</view>
				
				
				
			</view>
		</u-popup>
		<view>
			<u-button type="primary" @click="show_popup = true">
				<u-icon name="eye"></u-icon>打开数据看板
			</u-button>
		</view>
		<u-modal @confirm="confirm" @cancel="cancel" showCancelButton :show="show" title="请输入数据描述" cancelText="取消"
			confirmText="存入云端">
			<view class="slot-content">
				<u--input placeholder="数据名称" v-model="dataName"></u--input>
				<u-gap height="20"></u-gap>
				<u--textarea v-model="dataDis" placeholder="数据描述"></u--textarea>
			</view>
		</u-modal>
		<u-modal @confirm="Copy" @cancel="noCopy" showCancelButton :show="copyModalShow" title="振动数据" cancelText="取消"
			confirmText="复制链接">
			<view style="width: 80%;word-break: break-all;">
				复制以下链接到浏览器打开<br>{{copyContent}}
			</view>
		</u-modal>
	</view>


</template>

<script>
	export default {


		name: "toosA_zd_chart",
		props: ["radio_value", "_Height"],
		data() {
			return {
				show_popup: false,
				copyModalShow: false,
				copyContent: undefined,
				nullLength: 100,
				dataDis: undefined,
				dataName: undefined,
				show: false,
				chartData: {
					categories: [],
					series: [{
						name: "x轴向-加速度",
						data: [],
					}, ],
				},
				//折线颜色
				lineColor: ["#FF1493"],
				//全部加速度记在这数组,不能直接操作这3个数组！
				tempArrayx: [],
				tempArrayy: [],
				tempArrayz: [],
				//定时器
				timer1: null,
				timer2: null,
				//数据看板
				dataPanel:{
					dataPanelX:{
						
						max: ["最大值",0.06],
						min:["最小值",0.06],
						mean: ["均值",0],
						rms: ["均方根值",0],
						variance: ["方差",0]
					},
					dataPanelY:{
						
						max: ["最大值",0.06],
						min:["最小值",0.06],
						mean: ["均值",0],
						rms: ["均方根值",0],
						variance: ["方差",0]
					},
					dataPanelZ:{
						
						max: ["最大值",0.06],
						min: ["最小值",0.06],
						mean: ["均值",0],
						rms: ["均方根值",0],
						variance: ["方差",0]
					}
				},
				o:1,
				//最大值和最小值
				oldMax: {
					x: 0.01,
					y: 0.01,
					z: 0.01
				},
				newMax: {
					x: 0.06,
					y: 0.06,
					z: 0.06
				},
				oldMin: {
					x: 0.01,
					y: 0.01,
					z: 0.01
				},
				newMin: {
					x: 0.06,
					y: 0.06,
					z: 0.06
				},
				
				//记数器，记下findMax前一次迭代的数组长度
				memolength: 0
			};

		},

		mounted() {

			uni.startAccelerometer({
				interval: 'normal', //normal200ms/次  game20ms/次  ui60ms/次 
				success: e => {
					console.log("startAccelerometer调用成功");
				},
				fail: e => {
					console.log("失败")
				}
			});

			this.start()
		},
		beforeDestroy() {
			this.stop();
		},
		methods: {
			close() {
				this.show_popup = false
			},
			stop() {
				uni.offAccelerometerChange((res) => {
					console.log("offAccelerometerChange调用成功")
				})
				uni.stopAccelerometer();
				//开发时，可以使用定时器+Math.random()在电脑端mock加速度数据	
				/* clearInterval(this.timer1);
				this.timer1 = null; */
				clearInterval(this.timer2);
				this.timer2 = null;
			},
			start() {
				let that = this;
				clearInterval(this.timer1);
				this.timer1 = null;
				clearInterval(this.timer2);
				this.timer2 = null;
				uni.onAccelerometerChange((res) => {
					that.tempArrayx.push(res.x)
					that.tempArrayy.push(res.y)
					that.tempArrayz.push(res.z)
				});
				//开发时，可以使用定时器+Math.random()在电脑端mock加速度数据		
			/* 	this.timer1 = setInterval(() => {
					that.tempArrayx.push(Math.random() * 0.1)
					that.tempArrayy.push(Math.random() * 0.1)
					that.tempArrayz.push(Math.random() * 0.1)
				}, 200); */
				this.timer2 = setInterval(function() {
					that.setUchart(true)
				}, 1001);

			},
			//funcGetData,截取当前加速度数据和对应时间数据
			funcGetData() {
				//	let v = new Array(this.nullLength).fill(0)
				let v = new Array(this.nullLength)
				//此处为拷贝
				let dx = v.concat(this.tempArrayx)
				let dy = v.concat(this.tempArrayy)
				let dz = v.concat(this.tempArrayz)
				return {
					dx,
					dy,
					dz
				}
			},
			//setUchart函数，满足两个条件，既可以被定时器调用，又可以在定时器清空后被watch调用
			setUchart(e) {
				console.log("setUchart is loading1")
				this.funcGetData()
				let dt = new Array()
				let {
					dx,
					dy,
					dz
				} = this.funcGetData()
				for (let i = 0; i < dx.length; i++) {
					dt[i] = i;
				}
				while (dx.length > this.nullLength) {
					dx.shift()
					dt.shift()
				}
				while (dz.length > this.nullLength) {
					dz.shift()
				}
				while (dy.length > this.nullLength) {
					dy.shift()
				}
				
				
				if (e) {
					let datax = this.findMaxOrMin(dx)
					let datay = this.findMaxOrMin(dy)
					let dataz = this.findMaxOrMin(dz)
					//x
					
					this.dataPanel.dataPanelX.rms[1] = datax.rms
					
					this.dataPanel.dataPanelX.mean[1] = datax.mean
					this.dataPanel.dataPanelX.variance[1] = datax.variance*1000
					//y
						
					this.dataPanel.dataPanelY.rms[1] = datay.rms
					this.dataPanel.dataPanelY.mean[1] = datay.mean
					this.dataPanel.dataPanelY.variance[1] = datay.variance
					//z
					
					this.dataPanel.dataPanelZ.rms[1] = dataz.rms
					this.dataPanel.dataPanelZ.mean[1] = dataz.mean
					this.dataPanel.dataPanelZ.variance[1] = dataz.variance
					
					this.newMax.x = datax.max
					this.newMax.y = datay.max
					this.newMax.z = dataz.max
					this.dataPanel.dataPanelX.max[1]= this.dataPanel.dataPanelX.max[1] > this.newMax.x ? this.dataPanel.dataPanelX.max[1] : this.newMax.x
					this.dataPanel.dataPanelY.max[1]= this.dataPanel.dataPanelY.max[1] > this.newMax.y ? this.dataPanel.dataPanelY.max[1]: this.newMax.y
					this.dataPanel.dataPanelZ.max[1]= this.dataPanel.dataPanelZ.max[1] > this.newMax.z ? this.dataPanel.dataPanelZ.max[1] : this.newMax.z
				
					this.newMin.x = datax.min
					this.newMin.y = datay.min
					this.newMin.z = dataz.min
					
					this.dataPanel.dataPanelX.min[1]= this.dataPanel.dataPanelX.min[1] < this.newMin.x ? this.dataPanel.dataPanelX.min[1] : this.newMin.x
					this.dataPanel.dataPanelY.min[1]= this.dataPanel.dataPanelY.min[1] < this.newMin.y ? this.dataPanel.dataPanelY.min[1] : this.newMin.y
					this.dataPanel.dataPanelZ.min[1]= this.dataPanel.dataPanelZ.min[1] < this.newMin.z ? this.dataPanel.dataPanelZ.min[1] : this.newMin.z
				
					
					
				}
				if (this.radio_value == "Z") {
					this.chartData.categories = dt
					this.chartData.series[0].data = dz
				} else if (this.radio_value == "Y") {
					this.chartData.categories = dt
					this.chartData.series[0].data = dy
				} else {
					this.chartData.categories = dt
					this.chartData.series[0].data = dz
				}
			},
			//最大值最小值函数
			findMaxOrMin(aArray) {
				let rms = Math.sqrt(aArray.reduce((pre, curr) => pre + curr * curr) / aArray.length)
				let result = {
					max: aArray.reduce((pre, curr) => Math.max(pre, curr)),
					min: aArray.reduce((pre, curr) => Math.min(pre, curr)),
					mean: aArray.reduce((pre, curr) => pre + curr) / aArray.length,
					rms,
					variance: aArray.reduce((pre, curr) => Math.pow((curr - rms), 2)) / (aArray.length - 1)
				}
				console.log(result.variance)
				return result

				

			},
			postAccData(ee) {
				this.show = true

			},
			Copy() {
				uni.setClipboardData({
					data: this.copyContent,
					showToast: false,
				});
				this.copyModalShow = false
			},
			noCopy() {
				this.copyModalShow = false
			},
			confirm() {
				let that = this
				that.show = false
				let cloudX = this.tempArrayx.concat(),
					cloudY = this.tempArrayy.concat(),
					cloudZ = this.tempArrayz.concat();
				cloudX.splice(0, this.nullLength)
				cloudY.splice(0, this.nullLength)
				cloudZ.splice(0, this.nullLength)
				let _cloudX = this.tempArrayx,
					_cloudY = this.tempArrayy,
					_cloudZ = this.tempArrayz
				let ee = getApp().globalData.g_openid
				uni.showLoading({
					title: '正在处理...'
				});
				uniCloud.callFunction({
						name: 'pushZdDataToCloud',
						data: {
							x: _cloudX,
							y: _cloudY,
							z: _cloudZ,
							dataDis: this.dataDis,
							dataName: this.dataName,
							open_Id: ee
						}
					})
					.then(res => {
						that.copyContent = res.result.fileList[0].download_url
						uni.hideLoading();
						this.copyModalShow = true
					})
			},
			cancel() {
				this.show = false
			},
		},
		watch: {
			//监听radio中的值，然后动态改变uchart中color
			radio_value: {
				handler(newValue, oldValue) {
					switch (newValue) {
						case 'X':
							this.chartData.series[0].name = "x轴向加速度"
							this.lineColor[0] = "#FF1493"
							this.setUchart(false)
							break;
						case 'Y':
							this.chartData.series[0].name = "y轴向加速度"
							this.lineColor[0] = "#1890FF"
							this.setUchart(false)
							break;
						case 'Z':
							this.chartData.series[0].name = "z轴向加速度"
							this.lineColor[0] = "#91CB74"
							this.setUchart(false)
							break;
						default:

					}
				},
				//uchart首次挂载就监听一次 oldValue=undefine
				immediate: true
			},
			//监听最大值变化，然后通过自定义时间发送出去
			oldMax: {
				handler(newValue, oldValue) {
					this.$emit('maxPost', oldValue)
				},
				deep: true
			}
		}
	}
</script>

<style>
	.charts-box {
		width: 98vw;

	}
	.a{
		width: 20%;
	}
	.hideBox{
		position: absolute;
		top: -2000px;
	}
</style>
