<template>
	<div style="padding-top: 90px;padding-bottom: 50px;">
		<div style="position: fixed;top:0px;width: 100%;z-index: 10;background: #FFFFFF;padding-bottom: 5px;">
			<router-link to="search" class="search">
				<div>搜你想搜的</div>
				<img src="../assets/search.png">
			</router-link>
			<ul class="nav">
				<li v-for="(item,index) in nav" :class="index==navIndex?'selected':''" @click="setNav(index)">
					{{item}}
				</li>
			</ul>
		</div>
		<div class="swiper-container" id="container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in banner" @click="bannerUrl(item)">
					<img :src="item.pic">
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
		<div class="msg">
			<img src="../assets/msg.png" style="display: block;height: 20px;margin: 0px 10px; ">
			<div class="swiper-container" id="container2">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in WithdrawDatas">
						{{item}}
					</div>
				</div>
			</div>
		</div>
		<ul class="nav icon">
			<li>
				<router-link to="/myDollar?tabIndex=0">
					<img src="../assets/indexIcon1.png">
					<div style="color:#ff6e03">{{dollar}}</div>
				</router-link>
			</li>
			<li>
				<router-link to="/task">
					<img src="../assets/indexIcon2.png">
					<div>任务</div>
				</router-link>
			</li>
			<li>
				<router-link to="/myDollar?tabIndex=1">
					<img src="../assets/indexIcon3.png">
					<div>钱包</div>
				</router-link>
			</li>
			<li>
				<router-link to="strategy">
					<img src="../assets/indexIcon4.png">
					<div>攻略</div>
				</router-link>
			</li>
		</ul>
		<div id="list">
			<div v-if="navIndex==4">
				<div v-for="(item,index) in dataList" class="item" :class="item.status==1?'more':''">
					<div style="font-size:20px;margin: 2.5%;">{{item.name}}</div>
					<div class="tab">
						<div v-for="tab in item.categorys" @click="searchTab(tab)">{{tab}}</div>
					</div>
					<img src="../assets/arrow.png" class="arrow" @click="item.status=1-item.status">
					<div style="clear: both;"></div>
					<div class="flex">
						<div v-for="(book,index) in item.books" @click="bookInfo(book.id)" class="book">
							<img :src="book.cover" class="cover">
							<div class="bookName">{{book.name}}</div>
							<div class="bookAuth">{{book.auth}}</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<div v-for="item in dataList" class="item">
					<div class="title">{{item.name}}</div>
					<router-link v-if="item.type" :to="{path:'/list',query:{title:item.name,type:item.type}}" style="float:right;color:#b5b5b5;font-size: 13px;">查看更多></router-link>
					<div style="clear: both;"></div>
					<div class="flex" v-if="item.name=='品质好书'">
						<div v-for="book in item.books" @click="bookInfo(book.id)" class="book">
							<img :src="book.cover" class="cover">
							<div class="bookName">{{book.name}}</div>
							<div class="bookAuth">{{book.author}}</div>
						</div>
					</div>
					<div v-else>
						<div class="type1" @click="bookInfo(item.books[0].id)">
							<img :src="item.books[0].cover" class="cover">
							<div class="text">
								<div class="bookName">{{item.books[0].name}}<img src="../assets/rolax.png" style="height: 20px;margin: -2px 2px;"></div>
								<div class="info">{{item.books[0].description}}</div>
								<div class="author">
									<img src="../assets/auth.png">
									<div style="float:left;line-height: 22px;">{{item.books[0].author}}</div>
									<div class="label ">{{item.books[0].wordCount}}</div>
									<div class="label status" v-if="item.books[0].progress==2">连载</div>
									<div class="label status" v-else>完结</div>
									<div style="clear:both"></div>
								</div>
							</div>
							<div style="clear:both"></div>
						</div>
						<div class="flex">
							<div v-for="(book,index) in item.books" @click="bookInfo(book.id)" v-if="index!=0" class="book">
								<img :src="book.cover" class="cover">
								<div class="bookName">{{book.name}}</div>
								<div class="bookAuth">{{book.auth}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<a href="download.html" class="alert" v-show="alert==1">
			<div style="position: absolute;bottom:100px;color:#FFF;width: 80%;text-align: center;left:10%;">送你一个新人礼包，下载APP就能获得18.8现金奖励哦~</div>
			<div style="position: absolute;bottom:40px;color:#FFF;width: 60%;line-height: 35px;text-align: center;left:20%;font-size: 20px;background: #ffae12;border-radius: 20px;">立即下载</div>
		</a>
		<div class="cover2" v-show="alert==1" @click="alert=0"></div>
	</div>
</template>
<script>
	import 'swiper/dist/css/swiper.css'
	export default {
		name: 'home',
		data() {
			return {
				nav: ["精选", "女生", "男生", "榜单", "分类"],
				navIndex: 0,
				dataList: "",
				banner: "",
				WithdrawDatas: "",
				alert: 0,
				dollar:0
			}
		},
		mounted() {
			let link=location.origin+"/doc/invite.htm"
			let title="成为我的徒弟，做任务就有钱啦"
			let desc="新用户专享3-10元现金~"
			this.$utils.wxShare(link,title,desc)
		},
		methods: {
			setNav(index) {
				this.navIndex = index
				let channel = index + 1
				this.$axios.get("doc/getIndex.htm?cid=wechat&channel=" + channel).then((res) => {
					let data = res.data.data
					if (channel == 5) {
						for (let i = 0; i < data.length; i++) {
							data[i].status = 0
						}
					}
					this.dataList = data
				})
				this.$axios.get("doc/getBanners.htm?cid=wechat&category=" + channel).then((res) => {
					this.banner = res.data.banners;
				})

			},
			bannerUrl(item) {
				if (item.type == 2) {
					window.location.href = item.url
				} else {
					this.$router.push({
						path: '/bookInfo',
						query: {
							id: item.bookId
						}
					})
				}
			},
			bookInfo(id) {
				this.$router.push({
					path: '/bookInfo',
					query: {
						id: id
					}
				})
			},
			searchTab(tab){
					this.$router.push({
					path: '/search',
					query: {
						searchText: tab
					}
				})
			}
		},
		beforeCreate() { 
			if (!sessionStorage.getItem("userId") || sessionStorage.getItem("userId") == "undefined") {
				function getUrlKey(name) {
					return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[
						1].replace(/\+/g, '%20')) || null;
				}
				let code = getUrlKey("code")
				let state = getUrlKey("state")
				if (code) {
					this.$axios.get("wechat/getUserId.htm?code=" + code + "&state=" + state).then((res) => {
						console.log(res)
						if (res.data.userId) {
							sessionStorage.setItem("userId", res.data.userId)
						}
						if (res.data.new == 1) {
							this.alert = 1
						}
					})
				}
			}else{
				let userId=sessionStorage.getItem("userId")
				this.$axios.get("doc/getUserInfo.htm?cid=wechat&userId="+userId).then((res) => {
					console.log(res)
					if(res.data.rc==1){ 
						this.dollar = res.data.userInfo.coin 
					}  
				})
			}
		},
		created() {
			this.$axios.get("doc/getIndex.htm?cid=wechat&channel=1").then((res) => {
				this.dataList = res.data.data
			})
			this.$axios.get("doc/getBanners.htm?cid=wechat&category=1").then((res) => {
				this.banner = res.data.banners
				this.$nextTick(function() {
					var mySwiper = new Swiper('#container', {
						loop: true,
						autoplay: true,
						observer: true, //修改swiper自己或子元素时，自动初始化swiper 
						observeParents: false, //修改swiper的父元素时，自动初始化swiper 
						pagination: {
							el: '.swiper-pagination',
						},
						effect: 'coverflow',
						grabCursor: true,
						centeredSlides: true,
						spaceBetween: 70,
						slidesPerView: 'auto',
						coverflowEffect: {
							rotate: 10, // 旋转的角度
							stretch: 20, // 拉伸   图片间左右的间距和密集度
							depth: 150, // 深度   切换图片间上下的间距和密集度
							modifier: 1, // 修正值 该值越大前面的效果越明显
							slideShadows: false // 页面阴影效果
						},
						onSlideChangeEnd: function(swiper) {
							swiper.update();
							mySwiper.startAutoplay();
							mySwiper.reLoop();
						}
					})
				})
			})
			this.$axios.get("doc/getWithdrawDatas.htm?cid=wechat").then((res) => {
				this.WithdrawDatas = res.data.data
				this.$nextTick(function() {
					new Swiper('#container2', {
						loop: true,
						autoplay: true,
						direction: 'vertical',
					})
				})
			})
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.search {
		width: 80%;
		margin: 10px auto;
		background: #f1f1f1;
		line-height: 40px;
		height: 40px;
		border-radius: 5px;
		display: block;
	}

	.search div {
		float: left;
		color: #a7a7a7;
		font-size: 14px;
		margin-left: 10px;
	}

	.search img {
		display: block;
		float: right;
		height: 20px;
		margin: 10px;
	}

	.nav {
		display: flex;
		justify-content: space-around;
	}

	ul {
		margin: 0px;
		padding: 0px;
	}

	li {
		list-style: none;
		color: #7f7f7f;
	}

	.icon {
		width: 80%;
		margin: 10px auto;
		justify-content: space-between;

	}

	.icon li {
		width: 60px;
		color: #7f7f7f;
		text-align: center;
	}

	.icon a {
		color: #7f7f7f;
	}

	.icon img {
		width: 100%;
		display: block;
		height: 60px;
	}

	.selected {
		color: #ff6e03;
		border-bottom: 1px solid #ff6e03;
	}

	#container {
		width: 100%;
		margin: 10px auto;
		height: 37.3vw;
	}

	#container2 {
		height: 100%;
		margin: 0;
	}

	#container .swiper-slide {
		background-position: center;
		background-size: 130% 120%;
		width: 80%;
		height: 37.3vw;
	}

	#container .swiper-slide img {
		display: block;
		width: 100%;
		height: 37.3vw;
	}

	#container .swiper-pagination-bullet {
		background: #FFFFFF;
		opacity: 1;
	}

	#container .swiper-pagination-bullet-active {
		background: #ff6e03;
	}

	.msg {
		background: #f5f5f5;
		width: 90%;
		margin: 0 auto;
		height: 30px;
		border-radius: 10px;
		line-height: 30px;
		display: flex;
		align-items: center;
	}

	.item {
		border-bottom: 1px solid #f0f0f0;
		padding: 10px;
	}

	.title {
		float: left;
		font-size: 20px;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
	}

	.book {
		width: 20%;
		margin: 2.5%;
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
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}


	.type1 {
		display: flex;
		justify-content: space-between;
		margin: 5px 0px;
		color: #000;
		font-size: 14px;
	}

	.type1 .cover {
		margin: 2.5%;
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
		line-height: 20px;
		font-size: 14px;
		color: #959595;
		height: 40px;
		overflow: hidden;
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

	.tab {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 90%;
		height: 30px;
		overflow: hidden;
		margin-left: 2.5%;
		float: left;
	}

	.tab div {
		width: 70px;
		text-align: center;
		border: 1px solid #000000;
		margin: 3px 0px;
		border-radius: 10px;
		font-size: 14px;
		line-height: 24px;
		color: #616161;
	}

	.arrow {
		float: right;
		display: block;
		width: 17px;
		margin: 10px 0px;
	}

	.more .tab {
		height: auto;
	}

	.more .arrow {
		transform: rotate(180deg);
	}

	.cover {
		width: 80px;
		height: 110px;
		display: block;
		margin: 0 auto;
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
		z-index: 200;
	}

	.cover2 {
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 100;
		left: 0;
		top: 0;
	}
</style>
