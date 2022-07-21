<template>
	<view class="c1">
		<view>
			<canvas :style="{width:size.width, height:size.height}" canvas-id="thirdCanvas" id="thirdCanvas"></canvas>
			<u-slider v-model="slidervalue" min="70" max="90"  v-if="showReport"></u-slider>
		</view>
		<view class="foldedTubeInput"  v-if="showReport">
			<text>折角</text>
			<u--input placeholder="单位: °" border="surround" v-model="aerfa"></u--input>
			<text>直径</text>
			<u--input placeholder="单位: cm" border="surround" v-model="d"></u--input>
			<text>流量</text>
			<u--input placeholder="m³/h" border="surround" v-model="Q"></u--input>
			<text>折管数量</text>
			<u-number-box button-size="46" v-model="pipeItem">
			</u-number-box>
		</view>
	</view>
</template>

<script>
	export default {
		props:['showReport',"size","s"],
		name: "foldedTube",
		data() {
			return {
				pipeItem:1,
				ctx: null,
				slidervalue:undefined,
				d: undefined,
				aerfa: undefined,
				Q: undefined
			};
			
		},
		methods: {
			sendResult() {
				//j为损失系数的系数
				let _pipeItem = this.pipeItem
				let k=0.946*Math.pow(Math.sin(this.aerfa*Math.PI/180/2),2)+2.047*Math.pow(Math.sin(this.aerfa*Math.PI/180/2),4)
				
				let v = (this.Q/3600)/((Math.PI * Math.pow(this.d, 2)) / 4)
				let _result =(10*k*Math.pow(((100/(9*Math.PI))*(this.Q/(Math.pow(this.d,2)))),2)*0.051).toFixed(2)
				let result = _result > 0 ? _result : 0.01
				console.log(k,(10000*k*Math.pow(((100/(9*Math.PI))*(this.Q/(Math.pow(this.d,2)))),2)*0.051))
				let _totalResult = _pipeItem * result
				let totalResult = _totalResult > 0 ? _totalResult.toFixed(2) : 0.01
				 let V={
						shi:{
							"input1V": [this.d,"折管直径"],
							"input2V": [this.aerfa,"半径"], 
							"input3V": [this.Q,"流量"], 
							"input4V": [this.pipeItem,"折管数量"], 
							
						},
						result,
						_pipeItem,
						totalResult,
						type:"foldedTube"
				}
				
				
				
				this.$emit('lossReslut',V) 
			}
		},
		mounted() {
			
			this.slidervalue =this.s?90:75
		},
		watch: {
			slidervalue(n, o) {
				let l = 70,
					w = 20
				var context = uni.createCanvasContext('thirdCanvas', this)
				context.translate(30, 50)
				context.strokeStyle = "rgb(0, 0, 0)"
				context.setLineDash([]);
				context.moveTo(0, 0)
				context.lineTo(l, 0)
				context.moveTo(0, w)
				context.lineTo(l, w)
				let _n = 2 * n * Math.PI / 360
				context.moveTo(l, 0)
				context.lineTo(l + Math.sin(_n) * l, Math.cos(_n) * l)
				context.moveTo(l, w)
				context.lineTo(l + Math.sin(_n) * l, Math.cos(_n) * l + w)
				context.stroke()
				context.beginPath()
				context.setLineDash([5, 8]);
				context.moveTo(0, w / 2)
				context.lineTo(l, w / 2)
				context.moveTo(l, 0)
				context.lineTo(l + l, 0)
				context.moveTo(l, w / 2)
				context.lineTo(l + Math.sin(_n) * l, w / 2 + Math.cos(_n) * l)
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

	.foldedTubeInput {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		font-size: medium;
		color: #2979ff;
	}

	.foldedTubeInput text {
		padding: 13rpx 0;
	}
</style>
