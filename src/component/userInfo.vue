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
        <!-- <div class="row">
			<label for="desc">密码</label><input type="password" id="pwd" v-model="pwd">
		</div> -->
		<div class="btn" v-on:click="update">更新</div>
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
		update(){
			let currentUser = AV.User.current()
            currentUser.set('email', this.email)
            //currentUser.set('password',this.pwd)
            currentUser.save().then(result => {
				this.$toast({
					message:'修改成功'
				})
            },error => {
				this.$toast({
					message:error.message
				})
            })
		}
    },
    mounted() {
        let currentUser = AV.User.current()
        this.username = currentUser.get('username')
        this.email = currentUser.get('email')
    }
}
</script>
