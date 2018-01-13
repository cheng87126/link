<style>
main{
	margin-top: 1.25em;
	padding: 0 0.625em;
}
footer{
	text-align: center;
	line-height: 30px;
}
</style>

<template>
	<section>
		<w-head></w-head>
		<main>
			<router-view></router-view>
		</main>
		<footer>link</footer>
	</section>
</template>

<script>
import Head from './head.vue'

export default{
	data(){
		return {
			username:'',
			showList:false
		}
	},
	components:{
		'w-head':Head
	}
}
</script>