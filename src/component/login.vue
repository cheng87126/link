<style>
.forget{
	font-size: 12px;
	vertical-align: bottom;
}
</style>
<template>
	<div class="center">
		<div class="row">
			<label for="username">用户名</label><input type="text" id="username" v-model="username">
		</div>
		<div class="row">
			<label for="pwd">密码</label><input type="password" id="pwd" v-model="pwd" v-on:keyup.13="login">
		</div>
		<div class="btns-box">
			<div class="btn" v-on:click="login">登录</div>
			<div class="btn" v-on:click="register">注册</div>
			<router-link to="/resetpassword" class="forget">忘记密码?</router-link>
		</div>
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
				this.$router.push({ path: '/register' })	
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