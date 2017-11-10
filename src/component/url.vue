<style>

</style>
<template>
	<div>
		<div class="row">
			<label for="url">URL</label><input type="text" id="url" placeholder="url" v-model="url">
		</div>
		<div class="row">
			<label for="desc">描述</label><input type="text" id="desc" v-model="desc">
		</div>
		<div class="btn" v-on:click="submitUrl">提交</div>

		<w-table 
			v-bind:urls="urlList" 
			v-on:refreshList="getList">
		</w-table>
	</div>
</template>
<script>
const AV = require('leancloud-storage')
import Table from './base/table.vue'

export default{
	name:'Url',
	data(){
		return {
			desc:'',
			url:'',
			urlList:[]
		}
	},
	components:{
		'w-table':Table
	},
	methods:{
		submitUrl() {
			let LinkObj = AV.Object.extend('link')
			let linkObj = new LinkObj()
			linkObj.save({
				url_desc:this.desc,
				url_name: this.url
			}).then(object => {
				this.getList()
				this.desc = ''
				this.url = ''
				this.$store.commit('setToast',{
					show:true,
					msg:'添加成功!'
				})
			})
		},
		getList(){
			let query = new AV.Query('link')
			query.find().then(result=>{
				this.urlList = []
				result.forEach(item => {
					this.urlList.push({
						urlDesc:item.get('url_desc'),
						urlName:item.get('url_name'),
						id:item.id,
						createdAt:item.createdAt
					})
				})
				this.urlList.sort(function(a,b){
					return b.createdAt - a.createdAt
				})
			},error=>{
				console.log(error)
			})
		}
	},
	mounted() {
		this.getList()
		let currentUser = AV.User.current()
		if (currentUser) {
			// 跳转到首页
		}
		else {
			//currentUser 为空时，可打开用户注册界面…
			this.$router.push({ path: '/login' })
		}
	}
}
</script>