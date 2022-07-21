<template>

	<view class="aFour">
		<!-- 页头 -->
		<view class="head">
			<h4>管道损失-计算报告</h4>
		</view>
		<!-- 页中 -->
		<view class="body">
			<view class="bodyTitle">
				<view> 报告时间：{{cloudData.addDateDay}}</view>
				<view> 报告名称：{{cloudData.dataDis}} </view>
			</view>
			<view class="bodyHead">
				<view class="typeAT" style="position: relative"> 类型 </view>
				<view class="typeBT"> 参数 </view>
			</view>
			<view class="bodyMid" v-for="item in cloudData.fileUrl">
				
				<view class="typeA">
					<noNinetyDegreeElbow v-if="item.typeToCanvas =='noNinetyDegreeElbow'"
						style="position: relative; left: -1px" :showReport="showReport" :size="size" /> 
					<ninetyDegreeElbow v-if="item.typeToCanvas=='ninetyDegreeElbow'"
						style="position: relative; left: -1px" :showReport="showReport" :size="size" /> 
					 <crossSectionMutation v-if="item.typeToCanvas=='crossSectionMutation'"
						style="position: relative; left: -1px" :showReport="showReport" :size="size" /> 
					 <gradientTube
		    style="position: relative; left: -1px"
			v-if="item.typeToCanvas=='gradientTube'"
		    :showReport="showReport"
		  			:size="size"
		  /> 
		 <foldedTube  v-if="item.typeToCanvas=='foldedTube'"
		    style="position: relative; left: -1px"
		    :showReport="showReport"
		  			:size="size"
		  /> 
		  <foldedTube  v-if="item.typeToCanvas=='Straight'"
		     style="position: relative; left: -1px"
		     :showReport="showReport"
			 :size="size"
			 :s="s"
		   />
				</view>

				<view class="typeB">
					<view class="typeB_item1">
						<view class="typeB_item1_A"> 输入参数 </view>
						<view class="typeB_item1_B">
							<view class="typeB_item1_B_itemA" v-for="itema in item.VV">
								<view> {{itema[1]}} </view>
								<view> {{itema[0]}}  </view>
							</view>
						</view>
					</view>
					<view class="typeB_item2">
						<view class="typeB_item1_A"> 计算结果 </view>
						<view class="typeB_item1_B">
							<view class="typeB_item1_B_itemA">
								<view> 管道数量 </view>
								<view> {{item.outputV[0]}} </view>
							</view>
							<view class="typeB_item1_B_itemA">
								<view> 管道类型 </view>
								<view>{{item.outputV[1]}}</view>
							</view>
							<view class="typeB_item1_B_itemA">
								<view> 单个损失 </view>
								<view> {{item.outputV[2]}} </view>
							</view>
							<view class="typeB_item1_B_itemA">
								<view> 总计损失 </view>
								<view> {{item.outputV[3]}} </view>
							</view>
						</view>
					</view>
				</view>
			</view>



		</view>
		<!-- 页尾巴 -->
		<view class="footer"> 本报告由pumptools小程序生成 </view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				s:true,
				reportShowCanvas: "ninetyDegreeElbow",
				showReport: false,
				size: {
					fontSize: "11px serif",
					R: 50,
					L: 40,
					ninetyDegreeElbow_R: 65,
					gradientTube_po:60,
					width: '140px',
					height: '140px',
					h: 80,
					w: 60,
					gradientTube_w:60,
					gradientTube_h:80,
				},
				cloudData: null
			};
		},
		onLoad(option) {
			let str=JSON.parse(option.id)
			this.cloudData=str
			
			const db = uniCloud.database({
				provider: 'tencent',
				spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
			})
			let e = getApp().globalData.g_openid
			db.collection('useropenid')
				.where({
					openid: e
				})

				.get()
				.then((res) => {
					//this.cloudData = res.result.data[0].report
					

				}).catch((err) => {
					console.log("err.code", err.code); // 打印错误码
				})
		},
		methods: {
			
		},
	};
</script>

<style scoped>
	.aFour {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 90vh;
		width: 100vw;
		font-size: 28rpx;
	}

	.footer {
		font-size: smaller;
	}

	.body {
		flex: 1;
		width: 95vw;
		font-size: smaller;
	}

	.bodyMid {

		display: flex;
		text-align: center;
	}

	.bodyHead {
		display: flex;
		text-align: center;
	}

	.typeA,
	.typeB {
		width: 56%;
		border: 1rpx solid #000000;
		margin-right: -1rpx;
		margin-bottom: -1rpx;
		margin-top: -1rpx;
		display: flex;
		flex-direction: column;
	}

	.typeAT,
	.typeBT {
		width: 56%;
		border: 1rpx solid #000000;
		margin-right: -1rpx;
		margin-bottom: -1rpx;
		margin-top: -1rpx;
	}

	.typeAT {
		flex: 1;
	}

	.typeA {
		flex: 1;
	}

	.typeB_item1 {
		display: flex;
		flex: 1
	}

	.typeB_item2 {
		align-items: center;
		display: flex;
		border-top: 1rpx solid #000000;
	}

	.typeB_item1_A {
		width: 10%;
		padding: 4rpx;
		border-right: 1px solid #000000;
	}

	.typeB_item1_B {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 78%;
	}

	.typeB_item1_B_itemA {
		padding:0 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.bodyTitle {
		display: flex;
		justify-content: space-around;
	}
</style>
