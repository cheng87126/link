<style>

</style>

<template>
    <section class="center">
        <div class="row">
		    <label for="email">电子邮件</label><input type="text" id="email" v-model="email">
	    </div>
        <div class="btn" v-on:click="resetPwd">确定</div>
    </section>
</template>

<script>
const AV = require('leancloud-storage')

export default {
    data(){
        return {
            email:''
        }
    },
    methods:{
        resetPwd(){
			AV.User.requestPasswordReset(this.email).then( (success)=> {
                this.$toast({
					message:'邮件已发送'
				})
			}, (error)=> {
                this.$toast({
					message:error.message
				})
			})
		}
    }
}
</script>
