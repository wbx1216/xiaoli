<template>
	<div>
	    <div style="text-align: center;width: 100%;position: relative;line-height: 40px;color:#2c2c2c">
			<router-link to="/"><img src="../assets/back.png" style="position: absolute;height: 16px;left:10px;top:12px;"></router-link>
			攻略中心
		</div>
		<img src="../../static/strategy.png" style="width: 100%;display: block;">
	</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return { 
			}
		}, 
		beforeCreate(){
			this.$utils.getCode();
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
</style>
