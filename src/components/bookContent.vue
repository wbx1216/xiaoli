<template>
	<div :class="{night:night==1}">
		<div class="content" @click="setting=1-setting;step=0">
			<div class="title">{{title}}</div>
			<div v-html="bookContent" class="text" :style="{fontSize:fontSize+'px'}"></div>
			<div class="flex">
				<div @click.stop="read(id,0)" class="button">上一章</div>
				<div @click.stop="read(id,1)" class="button">下一章</div>
			</div>
		</div>
		<div class="head" v-if="setting==1&&night==0">
			<img src="../assets/back.png" @click="back()">
			<router-link to="myBook"><img src="../assets/content_myBook.png"></router-link>
		</div>
		<div class="head" v-else-if="setting==1&&night==1">
			<img src="../assets/back2.png" @click="back()">
			<router-link to="myBook"><img src="../assets/setting.png"></router-link>
		</div>
		<div class="bottom" v-if="setting==1&&step==0">
			<div class="flex">
				<div @click="read(id,0)">上一章</div>
				<div @click="read(id,1)">下一章</div>
			</div>
			<div class="flex">
				<div @click="getBookStructure(id)">
					<img src="../assets/content_menu.png" class="icon" v-if="night==0">
					<img src="../assets/content_menu_2.png" class="icon" v-else-if="night==1">
					<div>目录</div>
				</div>
				<div v-if="night==0" @click="night=1">
					<img src="../assets/content_night.png" class="icon">
					<div>夜间</div>
				</div>
				<div v-else-if="night==1" @click="night=0">
					<img src="../assets/content_sun.png" class="icon">
					<div>日间</div>
				</div>
				<div @click="step=1">
					<img src="../assets/content_font.png" class="icon" v-if="night==0">
					<img src="../assets/content_font_2.png" class="icon" v-else-if="night==1">
					<div>设置</div>
				</div>
			</div>
		</div>
		<div class="bottom" v-else-if="setting==1&&step==1">
			<div class="flex">
				<div @click="size(0)">Aa-</div>
				<div>{{fontSize}}</div>
				<div @click="size(1)">Aa+</div>
				<div @click="fontSize=16">默认</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				bookContent: "",
				id: "",
				chapterId: "",
				title: "",
				setting: 0,
				night: 0,
				step: 0,
				fontSize: 16
			}
		},
		beforeCreate() {
			this.$utils.getCode()
		},
		created() {
			let userId = sessionStorage.getItem("userId")
			let chapterId = this.$route.query.chapterId
			let id = this.$route.query.id
			this.id = id
			this.chapterId = chapterId
			this.$axios.get("doc/getBookContent.htm?cid=wechat&userId=" + userId + "&id=" + id + "&chapterId=" +chapterId).then((res) => {
				console.log(res)
				this.title = res.data.bookContent.title
				this.bookContent = res.data.bookContent.content
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
					path: '/bookInfo',
					query: {
						id: this.id,
					}
				})
			},
			size(type) {
				if (type == 0) {
					if (this.fontSize > 10) {
						this.fontSize--;
					} else {
						return false;
					}
				} else {
					if (this.fontSize < 30) {
						this.fontSize++;
					} else {
						return false;
					}
				}
			},
			getBookStructure(id) {
				this.$router.push({
					path: '/bookStructure',
					query: {
						id: id
					}
				})
			},
			read(id, type) {
				let userId = sessionStorage.getItem("userId")
				let chapterId = this.chapterId
				if (type == 0) {
					chapterId--
					this.chapterId = chapterId
				} else {
					chapterId++
					this.chapterId = chapterId
				}
				this.$axios.get("doc/getBookContent.htm?cid=wechat&userId=" + userId + "&id=" + id + "&chapterId=" +
					chapterId).then((
					res) => {
					console.log(res)
					this.title = res.data.bookContent.title
					this.bookContent = res.data.bookContent.content
					this.setting = 0
					window.scrollTo(0, 0);
				})
			}
		},
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.night .content {
		background: #000000;
	}

	.night .text {
		color: #eee;
	}

	.night .head {
		background: #000000;
	}

	.night .title {
		color: #eee;
	}

	.night .bottom {
		background: #000000;
		color: #EEE;
	}

	.content {
		background: #e9cca4;
		padding: 15px;
	}

	.title {
		font-size: 20px;
		margin: 10px 0px;
		color: #66421e;
	}

	.text {
		color: #66421e;
	}

	.head {
		background: #f5dcb9;
		width: 100%;
		height: 40px;
		position: fixed;
		top: 0px;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #66421e;
	}

	.bottom {
		background: #f5dcb9;
		width: 100%;
		position: fixed;
		bottom: 0px;
		z-index: 10;
		color: #66421e;
	}

	.head img {
		height: 20px;
		display: block;
		margin: 0 20px;
	}

	.icon {
		height: 20px;
		display: block;
		margin: 2px auto;
	}

	.flex {
		display: flex;
		justify-content: space-around;
		margin: 20px 0px;
		align-items: center;
	}

	.button {
		color: #66421e;
		border: 1px solid #66421e;
		padding: 5px 10px;
		border-radius: 10px;
	}

	.night .button {
		color: #FFF;
		border: 1px solid #FFF;
	}
</style>
