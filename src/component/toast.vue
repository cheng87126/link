<style>
    .content{
        display: inline-block;
        padding: 10px 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1;
        background: rgba(0,0,0,0.5);
        color: #fff;
        border-radius: 5px;
    }
</style>
<template>
    <div class="overlay"  v-show="showToast">
        <span class="content">{{msg}}</span>
    </div>
</template>
<script>
export default {
    name:'Toast',
    data(){
        return{
            
        }
    },
    computed:{
        showToast(){
            return this.$store.state.showToast
        },
        msg(){
            return this.$store.state.msgToast
        },
        time(){
            return this.$store.state.timeToast
        }
    },
    watch:{
        showToast(){
            this.$store.dispatch('setToastAsync',{
				show:false,
				msg:''
			})
        }
    }
}
</script>
