<template>
	<view class="c1">
		<view>
			<canvas :style="{width:size.width, height:size.height}"  canvas-id="fourCanvas" id="fourCanvas"></canvas>
			<u-slider v-model="slidervalue" min="10" max="25"  v-if="showReport"></u-slider>
		</view>
		<view class="ninetyDegreeInput"  v-if="showReport">
			<text>上游管直径</text>
			<u--input placeholder="单位: m" border="surround" v-model="done"></u--input>
			<text>下游管直径</text>
			<u--input placeholder="R" border="surround" v-model="dtwo"></u--input>
			<text>流量</text>
			<u--input placeholder="流量" border="surround" v-model="Q"></u--input>
			<text>θ</text>
			<u--input placeholder="单位: ° " border="surround" v-model="angle"></u--input>
			<text>弯管数量</text>
			<u-number-box button-size="46" v-model="pipeItem">
			</u-number-box>
		</view>
	</view>
</template>

<script>
	export default {
		name: "gradientTube",
		props: ['showReport', "size"],
		data() {
			return {
				pipeItem:1,
				slidervalue: undefined,
				done: undefined,
				dtwo: undefined,
				Q: undefined,
				angle: undefined,
			
				mapAngle: {
					10: 0.4,
					20: 0.25,
					40: 0.20,
					60: 0.20,
					80: 0.30,
					100: 0.40,
					140: 0.60,

				},
				mapProportion: {
					0.9: 0.1,

					0.7: 0.2,

					0.5: 0.3,

					0.3: 0.36,

					0.1: 0.4
				}
			};
		},
		mounted() {
			this.slidervalue = 15
		},
		methods: {
			sendResult() {
				let _pipeItem = this.pipeItem
			
				let _angle=((this.angle/10).toFixed(0))*10
				let k1=this.mapAngle[_angle]
				let proportion=Math.pow((this.dtwo/this.done),2).toFixed(1)
				let k2=this.mapProportion[proportion]
				let k=k1*Math.pow((1/k2-1),2)
				
				console.log(1,result,k,k1,k2)
				
				let _result =(10*k*Math.pow(((100/(9*Math.PI))*(this.Q/(Math.pow(this.dtwo,2)))),2)*0.051).toFixed(2)
				let result = _result > 0 ? _result : 0.01
				let _totalResult = _pipeItem * result
				let totalResult = _totalResult > 0 ? _totalResult.toFixed(2) : 0.01
				
				
				let V = {
					shi: {
						"input1V": [this.done, "上游管直径"],
						"input2V": [this.dtwo, "下游管直径"],
						"input3V": [this.Q, "流量"],
						"input4V": [this.angle, "θ"],
					},
					result,
					_pipeItem,
					totalResult,
					type: "gradientTube"
				}
				this.$emit('lossReslut', V)
			}
		},
		watch: {
			slidervalue(n, o) {
				let bigH = 90,
					bigW = 70,
					diffW = this.slidervalue,
					diffH = 26
				var context = uni.createCanvasContext('fourCanvas', this)
				context.translate(this.size.gradientTube_w-30,  this.size.gradientTube_h-55)
				context.strokeStyle = "rgb(0, 0, 0)"

				context.setLineDash([]);
				context.lineWidth = 1;
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

				//context.lineTo(bigW+45*diffW/diffH,45)	
				context.lineTo(bigW + diffW, diffH)

				//大框右下角
				context.stroke()

				//	context.moveTo(bigW+45*diffW/diffH,bigH/2) 

				//虚线


				context.moveTo(bigW, bigH)
				context.lineTo(bigW + diffW, bigH - diffH)
				//context.lineTo(bigW+bigH/2*diffW/diffH,bigH/2)

				//上小框线
				context.moveTo(bigW + diffW, diffH)
				context.lineTo(bigW + bigW, diffH)
				//下小框线

				context.moveTo(bigW + diffW, bigH - diffH)
				context.lineTo(2 * bigW, bigH - diffH)
				//右小框线
				context.moveTo(bigW + bigW, diffH)

				context.lineTo(2 * bigW, bigH - diffH)

				context.closePath()
				context.stroke()


				//轴线
				context.setLineDash([5, 8]);
				context.moveTo(-20, bigH / 2)
				context.lineTo(bigW + bigW + 20, bigH / 2)
				context.stroke()
				context.beginPath()
				context.setLineDash([]);
				context.moveTo(bigW / 2, bigH / 2)
				context.lineTo(bigW / 2 - 15, bigH / 2 + 7)
				context.lineTo(bigW / 2 - 15, bigH / 2 - 7)
				context.lineTo(bigW / 2, bigH / 2)
				context.fill()
				//标注

				context.font = "16px serif";
				context.fillText("A1", -20, bigH / 2 - 15)
				context.fillText("A2", bigW + bigW + 10, bigH / 2 - 15)
				context.fillText("v", bigW / 2, bigH / 2 - 3)
				context.fillText("θ", bigW + diffW - 7, bigH / 2 - 3)
				context.stroke()

				context.setLineDash([5, 8]);
				context.moveTo(bigW + diffW, diffH)
				context.lineTo(bigW + 45 * diffW / diffH, bigH / 2)
				context.moveTo(bigW + diffW, bigH - diffH)
				context.lineTo(bigW + bigH / 2 * diffW / diffH, bigH / 2)
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
