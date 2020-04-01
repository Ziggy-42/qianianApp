<template>
	<view>
		<view class="header" style="background-color: #F0F0F0;">
			<view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
			<view class="padding2 top_tab " style="background-color: #F0F0F0;">
				<scroll-view scroll-x class=" nav" style="background: #F0F0F0;">
					<view class="flex text-center">
						<view
							class="cu-item flex-sub texty"
							:class="item.id == TabCur ? 'tab-action' : ''"
							v-for="(item, index) in navtitle"
							:key="index"
							@tap="tabSelect"
							:data-id="item.id"
							style="font-size: ;"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
		</view>
		<view style="height: 130upx;"></view>
		<view class="goodslist1">
			<block v-for="(item, index) in list" :key="index">
				<view class="goods-view" @tap="todetail" :data-id="item.id">
					<view class="goods-img"><image :src="item.cover" style="width: 100%; height: 100%;" mode="aspectFill"></image></view>
					<view class="goods-right">
						<view class="goods-name">{{ item.name }}</view>
						<view class="flex justify-between goods-price align-center">
							<view class="">
								￥{{ item.price }}
							</view>
							<view @tap.stop="del" :data-id="item.id" :data-index="index" style="font-size: 42upx;" class="cuIcon-delete text-red"></view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<nomore text="没有更多了" v-if="nomore"></nomore>
		<nolist text="暂时没有商品" v-if="nolist"></nolist>
		<navigator class="add-view" @tap="clickicon"><text class="cuIcon-add"></text></navigator>
		
	</view>
</template>

<script>
	var that;
export default {
	data() {
		return {
			TabCur:0,
			scrollLeft: 0,
			navtitle: [{ id: 0, name: '平台商品' }, { id: 1, name: '商家商品' }, { id: 2, name: '我的商品' }],
			list: [],
			page: 1,
			nomore: false,
			nolist: false
		};
	},
	methods: {
		tabSelect(e) { 
			this.TabCur = e.currentTarget.dataset.id;
			(this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60);
			that.page = 1;
			that.nomore = false;
			that.nolist = false;
			that.list = [];
			that.getlist();
		},
		getlist(){ 
			that.$request
				.request({
					url: that.api.anchor_order.goods_list,
					method: 'GET',
					data:{
						type: Number(that.TabCur) + 1,
						page: that.page
					}
				})
				.then(res=>{
					console.log(res)
					if (res.length > 0) {
						var list = res;
						that.list = that.list.concat(list);
						that.page = that.page + 1;
					} else {
						if (that.page != 1) {
							if (!that.nomore) {
								that.$alert('没有更多了!');
								that.nomore = true;
							}
						} else {
							that.nolist = true;
						}
					}
					uni.stopPullDownRefresh()
				})
		},
		clickicon(e){ 
			if(that.TabCur == 0){
				var url = '/pages/anchor/goods/storeroom/addGoodstostor/addGoodstostor'
			}else if(that.TabCur == 1){
				var url = '/pages/anchor/goods/storeroom/addGoodslive/addGoodslive'
			}else if(that.TabCur == 2){
				var url = '/pages/anchor/goods/storeroom/addGoods/addGoods'
			}
			uni.navigateTo({
				url: url
			})
		},
		todetail(e){ 
			var id = e.currentTarget.dataset.id;
			uni.navigateTo({
				url: '/pages/liveBroadcast/goods/goodsInfo/goodsInfo?id=' + id
			})
		},
		del(e){ 
			var id = e.currentTarget.dataset.id;
			let index=e.currentTarget.dataset.index;
			uni.showModal({
				title:"提示",
				content:"确定要删除该产品吗?",
				success(res){
					if(res.confirm){
						if(that.TabCur ==0 || that.TabCur == 1){
							that.$request
								.request({
									url: that.api.anchor_order.del_relation_goods,
									method: 'GET',
									data:{
										goods_id: id
									}
								})
								.then(res=>{
									console.log(res)
									that.list.split(index,1)
								})
						}else if(that.TabCur == 2){
							that.$request
								.request({
									url: that.api.anchor_order.del_anchor_goods,
									method: 'GET',
									data:{
										goods_id: id
									}
								})
								.then(res=>{
									console.log(res)
									that.list.split(index,1)
								}) 
						}
					}
				}
			}) 
		}
	},
	onLoad() {
		 that = this;
		that.getlist();
	},
	onReachBottom() {
		that.getlist();
	},
	onPullDownRefresh() {
		that.page=1;
		that.list=[];
		that.getlist();
	}
};
</script>

<style>
@import '../../../../css/goods.css'; 
.header {
	position: fixed;
	width: 100%;
	z-index: 999;
}
.tab-action {
	font-size: 28upx;
	color: #b701e5;
	border-bottom: solid #b701e5 5upx;
}
.goods-name {
	height: 110upx;
}
.add-view {
	width: 130upx;
	height: 130upx;
	background-image: linear-gradient(0deg, #a201e5 0%, #d362ee 100%);
	box-shadow: 0upx 4upx 9upx 1upx rgba(169, 15, 230, 0.33);
	border-radius: 10000rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 58rpx;
	color: #FFF;
	position: fixed;
	right: 60rpx;
	bottom: 200rpx;
}
</style>
