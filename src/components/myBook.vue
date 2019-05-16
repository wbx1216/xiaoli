<template>
	<div style="padding-bottom: 70px;">
		<div class="background">
			<div class="head">
				<div v-show="edit==1" style="float:left;" @click="edit=0">完成</div>
				<div v-show="edit==1&&all==0" style="float:right" @click="allSet">全选</div>
				<div v-show="edit==1&&all==1" style="float:right" @click="allunSet">取消全选</div>
				<div style="float:left" v-show="edit==0" >今日阅读</div>
				<div style="float:right" v-show="edit==0" @click="edit=1"><img src="../assets/setting.png" style="width: 16px;display: block;"></div>
				<div style="clear: both;"></div>
			</div>
			<div class="list">
				<div v-for="(item,index) in history" class="item book" @click="read(item.id,item.lastChpt,index)">
					<div class="unset" v-show="edit==1&&item.selected==0"></div>
					<img src="../assets/set.png" class="set" v-show="edit==1&&item.selected==1">
					<img :src="item.cover" class="cover">
					<div style="color:#FFF;text-align: center;">{{item.lastChpt}}/{{item.chptCount}}</div>
				</div>
			</div> 
		</div>
		<div class="flex">
			<div v-for="(book,index) in myBook" @click="bookInfo(book.id,index)" class="book" >
				<div class="unset" v-show="edit==1&&book.selected==0"></div>
				<img src="../assets/set.png" class="set" v-show="edit==1&&book.selected==1">
				<img :src="book.cover" class="cover">
				<div class="bookName">{{book.name}}</div>
			</div>
			<div class="book">
				<router-link to="/"><img src="../assets/add.png" class="cover"></router-link>
			</div>
		</div>
		<div class="del" v-show="edit==1" @click="del">删除({{number}})</div>
	</div>
</template>

<script>
	import Qs from 'qs'
	export default {
		name: 'bookInfo',
		data() {
			return {
				history: "",
				myBook: "",
				edit: 0,
				number:0,
				all:0,
				myBooktab_active:true
			}
		},
		beforeCreate(){
			this.$utils.getCode()  
		},
		created() {
			let userId=sessionStorage.getItem("userId") 
			this.$axios.get("doc/nextMyBook.htm?userId="+userId+"&cid=wechat&type=2").then((res) => {
				console.log(res)
				this.history = res.data.bookRecords
			})
			this.$axios.get("doc/nextMyBook.htm?userId="+userId+"&cid=wechat&type=1").then((res) => {
				console.log(res)
				this.myBook = res.data.bookRecords
			})
		},
		mounted() {
			let link=location.origin+"/doc/invite.htm"
			let title="成为我的徒弟，做任务就有钱啦"
			let desc="新用户专享3-10元现金~"
			this.$utils.wxShare(link,title,desc) 
		},
		methods: {
			bookInfo(id, index) {
				if (this.edit == 0) {
					this.$router.push({
						path: '/bookInfo',
						query: {
							id: id
						}
					})
				} else {
					this.myBook[index].selected = 1 - this.myBook[index].selected
					if(this.myBook[index].selected==1){
						this.number++
					}else{
						this.number--
					}
				}
			},
			read(id, lastChpt, index) {
				if (this.edit == 0) {
					this.$router.push({
						path: '/bookContent',
						query: {
							id: id,
							chapterId: lastChpt
						}
					})
				} else {
					this.history[index].selected = 1 - this.history[index].selected
					if(this.history[index].selected==1){
						this.number++
					}else{
						this.number--
					}
				}
			},
			allSet() {
				for (let i of this.history) { 
					i.selected = 1
				}
				for (let i of this.myBook) {
					i.selected = 1
				}
				this.all=1
				this.number=this.history.length+this.history.length
			},
			allunSet(){
				for (let i of this.history) { 
					i.selected = 0
				}
				for (let i of this.myBook) {
					i.selected = 0
				}
				this.all=0
				this.number=0
			},
			del(){
				let history=[]
				let userId=sessionStorage.getItem("userId")
				for (let i of this.history) { 
					 if(i.selected==1){
						 history.push(i.id)
					 }
				}
				history=history.toString() 
				this.$axios.post("doc/removeMyBook.htm",Qs.stringify({userId:userId,type:2,ids:history}))
				let books=[]
				for (let i of this.myBook) { 
					 if(i.selected==1){
						 books.push(i.id)
					 }
				}
				books=books.toString()  
				this.$axios.post("doc/removeMyBook.htm",Qs.stringify({userId:userId,type:1,ids:books})).then((res)=>{
					console.log(res)})
				 alert("删除成功")
				 location.reload()
			}
		}

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.background {
		width: 100%;
		background: url(../../static/myBookBG.png) no-repeat;
		background-size: 100%;
		height: 230px;
	}

	.head {
		color: #fff;
		padding: 20px;
		height: 20px;
	}

	.list {
		display: flex;
		overflow: auto;
		margin: 20px 2.5%;
		margin-top: 0px;
	}

	.item {
		margin: 0px 10px;
	}

	.item:first-child {
		margin-left: 0px;
	}

	.cover {
		width: 80px;
		display: block;
		height: 100px; 
		margin:5px auto;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		justify-content: space-around;
	}
	.flex:after{
		content: ""; 
		flex: auto;
	}

	.bookName {
		font-size: 14px;
		margin: 2px 0px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.book {
		position: relative;
		width: 33%;
	}

	.book .unset {
		border: 2px solid #EEEEEE;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		position: absolute;
		left: 5px;
		top: 5px;
	}

	.set {
		width: 19px;
		display: block;
		height: 19px;
		position: absolute;
		left: 5px;
		top: 5px;
	}
	.del{
		width: 60%;
		background: #f7f7f7;
		line-height: 40px;
		margin: 10px auto;
		text-align: center;
		color:#f33a31;
	}
</style>
