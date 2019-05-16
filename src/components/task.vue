<template>
	<div style="padding-bottom: 70px;">
		<div class="background">
			<div style="position: absolute; top:140px;left:0px;color:#fff;font-size:13px;line-height: 24px;display: flex;width: 100%;">
				<div style="width:50%">
					<div style="text-align: center;">零钱</div>
					<div style="display: flex;justify-content: center;align-items: center"><img src="../assets/cash2.png"
						 style="height: 20px;margin-right: 5px;">
						<div>{{cash}}</div>
					</div>
				</div>
				<div style="width:50%">
					<div style="text-align: center;">金币</div>
					<div style="display: flex;justify-content: center;align-items: center;"><img src="../assets/coin2.png"
						 style="height: 20px;margin-right: 5px;">
						<div>{{coin}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="block" v-show="newTask==0">
			<div style="color:#9c9c9c;line-height: 40px;border-bottom: 1px solid #EEEEEE;text-indent: 20px;">新手任务</div>
			<div class="task">
				<img src="../assets/task1.png">
				<div class="content">
					<div>新人收徒 <span>+200</span></div>
					<div class="status" v-if="task1==0" @click="alert=1">去完成</div>
					<div class="status over" v-else>已完成</div>
				</div>

			</div>
			<div class="task">
				<img src="../assets/task2.png">
				<div class="content" style="border-bottom: none;">
					<div>下载任务 <span>+200</span></div>
					<a href="download.html" class="status" v-if="task2==0">去完成</a>
					<div class="status over" v-else>已完成</div>
				</div>
			</div>
		</div>

		<div class="block">
			<div style="color:#9c9c9c;line-height: 40px;border-bottom: 1px solid #EEEEEE;text-indent: 20px;">日常任务</div>
			<div class="task">
				<img src="../assets/task3.png">
				<div class="content">
					<div>邀请收徒 <span>+200</span></div>
					<div class="status" v-if="task3==0" @click="alert=1">去完成</div>
					<div class="status over" v-else>已完成</div>
				</div>

			</div>
			<div class="task">
				<img src="../assets/task4.png">
				<div class="content" style="border-bottom: none;">
					<div>徒弟下载APP <span>+200</span></div>
					<router-link to="download2" class="status">去完成</router-link>
				</div>
			</div>
		</div>
		<div style="color:#ffa41c;margin-left: 5%;">前往小狸阅读APP，任务多多，金币多多</div>
		<div class="cover"></div>
		<div class="cover2" v-show="alert==1" @click="alert=0"></div>
		<img src="../assets/share2.png" v-show="alert==1" @click="alert=0" class="share">
	</div>
</template>

<script>
	export default {
		name: 'bookInfo',
		data() {
			return {
				newTask: "0",
				cash: "0",
				coin: "0",
				task1: "0",
				task2: "0",
				task3: "0",
				alert: 0
			}
		},
		beforeCreate() {
			this.$utils.getCode()
		},
		mounted() {
			let link=location.origin+"/doc/invite.htm"
			let title="成为我的徒弟，做任务就有钱啦"
			let desc="新用户专享3-10元现金~"
			this.$utils.wxShare(link,title,desc)
		},
		created() {
			let userId = sessionStorage.getItem("userId") 
			this.$axios.get("doc/getUserInfo.htm?cid=wechat&userId=" + userId).then((
				res) => {
				this.cash = res.data.userInfo.cash
				this.coin = res.data.userInfo.coin
				if (res.data.userInfo.flags[30113] == 1 && res.data.userInfo.flags[30114] == 1) {
					this.newTask = 1
				}
				if (res.data.userInfo.flags[30113] == 1) {
					this.task1 = 1
				}
				if (res.data.userInfo.flags[30114] == 1) {
					this.task2 = 1
				}

			})
			this.$axios.get("doc/getUserTask.htm?cid=wechat&userId=" + userId).then((res) => {
				this.task3 = res.data.status
			})

		}


	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.cover2 {
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 100;
		left: 0;
		top: 0;
	}

	.share {
		position: fixed;
		width: 150px;
		display: block;
		top: 50px;
		right: 10px;
		z-index: 200;
	}

	.cover {
		background-color: #f2f2f2;
		height: 100%;
		position: fixed;
		width: 100%;
		z-index: -1;
		top: 0;
		left: 0;
	}

	.background {
		height: 200px;
		background: url(../../static/bj.png) no-repeat;
		background-size: 100%;
		width: 100%;
		position: relative;
		margin-bottom: 20px;
	}

	.block {
		width: 95%;
		background: #FFF;
		border-radius: 10px;
		margin: 10px auto;
		padding-bottom: 10px;
	}

	.task {
		display: flex;
		align-items: center;
		height: 50px;
	}

	.task img {
		display: block;
		width: 25px;
		height: 25px;
		margin: 0px 10px 0px 10px;
	}

	.content {
		border-bottom: 1px solid #EEEEEE;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.content span {
		color: #ff6e03;
	}

	.status {
		border: 1px solid #ffa41c;
		color: #FFA41C;
		padding: 1px 8px;
		border-radius: 20px;
		margin-right: 20px;
	}

	.over {
		border: 1px solid #cecece;
		color: #cecece;
	}
</style>
