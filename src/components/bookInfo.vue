<template>
	<div>
		<div class="background"></div> 
		<img src="../assets/back2.png" @click="back()" style="margin: 10px;width: 10px;position:fixed;z-index: 1;top: 0px;">
		<div class="bookInfo">
			<img :src="book.cover" class="cover">
			<div class="text">
				<div style="float:left;line-height: 25px;">{{book.name}}</div>
				<div class="status" v-if="book.progress==2">连载</div>
				<div class="status" v-else>完结</div>
				<div style="clear:both"></div>
				<div class="author">
					<img src="../assets/auth2.png">
					<div style="float:left;line-height: 22px;color:#fff;">{{book.author}}</div>
					<div style="clear:both"></div>
				</div>
				<div>
					<div>{{book.wordCount}} | {{book.secondCate}}</div>
				</div>
			</div>
		</div>
		<div style="margin:20px 10px;margin-top: 180px;">
			<div class="description" :class="status==1?'more':''">书籍梗概:{{book.description}}</div>
			<img src="../assets/arrow.png" style="width: 15px;float:left;margin: 5px 0px;" v-show="status==0" @click="status=1">
					<div style="clear:both"></div>
		</div>
		<div class="flex">
				<div class="button" style="background: #ff7f0b;color:#fff;" @click="read(book.id)">开始阅读</div>
				<div class="button" @click="getBookStructure(book.id)">目录</div>
				<div class="button" v-if="inShell==0" @click="add(book.id)">+加入书架</div>
				<div class="button" v-else>已加入</div>
		</div>
		<div >
			<div style="margin-left: 2.5%;">猜你喜欢</div>
			<div style="display: flex;">
				<div v-for="(book,index) in list"  @click="bookInfo(book.id)" style="width: 20%;margin:2.5%;" >
					<img :src="book.cover" style="display: block;width:70px;height: 100px;">
					<div class="bookName">{{book.name}}</div>
					<div class="bookAuth">{{book.auth}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Qs from 'qs'
	export default {
		name: 'bookInfo',
		data() {
			return {
				book: "",
				status:0,
				list:"",
				inShell:0
			}
		},
		beforeCreate(){
			this.$utils.getCode()  
		},
		created() { 
				let userId=sessionStorage.getItem("userId")
				let id = this.$route.query.id 
				this.id = id
				this.$axios.get("doc/getBookInfo.htm?userId="+userId+"&cid=wechat&id=" + id).then((res) => { 
					this.book = res.data.book 
					this.list = res.data.recBooks  
					console.log(res)
					if(res.data.inShell){
						this.inShell=res.data.inShell
					}
				})  
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
					path: '/',
				})
			},
			bookInfo(id){
				let userId=sessionStorage.getItem("userId")
				this.id = id
				this.$axios.get("doc/getBookInfo.htm?userId="+userId+"&cid=wechat&id=" + id).then((res) => { 
					this.book = res.data.book 
					this.list = res.data.recBooks  
					console.log(res)
					if(res.data.inShell){
						this.inShell=res.data.inShell
					}else{
						this.inShell=0
					}
				})
			},
			read(id){ 
				this.$router.push({
					path: '/bookContent',
					query: {
						id: id,
						chapterId:1
					}
				})
			},
			getBookStructure(id){ 
				this.$router.push({
					path: '/bookStructure',
					query: {
						id: id
					}
				})
			},
			add(id){ 
				let userId=sessionStorage.getItem("userId")
				this.$axios.post("doc/addToBookShell.htm",Qs.stringify({userId:userId,id:id})).then((res)=>{
					console.log(res)
					alert("加入成功")
					this.inShell=1
				})
			}
		}

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.background {
		background: #7d616b;
		width: 100%;
		height: 150px;
		position: absolute;
		z-index: 0; 
		top: 0;
	}  
	.bookInfo {
		display: flex;
		margin: 10px 0px 0px 20px;
		align-items: flex-start;
		color: #fff;
		position: absolute;
		z-index: 1;
		top:40px;
	}

	.cover {
		width: 80px;
		display: block;
		margin-right: 10px;
		height: 112px;
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.08);
	}

	.status {
		float: left;
		border: 1px solid #fff;
		padding: 2px 10px;
		border-radius: 5px;
		font-size: 14px;
		margin-left: 10px;
	}

	.author {
		width: 100%;
		color: #959595;
		margin: 10px 0px;
	} 
	.author img {
		display: block;
		float: left;
		width: 15px;
		margin-right: 5px;
		margin-top: 4px;
	}

	.description {
		color: #2c2c2c;
		height: 40px;
		overflow: hidden;
		width: 95%;
		float:left;
		line-height: 20px;
	}
	.more{
		height: auto;
		width: 100%;
	}
	.flex{
		width: 95%;
		display: flex;
		margin: 20px auto;
		justify-content: space-between;
		}
		.button{
			background: #FFF;
			color: #ff7f0b;
			border: 1px solid #ff7f0b;
			width: 100px;
			line-height: 30px;
			text-align: center;
			border-radius: 5px;
		} 
		
		.bookName {
			font-size: 14px;
			margin: 2px 0px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		
		.bookAuth {
			color: #b5b5b5;
			font-size: 14px;
		}
		 
</style>
