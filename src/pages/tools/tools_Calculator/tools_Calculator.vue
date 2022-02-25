<template>
	<view class="xncs">

		<calculatorHead />
		<calculatorInput :calculatorinputclass="calculatorInputClass" @postInputValue="getInputValue" />
		<button type="primary" @click="calculator">计算</button>
		<calculatorOutput :calculatoroutputclass="calculatorOutputClass" :outputV="outputV" v-if="show"></calculatorOutput>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				show: false,
				input1V: "", //流量
				input2V: "", //扬程
				input3V: "", //转速
				input4V: "", //密度


				//输出

				outputV: [],

				calculatorInputClass: {
					input1: {
						name: "流量",
						id: 0,
						unit: "m3/h"
					},
					input2: {
						name: "扬程",
						id: 1,
						unit: "m"
					},
					input3: {
						name: "转速",
						id: 2,
						unit: "r/min"
					},
					input4: {
						name: "密度",
						id: 3,
						unit: "kg/m3"
					},
				},

				calculatorOutputClass: {
					output1: {
						name: "比转速",
						id: 0
					},
					output2: {
						name: "水力效率",
						id: 1
					},
					output3: {
						name: "容积效率",
						id: 2
					},
					output4: {
						name: "机械效率",
						id: 3
					},
					output5: {
						name: "总效率",
						id: 4
					},
					output6: {
						name: "轴功率",
						id: 5
					},
					output7: {
						name: "原动机功率",
						id: 6
					},
					output8: {
						name: "理论扬程",
						id: 7
					},
				},
				calculatorName: "基础性能参数",
			}
		},
		methods: {
			calculator() {
				//判断是否有输入，之所以采用字符长度做判断 是为了排除用户输入后又删除的现象
				if (this.input1V.length == 0 || this.input2V.length == 0 || this.input3V.length == 0 || this
					.input4V.length == 0) {
					uni.showToast({
						title: '请输入参数',
						icon: 'error',
						duration: 2000
					})
					return
				}
				//正式开始计算
				
				let outputV=[]
				let output1 = 3.65 * this.input3V * Math.sqrt(this.input1V / 3600) / Math.pow(this.input2V,
					0.75)
				let output2 = ((1 + 0.0835 * Math.log10(Math.pow(this.input1V / 3600 / this.input3V, 1 / 3))))
				let output3 = (1 / (1 + 0.68 * Math.pow(output1, -2 / 3)))
				let output4 = (1 - 0.07 * (1 / (Math.pow(output1 / 100, 7 / 6))))
				let output5 = (output2 * output3 * output4)
				let output6 = (this.input4V * 9.8 * this.input1V / 3600 * this.input2V / 1000 / output5)
				let output7 = 1.2 * output6
				let output8 = this.input2V / output2
			
				this.outputV = [
						output1.toFixed(2), //比转速
						(output2 * 100).toFixed(2) + " %", //水力效率ηh
						(output3 * 100).toFixed(2) + " %", //容积效率ηv
						(output4 * 100).toFixed(2) + " %", //机械效率ηm
						(output5 * 100).toFixed(2) + " %", //总效率 η
						output6.toFixed(2) + " kw", //轴功率 P
						output7.toFixed(2) + " kw", //原动机功率 Pg
						output8.toFixed(2) + " m" //理论扬程 Ht
					],
					this.show=true
			
				
			},

			getInputValue(e) {
				switch (e[0]) {
					case 0:
						this.input1V = e[1]
						break;
					case 1:
						this.input2V = e[1]
						break;
						break;
					case 2:
						this.input3V = e[1]
						break;
						break;
					case 3:
						this.input4V = e[1]
						break;
						break;
					default:
						break
				}
				
			}

		},
		mounted() {

		}
	}
</script>

<style>
	calculatorInput{
		padding-bottom:130rpx;
	}
	button{
		width:50%;
		
	}
	.xncs {
		

	}
</style>
