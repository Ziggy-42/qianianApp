<template>
	<view>
		<!-- <view style="position: fixed;width: 100%; z-index: 999; ">
			<view class="kong"></view>
			<scroll-view scroll-x class="bg-white nav" style="border-bottom: solid #eeeeee 1upx;">
				<view class="flex text-center">
					<view
						class="cu-item flex-sub tab "
						:class="index == TabCur ? 'action' : ''"
						v-for="(item, index) in tab"
						:key="index"
						@tap="tabSelect"
						:data-id="item.id"
						:data-index="index"
					>
						{{ item.title }}
						<view class="down-solid"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="height: 120upx;"></view> -->

		<view class="li-view" v-for="(item, index) in orderlist" :key="index" @tap="toinfo" :data-index="index" >
			<view class="li-top">订单号：{{ item.order_no }}</view>
			<view class="goods-list" v-for="(goodsitem, goodsindex) in item.orderDetail" :key="goodsindex">
				<view class="goods-img"><image lazy-load="" :src="goodsitem.cover_pic" mode="aspectFill"></image></view>
				<view class="goods-right">
					<view class="text-cut goods-name">{{ goodsitem.name }}</view>
					<view class="goods-down">
						<view>
							<!-- <text class="goods-bar" v-for="(attr, attrindex) in goodsitem.attr_list" :key="attrindex">{{ attr.attr_group_name }}:{{ attr.attr_name }}</text> -->
						<view class="goods-price">￥{{ goodsitem.price }}</view>
						</view>
						<view class="goods-price">X{{ goodsitem.num }}</view>
					</view>
				</view>
			</view>
			<view class="list-dowm">
				<view>
					合计：
					<text style="color: #b701e5;">￥{{ item.pay_price }}</text>
				</view>
				<view style="color: #ff4e00;">返利：￥{{ item.share_money }}</view>
			</view>
		</view>
		<nolist type="2" text="没有相关订单" v-if="onlist"></nolist>
		<nomore text="没有更多了" v-if="nomore"></nomore>
	</view>
</template>

<script>
var that;
import order from '../order.js';
export default {
	data() {
		return {
			CustomBar: this.CustomBar,
			TabCur: 0,
			tab: [{ id: '-1', title: '全部订单' }, { id: '0', title: '待付款' }, { id: '1', title: '已付款' }, { id: '2', title: '已完成' }],
			orderlist: [],
			page: 1,
			nomore: false,
			keyword: '',
			status: '',
			onlist: false
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.index;
			this.status = e.currentTarget.dataset.id;
			that.page = 1;
			that.orderlist = [];
			that.nomore = false;
			that.getlist();
		},
		getlist() {
			if (that.nomore) {
				return;
			}
			that.onlist = false;
			this.$request
				.request({
					url: that.api.share.get_order,
					data: {
						status: that.status,
						page: that.page,
						keyword: that.keyword
					},
					Toast: '正在加载...'
				})
				.then(res => {
					console.log('列表:', res);
					if (res.length > 0) {
						var list = res;
						that.orderlist = that.orderlist.concat(list);
						that.page = that.page + 1;
					} else {
						if (that.page != 1) {
							if (!that.nomore) {
								that.$alert('没有更多了!');
								that.nomore = true;
							}
						} else {
							that.onlist = true;
						}
					}
					that.$forceUpdate();
				});
		},
		search(e) {
			that.keyword = e.detail.value;
			that.page = 1;
			that.orderlist = [];
			that.nomore = false;
			that.getlist();
		},
		kinp() {
			that.keyword = '';
			that.page = 1;
			that.orderlist = [];
			that.nomore = false;
			that.getlist();
		},
		toinfo(e) {
			let torderinfo= that.orderlist[e.currentTarget.dataset.index] 
			uni.setStorageSync("torderinfo",torderinfo)
			uni.navigateTo({
				url: '/pages/earnings/orderinfo/orderinfo'
			});
		}
	},
	onLoad() {
		that = this;
		that.getlist();
		// that.orderlist = order.orderlist;
		// console.log(that.orderlist);
	},
	onReachBottom() {
		that.getlist();
	},
	onPullDownRefresh() {
		that.keyword = '';
		that.page = 1;
		that.orderlist = [];
		that.nomore = false;
		that.getlist();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style>
page {
	background: #f0f0f0;
}
.li-view {
	background: #fff;
	margin-top: 16rpx;
	padding: 0rpx 25rpx;
}
.goods-list {
	height: 152rpx;
	background-color: #f5f5f5;
	padding: 20rpx;
	display: flex;
}
.goods-list .goods-img {
	width: 111rpx;
	height: 111rpx;
	margin-right: 23rpx;
	overflow: hidden;
}
.goods-list .goods-img image {
	width: 100%;
	height: 100%;
}
.goods-list .goods-right {
	width: 510rpx;
}
.goods-down {
	display: flex;
	margin-top: 30rpx;
	justify-content: space-between;
}
.goods-bar {
	font-size: 24rpx;
	color: #cc49f1;
	background-color: #fdf4ff;
	border-radius: 6rpx;
	padding: 10rpx 15rpx;
}
.list-dowm {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 80rpx;
	font-size: 28rpx;
	padding: 0rpx 20rpx;
}
.li-top {
	font-size: 25rpx;
	color: #a4a4a4;
	display: flex;
	align-items: center;
	padding: 0rpx 20rpx;
	height: 80rpx;
}

.nav .cu-item {
	height: 80rpx;
	line-height: 80rpx;
}
.tab {
	color: #8b8b8b;
}
.cu-item .down-solid {
	width: 102rpx;
	height: 5rpx;
	background-color: #b701e5;
}
.action {
	font-size: 28rpx;
	color: #b701e5;
}
.action .down-solid {
	background-color: #b701e5;
	margin: auto;
	position: relative;
	top: -10rpx;
}
</style>
