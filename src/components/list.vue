<template>
	<div>
		  <div style="text-align: center;width: 100%;position: relative;line-height: 40px;border-bottom: 5px solid #eeeeee;color:#2c2c2c">
		 	<router-link to="/"><img src="../assets/back.png" style="position: absolute;height: 16px;left:10px;top:12px;"></router-link>
		 	{{title}}
		 </div>
		 <div id="list" style="padding-left: 15px;">
			 	<div class="type1" v-for="item in list" @click="bookInfo(item.id)">
			 	<img :src="item.cover" class="cover">
			 	<div class="text">
			 		<div class="bookName">{{item.name}}</div>
			 		<div class="info">{{item.description}}</div>
			 		<div class="author">
			 			<img src="../assets/auth.png">
			 			<div style="float:left;line-height: 22px;">{{item.author}}</div>
			 			<div class="label ">{{item.wordCount}}</div>
			 			<div class="label status" v-if="item.progress==2">连载</div>
			 			<div class="label status" v-else>完结</div>
			 			<div style="clear:both"></div>
			 		</div>
			 	</div>
			 	<div style="clear:both"></div>
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
				title:""
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
		 bookInfo(id) {
		 	this.$router.push({
		 		path: '/bookInfo',
		 		query: {
		 			id: id
		 		}
		 	})
		 }  
		},
		created() {
			this.title=this.$route.query.title
			let type=this.$route.query.type
			this.$axios.get("doc/getMore.htm?cid=wechat&type="+type).then((res) => {
				console.log(res)
				this.list = res.data.data.books
			}) 
				
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>  
	.type1 {
		display: flex;
		justify-content: space-between;
		margin: 5px 0px;
		color: #000;
		font-size: 14px;
		border-bottom: 1px solid #EEEEEE;
	}

	.type1 .cover {
		display: block;
		width: 20%;
		margin: 2.5%;
		height: 100%;
		margin-left: 0;
	}

	.type1 .text {
		width: 70%;
		margin: 2.5%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.type1 .bookName {
		font-size: 14px;
		margin: 0px;
	}

	.type1 .info {
		width: 90%;
		overflow: hidden;
		line-height: 20px;
		font-size: 14px;
		color: #959595;
		height: 40px;
	}

	.type1 .author {
		width: 100%;
		font-size: 10px;
		color: #959595;
	}

	.type1 .author img {
		display: block;
		float: left;
		width: 15px;
		margin-right: 5px;
		margin-top: 4px;
	}

	.type1 .label {
		float: right;
		margin-left: 10px;
		color: #e95d55;
		padding: 2px 5px;
		text-align: center;
		border: 1px solid #e95d55;
		border-radius: 5px;
	}
</style>
