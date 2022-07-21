<template>
	<view class="c1">
		  <view >
			  <canvas :canvas2d="true" :style="{width:size.width, height:size.height}" canvas-id="secondCanvas" id="secondCanvas"></canvas>
			  	<u-slider v-model="slidervalue" min="30" max="135" v-if="showReport"></u-slider>
		  </view>
		  <view class="ninetyDegreeInput" v-if="showReport">
			<text>弯管直径d</text>
			 <u--input
			     placeholder="单位: cm"
			     border="surround"
				 v-model="d"
			   ></u--input>
			   <text>R</text>
			   <u--input
			    placeholder="单位: cm"
			    border="surround"
				v-model="R"
			></u--input>
			<text>缓弯角度α</text>
			 <u--input
			  placeholder="单位: °"
			  border="surround"
			 v-model="aerfa"
			></u--input>
				 <text>流量</text>
				 <u--input
				  placeholder="m³/h"
				  border="surround"
				  v-model="Q"
				></u--input>
			<text>弯管数量</text>
			<u-number-box button-size="46" v-model="pipeItem" >
			</u-number-box>
		  </view>
	</view>
</template>

<script>
	export default {
		name:"noNinetyDegreeElbow",
		props:['showReport','size','count'], 
		data() {
			return {
				pipeItem:1,
				ctx: null,
				slidervalue:undefined,
				aerfa:undefined,
				d:undefined,
				R:undefined,
				Q:undefined,
			};
		},
		methods:{
			sendResult(){
				console.log("k")
				   //j为损失系数的系数
				  let  j=this.aerfa/90,_pipeItem=this.pipeItem
				   //k为局部损失系数
				  
				  let k=j*(0.131+0.163*Math.pow((this.d/this.R),3.5))
				  
				  let v=(this.Q/3600)/((Math.PI*Math.pow(this.d,2))/4)
				  let _result=(1000000000000*k*Math.pow(v,2)/(9.8*2)).toFixed(2)
				
				  let result=_result>0?_result:0.01
				  let _totalResult=_pipeItem*result
				  let totalResult=_totalResult>0?_totalResult:0.01
				  let V={
				  		shi:{
				  			"input1V": [this.d,"弯管直径d"],
				  			"input2V": [this.R,"半径R"], 
							"input3V": [this.aerfa,"缓弯角度"], 
				  			"input3V": [this.Q,"流量"], 
				  			"input4V": [this.pipeItem,"弯管数量"], 
				  			
				  		},
				  		result,
				  		_pipeItem,
				  		totalResult,
				  		type:"noNinetyDegreeElbow"
				  }
				  
				  
				  
				  this.$emit('lossReslut',V)
				 
			}
		}
		,
		mounted() {
			this.slidervalue=120
			
		},
		watch: {
		 slidervalue(n, o) {
			 /* R中心圆圈的半径 报告页面为30，计算器页面为70
			 minR小圆半径
			 maxR大圆半径
			 l两端直管长度 */
			 let R=this.size.R,l=R/2,minR=R-R/4,maxR=R+R/4
		  //let R=70,l=40,minR=R-20,maxR=R+20
		  var context = uni.createCanvasContext('secondCanvas', this)
		  context.translate(this.size.w||70, this.size.h||100)
		  context.strokeStyle = "rgb(66, 82, 96)"
		  context.setLineDash([]);
		  context.lineWidth =1;
		
		 context.beginPath()
		 context.arc(0, 0, minR, 3 * Math.PI / 2, (3 * Math.PI / 2)+n*Math.PI /180)
		
		 context.stroke()
		 //
		 context.beginPath()
		 context.arc(0, 0,maxR, 3 * Math.PI / 2, (3 * Math.PI / 2)+n*Math.PI /180)
		 		
		 context.stroke()
		 //
		 
		 context.beginPath()
		  context.strokeStyle = "rgb(186, 88, 75)"
		 context.arc(0, 0, R, 3 * Math.PI / 2, (3 * Math.PI / 2)+n*Math.PI /180)	
		 context.stroke()
		
		//
		context.beginPath()
		context.strokeStyle = "rgb(66, 82, 96)"
		context.arc(0, 0, R/5, 3 * Math.PI / 2, (3 * Math.PI / 2)+n*Math.PI /180)
				
		context.stroke()
		 
		 
		//下直管
		context.beginPath()
		
		
		let _n=n*2*Math.PI/360
		context.moveTo((minR)*Math.sin(_n),-(minR)*Math.cos(_n))
		context.lineTo(Math.sqrt(minR*minR+l*l-Math.pow(minR*Math.cos(_n)-l*Math.sin(_n),2)),-(minR*Math.cos(_n)-l*Math.sin(_n)))
		
		
		
		context.moveTo(maxR*Math.sin(_n),-maxR*Math.cos(_n))
		context.lineTo(Math.sqrt(maxR*maxR+l*l-Math.pow(maxR*Math.cos(_n)-l*Math.sin(_n),2)),-(maxR*Math.cos(_n)-l*Math.sin(_n)))
		//流速
		
		context.stroke()
		//上直管
		
		context.beginPath()
		context.moveTo(0,-minR)
		context.lineTo(-l,-minR)
		context.moveTo(0,-maxR)
		context.lineTo(-l,-maxR)
		context.stroke()
		
		//侧边半径
			
		 
		
		//arrow的箭头长度
		let aL=R/10
		context.beginPath()
		context.setLineDash([5, 8]);
		
		 context.moveTo(0,0)
		 context.lineTo(0,-maxR)
		 context.moveTo(0,0)
		 context.lineTo(maxR*Math.sin(_n),-maxR*Math.cos(_n))
		 context.stroke()
		 
		 context.beginPath()
		 context.setLineDash([]);
		 context.moveTo(0,0)
		 context.lineTo(0,-R)
		 context.moveTo(0,-R)
		context.lineTo(-aL,-R+aL)
		context.moveTo(0,-R)
		context.lineTo(aL,-R+aL)

		  context.stroke()
		  //流速
		  context.beginPath()
		  context.setLineDash([]);
		 context.strokeStyle = "rgb(0, 0, 0)"
		 context.moveTo(R*Math.sin(_n),-R*Math.cos(_n))
		 context.lineTo(Math.sqrt(R*R+l*l-Math.pow(R*Math.cos(_n)-l*Math.sin(_n),2)),-(R*Math.cos(_n)-l*Math.sin(_n)))
		 context.stroke()
		 //d
		 
		 context.beginPath()
		 context.strokeStyle = "rgb(66, 82, 96)"
		 context.setLineDash([]);
		
		 context.moveTo(-l/2, -minR)
		 context.lineTo(-l/2, -maxR)
		 //下arrow
			
		 context.moveTo(-l/2, -minR)
		 context.lineTo(-l/2-aL,-minR-aL)
		 context.moveTo(-l/2, -minR)
		 context.lineTo(-l/2+aL,-minR-aL)
		 //上arrow
		 context.moveTo(-l/2, -maxR)
		 context.lineTo(-l/2-aL,-maxR+aL)
		 context.moveTo(-l/2, -maxR)
		 context.lineTo(-l/2+aL,-maxR+aL)
		 context.stroke()
		 
		 //标注
		 
		 context.font = `${this.size.fontSize}`
		 context.fillText("d",-l/2-15,-R+6)
		 context.fillText("v",Math.sqrt(R*R+l*l-Math.pow(R*Math.cos(_n)-l*Math.sin(_n),2))-15,-(R*Math.cos(_n)-l*Math.sin(_n))+15)
		context.fillText("R",-R/3,-R/4)
		
		 context.fillText("α", R/4,-2)
		 context.draw()
		 //
		 immediate:true
		 }
		 
		}
	}
</script>

<style scoped>
.c1{
	display: flex;
}
.ninetyDegreeInput{
	display: flex; 
	flex-direction: column;
	justify-content: space-evenly;
	font-size: medium;
	color: #2979ff;
}
.ninetyDegreeInput text{
	padding: 13rpx 0;
}
</style>
