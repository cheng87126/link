<style scoped>
    .vue-toast{
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
    <div class="vue-toast">{{message}}</div>
</template>
<script>
export default {
    name:'Toastjs',
    data(){
        return{
            message:''
        }
    }
}
</script>

