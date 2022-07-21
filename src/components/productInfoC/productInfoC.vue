<template>
	<view>
		<evaluate :commentitem="comment[index]" v-for="(item,index) in comment"></evaluate>
		<u-gap height="50"></u-gap>
		<view class="commentInputPanel">
			<commentInputPanel @newComment="newComment" :toSonDataC="toSonDataC"></commentInputPanel>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database({
		provider: 'tencent',
		spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
	})
	export default {
		name: "productInfoC",
		props: ['toSonDataC'],
		data() {
			return {
				comment: null
			};

		},
		async created() {
			this.getComment()
		},
		mounted(){
		},
		updated(){
		},
		methods:{
			newComment(e) {
				console.log(1,e.result)
				this.comment.unshift(e.result)
			},
			async getComment() {
				let r = await db.collection('comment')
					.where({
						seriseCode: this.toSonDataC
					}).get()
				this.comment = r.result.data[0].comment
			}
		}
	}
</script>

<style scoped>
	.commentInputPanel {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
