<template>
	<div>
		<div style="text-align: center;width: 100%;position: relative;line-height: 40px;border-bottom: 5px solid #eeeeee;color:#2c2c2c">
			<img src="../assets/back.png" style="position: absolute;height: 16px;left:10px;top:12px;" @click="back()">
			目录
		</div>
		<div id="list">
			<div v-for="item in list" class="title" @click="content(item.chapterId)">
				{{item.title}}
			</div>
		</div>
		</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				list: "",
				id:""
			}
		},
		beforeCreate(){
			this.$utils.getCode();
		},
		mounted() {
			let link=location.origin+"/doc/invite.htm"
			let title="成为我的徒弟，做任务就有钱啦"
			let desc="新用户专享3-10元现金~"
			this.$utils.wxShare(link,title,desc)
		},
		methods: {
			back() {
				this.$router.push({
					path: '/bookInfo',
					query: {
						id: this.id,
					}
				})
			},
			content(chapterId){
				let id=this.id
				this.$router.push({
					path: '/bookContent',
					query: {
						id: id,
						chapterId:chapterId
					}
				})
			}
		},
		created() {
			let id = this.$route.query.id
			this.id=id
			this.$axios.get("doc/getBookStructure.htm?cid=wechat&id=" + id).then((res) => {
				console.log(res)
				this.list = res.data.bookStructure[0].chapters
			})
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{ 
	border-bottom: 1px solid #EEEEEE;
	margin-left: 20px; 
	line-height: 50px;
	color: #616161;
}
</style>
