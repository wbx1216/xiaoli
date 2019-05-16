<template>
	<div >
	    <div class="background"> 
			<router-link to="/slice" class="rule">排行规则</router-link>
		</div>
		<div class="block">
			<div style="border-bottom: 1px solid #EEEEEE;display: flex;">
				<div class="tab" :class="tab==0?'selected':''" @click="tab=0" >收徒周榜单</div>
				<div class="tab" :class="tab==1?'selected':''" @click="tab=1">收入周榜单</div>
			</div>
			<div v-show="tab==0">
				 <div class="flex" style="color:#ffbc47">
					 <div>排名</div>
					 <div>昵称</div>
					 <div>收徒人数</div>
					 <div>奖金(元)</div>
				 </div>
				 <div   class="flex" v-for="(item,index) in apprenticeArray">
					 <div v-if="index==0"><img src="../assets/number1.png" style="display: block;height: 20px;margin: 0 auto;"></div>
					 <div v-else-if="index==1"><img src="../assets/number2.png" style="display: block;height: 20px;margin: 0 auto;"></div>
					 <div  v-else-if="index==2"><img src="../assets/number3.png" style="display: block;height: 20px;margin: 0 auto;"></div>
					 <div v-else>{{index+1}}</div>
					 <div>{{item.nickname}}</div>
					 <div>{{item.apprentice}}</div>
					 <div style="color:#ff6e03">￥{{item.reward}}</div>
				 </div>
				 
				 <div style="font-size: 10px; color:#c7c7c7;width: 80%;margin:10px auto;">收徒周榜单将根据用户每周累计收徒数进行排名，奖励前10名该榜单每周一零点更新</div>
			</div>
			<div v-show="tab==1">
				 <div class="flex" style="color:#ffbc47">
					 <div>排名</div>
					 <div>昵称</div> 
					 <div>奖金(元)</div>
				 </div>
				 <div   class="flex" v-for="(item,index) in incomeArray">
					 <div v-if="index==0"><img src="../assets/number1.png" style="display: block;height: 20px;margin: 0 auto;"></div>
					 <div v-else-if="index==1"><img src="../assets/number2.png" style="display: block;height: 20px;margin: 0 auto;"></div>
					 <div  v-else-if="index==2"><img src="../assets/number3.png" style="display: block;height: 20px;margin: 0 auto;"></div>
					 <div v-else>{{index+1}}</div>
					 <div>{{item.nickname}}</div> 
					 <div style="color:#ff6e03">￥{{item.reward}}</div>
				 </div> 
				 <div style="font-size: 10px; color:#c7c7c7;width: 80%;margin:10px auto;">收入周榜单将根据用户每周累计收入进行排名，奖励前10名该榜单每周一零点更新</div>
			</div>
		</div>
		<div class="cover"></div>
	</div>
</template>

<script>
	export default {
		name: 'bookInfo',
		data() {
			return {
               tab:"0",
			   apprenticeArray:"",
			   incomeArray:"" 
			}
		},
		beforeCreate(){
			this.$utils.getCode();
		},
		created() {
		 this.$axios.get("doc/weekRankList.htm?cid=wechat").then((res) => {
		 	console.log(res)
			this.apprenticeArray=res.data.apprenticeArray
			this.incomeArray=res.data.incomeArray
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
     .cover{
		 background-color:#f2f2f2;
		 height: 100%;
		 position: absolute;
		 width: 100%;
		 z-index: 0;
		 top:0px;
	 }
	.background{
		width: 100%;
		background: url(../../static/rankBG.png);
		background-size: 100%;
		height: 250px;
		position: absolute;
		left:0px;
		top:0px;
		z-index: 1;
	}
	.rule{
		float:right;
		color:#FFF;
		background: #fac1b1;
		padding: 2px 8px 2px 10px;
		margin-top: 30px;
		border-radius: 10px 0px 0px 10px; 
	}
	.block{
		width: 90%;
		background: #FFF;
		border-radius: 10px; 
		margin-top:220px;
		margin-left:5%;
		padding-bottom: 10px;
		position: absolute;
		z-index: 10;
		margin-bottom: 100px;
	}
	.tab{
		width: 50%;
		text-align: center;
		color:#d0d0d0;
		line-height: 50px;
	}
	.selected{
		color:#ff6e03;
	}
	.flex{
		display: flex;
		justify-content: space-around;
		color:#2c2c2c;
		margin: 5px 0px;
	}
	.flex div{
		width: 80px;
		text-align: center;
		
	}
</style>
