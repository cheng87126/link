<style scoped>
tbody td img{
	width: 1.2em;
	vertical-align: middle;
	cursor: pointer;
}
tbody tr:nth-of-type(2n+2){
	background-color: #fff;
}
.item-row input[type="text"]{
	display: none;
}
.edit span{
	display: none;
}  
.edit input[type="text"]{
	display: block;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}
</style>
<template>
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
			<tr class="item-row"
				v-for="item in urls" :key="item.id" 
				v-bind:class="{edit:isEdit === item.id}">
				<td><input type="checkbox" name="" id=""></td>
				<td><a v-bind:href="item.urlName">{{ item.urlName }}</a></td>
				<td v-on:dblclick="edit(item.id,item.urlDesc)">
					<span>{{ item.urlDesc }}</span>
					<input type="text" 
						v-model="item.urlDesc"
						v-focus="isEdit === item.id"
						v-on:keyup.esc="cancel(item)"
						v-on:blur="update(item.urlDesc,item.id)"
						v-on:keyup.enter="update(item.urlDesc,item.id)"
					>
				</td>
				<td><img v-on:click="delItem(item.id)" src="../../img/del.svg" alt="del"></td>
			</tr>
		</tbody>
	</table>
</template>
<script>
const AV = require('leancloud-storage')

export default {
    name:'Table',
    data(){
        return {
			isEdit:''
        }
    },
    props:{
        urls:Array
    },
    methods:{
		delItem(id){
			let link = AV.Object.createWithoutData('link',id)
			link.destroy().then(success=>{
				this.$store.commit('setToast',{
					show:true,
					msg:'删除成功!'
				})
                // this.getList()
                this.$emit('refreshList')
			},error=>{
				// 删除失败
			})
		},
		edit(id,desc){
			this.isEdit = id
			//避免修改内容后按esc取消修改不能还原desc
			this.descCache = desc
		},
		update(desc,id){
			if(!this.isEdit){
				return
			}
			AV.Query.doCloudQuery(`update link set url_desc="${desc}" where objectId="${id}"`)
			.then(data => {
				// data 中的 results 是本次查询返回的结果，AV.Object 实例列表
				var results = data.results
				this.isEdit = ''
			}, error => {
				// 异常处理
				console.error(error)
			});
		},
		cancel(item){
			this.isEdit = ''
			item.urlDesc = this.descCache
		}
    },
	directives:{
		focus:function(el,binding){
			if (binding.value) {
				el.focus()
			}
		}
	}
}
</script>
