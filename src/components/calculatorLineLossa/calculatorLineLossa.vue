<template>
	<view>
		<calculatorHead>
			<template v-slot:calculatorname>
				<h4>管道损失-计算器</h4>
			</template>
		</calculatorHead>
		<calculatorInput :calculatorinputclass="calculatorInputClass" @postInputValue="getInputValue">
			<template v-slot:slota>
				<u-cell :border="true" title="直管个数">
					<u-number-box button-size="46" v-model="pipeItem" @change="valChange" slot="right-icon">
					</u-number-box>
				</u-cell>
			</template>
			<template v-slot:slotb>
				<u-cell :border="true" title="材质" center>
					<view slot="right-icon">
						<u-radio-group v-model="radiovalue1" placement="row" @change="groupChange">
							<u-radio v-for="(item, index) in radiolist1" :key="index" :label="item.name" labelSize="12"
								:name="item.name">
							</u-radio>
						</u-radio-group>
					</view>
				</u-cell>
			</template>
			<template v-slot:slotc>
				<u-cell :border="true" title="沿程损失系数" center>
					<input type="number" slot="right-icon" class="inputa" :value="lossnumschoice" @blur="getNewLossNums"></input>
				</u-cell>
			</template>
		</calculatorInput>
		
		<view class="u-button-group">
			<view>
				<u-button   type="primary"  text="计算"  @click="calculator"></u-button>
			</view>
			<view>
				<u-button  type="primary" text="添加"  @click="add"></u-button>	
			</view>
		</view>
		<lineLossResult :outputvresult="outputV"/>
		
	</view> 
</template>


<script>
	export default {
		name:"calculatorLineLoss",
		data() {
			return {
				show: false,
				material: '不锈钢',
				pipeItem: 1,
				//按照radiolist1中的顺序
				lossnums: [0.023, 0.026, 0.025, 0.028],
				radiolist1: [{
						name: '不锈钢',
						disabled: false
					},
					{
						name: '旧铸铁',
						disabled: false
					},
					{
						name: '新铸铁',
						disabled: false
					}, {
						name: '混凝土',
						disabled: false
					}
				],
				radiovalue1: '不锈钢',
				calculatorInputClass: {
					input1: {
						name: "管路流量",
						id: 0,
						unit: "m3/h"
					},
					input2: {
						name: "管路直径",
						id: 1,
						unit: "mm"
					},
					input3: {
						name: "管路长度",
						id: 2,
						unit: "m"
					},
				},
				calculatorOutputClass: {
					output1: {
						name: "单管沿程损失",
						id: 0
					},
					output2: {
						name: "总沿程损失",
						id: 1
					}
				},
				//输出
				outputV: [],
				//计算器函数参数
				input1V: "", //管路流量
				input2V: "", //管路直径
				input3V: "", //管路长度
				input4V: "1", //管路个数
				//损失系数见computed属性
			}
		},
		methods: {
			add(){
				let V={
					"VV":{
						"input1V": [this.input1V,"管路流量"],
						"input2V": [this.input2V,"管路直径"], 
						"input3V": [this.input3V,"管路长度"], 
						"input4V": [this.input4V,"管路个数"],
					},
					"typeToCanvas":"Straight",
					"outputV":this.outputV
				}
				this.$emit('outputV',V)
			},
			getNewLossNums(e){
				this.material=e.detail.value
			},
			groupChange(e) {
				
				this.material = e
			},
			valChange(e){
				this.input4V=e.value
				if(this.show == true){
					this.calculator()
				}
			},
			calculator() {
				
				
				let output1 = (8 * this.lossnumschoice * this.input3V) / (Math.pow(Math.PI, 2) * Math.pow(this.input2V /
					1000, 5) * 9.8) * Math.pow((this.input1V / 3600), 2)
					let output2 =output1*this.input4V
					if(!output1){
						uni.showToast({
							title: '请检查输入参数是否为空',
							icon: 'error',
							duration: 2000
						})
						return
					}
				this.outputV =
					[
					'直管',
					output1.toFixed(1)+"m",
					this.input4V,
					output2.toFixed(1)+"m"
					],
				this.show = true
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
		computed: {
			lossnumschoice() {
				switch (this.material) {
					case '不锈钢':
						return this.lossnums[0]
						break;
					case '旧铸铁':
						return this.lossnums[1]
						break;
					case '新铸铁':
						return this.lossnums[2]
						break;
					case '混凝土':
						return this.lossnums[3]
						break;
					default:
					
						return this.material
				}
			},

		}
	}
</script>

<style scoped>
	

	.inputa {
		border: 1rpx solid #dadada;
		padding: 8rpx;
		border-radius: 8rpx;
	}
	.u-button-group{
		display: flex;
		justify-content: space-evenly;
		padding: 18rpx 0;
	}
	.u-button-group view{
		width: 35%;
	}
</style>