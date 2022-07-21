<template>
	<view class="selctionForm">

		<view class="selctionInputa" v-for="(item,index) in selctionItem">
			<u--text size='14' type='info' :text="item.name"></u--text>
			<u--input :type="item.type"  :placeholder="item.unit" v-model="selctionItem[index].value"></u--input>
		</view>
		<view class="selctionInputb">
			<view>
				<u--text size='14' type='info' text="连接方式"></u--text>
			</view>
			<view>
				<u-radio-group v-model="radiovalue1" >
					<u-radio :customStyle="{marginRight: '4rpx'}" v-for="(item, index) in radiolist1"
						:label="item.name" :name="item.name" >
					</u-radio>
				</u-radio-group>
			</view>
			
		</view>
		<view class="selctionInputc" v-if="pumpNums">
			
			<u--text size='14' type='info' text="水泵台数"></u--text>
			<u-number-box v-model="pumpValue" ></u-number-box>
		</view>
		
		<view class="selctionInputb">
			<u--text size='14' type='info' text="开启模糊查找"></u--text>
			<u-switch v-model="fuzzyLookup" ></u-switch>
		</view>
		<view class="selctionInputd">
			<u-button @click="toGo"   type="primary" text="搜索"></u-button>
			<u-gap height="20" ></u-gap>
			<u-button  plain  text="重置" type="error" @click="clear"></u-button>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		name: "selctionForm",
		data() {
			return {
				fuzzyLookup:true,
				pumpNums:true,
				pumpValue:1,
				show: false,
				columns: [
					['1', '2', '33']
				],
				selctionItem: [{
						name: '型号',
						id: 1,
						unit: '例如:AS-1',
						value:undefined,
						type:'text'
					},
					{
						name: '流量',
						id: 2,
						unit: '单位：m³/h',
						value:undefined,
						
						type:'number'
					},
					{
						name: '扬程',
						id: 3,
						unit: '单位：m',
							value:undefined,
						
						type:'number'
					},

				],
				radiolist1: [{
						name: '串联',
						disabled: false
					},
					{
						name: '并联',
						disabled: false
					},
					{
						name: '单泵',
						disabled: false
					}


				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '串联',
			};
		},
		methods:{
			clear(){
				this.pumpNums=true
				this.pumpValue=1
				this.radiovalue1='串联'
				console.log(this.selctionItem[0].value)
				this.selctionItem[0].value=undefined
				this.selctionItem[1].value=undefined
				this.selctionItem[2].value=undefined
				this.fuzzyLookup=true
			},
			toGo(){
				
				let u=this.selctionItem.filter(res=>{
					if(res.value){
						return [res.id,res.value]
					}
				})
			
				if(u.length>0){
					let sta=''
					//id3是扬程
					u.forEach(res=>{
						//id2是流量,且串联
						if(res.id==3&&this.radiovalue1=="串联"){
							sta=sta+res.id+","+res.value/this.pumpValue+";"
							
						}else if(res.id==2&&this.radiovalue1=="并联"){//id3是扬程,且并联
							sta=sta+res.id+","+res.value/this.pumpValue+";"
							
						}else{
							sta=sta+res.id+","+res.value+";"
						}
					
						
					})
					sta=sta.substring(0, sta.length - 1)
					//range，是模糊查找的范围
					let range=2
					this.fuzzyLookup?"":range=0
					uni.navigateTo({
						url:`../../pages/selection/selectedPump/selectedPump?id=${sta}&fL=${range}`
					})
				} 
				
			}
		},
		watch:{
			radiovalue1:function(newVal,oldVal){
				if(newVal==='单泵'){
					this.pumpNums=false
				}else{
					this.pumpNums=true
				}
			}
		}
	
	}
</script>

<style scoped>
	.selctionForm {
		padding:10rpx 80rpx 0rpx 80rpx;
	}

	.selctionInputa {
		padding: 22rpx;
	}
	

.selctionInputd{
	padding:20rpx 92rpx;
	display: flex;
	flex-direction: column;
}
	.selctionInputb {
		padding: 22rpx;
		display: flex;
		justify-content: space-between;
	}
.selctionInputc{
	padding: 22rpx;
	display: flex;
	justify-content:space-between;
}
	input {
		background-color: rgb(255, 255, 255);
		padding: 18rpx;
		margin-top: 6rpx;
		border-radius: 4px;
		border: 1rpx solid rgb(145, 145, 145);
	}
</style>
