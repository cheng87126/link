<style>

</style>

<template>
    <section class="center">
        <div class="row">
			<label for="url">用户名</label><input type="text" id="username" v-model="username">
		</div>
		<div class="row">
			<label for="desc">电子邮件</label><input type="text" id="email" v-model="email">
		</div>
        <div class="row">
			<label for="desc">密码</label><input type="text" id="pwd" v-model="pwd">
		</div>
		<div class="btn" v-on:click="register">注册</div>
    </section>
</template>

<script>
const AV = require('leancloud-storage')

export default {
	data(){
		return {
			username:'',
			email:'',
			pwd:''
		}
	},
	methods:{
		register(){
			let user = new AV.User()
			// 设置用户名
			user.setUsername(this.username)
			// 设置邮箱
			user.setEmail(this.email)
			// 设置密码
			user.setPassword(this.pwd)
			user.signUp().then(loginedUser => {
				console.log(loginedUser)
				this.$router.push({ path: '/' })
			},error => {
				console.log(error.error)
			})
		}
	}
}
</script>