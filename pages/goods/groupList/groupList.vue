<template>
	<view>
		<view class="padding-air  ">
			<view class="goods-view flex " v-for="(item, index) in list" :key="index" @tap="tp" :data-id="item.id">
				<view class="bg-img" :style="[{ backgroundImage: 'url(' + item.cover_pic + ')' }]" style="width: 202upx;height: 202upx;background-size:cover;"></view>
				<view class="flex-sub"  style="margin-left:20upx;">
					<view class="flex justify-between" style="line-height: 70upx;">
						<view class="text-cut" style="font-size: 30upx;width: 400upx;">{{ item.name }}</view>
					</view>
					<view class="text-cut " style="margin-bottom: 10upx;margin-top: 10upx;">
						<text class="cu-tag radius tag-view  ">{{ item.group_num }}人团</text>
					</view>
					<view class="flex  justify-between ">
						<view class="flex align-end ">
							<view class="price  ">￥{{ item.price }}</view>
							<view class="old-price">￥{{ item.original_price }}</view>
						</view>
						<view><button class="cu-btn bg-yellow">去拼团</button></view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="lodstatus" v-if="lodstatus"></uni-load-more>
	</view>
</template>

<script>
var that;
import data from '../data.js';
export default {
	data() {
		return { 
			page: 1,
			list: [],
			nolist: false,
			nomore: false,
			lodstatus: '' 
		};
	},
	methods: {
		tp(e) {
			uni.navigateTo({
				url: '/pages/goods/goodsGroup/goodsGroup?gid=' + e.currentTarget.dataset.id
			});
		},
		getlist(i) {
			if (that.nomore) {
				return;
			}
			that.lodstatus = 'loading';
			that.nolist = false;
			this.$request
				.request({
					url: that.api.group.list,
					data: { 
						page: that.page,
						cid:0
					},
					success(res){
						let list=res.list; 
						that.lodstatus = '';
						if (list.length > 0) {
							that.list = that.list.concat(list);
							that.page = that.page + 1;
							that.lodstatus = 'more';
							that.list.length == 0 ? (that.nolist = true) : (that.nolist = false);
							list.length == 0 ? ((that.lodstatus = ''), (that.nolist = true)) : list.length > 10 ? (that.lodstatus = 'more') : (that.lodstatus = '');
						} else {
							if (that.page != 1) {
								that.nomore = true;
								that.lodstatus = 'noMore';
							} else {
								that.nolist = true;
							}
						}
						  console.log(that.list);
					}
				}) 
		}
	},
	onLoad() {
		that = this; 
		that.getlist();
	}
};
</script>

<style>
page {
	background: #eeeeee;
}
.padding-air {
	padding-top: 20upx;
}
.goods-view {
	width: 706upx;
	height: 270upx;
	background-color: #ffffff;
	border-radius: 20upx;
	margin: auto;
	margin-bottom: 20upx;
	padding: 35upx 40upx 35upx 25upx;
}
.price {
	font-size: 32upx;
	color: #f52618;
}
.old-price {
	font-size: 26upx;
	color: #b8b8b8;
	margin-left: 20upx;
}
.bg-img {
	border-radius: 12upx;
}
.cu-btn {
	width: 148upx;
	font-size: 24upx;
	height: 54upx;
	background-image: linear-gradient(-60deg, #ff4c29 0%, #ff7155 100%);
	border-radius: 27upx;
	color: #FFF;
}
.tag-view {
	background-color: #ffe4df !important;
	border-radius: 4upx;
	font-size: 26upx;
	color: #ff0101;
}
</style>
