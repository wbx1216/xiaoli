<template>
	<div> 
		<div style="text-align: center;width: 100%;position: relative;line-height: 40px;color:#2c2c2c">
			<router-link to="/user"><img src="../assets/back.png" style="position: absolute;height: 16px;left:10px;top:12px;"></router-link>
			我的徒弟
		</div>
		<div class="background"> </div>
		<div class="button" @click="alert=1">分享邀徒</div>
		<router-link to="/appRule" style="color:#FFF;text-align: center;text-decoration: underline;display: block;">查看收徒规则</router-link>
		<div class="block">
			<div style="border-right: 1px solid #EEEEEE;">
				<div style="color:#2c2c2c;font-size: 18px;">{{apprentice}}</div>
				<div>我的徒弟</div>
			</div>
			<div style="border-right: 1px solid #EEEEEE;">
				<div style="color:#2c2c2c;font-size: 18px;">{{todayCoin}}</div>
				<div>今日进贡</div>
			</div>
			<div>
				<div style="color:#2c2c2c;font-size: 18px;">{{totalCoin}}</div>
				<div>总进贡</div>
			</div>
		</div>
		<div style="display: flex;height: 45px;border-bottom: 1px solid #EEEEEE;align-items: center;">
			<div class="tab" v-for="(item,index) in tab" @click="tabIndex=index">
				<div :class="tabIndex==index?'selected':''" style="width: 70px;margin: 0 auto;">{{item}}</div>
			</div>
		</div>
		<div id="list">
			<div v-for="item in list" class="item">
				<div class="flex">
					<img :src="item.icon" class="cover">
					<div>{{item.nickname}}</div>
				</div>
				<div class="flex">
					<div style="color:#eee;border: 1px solid #eee;border-radius: 10px;padding:2px 8px;" v-if="item.openId">已下载</div>
					<router-link to="download2" style="color:#ffa41c;border: 1px solid #FFA41C;padding:2px 8px;border-radius: 10px;"  v-else >未下载</router-link>
				</div>
			</div>
		</div>
		
		<div class="cover2" v-show="alert==1"  @click="alert=0"></div>
		<img src="../assets/share2.png"  v-show="alert==1" @click="alert=0"  class="share">
	</div>
</template>

<script>
	export default {
		name: 'bookInfo',
		data() {
			return {
				todayCoin: "",
				totalCoin: "",
				apprentice: 0,
				tab: ["我的徒弟"],
				tabIndex: 0,
				list:"", 
				alert:0
			}
		},
		beforeCreate(){
			this.$utils.getCode();
		},
		created() {
				let userId = sessionStorage.getItem("userId") 
				this.$axios.get("doc/apprenticeList.htm?cid=wechat&userId=" + userId).then((res) => {
					console.log(res)
					this.totalCoin = res.data.totalCoin
					this.todayCoin = res.data.todayCoin
					this.apprentice = res.data.apprentice
					this.list = res.data.apprenticeArray
				})
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
<style scoped>
	.background {
		width: 100%;
		height: 200px;
		background: url(../../static/app_bg.png) no-repeat;
		background-size: 100%;
		position: absolute;
		top: 41px;
		z-index: -1;
	}
		  .cover2{
		background: rgba(0,0,0,0.7);
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 100;
		left:0;
		top:0;
	}
	.share{
		  position: fixed;
		  width: 150px;
		  display: block;
		  top:50px;
		  right: 10px;
		  z-index: 200;
	}

	.button {
		width: 135px;
		line-height: 40px;
		margin: 10px auto;
		margin-top: 80px;
		text-align: center;
		color: #FFF;
		background-image: linear-gradient(-90deg, rgb(255, 78, 106) 0%, rgb(255, 120, 135) 100%);
		border-radius: 20px;
	}

	.block {
		border-radius: 10px;
		background-color: rgb(255, 255, 255);
		box-shadow: 0px 1px 16.74px 1.26px rgba(0, 0, 0, 0.1);
		width: 302px;
		margin: 10px auto;
		padding: 20px 0px;
		display: flex;
		justify-content: space-between;
		text-align: center;
		align-items: center;
	}

	.block div {
		width: 100px;
	}

	.tab {
		color: #939393;
		width: 100%;
		text-align: center;
	}

	.selected {
		color: #000000;
	}

	.item {
		display: flex;
		align-items: center;
		padding: 20px;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.cover {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 20px;
	}
</style>
