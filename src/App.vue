<style>
	@import "./css/index.css";
</style>
<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
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
			// AV.init({
			// 	appId: APP_ID,
			// 	appKey: APP_KEY
			// })
		},
		mounted(){
			
		}
	}
</script>