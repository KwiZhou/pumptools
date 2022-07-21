<template>
	<view>
			<u-skeleton
			    rows="10"
			    title
				:loading="!loading"
			>
			
			
			<view v-if="chartShow&&show">
				<pumpChart :chartData='chartData'  ></pumpChart>
				<view class="sp">
						<view class="spa" @click="toGO">
							<span class="iconfont icon-threed"></span>
							<view>3D模型</view>
						</view>
				</view>
			</view>
			
			
			
			<view v-if="chartShow&&show">
				<u-collapse @change="change" @close="close" @open="open" :value="['Docs guide']">
					<u-collapse-item title="性能参数" name="Docs guide">
						<view class="tableli" style="color:#2979ff ;font-weight: bold;">
							<view>参数</view>
							<view>范围</view>
							<view>单位</view>
						</view>
						<u-line color="#2979ff"></u-line>
						<template v-for="item in parameter">
							<view class="tableli">
								<view>{{item[0]}}</view>
								<view>{{item[1]}}</view>
								<view>{{item[2]}}</view>
							</view>
							<u-line color="#2979ff"></u-line>
						</template>
					</u-collapse-item>
					<u-collapse-item title="泵装配图" name="Variety components">
						<view class="pic">
							
								<u--image :showLoading="true" :src="src" mode="aspectFit" @click="preview"></u--image>
							
							
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
			
			<view>
			
			</view>
			
			
			
			
			</u-skeleton>
		
		
	</view>
</template>

<script>
	export default {
		name: "productInfoA",
		props:['chartData','toSonData','chartShow'],
		data() {
			return {
			
				detail: null,
				src: 'https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/asInstallImg/AS1.png',
				parameter: [],
				showOr:false,
				show:false
			};
		},
		
		mounted() {
			let model=this.toSonData
			
			const db = uniCloud.database({
				provider: 'tencent',
				spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
			})
			db.collection('ALLPUMP')
				.where({
					model:model
				})
				.get()
				.then((res) => {
					this.detail = res.result.data[0]
					for (const item of Object.entries(this.detail)) {
						if (item[0] == 'modelUrl' || item[0] == '_id' || item[0] == 'imgUrl' || item[0] == '' || item[
								0] == 'seriseCode') continue
						let temparrayA = (item[1].split(','))
						if (!temparrayA[1]) {
							temparrayA[1] = '/'
						}
						let temparrayB = [item[0]]
						temparrayB = temparrayB.concat(temparrayA)
						this.parameter.push(temparrayB)
						this.show=true
					}
				})
			
				
		},
		methods: {
			toGO(){
				uni.navigateTo({
					url:"../../../pages/test2/test2"
				})
			},
			
			
			preview() {
				
				let that = this
				uni.previewImage({
					urls: [
						"https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/asInstallImg/AS1.png"
					],

				});
			},
			open(e) {
				// console.log('open', e)
			},
			close(e) {
				// console.log('close', e)
			},
			change(e) {
				// console.log('change', e)
			}
		},
		computed:{
			loading:function(){
				console.log(this.chartShow,this.show,this.chartShow&&this.show)
				return this.chartShow&&this.show
			}
		}
	}
</script>

<style scoped>
	.sp{
		display: flex;
		justify-content: center;
		text-align: center;
		font-size: small;
		color: slategray;
		padding-bottom: 15rpx;
	}
	
	.pic{
		margin: 0 auto;
	}
	.tableli {


		display: flex;

		padding: 20rpx 5rpx;
	}

	.tableli view {
		width: 33.3%;
		text-align: center;
	}

</style>
