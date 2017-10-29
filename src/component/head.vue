<style scoped>
header{
	display: flex;
	height: 3em;
	padding: 0 0.625em;
	align-items: center;
	background-color: skyblue;
}
nav{
	flex:1;
}
nav a{
    display: inline-block;
    line-height: 3em;
    padding: 0 1em;
}
.logo img{
	width: 50px;
	margin-right: 2em;
	vertical-align: middle;
}
.username{
	cursor: pointer;
}
.username img{
	width: 20px;
	vertical-align: middle;
	margin-right: 5px;
}
.user-info{
	position: relative;
}
.user-list{
	width: 64px;
	padding: 0.3em 0.625em;
	position: absolute;
	right: 0;
	top: 36px;
	background-color: #fff;
	z-index: 1;
}
.user-list li{
	cursor: pointer;
}
.user-list::before{
	content: '';
	display: block;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 10px 10px 10px;
	border-color: transparent transparent #fff transparent;
	position: absolute;
	right: 10px;
	top: -10px;
}
</style>

<template>
    <header>
		<div class="logo">
			<img src="../img/dinos.png" alt="logo">
		</div>
		<nav>
			<router-link to="/">url</router-link>
		</nav>
		<div class="user-info">
			<div class="username" v-on:click="showList=!showList">
				<img src="../img/user.svg" alt="user">{{username}}
			</div>
			<ul class="user-list" v-show="showList">
				<li>用户信息</li>
				<li v-on:click="loginOut">退出</li>
			</ul>
		</div>
	</header>
</template>

<script>
const AV = require('leancloud-storage')

export default {
    data(){
		return {
			username:'',
			showList:false
		}
	},
	methods:{
		loginOut(){
			AV.User.logOut();
			// 现在的 currentUser 是 null 了
			let currentUser = AV.User.current()
			this.$router.push('/login')
			this.$store.commit('setName',{
				username:''
			})
		}
	},
	mounted(){
		let currentUser = AV.User.current()
		if(currentUser){
			this.$store.commit('setName',{
				username:currentUser.get('username')
			})
			this.username = this.$store.state.username
		}
	}
}
</script>