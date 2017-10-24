<style>
	.login{
		padding: 0 2vw;
		margin: 50vh auto 0;
		transform:translateY(-50%);
	}
</style>
<template>
	<div class="login">
		<div class="row">
			<label for="username">用户名</label><input type="text" id="username" v-model="username">
		</div>
		<div class="row">
			<label for="pwd">密码</label><input type="password" id="pwd" v-model="pwd" v-on:keyup.13="login">
		</div>
		<div class="btn" v-on:click="login">登录</div>
		<div class="btn" v-on:click="register">注册</div>
	</div>
</template>
<script>
	const AV = require('leancloud-storage')

	export default{
		name:'login',
		data(){
			return {
				username:'',
				pwd:''
			}
		},
		methods:{
			register(){
				let user = new AV.User()
				// 设置用户名
				user.setUsername(this.username)
				// 设置密码
				user.setPassword(this.pwd)
				// 设置邮箱
				// user.setEmail('tom@leancloud.cn')
				user.signUp().then(loginedUser => {
					console.log(loginedUser)
					this.$router.push({ path: '/' })
				},error => {
					console.log(error.error)
				})
			},
			login(){
				AV.User.logIn(this.username, this.pwd).then(loginedUser=> {
					console.log(loginedUser)
					this.$router.push({ path: '/' })
					this.$store.commit('setName',{
						username:loginedUser.get('username')
					})
				}, error => {
					
				})
			}
		},
		mounted(){
			let currentUser = AV.User.current()
			if (currentUser) {
				// 跳转到首页
				this.$router.push({ path: '/' })
			}
		}
	}
</script>