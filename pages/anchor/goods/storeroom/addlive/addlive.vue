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
		<block v-if="TabCur == 0">
			<view class="goodslist3">
				<block v-for="(item, index) in goods_list" :key="index">
					<view class="goods-view">
						<view class="goods-img"><image :src="item.cover" style="width: 100%; height: 100%;" mode="aspectFill"></image></view>
						<view class="goods-right">
							<view class="goods-name">{{ item.name }}</view>
							<view class="goods-price">￥{{ item.price }}</view>
						</view>
						<view class="goods-print" @tap="printl" :data-index="index">
							<image src="/static/icon/print-cur.png" v-if="item.print"></image>
							<image src="/static/icon/print.png" v-else></image>
						</view>
					</view>
				</block>
			</view>
			<nomore text="没有更多了" v-if="nomore"></nomore>
			<nolist text="暂时没有商品" v-if="nolist"></nolist>
		</block>
		<block v-if="TabCur == 1">
			<view class="goodslist3">
				<block v-for="(item, index) in shop_list" :key="index">
					<view class="goods-view">
						<view class="goods-img"><image :src="item.cover" style="width: 100%; height: 100%;" mode="aspectFill"></image></view>
						<view class="goods-right">
							<view class="goods-name">{{ item.name }}</view>
							<view class="goods-price">￥{{ item.price }}</view>
						</view>
						<view class="goods-print" @tap="printl" :data-index="index">
							<image src="/static/icon/print-cur.png" v-if="item.print"></image>
							<image src="/static/icon/print.png" v-else></image>
						</view>
					</view>
				</block>
			</view>
			<nomore text="没有更多了" v-if="snomore"></nomore>
			<nolist text="暂时没有商品" v-if="snolist"></nolist>
		</block>
		<block v-if="TabCur == 2">
			<view class="goodslist3">
				<block v-for="(item, index) in mine_list" :key="index">
					<view class="goods-view">
						<view class="goods-img"><image :src="item.cover" style="width: 100%; height: 100%;" mode="aspectFill"></image></view>
						<view class="goods-right">
							<view class="goods-name">{{ item.name }}</view>
							<view class="goods-price">￥{{ item.price }}</view>
						</view>
						<view class="goods-print" @tap="printl" :data-index="index">
							<image src="/static/icon/print-cur.png" v-if="item.print"></image>
							<image src="/static/icon/print.png" v-else></image>
						</view>
					</view>
				</block>
			</view>
			<nomore text="没有更多了" v-if="mnomore"></nomore>
			<nolist text="暂时没有商品" v-if="mnolist"></nolist>
		</block>
		<view class="down-view">
			<!-- <view>最多可选50个</view> -->
			<view class="flex align-center justify-between" style="width: 100%;;">
				<view>
					<text class="price-color">已选: {{ num }}</text>
					<text>/{{ maxnum }}</text>
				</view>
				<button class="cu-btn" @tap="choosedone">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			navtitle: [
				{
					id: 0,
					name: '平台商品'
				},
				{
					id: 1,
					name: '商家商品'
				},
				{
					id: 2,
					name: '我的商品'
				}
			],
			goods_list: [],
			shop_list: [],
			mine_list: [],
			mpage: 1,
			mnomore: false,
			mnolist: false,
			spage: 1,
			snomore: false,
			snolist: false,
			num: 0,
			page: 1,
			nomore: false,
			nolist: false,
			idlist: [],
			ids: [],
			maxnum: 10
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			// if (e.currentTarget.dataset.id == 0) {
			// 	that.page = 1;
			// 	that.goods_list = [];
			// 	that.nolist = false;
			// 	that.nomore = false;
			// 	that.getlist1();
			// } else if (e.currentTarget.dataset.id == 1) {
			// 	that.spage = 1;
			// 	that.shop_list = [];
			// 	that.snolist = false;
			// 	that.snomore = false;
			// 	that.getlist2();
			// } else if (e.currentTarget.dataset.id == 2) {
			// 	that.mpage = 1;
			// 	that.mine_list = [];
			// 	that.mnolist = false;
			// 	that.mnomore = false;
			// 	that.getlist3();
			// }
		},
		printl(e) {
			var TabCur = that.TabCur;
			if (TabCur == 0) {
				let index = e.currentTarget.dataset.index;
				let goods_list = that.goods_list;
				if (!goods_list[index]['print']) {
					if (that.idlist.length + that.ids.length == that.maxnum) {
						return;
					}
					goods_list[index]['print'] = !goods_list[index]['print'];
					that.idlist.push(goods_list[index].id);
					console.log(that.idlist);
					that.num++;
				} else {
					goods_list[index]['print'] = !goods_list[index]['print'];
					var idindex = that.idlist.indexOf(goods_list[index].id);
					that.idlist.splice(idindex, 1);
					that.idlist = that.idlist;
					console.log(that.idlist);
					that.num--;
				}
				that.goods_list = goods_list;
				that.$forceUpdate();
			} else if (TabCur == 1) {
				let index = e.currentTarget.dataset.index;
				let shop_list = that.shop_list;
				if (!shop_list[index]['print']) {
					shop_list[index]['print'] = !shop_list[index]['print'];
					if (that.idlist.length + that.ids.length == that.maxnum) {
						return;
					}
					that.idlist.push(shop_list[index].id);
					console.log(that.idlist);
					that.num++;
				} else {
					shop_list[index]['print'] = !shop_list[index]['print'];
					var idindex = that.idlist.indexOf(shop_list[index].id);
					that.idlist.splice(idindex, 1);
					that.idlist = that.idlist;
					console.log(that.idlist);
					that.num--;
				}
				that.shop_list = shop_list;
				that.$forceUpdate();
			} else if (TabCur == 2) {
				let index = e.currentTarget.dataset.index;
				let mine_list = that.mine_list;
				if (!mine_list[index]['print']) {
					if (that.idlist.length + that.ids.length == that.maxnum) {
						return;
					}
					mine_list[index]['print'] = !mine_list[index]['print'];
					that.ids.push(mine_list[index].id);
					console.log(that.ids);
					that.num++;
				} else {
					mine_list[index]['print'] = !mine_list[index]['print'];
					var idindex = that.ids.indexOf(mine_list[index].id);
					that.ids.splice(idindex, 1);
					that.ids = that.ids;
					console.log(that.ids);
					that.num--;
				}
				that.mine_list = mine_list;
				that.$forceUpdate();
			}
		},
		// 平台商品
		getlist1() {
			var that = this;
			that.$request
				.request({
					url: that.api.anchor_order.goods_list,
					method: 'GET',
					data: {
						page: that.page,
						type: 1
					}
				})
				.then(res => {
					console.log(res);
					if (res.length > 0) {
						that.goods_list = that.goods_list.concat(res);
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
				});
		},
		getlist2() {
			var that = this;
			that.$request
				.request({
					url: that.api.anchor_order.goods_list,
					method: 'GET',
					data: {
						page: that.spage,
						type: 2
					}
				})
				.then(res => {
					console.log(res);
					if (res.length > 0) {
						that.shop_list = that.shop_list.concat(res);
						that.spage = that.spage + 1;
					} else {
						if (that.spage != 1) {
							if (!that.nomore) {
								that.$alert('没有更多了!');
								that.snomore = true;
							}
						} else {
							that.snolist = true;
						}
					}
				});
		},
		getlist3() {
			var that = this;
			that.$request
				.request({
					url: that.api.anchor_order.goods_list,
					method: 'GET',
					data: {
						page: that.mpage,
						type: 3
					}
				})
				.then(res => {
					console.log(res);
					if (res.length > 0) {
						that.mine_list = that.mine_list.concat(res);
						that.mpage = that.mpage + 1;
					} else {
						if (that.mpage != 1) {
							if (!that.nomore) {
								that.$alert('没有更多了!');
								that.mnomore = true;
							}
						} else {
							that.mnolist = true;
						}
					}
				});
		},
		choosedone() {
			if (that.idlist.length == 0 && that.ids.length == 0) {
				uni.showToast({
					title: '请选择至少一件商品',
					icon: 'none'
				});
				return false;
			}
			var ids = that.ids;
			var idlist = that.idlist;
			uni.setStorageSync('goods', idlist);
			uni.setStorageSync('anchor_goods', ids);
			uni.navigateBack({
				delta: 1
			});
		}
	},
	onLoad() {
		that = this;
		that.getlist1();
		that.getlist2();
		that.getlist3(); 
		that.maxnum = uni.getStorageSync('config').live_goods_num;
	},
	onReachBottom() {
		that = this;
		var TabCur = that.TabCur;
		if (TabCur == 0) {
			that.getlist1();
		} else if (TabCur == 1) {
			that.getlist2();
		} else if (TabCur == 2) {
			that.getlist3();
		}
	}
};
</script>

<style>
@import '../../../../../css/goods.css';

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
	height: 100upx;
}

.down-view {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0upx 30upx;
	height: 105upx;
	background-color: #ffffff;
	box-shadow: 2rpx -1rpx 0rpx 0rpx rgba(205, 205, 205, 0.43);
	position: fixed;
	bottom: 0upx;
	font-size: 28rpx;
}

.down-view .cu-btn {
	width: 140rpx;
	height: 58rpx;
	background-color: #b701e5;
	border-radius: 29rpx;
	font-size: 28rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29rpx;
	letter-spacing: 0rpx;
	color: #ffffff;
	margin-left: 20upx;
}
</style>
