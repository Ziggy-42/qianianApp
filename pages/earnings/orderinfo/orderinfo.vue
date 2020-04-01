<template>
	<view>
		<view class="kong"></view>
		<view class="li-view">
			<view class="li-top">订单号：{{ orderinfo.order_no }}</view>
			<view class="goods-list" v-for="(goodsitem, goodsindex) in orderinfo.orderDetail" :key="goodsindex">
				<view class="goods-img"><image lazy-load="" :src="goodsitem.goods_pic" mode="aspectFill"></image></view>
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
					<text style="color: #b701e5;">￥{{ orderinfo.pay_price }}</text>
				</view>
				<view style="color: #ff4e00;">返利：￥{{orderinfo.share_money}}</view>
			</view>
		</view>
		<view class="kong"></view>

		<view class="list">
			<label>下单用户</label>
			<view class="right">{{orderinfo.nickname}}</view>
		</view>
		<view class="list">
			<label>支付时间</label>
			<view class="right">{{orderinfo.pay_time}}</view>
		</view>
		<view class="list">
			<label>订单类型</label>
			<view class="right">{{orderinfo.formStr}}</view>
		</view>
	</view>
</template>

<script>
var that;
import order from '../order.js';
export default {
	data() {
		return {
			orderinfo: []
		};
	},
	methods: {
		getlist() {}
	},
	onLoad() {
		that = this; 
		that.orderinfo = uni.getStorageSync("torderinfo");
		console.log(that.orderinfo);
	},
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style>
page {
	background: #fff;
}
.li-view {
	background: #fff;
	padding: 0upx 25upx;
}
.goods-list {
	height: 152upx;
	background-color: #f5f5f5;
	padding: 20upx;
	display: flex;
}
.goods-list .goods-img {
	width: 111upx;
	height: 111upx;
	margin-right: 23upx;
	overflow: hidden;
}
.goods-list .goods-img image {
	width: 100%;
	height: 100%;
}
.goods-list .goods-right {
	width: 510upx;
}
.goods-down {
	display: flex;
	margin-top: 30upx;
	justify-content: space-between;
}
.goods-bar {
	font-size: 24upx;
	color: #cc49f1;
	background-color: #fdf4ff;
	border-radius: 6upx;
	padding: 10upx 15upx;
}
.list-dowm {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 80upx;
	font-size: 28upx;
	padding: 0upx 20upx;
}
.li-top {
	font-size: 25upx;
	color: #a4a4a4;
	display: flex;
	align-items: center;
	padding: 0upx 20upx;
	height: 80upx;
}
.list {
	font-size: 28rpx; 
	height: 115upx;
	background: #fff;
	padding: 0upx 45upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: solid #eeeeee 1upx;
}
.list .right { 
	color: #7b7b7b;
}
.list label{ 
	color: #202020;
}
</style>
