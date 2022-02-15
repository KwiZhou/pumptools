<template>
	<view class="charts-box">
		<qiun-data-charts type="line" :chartData="chartData" background="none" :ontouch="true"   :opts="{yAxis:{data:[{tofix:2}]}}"   :animation="false" />
	</view>
</template>

<script>
	export default {
		name: "toosA_zd_chart",
		data() {
			return {
				chartData: {
					categories: [],
					series: [{
						name: "x轴向-加速度",
						data: [],
					}, ],
				},
				//全部加速度记在这数组
				tempArray: [],
				timer1:null,
				timer2:null
			};

		},
		mounted() {
			uni.startAccelerometer({
				interval: 'normal', //normal200ms/次  game20ms/次  ui60ms/次 
				success: e => {
					console.log("调用成功");
				},
				fail: e => {
					console.log("失败")
				}
			}); 
			this.start();
		},
		destroyed(	){
				this.stop() ;
		},
		methods: {
			stop() {
				clearInterval(this.timer1);
				this.timer1 = null; 
				clearInterval(this.timer2);
				this.timer2 = null; 
			},
			start() {
			let that = this;
				 /* uni.onAccelerometerChange((res)=> {
					  that.tempArray.push(res.x)
				}); */
				
				/* let x=new Array(100).fill(0)
					let x2=new Array()
					for (let i = 0; i < 100; i++) {
					      x2[i] = i;
					}
					that.chartData.categories=x2
					that.chartData.series[0].data=x
					console.log(that.chartData.categories)
				uni.onAccelerometerChange((res)=> {
					  that.tempArray.push(res.x)
				}); */
				/* this.timer2 = setInterval(function () {
					//此处为深拷贝
					let d1=x.concat(that.tempArray)
					//横轴数据: 0,1,2,3,4....
					let d2=new Array()
					for (let i = 0; i < d1.length; i++) {
					      d2[i] = i;
					}
					that.chartData.categories=d2
					that.chartData.series[0].data=d1
					console.log(that.tempArray)
				}, 2000); */
				
				
				//开发时，可以使用定时器+Math.random()在电脑端mock加速度数据
				let x=new Array(200).fill(0)
				let x2=new Array()
				for (let i = 0; i < 200; i++) {
				      x2[i] = i;
				}
				that.chartData.categories=x2
				that.chartData.series[0].data=x
				console.log(that.chartData.categories)
					 this.timer1 = setInterval(() => {
						that.tempArray.push(Math.random() * 0.1)
					}, 200); 
					this.timer2 = setInterval(function () {
						//此处为深拷贝
						let d1=x.concat(that.tempArray)
						//横轴数据: 0,1,2,3,4....
						let d2=new Array()
						for (let i = 0; i < d1.length; i++) {
						      d2[i] = i;
						}
						that.chartData.categories=d2
						that.chartData.series[0].data=d1
						console.log(that.tempArray)
					}, 1000);
					
					
			},
		},
	}
</script>

<style>
	.charts-box {
	width: 98vw;
	height: 80vh;
	}
</style>
