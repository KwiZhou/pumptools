<template>
	<view>
		<view class="controlPanel">
			<u-subsection :list="list" :current="current" @change="sectionChange"></u-subsection>
		</view>

		<view class="fallLayout">
			<view v-if="noData" class="cantSearch">
				<u-empty mode="search" iconSize=190 iconColor=#a0cfff textSize=25>
				</u-empty>
			</view>
			<view class="pumpList" v-if="!noData">
				<view class="fallCol">
					<view class="imageview" v-for="item in pumpinfoa" @click="toGoInfo(item)">
						<image mode="aspectFill" class="fallItem" :src="item.imgUrl"></image>
						<view class="pumpinfoA">
							<view class="pumpinfo">
								<view class="infoItem">
									<view class="point"></view>
									<text>型号: {{item.model}}</text>
								</view>
								<view :class="current==0?'infoItemBeChoseed':'infoItem'">
									<view class="point"></view>
									<text>扬程: {{item.h}}m</text>
								</view>
								<view :class="current==2?'infoItemBeChoseed':'infoItem'">
									<view class="point"></view>
									<text>流量: {{item.q}}m³/h</text>
								</view>
								<view :class="current==1?'infoItemBeChoseed':'infoItem'">
									<view class="point"></view>
									<text>效率: {{item.maxEffi}}%</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="fallCol">

					<view class="imageview" v-for="item in pumpinfob" @click="toGoInfo(item)">
						<image mode="aspectFill" class="fallItem" :src="item.imgUrl"></image>
						<view class="pumpinfoA">
							<view class="pumpinfo">
								<view class="infoItem">
									<view class="point"></view>
									<text>型号: {{item.model}}</text>
								</view>
								<view :class="current==0?'infoItemBeChoseed':'infoItem'">
									<view class="point"></view>
									<text>扬程: {{item.h}}m</text>
								</view>
								<view :class="current==2?'infoItemBeChoseed':'infoItem'">
									<view class="point"></view>
									<text>流量: {{item.q}}m³/h</text>
								</view>
								<view :class="current==1?'infoItemBeChoseed':'infoItem'">
									<view class="point"></view>
									<text>效率: {{item.maxEffi}}%</text>
								</view>
							</view>

						</view>
					</view>


				</view>
			</view>


			<u-loadmore v-if="!noData" fontSize=18 :status="status" />

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//排序板块


				list: [{
					name: '扬程↓'
				}, {
					name: '效率↓'
				}, {
					name: '流量↓'
				}],
				current: 1,
				//懒加载状态
				status: 'loading',
				noData: false,
				pumpinfoTotal: null,
				pumpinfoa: [],
				pumpinfob: [],
				border: 0,
				seachObj: null
			}
		},
		onLoad(option) {


			let umap = option.id.split(";").map(res =>
				res.split(",")
			)

			let fL = Number(option.fL)
			//构造where语句中查询条件
			let seachObj = {
				qMin:0,
				qMax:2000,
				hMin:0,
				hMax:2000
			}
			umap.forEach(res => {
				{
					if (res[0] == '1') {
						//有型号传入
						seachObj.model = res[1]
					} else if (res[0] == '2') {
						//有流量传入

							seachObj.qMin = Number(res[1]) - fL,
							seachObj.qMid = Number(res[1]),
							seachObj.qMax = Number(res[1]) + fL

					} else if (res[0] == '3') {
						//有扬程传入

						seachObj.hMin = Number(res[1]) - fL,
							seachObj.hMid = Number(res[1]),
							seachObj.hMax = Number(res[1]) + fL

					}
				}
			})
			this.seachObj = seachObj
			this.getSomePump()
			/* 	let p = {
					a: "3"
				} */

		},
		methods: {
			sectionChange(index) {
				this.current = index;
			},
			getSomePump() {
				let order = 'maxEffi'
				if (this.current == 0) {
					order = 'h'
				} else if (this.current == 2) {
					order = 'q'
				}
				const db = uniCloud.database({
					provider: 'tencent',
					spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
				})
				console.log("model", this.seachObj.model)
				const _db = db.command
				db.collection('selectionPumpInfo')
				 .where({
							model: this.seachObj.model,
							q: _db.gte(this.seachObj.qMin).and(_db.lte(this.seachObj.qMax) ),
							h: _db.gte(this.seachObj.hMin ).and(_db.lte(this.seachObj.hMax))
						}
					)
				
					.orderBy(order, "desc")
					.skip(this.border)
					.limit(6)
					.get()
					.then((res) => {

						if (res.result.data.length == 0 && this.border == 0) {
							this.noData = true
							return
						}

						if (res.result.data.length < 6) {
							this.status = "nomore"
						}

						this.pumpinfoTotal = res.result.data
						this.pumpinfoTotal.forEach((item, index) => {
							if (index % 2 != 1) {
								this.pumpinfoa.push(item)
							} else {
								this.pumpinfob.push(item)
							}
						})
						this.border += 6
					}).catch((err) => {
						console.log("err.code", err.code)
					})
			},
			toGoInfo(e) {
				uni.navigateTo({
					url: `../productInfo/productInfo?id=${e.model}&seriseCode=${e.seriseCode}`
				})

			}
		},
		//页面触底事件
		onReachBottom() {
			if (this.status == "loading") {
				setTimeout(this.getSomePump, 900)
			}
		},
		watch: {
			current(newValue, oldValue) {
				this.border = 0
				this.pumpinfoa = [],
					this.pumpinfob = [],
					this.getSomePump()

			}
		}
	}
</script>

<style scoped>
	.cantSearch {
		margin-top: 120rpx;
	}

	.infoItem {
		display: flex;
		align-items: center;

	}

	.infoItemBeChoseed {
		display: flex;
		align-items: center;
		color: #2979ff;
		font-weight: bold;
	}

	.point {
		width: 0.7em;
		height: 0.7em;
		background-color: skyblue;
		margin-right: 0.5em;
		border-radius: 50%;
	}

	/* .fallLayout {
		display: flex;
		flex-direction: row;

		justify-content: center;
	} */

	.pumpList {
		display: flex;
		flex-direction: row;
		flex: 1;
	}

	.fallCol {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 12rpx;
	}

	.fallItem {
		border-radius: 10%;
		width: 100%;
	}

	.imageview {


		margin-bottom: 15px;
	}

	.pumpinfo {

		display: flex;
		flex-direction: column;
		font-size: smaller;
		font-weight: 100;



	}

	.pumpinfoA {

		display: flex;
		justify-content: center;
		width: 100%;
	}

	.controlPanel {
		margin-bottom: 25rpx;
	}
</style>
