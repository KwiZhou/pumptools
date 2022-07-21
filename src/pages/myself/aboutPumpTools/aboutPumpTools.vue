<template>
	<view class="c1" :style="'height: '+emulator_Height+'rpx'">
		<view class="c1a">
			<view class="c1a1">
					<image mode="aspectFit" src='../../../static/logo.png'></image>
				<text>
					V1.0.0
				</text>
			</view>
			
		</view>
		<view class="c2a">
			<view class="c2a1">
				<text>
					pumpTools是一款以水泵选型为主，以数据采集、计算、查询小工具为辅的工具类小程序。通过“管损”小工具帮助使用者计算出不同场景下的水头损失，便于后续选型,“负载振动”小工具接入手机自带的三轴加速度计，帮助使用者收集机械设备的振动信号，同时实现故障诊断中的各类幅值动态计算，便于后续分析。
				</text>
			</view>
		</view>
		<view class="c3a">
			<text style="color: #000000;">特别鸣谢以下开源库</text>
			<view class="c3a1" >
				<view class="c3a1a" v-for="item in srcf" :key="item.id">
					<image mode="aspectFit"  :src="item.src"></image>
					<text>{{item.name}}</text>
				</view>		
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emulator_Height: 0,
				srcf:[
					{
						'src':"https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/thirdPartyLibrary/e4f86d2200d2d35c30f7b1494e96b9595ebc2751_2_992x1000.png",
						"id":0,
						"name":"Three.js"
					},
					{
						'src':"https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/thirdPartyLibrary/11661654927588_.pic.jpg",
						"id":1,
						"name":"uCharts"
					},
					{
						'src':"https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/thirdPartyLibrary/logo.png",
						"id":2,
						"name":"uView"
					}
				]
			}
		},
		 onShow() {
		            
		            // 获取屏幕高度
		            let self = this;
		            uni.getSystemInfo({
		                success: function(res) {
		                    /* console.log(res.screenHeight); //屏幕高度  注意这里获得的高度宽度都是px 需要转换rpx
		                    console.log(res.windowWidth); //可使用窗口宽度
		                    console.log(res.windowHeight); //可使用窗口高度
		                    console.log(res.screenWidth); //屏幕宽度 */
		                    self.emulator_Height = (res.windowHeight * (750 / res.windowWidth)) //将px 转换rpx
		                    getApp().globalData.noTarBarHright=self.emulator_Height 
		                }
		            });
		        },
		methods: {
			
		}
	}
</script>

<style scoped>
.c1{
	

	color:#73727b;
 
	font-family:STFangsong;
	height: 100%;
	width: 100%;
	
	
  
display: flex;
flex-direction: column;
 align-items:center;
 justify-content: space-evenly;
 background-image: url(https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/11671654939786_.pic.jpg);
 background-size:100% 100%
}
.c1a{
margin-top:5rpx;
}
.c1a text{
	margin-top:15rpx;
}

.c1a1{
	color:#FFFFFF;
	 
	display: flex;
	flex-direction: column;
	align-items:center;
	width: 200rpx;
	font-weight:bold;
	
}
.c1a1 image{
	padding: 8rpx;
		width: 180rpx;
		height:180rpx;
		border: 10rpx solid #fafcf5;
		border-radius: 30rpx;
		overflow: hidden;
		
}
.c2a1{
	text-align: justify;
	line-height: 50rpx;
	
}
.c2a{
	width: 75%;
	background-color: #ffffff;
	padding: 40rpx;
	border-radius: 30rpx;
	margin-top:5rpx;
}
.c3a{
	text-align: center;
	background-color: #ffffff;
	padding: 14rpx;
	border-radius:30rpx;
	margin-top:5rpx;
	
	width: 75%;
	
}
.c3a1{
	display: flex;
	justify-content: space-between;
}
.c3a1a{
	display: flex;
	flex-direction: column;
	text-align: center;
	
	
}

 .c3a1 image{
	 width: 160rpx; 
	height: 160rpx;
	padding: 10rpx;
	
} 
</style>
