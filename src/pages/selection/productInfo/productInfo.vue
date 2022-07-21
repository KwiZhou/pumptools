<!-- 本页有bug 待解决，具体为uhart渲染时候，data为null，此时没有foreach-api -->
<template>
	<view>


		
			<u-subsection :list="list" :current="curNow" @change="sectionChange" :fontSize='18'> </u-subsection>
			<productInfoA v-if="curNow==0" :chartData='chartData' :toSonData='toSonData' :chartShow='chartShow'>
			</productInfoA>

			<productInfoC v-else :toSonDataC='toSonDataC'></productInfoC>
			
			
		
	</view>
</template>

<script>
	export default {


		data() {
			return {
				
				list: ['性能', '评论'],
				curNow: 0,
				identify: 'tline',
				identify1: 'tline2',

				toSonData: 1,
				toSonDataC: "AS",
				chartShow: false,
				chartData: {
					"categories": [

					],
					"series": [{
							'index': 0,
							"name": "NSPH",
							"data": []
						},
						{
							'index': 1,
							"name": "Eta",
							"data": []
						},
						{
							'index': 2,
							"name": "P",
							"data": []
						},
						{
							'index': 3,
							"name": "H",
							"data": []
						},
					]
				}
			}
		},

		onLoad(option) {
			
			this.toSonData = option.id
			this.toSonDataC = option.seriseCode
			
			let that = this
			const db = uniCloud.database({
				provider: 'tencent',
				spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
			})
			async function gett() {
				await db.collection('nsph')
					.where({
						model: option.id
					})
					.get()
					.then((res) => {
						that.foe(res.result.data[0], 0)
						console.log(1,res)
					})
				await db.collection('power')
					.where({
						model: option.id
					})
					.get()
					.then((res) => {
						that.foe(res.result.data[0], 1)
console.log(2,res)
					})
				await db.collection('p')
					.where({
						model: option.id
					})
					.get()
					.then((res) => {
						that.foe(res.result.data[0], 2)
console.log(3,res)
					})

				await db.collection('q')
					.where({
						model: option.id
					})
					.get()
					.then((res) => {
						console.log(4,res)
						that.foe(res.result.data[0], 3)
						that.chartShow = true
						
					})
			}

			//执行
			gett()

		},
		
		methods: {
			
			sectionChange(index) {
				this.curNow = index;
			},
			foe(e, i) {
				let temp = []
				for (const item of Object.entries(e)) {
					if (item[0] == '_id' || item[0] == 'motorPower' || item[0] == 'model' || !item[1]) continue
					temp.push(item)
				}

				function comPare(v1, v2) {
					if (v1[0] < v2[0]) {
						return -1
					} else if (v1[0] > v2[0]) {
						return 1
					} else {
						return 0
					}
				}
				temp.sort(comPare)
				let xzhou = [],
					yzhou = []
				temp.forEach((aa) => {
					xzhou.push(aa[0])
					yzhou.push(aa[1])
				})
				if (i == 2) {
					yzhou = yzhou.map((a) => (a * 10).toFixed(2))

				}
				if (i == 3) this.chartData.categories = xzhou
				this.chartData.series[i].data = yzhou
				
			}
		}
	}
</script>

<style scoped>
	.charts-box {
		width: 100%;
		height: 300px;
	}


	
</style>
