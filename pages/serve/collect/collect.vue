<template>
	<view>
		<view class="goodslist">
			<block v-for="(item, index) in goods_list" :key="index">
				<view class="goods-view" @tap="tpinfo"  :data-id="item.goods_id" >
					<view class="goods-img"><image :src="item.goods_pic" mode="aspectFill" lazy-load="true"></image></view>
					<view class="goods-down">
						<view class="goods-name text-cut">{{ item.name }}</view>
						<view class="goods-dview">
							<view class="goods-price">￥{{ item.price }}</view>
							<view class="icon-car"><image src="/static/icon/icon-car.png" mode="widthFix"></image></view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="kong"></view> 
		<nolist text="暂无收藏" v-if="nolist"></nolist>
		<nomore text="没有更多了" v-if="nomore"></nomore>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return { 
			goods_list: [],
			cat_id: '',
			page: 1,
			goods_id: '',
			nomore:false,
			nolist:false
		};
	},
	methods: {
		qie(e) {
			let index = e.currentTarget.dataset.index;
			that.sort = index;
			if (index == 2) {
				if (that.sort_type != -1) {
					that.sort_type == 1 ? (that.sort_type = 0) : (that.sort_type = 1);
				} else {
					that.sort_type = 1;
				}
			} else {
				that.sort_type = '-1';
			}
			that.page = 1;
			that.getlist();
		},
		getlist() {
			let goods_list=that.goods_list;
			let page=that.page;
			let nolist='';
			let nomore='';
			that.$request
				.request({
					url: that.api.user.favorite_list,
					data: { 
						page: that.page, 
					}
				})
				.then(res => { 
					let li=res.list;
					if(page==1){
						goods_list=li
						page=1
						goods_list.length==0?nolist=true:nolist=false
					}else{
						if(li.length>0){
							goods_list=goods_list.concat(li);
							page++
							nolist=false
						}else{
							page==1?(nolist=true,nomore=false):(nolist=false,nomore=true)
						}
					}
					that.goods_list=goods_list;
					that.page=page;
					that.nolist=nolist;
					that.nomore=nomore;
				});
		},
		tpinfo(e){
			let id=e.currentTarget.dataset.id;
			uni.navigateTo({
				url:'/pages/goods/goodsInfo/goodsInfo?gid='+id
			})
		}
	},
	onLoad(option) {
		that = this;
		that.cat_id = option.cat_id ? option.cat_id : 5;
		that.getlist();
	},
	onReachBottom() {
		that.getlist();
	}
};
</script>

<style> 
</style>
