<style>
	@import "./css/index.css";
</style>
<template>
	<div>
		<router-view></router-view>
		<Toast></Toast>
	</div>
</template>

<script>
import Toast from './component/toast.vue'

export default{
	name:'App',
	data(){
		return {}	
	},
	computed:{
		
	},
	methods:{
		
	},
	beforeCreate(){
		
	},
	mounted(){
		
	},
	components:{
		Toast
	}
}
</script>