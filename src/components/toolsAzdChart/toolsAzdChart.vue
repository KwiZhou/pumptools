<template>
	<view>
		<view class="charts-box">
			<qiun-data-charts type="line" :chartData="chartData" background="none" :ontouch="true"
				:opts="{yAxis:{data:[{tofix:3}]},color:lineColor}" :animation="false" />
		</view>
	</view>
	
	
</template>

<script>
	export default {
		name: "toosA_zd_chart",
		props: ["radio_value"],
		data() {
			return {
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
				//最大值和最小值
				oldMax:{
					x:0.01,
					y:0.01,
					z:0.01
				},
				newMax:{
					x:0.06,
					y:0.06,
					z:0.06
				},
				
				//记数器，记下findMax前一次迭代的数组长度
				memolength:0
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
		destroyed() {
			this.stop();
		},
		methods: {
			stop() {
				/* clearInterval(this.timer1);
				this.timer1 = null; */
				uni.offAccelerometerChange({
					success: e => {
						console.log("offAccelerometerChange调用成功");
					},
					fail: e => {
						console.log("失败")
					}
				})
				clearInterval(this.timer2);
				this.timer2 = null;
			},
			start() {
				let that = this;
				clearInterval(this.timer1);
				this.timer1 = null;
				clearInterval(this.timer2);
				this.timer2 = null;
				uni.onAccelerometerChange((res)=> {
					  that.tempArrayx.push(res.x)
					  that.tempArrayy.push(res.y)
					  that.tempArrayz.push(res.z)
				}); 

				/* let x=new Array(100).fill(0)
					let x2=new Array()
					for (let i = 0; i < 100; i++) {
					      x2[i] = i;
					}
					that.chartData.categories=x2
					that.chartData.series[0].data=x
					console.log(that.chartData.categories)
				uni.onAccelerometerChange((res)=> {
					  that.tempArrayx.push(res.x)
				}); */
				/* this.timer2 = setInterval(function () {
					//此处为深拷贝
					let dx=x.concat(that.tempArrayx)
					//横轴数据: 0,1,2,3,4....
					let d2=new Array()
					for (let i = 0; i < dx.length; i++) {
					      d2[i] = i;
					}
					that.chartData.categories=d2
					that.chartData.series[0].data=dx
					console.log(that.tempArrayx)
				}, 2000); */


				//开发时，可以使用定时器+Math.random()在电脑端mock加速度数据
				
				 /* this.timer1 = setInterval(() => {
					that.tempArrayx.push(Math.random() * 0.1)
					that.tempArrayy.push(Math.random() * 0.1)
					that.tempArrayz.push(Math.random() * 0.1)
				}, 200); */ 
				//
				
				this.timer2 = setInterval(function() {
					that.setUchart(true)
				}, 1001);
				
			},
			//funcGetData,截取当前加速度数据和对应时间数据
			funcGetData(){
				let v = new Array(100).fill(0)
				//此处为深拷贝
				let dx = v.concat(this.tempArrayx)
				let dy = v.concat(this.tempArrayy)
				let dz = v.concat(this.tempArrayz)
				return {
					dx,
					dy,
					dz
				}
			},
			/* that.chartData.categories = x2
			that.chartData.series[0].data = x */
			//setUchart函数，满足两个条件，既可以被定时器调用，又可以在定时器清空后被watch调用
			 setUchart(e){
				this.funcGetData()
				let dt = new Array()
				let {dx,dy,dz}=this.funcGetData()
				for (let i = 0; i < dx.length; i++) {
					dt[i] = i;
				}
				while(dx.length>100){
					dx.shift()
					dt.shift()
				}
				while(dz.length>100){
					dz.shift()
				}
				while(dy.length>100){
					dy.shift()
				}
				
				if(e){
					//this.newMax.x=this.findMax(dx.slice(this.memolength))
					//this.newMax.y=this.findMax(dy.slice(this.memolength))
					//this.newMax.z=this.findMax(dz.slice(this.memolength))
					this.newMax.x=this.findMax(dx)
					this.newMax.y=this.findMax(dy)
					this.newMax.z=this.findMax(dz)
					//this.newMax.x=this.findMax(dx.slice(this.memolength))
					//this.newMax.y=this.findMax(dy.slice(this.memolength))
					//this.newMax.z=this.findMax(dz.slice(this.memolength))
					
					this.oldMax.x=this.oldMax.x>this.newMax.x?this.oldMax.x:this.newMax.x
					this.oldMax.y=this.oldMax.y>this.newMax.y?this.oldMax.y:this.newMax.y
					this.oldMax.z=this.oldMax.z>this.newMax.z?this.oldMax.z:this.newMax.z
					//this.memolength=dx.length
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
			findMax(aArray){
			  return  aArray.reduce((pre,curr)=>Math.max(pre,curr))
			}
			
		},
		/* computed:{
			maxX:function(){
				
			}
		}, */
		watch: {
			//监听radio中的值，然后动态改变uchart中color
			radio_value: {
				handler(newValue, oldValue) {
					switch (newValue) {
					  case 'X':
							this.lineColor[0]="#FF1493"
							this.setUchart(false)
							break;
					  case 'Y':
							  this.lineColor[0]="#1890FF"
							  this.setUchart(false)
							  break;
					  case 'Z':
							 this.lineColor[0]="#91CB74"
							 this.setUchart(false)
							 break;
					  default:
					  console.log('default');
					}
				},
				//uchart首次挂载就监听一次 oldValue=undefine
				immediate:true
			},
			//监听最大值变化，然后通过自定义时间发送出去
		 	oldMax: {
				handler(newValue, oldValue){
					this.$emit('maxPost',oldValue)
					
				},
				deep:true
			}
		}
	}
</script>

<style>
	.charts-box {
		width: 98vw;
		height: 75vh;
	}
</style>
