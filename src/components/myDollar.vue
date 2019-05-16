<template>
	<div>
		<div class="top">
			<div style="padding: 0px 20px;line-height: 40px;color:#fff;display: flex;justify-content: space-between;">
				<router-link to="/"><img src="../assets/back2.png" style="height: 16px;"></router-link>
				<div>我的钱包</div>
				<div @click="alert=1">提现</div>
			</div>
			<div class="block">
				<div style="display: flex;justify-content: space-between;">
					<div class="flex">
						<div>金币：{{coin}}</div>
						<img src="../assets/dollar.png">
					</div>
					<div class="flex">
						<div>今日汇率：{{rate}}</div>
						<img src="../assets/rate.png">
					</div>
				</div>
				<div style="display: flex;justify-content: space-between;align-items: center;">
					<div  style="color:#af6417;text-decoration: underline;" @click="alert=2">点击查看汇率变动情况</div>
					<router-link to="/rule" style="color:#FFF;background: #a86f2f;padding: 5px 10px;border-radius: 20px;">查看规则</router-link>
				</div>
			</div>
		</div>
		<div style="background: #454955;color:#FFF;font-size: 14px;display: flex;align-items: flex-start;padding: 5px 0px;">
			<img src="../assets/warn.png" style="width: 15px;margin: 2px 10px;">
			<div style="width: 90%;">金币兑换汇率每日运营收益影响，每日中午12点自动兑换昨日金币</div>
		</div>
		<div style="display: flex;height: 45px;border-bottom: 1px solid #EEEEEE;align-items: center;">
			<div class="tab" v-for="(item,index) in tab" @click="tabIndex=index">
				<div :class="tabIndex==index?'selected':''" style="width: 32px;margin: 0 auto;">{{item}}</div>
			</div>
		</div>
		<div id="list">
			<div v-for="item in list[tabIndex]" class="list">
				<div style="font-size: 18px;">{{item.opDate}}</div>
				<div v-if="tabIndex==0">
					<div v-for="data in item.coinList" class="text">
						<div>{{data.time}}&nbsp;&nbsp;&nbsp;{{data.name}}</div>
						<div style="color:#FF6E03">{{data.coin}}</div>
					</div>
				</div>
				<div v-else-if="tabIndex==1">
					<div v-for="data in item.cashList" class="text">
						<div>{{data.time}}&nbsp;&nbsp;&nbsp;{{data.name}}</div>
						<div style="color:#FF6E03">{{data.cash}}</div>
					</div>
				</div>
			</div>
		</div>
		<div style="text-align: center;color:#939393;font-size: 14px;margin-top: 20px;">显示最近7天记录</div>
		<div class="msg" @click="alert=1">累计赚了{{totalCash}}元，快去炫耀一下</div>
		<a href="download.html" class="alert" v-show="alert==1" @click="alert=0">
			<div style="position: absolute;bottom:100px;color:#FFF;width: 80%;text-align: center;left:10%;font-size: 16px;">现在下载APP就能获得18.8现金奖励哦~</div>
			<div   style="position: absolute;bottom:40px;color:#FFF;width: 60%;line-height: 35px;text-align: center;left:20%;font-size: 20px;background: #ffae12;border-radius: 20px;" >立即下载</div>
		</a>
		<div class="cover" v-show="alert==1||alert==2" @click="alert=0"></div>
		<div class="rate" v-show="alert==2">
			<img src="../../static/cat.png" style="width: 120px;display: block;position: absolute;top:-70px;left:75px">
			<div class="title">想要查看汇率?去"小狸阅读"APP更全面,更精准!</div>
			<div style="display: flex; text-align: center;line-height: 48px;height: 48px;overflow: hidden;">
				<div style="width: 50%;" @click="alert=0">随便看看</div>
				<a href="download.html" style="width: 50%;color:#ff6e03;height: 48px;" to="download" >立即下载</a>
			</div>
 		</div>
		 
	</div>
</template>

<script>
	export default {
		name: 'bookInfo',
		data() {
			return {
				coin: "0",
				rate: "0",
				tabIndex: 0,
				tab: ["金币", "零钱"],
				list: "",
				alert:0,
				totalCash :0
			}
		},	
		beforeCreate(){
			this.$utils.getCode()   
		},
		mounted() {
			let link=location.origin+"/doc/invite.htm"
			let title="成为我的徒弟，做任务就有钱啦"
			let desc="新用户专享3-10元现金~"
			this.$utils.wxShare(link,title,desc)
		},
		created() {
					    let userId=sessionStorage.getItem("userId") 
						this.tabIndex = this.$route.query.tabIndex 
						this.$axios.get("doc/getMyWallet.htm?userId="+userId).then((res) => {
							console.log(res)
							if(res.data.rc==1){
								this.coin = res.data.coin
								this.rate = res.data.lastRateArray[0].rate
								let list = []
								if(res.data.coinArray){ 
									list.push(res.data.coinArray.reverse())
								}
								if(res.data.cashArray){ 
									list.push(res.data.cashArray.reverse())
								}
								this.list = list
								this.totalCash =res.data.totalCash  
							}
						})
			
		},
		methods: {

		}

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.top {
		background: #000;
		padding-bottom: 10px;
	}
	.cover{
		background: rgba(0,0,0,0.7);
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 9;
		left:0;
		top:0;
	}

	.block {
		border-radius: 10px;
		background-image: linear-gradient(0deg, rgb(240, 222, 182) 0%, rgb(236, 212, 156) 100%);
		width: 80%;
		margin: 10px auto;
		height: 100px;
		padding: 20px;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
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
	.flex {
		display: flex;
		align-items: center;
		line-height: 24px;
		color: #2b2e35;
		font-size: 18px;
	}

	.flex img {
		height: 24px;
		margin-left: 5px;
		display: block;
		width: 22px;
	}

	.tab {
		color: #939393;
		width: 50%;
		text-align: center;
	}

	.selected {
		color: #000000;
		border-bottom: 1px solid #000000;
	}

	.list {
		padding: 10px 30px;
		border-bottom: 10px solid #EEEEEE;
	}

	.list:last-child {
		border-bottom: none;
	}

	.text {
		display: flex;
		justify-content: space-between;
		color: #939393;
		margin: 10px 0px;
		font-size: 14px;
	}

	.msg {
		width: 80%;
		background-image: linear-gradient(0deg, rgb(240, 222, 182) 0%, rgb(236, 212, 156) 100%);
		box-shadow: 0px 3px 3.88px 0.12px rgba(0, 0, 0, 0.09);
		line-height: 40px;
		text-align: center;
		margin: 20px auto;
		border-radius: 20px;
	}

	.alert {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		width: 250px;
		height: 300px;
		background: url(../../static/alert.png) no-repeat;
		background-size: 100%; 
		z-index: 10;
	}
</style>
