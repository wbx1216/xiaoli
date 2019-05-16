<template>
	<div>
		<div class="cover"></div>
		<div class="background"><img :src="icon" class="head">
		<div style="text-align: center;color:#FFF;font-size:18px;">{{nickname}}</div>
		<div style="text-align: center;color:#FFF;font-size:15px">我的邀请码:{{invitationCode}}</div>
		</div>
		
		<div class="block" style="top:190px;">
			<div class="flex">
				<div class="item">金币</div>
				<div class="item">零钱</div>
				<div class="item">我的徒弟</div>
			</div>
			<div class="flex">
				<router-link to="/myDollar?tabIndex=0" class="item"><img src="../assets/coin.png">
					<div style="margin-left: 5px;">{{coin}}</div>
				</router-link>
				<router-link to="/myDollar?tabIndex=1" class="item"><img src="../assets/cash.png">
					<div style="margin-left: 5px;"  >{{cash}}</div>
				</router-link>
				<router-link to="apprentice" class="item"><img src="../assets/apprentice.png">
					<div style="margin-left: 5px;">{{apprentice}}</div>
				</router-link>
			</div>
		</div>
		<div class="block" style="padding-bottom: 0;top:310px;margin:0">
			<router-link to="myBook" class="item2" style="border-bottom: 1px solid #EEEEEE;">
				<div>我的书架</div>
				<img src="../assets/userRight.png">
			</router-link>
			<div class="item2" @click="help=1">
				<div>客服帮助</div>
				<img src="../assets/userRight.png">
			</div>
		</div>
		<div v-show="help==1" @click="help=0">
			<div class="help">
				<div style="margin: 20px 0px;">客服帮助</div>
				<div style="font-size: 14px;">扫描识别二维码,添加客服微信</div>
				<img src="../../static/ecord.jpg">
			</div>
			<div class="blur"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bookInfo',
		data() {
			return {
				nickname: "",
				invitationCode: "",
				coin: "0",
				cash: "0",
				apprentice: "0",
				help: 0,
				icon:""
			}
		},
		beforeCreate(){
					this.$utils.getCode()
		},
		created() { 
				let userId=sessionStorage.getItem("userId")
				this.$axios.get(
					"doc/getUserInfo.htm?cid=wechat&userId="+userId).then((res) => {
					console.log(res)
					if(res.data.rc==1){
						this.nickname = res.data.userInfo.nickname
						this.invitationCode = res.data.userInfo.invitationCode
						this.coin = res.data.userInfo.coin
						this.cash = res.data.userInfo.cash
						this.apprentice = res.data.userInfo.apprentice
						this.icon = res.data.userInfo.icon
					} 
				
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
	.cover {
		background-color: #f2f2f2;
		height: 100%;
		position: fixed;
		width: 100%;
		z-index: 0;
		top: 0;
		left: 0;
	}
 
	.background {
		background-image: -moz-linear-gradient(66deg, rgb(238, 168, 73) 0%, rgb(244, 107, 69) 100%);
		background-image: -webkit-linear-gradient(66deg, rgb(238, 168, 73) 0%, rgb(244, 107, 69) 100%);
		background-image: -ms-linear-gradient(66deg, rgb(238, 168, 73) 0%, rgb(244, 107, 69) 100%);
		background-image: linear-gradient(66deg, rgb(238, 168, 73) 0%, rgb(244, 107, 69) 100%);
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 210px;
		z-index: 0;
	}

	.head {
		width: 80px;
		height: 80px;
		margin: 40px auto 10px auto;
		display: block;
		border-radius: 50%;
	}

	.block {
		width: 95%;
		background: #FFF;
		border-radius: 10px; 
		padding-bottom: 10px; 
		left: 2.5%;
		position: absolute;
		z-index: 2;
		
	}

	.flex {
		display: flex;
		justify-content: space-around;
		padding: 10px 0px;
	}

	.item {
		width: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item img {
		height: 25px;
		display: block;
	}

	.item2 {
		display: flex;
		justify-content: space-between;
		padding: 0px 10px;
		line-height: 50px;
		align-items: center;
	}

	.item2 img {
		width: 10px;
		display: block;
	}

	.blur {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		z-index: 9;
		top: 0;
	}

	.help {
		width: 70%;
		height: 300px;
		background: #FFF;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		z-index: 10;
		border-radius: 10px;
		text-align: center;
	}

	.help img {
		width: 60%;
		display: block;
		margin: 10px auto;
	}
</style>
