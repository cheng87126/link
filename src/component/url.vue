<style>
.page{
	display: flex;
	align-items:center;
	justify-content:center;
	margin: 10px 0;
}
.page .btn:nth-child(2){
	margin-left: 6px;
}
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
		<div class="page">
			<div class="btn" 
				v-on:click="prev"
				v-show="pageIdx !== 0">Prev</div>
			<div class="btn" 
				v-on:click="next"
				v-show="pageIdx < pageTotal - 1">Next</div>
		</div>
	</div>
</template>
<script>
import Table from './base/table.vue'

const AV = require('leancloud-storage')
const query = new AV.Query('link')

export default{
	name:'Url',
	data(){
		return {
			desc:'',
			url:'',
			urlList:[],
			pageIdx:0,
			pageNum:10,
			pageTotal:0
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
			query.limit(10)
			query.descending('createdAt')
			query.skip(this.pageIdx * this.pageNum)
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
				//为了获得总条数,对leancloud不熟╮(╯_╰)╭
				query.count().then(data => {
					this.pageTotal = Math.ceil(data / this.pageNum)
				},error => {
					console.log(error)
				})
			},error=>{
				console.log(error)
			})
		},
		prev(){
			this.pageIdx--
			this.getList()
		},
		next(){
			this.pageIdx++
			this.getList()
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