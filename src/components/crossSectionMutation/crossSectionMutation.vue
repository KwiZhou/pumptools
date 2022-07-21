<template>
	<view class="c1">
		<view>
			<canvas  :style="{width:size.width, height:size.height}" canvas-id="fiveCanvas" id="fiveCanvas"></canvas>
			<u-slider v-model="slidervalue" min="-30" max="30" v-if="showReport"></u-slider>
		</view>
		<view class="ninetyDegreeInput"  v-if="showReport">
			<text>上游管直径</text>
			<u--input placeholder="单位: cm" border="surround" v-model="done"></u--input>
			<text>下游管直径</text>
			<u--input placeholder="单位: cm" border="surround" v-model="dtwo"></u--input>
			<text>流量</text>
			<u--input placeholder="单位: m³/h" border="surround" v-model="Q"></u--input>
			<text>弯管数量</text>
			<u-number-box button-size="46" v-model="pipeItem" >
			</u-number-box>
		</view>
	</view>
</template>

<script>
	export default {
		name: "crossSectionMutation",
		props: ['showReport', 'size'],
		data() {
			return {
				pipeItem: 1,
				pAN: true,
				slidervalue: undefined,
				done: undefined,
				dtwo: undefined,
				Q: undefined,
				map1: {
					0.1: 0.632,
					0.2: 0.644,
					0.3: 0.659,
					0.4: 0.676,
					0.5: 0.696,
					0.6: 0.717,
					0.7: 0.744,
					0.8: 0.784,
					0.9: 0.890,
			
				},
				map2: {
					0.9: 0.0123,
					0.8: 0.0625,
					0.7: 0.184,
					0.6: 0.444,
					0.5: 1.000,
					0.4: 2.25,
					0.3: 5.44,
					0.2: 16,
					0.1: 81
				}
			};
		},
		mounted() {
			this.slidervalue = 20
		},
		methods: {

			sendResult() {
				let _pipeItem = this.pipeItem
							//k1为突然扩大局部损失系数，k2为突然缩小局部损失系数
							let small = Math.min(this.done, this.dtwo),big = Math.max(this.done, this.dtwo)
							//控制canvas的管道流向
							let way = (this.done-this.dtwo)>=0?true:false
							if (this.done == this.dtwo) this.slidervalue = 0
							this.slidervalue = way ? 20 : -20
							//
							let dD = Math.pow((small/big), 2)
						
							let  k,_dD =Number(dD.toFixed(1))
							//judge 为ture代表可以计算，为false代表用户输入的数据不切合实际，不能计算
							let	judge = ((_dD <= 0.9) && (0.1 <= _dD)) ? true : false
							
							//if(!judge)return
							//缩小,way==true 表示流向是由大管到小
							k=way?this.map1[_dD]:this.map2[_dD]
							
					
				let v2 = Math.pow(this.Q * 100 / (Math.pow(this.done, 2) * 9 * Math.PI), 2)
				let _result = (10000*k * v2 / 19.6).toFixed(2)
				let result = _result > 0 ? _result : 0.01
				let _totalResult = _pipeItem * result
				let totalResult = _totalResult > 0 ? _totalResult.toFixed(2) : 0.01
				
				let V = {
					shi: {
						"input1V": [this.done, "上游管直径"],
						"input2V": [this.dtwo, "下游管直径"],
						"input3V": [this.Q, "流量"],
						"input4V": [_pipeItem, "弯管数量"],
				
					},
					result,
					_pipeItem,
					totalResult,
					type: "crossSectionMutation"
				}
			this.$emit('lossReslut', V)
		
			}
		},
		watch: {
			slidervalue(n, o) {
				let bigH = 90,
					bigW = this.size.L || 70,
					diffH = this.slidervalue
				var context = uni.createCanvasContext('fiveCanvas', this)
				context.translate(this.size.w * 0.8 || 30, this.size.h / 2 || 60)
				context.strokeStyle = "rgb(0, 0, 0)"

				context.setLineDash([]);

				context.beginPath()
				context.moveTo(0, 0)
				context.lineTo(bigW, 0)
				context.moveTo(0, 0)
				context.lineTo(bigW, 0)
				context.moveTo(0, 0)
				context.lineTo(0, bigH)
				context.moveTo(0, bigH)
				context.lineTo(bigW, bigH)
				context.stroke()
				context.beginPath()
				//大框右上角
				context.moveTo(bigW, 0)
				context.lineTo(bigW, diffH)
				//大框右下角
				context.moveTo(bigW, bigH)
				context.lineTo(bigW, bigH - diffH)
				//上小框线
				context.moveTo(bigW, bigH - diffH)
				context.lineTo(bigW + bigW, bigH - diffH)
				//下小框线
				context.moveTo(bigW, diffH)
				context.lineTo(bigW + bigW, diffH)
				//右小框线
				context.moveTo(bigW + bigW, diffH)
				context.lineTo(bigW + bigW, bigH - diffH)
				context.closePath()
				context.stroke()
				//轴线

				context.setLineDash([5, 8]);
				context.moveTo(-20, bigH / 2)
				context.lineTo(bigW + bigW + 20, bigH / 2)
				context.stroke()
				context.beginPath()
				context.setLineDash([]);
				context.moveTo(bigW, bigH / 2)
				context.lineTo(bigW - 15, bigH / 2 + 7)
				context.lineTo(bigW - 15, bigH / 2 - 7)
				context.lineTo(bigW, bigH / 2)
				context.fill()
				//标注

				context.font = `${this.size.fontSize}`
				context.fillText("A1", -22, bigH / 2 - 15)
				context.fillText("A2", bigW + bigW + 10, bigH / 2 - 15)
				context.fillText("v", bigW, bigH / 2 - 3)
				context.stroke()






				context.draw()

				//小框
				//
				immediate: true
			}


		}
	}
</script>

<style scoped>
	.c1 {
		display: flex;

	}

	.ninetyDegreeInput {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		font-size: medium;
		color: #2979ff;
	}

	.ninetyDegreeInput text {
		padding: 13rpx 0;
	}
</style>
