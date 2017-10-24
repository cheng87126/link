<style scoped>
	tbody td img{
		width: 1.2em;
		vertical-align: middle;
		cursor: pointer;
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
		<table>
			<colgroup>
				<col width="5%">
				<col width="50%">
				<col width="35%">
				<col width="10%">
			</colgroup>
			<thead>
				<tr>
					<th><input type="checkbox" name="all" id="all"></th>
					<th>地址</th>
					<th>描述</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in urlList" :key="item.id">
					<td><input type="checkbox" name="" id=""></td>
					<td><a v-bind:href="item.urlName">{{ item.urlName }}</a></td>
					<td>{{ item.urlDesc }}</td>
					<td><img v-on:click="delItem(item.id)" src="../img/del.svg" alt="del"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	const AV = require('leancloud-storage')

	export default{
		name:'Url',
		data(){
			return {
				desc:'',
				url:'',
				urlList:[]
			}
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
					console.log(object)
				})
			},
			delItem(id){
				let link = AV.Object.createWithoutData('link',id)
				link.destroy().then(success=>{
					this.getList()
				},error=>{
					// 删除失败
				})
			},
			getList(){
				let query = new AV.Query('link')
				query.find().then(result=>{
					this.urlList = []
					result.forEach(item=>{
						this.urlList.push({
							urlDesc:item.get('url_desc'),
							urlName:item.get('url_name'),
							id:item.id
						})
					})
				},error=>{
					console.log(error)
				})
			}
		},
		mounted() {
			// AV.init({
			// 	appId: APP_ID,
			// 	appKey: APP_KEY
			// })
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