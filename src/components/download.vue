<template>
	<div>
		<div class="background"></div>
		<img src="../../static/download.jpg" style="width: 100%;display: block;height: 100%;" @click="wx">
		<div class="cover" v-show="alert==1" @click="alert=0"></div>
		<img src="../assets/share.png" v-show="alert==1" @click="alert=0" class="share">
	</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				alert: 0
			}
		},
		beforeCreate(){
			this.$utils.getCode();
		},
		mounted() {
			let link=location.origin+"/doc/download.htm"
			let title="下载小狸阅读APP，即领新人红包"
			let desc="一边阅读一边赚钱~"
			this.$utils.wxShare(link,title,desc)
		},
		methods:{
			wx(){
				var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
						 this.alert=1
				}else{
						 window.open("https://img.ttdailynews.com/download/xlyd_v1.0.apk");
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.background {
		width: 100%;
		height: 100%;
		background: #ffe9e4;
		position: fixed;
		z-index: -1;
	}

	.cover {
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 9;
		left: 0;
		top: 0;
	} 
	.share {
		position: fixed;
		width: 150px;
		display: block;
		top: 50px;
		right: 10px;
		z-index: 10;
	}
</style>
