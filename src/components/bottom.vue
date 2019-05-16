<template>
	<div>
		<div class="bottom">
			<router-link to="/myBook" class="tab_nav">
				<div style="height: 20px;"><img src="../assets/myBook_active.png" class="icon" v-if="myBooktab_active"><img src="../assets/myBook.png"
					 class="icon" v-else></div>
				<div class="font" :class="myBooktab_active?'active':''">书架</div>
			</router-link>
			<router-link to="/" class="tab_nav">
				<div style="height: 20px;"><img src="../assets/index_active.png" class="icon" v-if="home_active"><img src="../assets/index.png"
					 class="icon" v-else></div>
				<div class="font" :class="home_active?'active':''">书城</div>
			</router-link> 
				<router-link to="/task" class="tab_nav">
					<img src="../assets/task.png" class="task">
				</router-link>
			<router-link to="/rank" class="tab_nav">
				<div style="height: 20px;"><img src="../assets/rank_active.png" class="icon" v-if="rank_active"><img src="../assets/rank.png"
					 class="icon" v-else></div>
				<div class="font" :class="rank_active?'active':''">排行</div>
			</router-link>
			<router-link to="/user" class="tab_nav">
				<div style="height: 20px;"><img src="../assets/user_active.png" class="icon" v-if="user_active"><img src="../assets/user.png"
					 class="icon" v-else></div>
				<div class="font" :class="user_active?'active':''">我的</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				myBooktab_active: false,
				home_active: false,
				rank_active: false,
				user_active: false,
			}
		},
		watch: {
			$route(to) {
				if (to.name == "myBook") {
					this.myBooktab_active = true
					this.home_active = false
					this.rank_active = false
					this.user_active = false
				} else if (to.name == "home") {
					this.myBooktab_active = false
					this.home_active = true
					this.rank_active = false
					this.user_active = false
				} else if (to.name == "rank") {
					this.myBooktab_active = false
					this.home_active = false
					this.rank_active = true
					this.user_active = false
				} else if (to.name == "user") {
					this.myBooktab_active = false
					this.home_active = false
					this.rank_active = false
					this.user_active = true
				} else if (to.name == "task") {
					this.myBooktab_active = false
					this.home_active = false
					this.rank_active = false
					this.user_active = false
				}
			}
		},
		created() {
			if (this.$route.name == "myBook") {
				this.myBooktab_active = true
				this.home_active = false
				this.rank_active = false
				this.user_active = false
			} else if (this.$route.name == "home") {
				this.myBooktab_active = false
				this.home_active = true
				this.rank_active = false
				this.user_active = false
			} else if (this.$route.name == "rank") {
				this.myBooktab_active = false
				this.home_active = false
				this.rank_active = true
				this.user_active = false
			} else if (this.$route.name == "user") {
				this.myBooktab_active = false
				this.home_active = false
				this.rank_active = false
				this.user_active = true
			} else if (this.$route.name == "task") {
				this.myBooktab_active = false
				this.home_active = false
				this.rank_active = false
				this.user_active = false
			}
		}


	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.bottom {
		background: #FFF;
		position: fixed;
		bottom: 0px;
		border-top: 1px solid #EEEEEE;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		z-index: 99;
		align-items: center;
	}

 
	.tab_nav {
		width: 20%; 
	}

	.icon {
		width: 20px;
		display: block;
		margin: 0 auto;
	}

	.font {
		font-size: 10px;
		color: #B5B5B5;
		text-align: center;
	}

	.task {
		width: 35px;
		margin: auto;
		left: 0;
		right: 0;
		position: absolute;
		bottom: 5px;
	}

	.active {
		color: #FF6E03
	}
</style>
