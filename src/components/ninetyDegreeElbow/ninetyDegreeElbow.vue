<template>
	<view class="c1">
		<view>
			<canvas :canvas2d="true" :style="{width:size.width, height:size.height}" canvas-id="firstCanvas"
				id="firstCanvas"></canvas>
			<u-slider v-model="slidervalue" min="43" max="105" v-if="showReport"></u-slider>
		</view>
		<view class="ninetyDegreeInput"  v-if="showReport">
			<text>弯管直径d</text>
			<u--input placeholder="单位: m" border="surround" v-model="d"></u--input>
			<text>R</text>
			<u--input placeholder="R" border="surround" v-model="R"></u--input>
			<text>流量</text>
			<u--input placeholder="流量" border="surround" v-model="Q"></u--input>
			<text>弯管数量</text>

			<u-number-box button-size="46" v-model="pipeItem">
			</u-number-box>

		</view>
	</view>
</template>

<script>
	export default {
		name: "ninetyDegreeElbow",
		props: ['showReport', "size"],
		data() {
			return {
				pipeItem: 1,
				ctx: null,
				d: undefined,
				R: undefined,
				Q: undefined,
				slidervalue: undefined
			};
		},
		mounted() {
			
			this.slidervalue = 80
		
		},
		methods: {
			canvasIdErrorCallback: function(e) {

			},
			sendResult() {
				//k为局部损失系数
				let _pipeItem = this.pipeItem
				let k = 0.131 + 0.163 * Math.pow((this.d / this.R), 3.5)
				let v = (this.Q / 3600) / ((Math.PI * Math.pow(this.d, 2)) / 4)
				let _result =  (1000000000000*k * Math.pow(v, 2) / (9.8 * 2)).toFixed(2)
				let result = _result > 0 ? _result : 0.01
				let _totalResult = _pipeItem * result
				let totalResult = _totalResult > 0 ? _totalResult : 0.01
				
				let V = {
					shi: {
						"input1V": [this.d, "弯管直径d"],
						"input2V": [this.R, "半径R"],
						"input3V": [this.Q, "流量"],
						"input4V": [this.pipeItem, "弯管数量"],
					},
					result,
					_pipeItem,
					totalResult,
					type: "ninetyDegreeElbow"
				}
				this.$emit('lossReslut', V)
			}
		},
		watch: {
			slidervalue(n, o) {
				//最大圆半径
				let maxR = this.size.ninetyDegreeElbow_R || 130,
					xuR = n + (maxR - n) / 2,
					xp = Math.sqrt(2) * (this.size.ninetyDegreeElbow_R * 0.8) / 2 || Math.sqrt(2) * (xuR) / 2,
					yp = -Math.sqrt(2) * (this.size.ninetyDegreeElbow_R * 0.8) / 2 || -Math.sqrt(2) * (xuR) / 2
				//直管偏移值
				let dP = maxR / 5


				var context = uni.createCanvasContext('firstCanvas', this)
				context.translate(this.size.w || 40, this.size.h + 20 || 150)
				context.strokeStyle = "rgb(66, 82, 96)"
				context.lineWidth = 1;
				context.beginPath()
				context.moveTo(0, -maxR / 10)
				context.lineTo(maxR / 10, -maxR / 10)
				context.lineTo(maxR / 10, 0)
				context.stroke()
				context.setLineDash([5, 8]);
				context.beginPath()
				context.moveTo(0, 0)
				context.lineTo(maxR, 0)
				context.closePath()
				context.stroke()
				context.beginPath()
				context.moveTo(0, 0)
				context.lineTo(0, -maxR)
				context.stroke()
				//上直管

				context.setLineDash([]);
				context.beginPath()
				context.moveTo(0, -maxR)
				context.lineTo(-dP, -maxR)
				context.moveTo(0, -this.size.ninetyDegreeElbow_R * 0.6 || -n)
				context.lineTo(-dP, -this.size.ninetyDegreeElbow_R * 0.6 || -n)
				context.stroke()
				//下直管

				context.beginPath()
				context.moveTo(maxR, 0)
				context.lineTo(maxR, dP)
				context.moveTo(this.size.ninetyDegreeElbow_R * 0.6 || n, 0)
				context.lineTo(this.size.ninetyDegreeElbow_R * 0.6 || n, dP)
				context.stroke()
				//直管直径

				context.setLineDash([]);
				context.beginPath()
				//上
				context.moveTo(-dP / 2, -this.size.ninetyDegreeElbow_R * 0.6 || -n)
				context.lineTo(-dP / 2, -maxR)
				//arrow
				context.stroke()

				context.moveTo(-dP / 2, -maxR)
				context.lineTo(-dP * 0.8, -maxR * 0.95)
				context.moveTo(-dP / 2, -maxR)
				context.lineTo(-dP * 0.2, -maxR * 0.95)

				//arrow
				context.moveTo(-dP / 2, -this.size.ninetyDegreeElbow_R * 0.6 || -n)
				context.lineTo(-dP * 0.8, -this.size.ninetyDegreeElbow_R * 0.6 - maxR * 0.05 || -n - 5)
				context.moveTo(-dP / 2, -this.size.ninetyDegreeElbow_R * 0.6 || -n)
				context.lineTo(-dP * 0.2, -this.size.ninetyDegreeElbow_R * 0.6 - maxR * 0.05 || -n - 5)
				context.stroke()
				//虚线圆

				context.strokeStyle = "rgb(166, 46, 34)"
				context.beginPath()
				context.arc(0, 0, this.size.ninetyDegreeElbow_R * 0.8 || xuR, 3 * Math.PI / 2, 2 * Math.PI)
				context.stroke()
				//流速arrow
				context.beginPath()
				context.moveTo(this.size.ninetyDegreeElbow_R * 0.8 || xuR, 0)
				context.lineTo(this.size.ninetyDegreeElbow_R * 0.8 || xuR, maxR / 5)
				context.lineTo(this.size.ninetyDegreeElbow_R * 0.8 - maxR / 13 || xuR - maxR / 13, maxR / 13)
				context.moveTo(this.size.ninetyDegreeElbow_R * 0.8 || xuR, maxR / 5)
				context.lineTo(this.size.ninetyDegreeElbow_R * 0.8 + maxR / 13 || xuR + maxR / 13, maxR / 13)
				context.stroke()

				//小圆

				context.strokeStyle = "rgb(0, 0, 0)"
				context.setLineDash([]);
				context.beginPath()
				context.arc(0, 0, this.size.ninetyDegreeElbow_R * 0.6 || n, 3 * Math.PI / 2, 2 * Math.PI)
				context.stroke()
				//半径R

				context.beginPath()
				context.moveTo(0, 0)
				context.lineTo(xp, yp)
				context.lineTo(xp - 2, yp + xp / 6)
				context.moveTo(xp, yp)
				context.lineTo(xp - xp / 6, yp + 2)

				context.stroke()
				//标注

				context.font = `${this.size.fontSize}`
				context.fillText("d", -dP - 6, -this.size.ninetyDegreeElbow_R * 0.75 || -xuR + 6)
				context.fillText("v", xuR + 10, 0 + 15)
				context.fillText("R", xp / 2 - 10, yp / 2 - 10)
				context.fillText("90°", 18, -2)

				//最大圆

				context.beginPath()
				context.arc(0, 0, maxR, 3 * Math.PI / 2, 2 * Math.PI)
				context.stroke()
				context.draw()

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
