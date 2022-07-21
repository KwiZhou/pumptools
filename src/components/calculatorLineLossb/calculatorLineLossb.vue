<template>
	<view class="containerLossb">
		<view class="bendingType">
			<text>{{titleName}}</text>
		</view>
		<view>
			<!--  <component v-bind:is="which_to_show" ref="ninetyDegreeElbow_childa" @lossReslut="lossReslut"></component> -->
			<view :class="which_to_show=='ninetyDegreeElbow'?'':'hideBox'">
				<ninetyDegreeElbow :size="size" :showReport="showReport" ref="ninetyDegreeElbow_childa"
					@lossReslut="lossReslut" />
			</view>

			<view :class="which_to_show=='noNinetyDegreeElbow'?'':'hideBox'">
				<noNinetyDegreeElbow :size="size" :showReport="showReport" ref="noNinetyDegreeElbow_childa"
					@lossReslut="lossReslut" />
			</view>
			
			<view :class="which_to_show=='crossSectionMutation'?'':'hideBox'">
				<crossSectionMutation  :size="size"
					:showReport="showReport" ref="crossSectionMutation_childa" @lossReslut="lossReslut" />
			</view>
			
			<view :class="which_to_show=='gradientTube'?'':'hideBox'">
				<gradientTube :size="size" :showReport="showReport" ref="gradientTube_childa"
					@lossReslut="lossReslut" />
			</view>
			
			<view :class="which_to_show=='foldedTube'?'':'hideBox'">
				<foldedTube :size="size" :showReport="showReport" ref="foldedTube_childa"
					@lossReslut="lossReslut" />
			</view>
			
			
			
			<!-- <ninetyDegreeElbow v-else-if="which_to_show==gradientTubes" ref="ninetyDegreeElbow_childa" @lossReslut="lossReslut"/>
   <ninetyDegreeElbow v-else-if="which_to_show==foldedTube" ref="ninetyDegreeElbow_childa" @lossReslut="lossReslut" /> -->
		</view>
		<view>

		</view>
		<view>

			<view class="chooseType">
				<u-popup bgColor="rgb(218, 218, 218)" :show="show" @close="show = false"  mode="right">
					<view class="title">
						管道类型
					</view>
					<ol class="chooseTypeItem">
						<li v-for="item in mayShowType" :key="item.id" @click="changeComponent(item)"
							:class="[curNav == item.id ? 'active' : '']">
							{{item.name}}
						</li>
					</ol>
				</u-popup>
				<u-button  :plain='true' @click="getOthers">其他类型</u-button>
			</view>

			<view class="u-button-group">
				<view>
					<u-button type="primary" text="计算" @click="calculator"></u-button>
				</view>
				<view>
					<u-button type="primary" text="添加" @click="add"></u-button>
				</view>
			</view>
			<lineLossResult :outputvresult="outputV" />

		</view>
	</view>
</template>

<script>
	export default {
		name: "calculatorLineLossb",
		data() {
			return {
				size: {
					fontSize: "20px serif",
					R: 70,
					width: '220px',
					
					height: '220px',
					gradientTube_w:60,
					gradientTube_h:100,
				},
				showReport: true,
				titleName: '90°弯管',
				show: false,
				which_to_show: 'ninetyDegreeElbow',
				ctx: null,
				lossValue: undefined,
				show: false,
				mayShowType: [{
						type: "ninetyDegreeElbow",
						name: '90°弯管',
						id: 0
					},
					{
						type: "noNinetyDegreeElbow",
						name: '缓弯曲管',
						id: 1
					},
					{
						type: "crossSectionMutation",
						name: '截面突变类',
						id: 2
					},
					{
						type: "gradientTube",
						name: '渐变管类',
						id: 3
					},
					{
						type: "foldedTube",
						name: '折管',
						id: 4
					}
					/* ,{
					  type: "valves",
					  name: '阀门类',
					  id: 5
					 },
					 {
					  type: "branchPipeClass",
					  name: '分支管道类',
					  id: 6
					} */
				],
				curNav: 0,
				outputV: [],
				V: null,
				typeToCanvas: undefined,


			};
		},
		mounted() {

		},
		methods: {
			getOthers() {
				this.show = true

			},

			add() {

				let V = {
					"VV": this.V,
					"typeToCanvas": this.typeToCanvas,
					"outputV": this.outputV
				}
				this.$emit('outputV', V)

			},
			changeComponent(item) {
				this.titleName = item.name
				this.curNav = item.id
				this.which_to_show = item.type
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			},
			//计算按钮
			calculator() {
				
				this.$refs[`${this.which_to_show}_childa`].sendResult()
				console.log(`${this.which_to_show}_childa`)
			},

			lossReslut(e) {
				this.V = e.shi
				this.typeToCanvas = e.type
				let u = this.mayShowType.filter(res =>
					res.type == e.type
				)
				if (e) this.lossValue = e.totalResult

				let type = this.mayShowType[e.type]
				this.outputV = [
					u[0].name,
					e.result + 'm',
					e._pipeItem,
					this.lossValue + 'm'
				]

			},
		},
		watch:{
			which_to_show(newValue,oldValue){
				this.outputV=[]
				this.show=false
			}
		}
	}
</script>

<style scoped>
	.hideBox{
		position: absolute;
		top: -2000px;
	}
	.containerLossb{
		padding: 0 30rpx;
	}
	.u-button-group {
		display: flex;
		justify-content: space-evenly;
		padding: 18rpx 0;
	}

	.u-button-group view {
		width: 35%;
	}

	.bendingType {
		text-align: center;
		color: #2979ff;
		font-weight: bold;
		padding: 20rpx 0 20rpx 0;
	}

	.chooseTypeItem {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.chooseTypeItem li {
		color: #3d90ff;
		padding: 30rpx 30rpx 30rpx 30rpx;
	}

	.active {
		background: rgb(225, 225, 225);
	}

	.title {
		margin: 40rpx auto;
		color: #000000;
		font-size: larger;
		font-weight: bold;
	}
</style>
