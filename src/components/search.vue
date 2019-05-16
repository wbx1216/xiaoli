<template>
	<div style="padding: 15px;">
		<div class="head">
			<router-link to="/"><img src="../assets/back.png" class="back"></router-link>
			<div class="input">
				<img src="../assets/search.png" style="height: 20px;display: block;float:left;margin: 5px 10px;">
				<input type="text" v-model="searchText" style="background: none;border: none;height: 20px;float:left;margin: 4px 0px;"
				 placeholder="搜索你感兴趣的内容">
			</div>
			<div @click="search">搜索</div>
		</div>
		<div v-if="!list" style="display: flex;justify-content: space-between;margin:15px 0px;color:#949494">
			<div>为您推荐</div>
			<div @click="resh()">换一批<img src="../assets/resh.png" style="width: 17px;margin: -2px 2px;"></div>
		</div> 
		<div id="list">
			<div v-if="!list" v-for="(item,index) in bookCate" @click="cate(item.secondCate)" class="tab" :class="index<3?'red':''">
				{{item.secondCate}}
			</div>
			<div v-else>
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
		<div v-if="!list" >
			<div style="display: flex;justify-content: space-between;margin:15px 0px;color:#949494;align-items: center;">
			<div>浏览记录</div>
			<img src="../assets/del.png" style="width: 17px;" @click="delAll()"> 
			 </div>
				<div v-for="(item,index) in history" style="display: flex;justify-content: space-between;color:#949494;align-items: center;padding: 5px 0px;border-bottom: 1px solid #f0f0f0;">
					<div style="color:000;">{{item}}</div>
					<img src="../assets/del2.png" style="width: 10px;" @click="del(index)">
			 </div>
		</div>
		<div class="cover2" v-show="alert==1" @click="alert=0"></div>
		<div class="rate" v-show="alert==1">
			<img src="../../static/cat.png" style="width: 120px;display: block;position: absolute;top:-70px;left:75px">
			<div class="title">小说没找到?</br>下载APP更多海量优质小说!</div>
			<div style="display: flex; text-align: center;line-height: 48px;height: 48px;overflow: hidden;">
				<div style="width: 50%; height: 48px;" @click="alert=0">随便看看</div>
				<router-link style="width: 50%;height: 48px;color:#ff6e03" to="download" >立即下载</router-link>
			</div>
 		</div>
	</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				bookCate: "",
				searchText: "",
				list: "",
				history: [],
				alert:0
			}
		},
		methods: {
		  bookInfo(id) {
				this.$router.push({
					path: '/bookInfo',
					query: {
						id: id
					}
				})
			},
			search() {
				let search = this.searchText
				let history=this.history 
				this.$axios.get("searchResult.htm?cid=wechat&search=" + search).then((res) => {
					console.log(res)
					if(res.data.books){ 
						this.list = res.data.books
					}else{
						this.list=""
						this.alert=1
					}
				}) 
				if(search){
					history.push(search)
					history=[...new Set(history)]
					sessionStorage.setItem("history",history) 
				}
			},
			cate(text){ 
				this.searchText=text
				let search = this.searchText
				let history=this.history 
				this.$axios.get("searchResult.htm?cid=wechat&search=" + search).then((res) => {
					this.list = res.data.books
				}) 
				if(search){
					history.push(search)
					history=[...new Set(history)]
					sessionStorage.setItem("history",history) 
				}
			},
			resh() {
				this.$axios.get("searchCate.htm?cid=wechat").then((res) => {
					console.log(res)
					this.bookCate = res.data.bookCate
				})
			},
			delAll(){
				this.history=""
				sessionStorage.removeItem("history")
			},
			del(index){
				  this.history.splice(index,1)
				  sessionStorage.setItem("history",this.history) 
			    }
		},
		beforeCreate(){
			this.$utils.getCode();
		},
		created() {
			this.$axios.get("searchCate.htm?cid=wechat").then((res) => {
				console.log(res)
				this.bookCate = res.data.bookCate
			})
			if(sessionStorage.getItem("history")){
				this.history=sessionStorage.getItem("history").split(',')
			}
			console.log(this.$route)
			if(this.$route.query.searchText){
				this.searchText=this.$route.query.searchText
			    let search = this.searchText
				let history=this.history 
				this.$axios.get("searchResult.htm?cid=wechat&search=" + search).then((res) => {
					console.log(res)
					if(res.data.books){ 
						this.list = res.data.books
					}else{
						this.list=""
						this.alert=1
					}
				}) 
				if(search){
					history.push(search)
					history=[...new Set(history)]
					sessionStorage.setItem("history",history) 
				}
			}
		},
	mounted() {
		let link=location.origin+"/doc/invite.htm"
		let title="成为我的徒弟，做任务就有钱啦"
		let desc="新用户专享3-10元现金~"
		this.$utils.wxShare(link,title,desc)
	},
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
	 	.cover2{
	 	background: rgba(0,0,0,0.7);
	 	position: fixed;
	 	width: 100%;
	 	height: 100%;
	 	z-index: 9;
	 	left:0;
	 	top:0;
	 } 
	 .rate{
	 	width:270px;
	 	height: 150px;
	 	position: fixed;
	 	left:0;
	 	right: 0;
	 	top:0;
	 	bottom:0;
	 	margin: auto;
	 	background: #FFF;
	 	border-radius: 20px;
	 	z-index: 999; 
	 }
	 .rate .title{ 
	 	background:#ffa35f;
	 	padding: 40px 30px 20px 30px;
	 	text-align: center;
	 	color:#FFF;
	 	border-radius: 20px 20px 0px 0px;
	 }

	.head {
		display: flex;
		justify-content: space-between;
		margin: 10px 0px;
		align-items: center;
	}

	.back {
		display: block;
		width: 8px;
	}

	.head .input {
		width: 250px;
		background: #eeeeee;
		border-radius: 20px;
		height: 30px;
		line-height: 30px;
	}

	#list {
		display: flex;
		flex-flow: wrap;
	}

	.tab {
		padding: 2px 5px;
		margin: 5px 5px;
		font-size: 14px;
		line-height: 24px;
		background: #f5f7fa;
	}

	.red {
		color: #fa4f42;
		background: #fff5f5;
	}

	.type1 {
		display: flex;
		justify-content: space-between;
		margin: 5px 0px;
		color: #000;
		font-size: 14px;
	}

	.type1 .cover {
		display: block;
		width: 20%;
		margin: 2.5%;
		height: 100%;
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
		font-size: 14px;
		color: #959595;
		height: 40px;
		line-height: 20px;
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
