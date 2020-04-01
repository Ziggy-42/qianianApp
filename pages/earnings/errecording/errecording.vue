<template>
	<view>  
		<view>
			<view class=" lsit-item flex justify-between align-center bg-white " v-for="(item, index) in list" :key="index">
				<view class="">
					<view class="title-type">{{ item.typeStr }}</view>
					<view class="time-text">{{ item.addtime }}</view>
				</view>
				<view class="money-text">
					<block v-if="item.type == 0">+</block>
					<block v-if="item.type == 1">-</block>
					{{ item.money }}
				</view>
			</view>
		</view>

		<nolist type="2" text="暂无相关记录!" v-if="nolist"></nolist>
		<block v-else>
			<uni-load-more :status="lodstatus" v-if="lodstatus != 'more'"></uni-load-more>
		</block>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {  
			list: [], 
			page: 1,
			nolist: false,
			nomore: false,
			lodstatus: ''
		};
	},
	methods: { 
		getlist(i) {
			if (that.nomore) {
				return;
			}
			that.lodstatus = 'loading';
			that.nolist = false;
			this.$request
				.request({
					url: that.api.share.get_money_log,
					data: { 
						page: that.page
					}
				})
				.then(res => {
					console.log(res);
					that.lodstatus = '';
					if (res.length > 0) {
						that.list = that.list.concat(res);
						that.page = that.page + 1;
						that.lodstatus = 'more';
					} else {
						if (that.page != 1) {
							that.nomore = true;
							that.lodstatus = 'noMore';
						} else {
							that.nolist = true;
						}
					}
				 
					uni.setStorageSync('zjmx', {
						page: that.page,
						list: that.list
					});
			 
				});
		}
	},
	onLoad() {
		that = this; 
		let data=uni.getStorageSync('zjmx');
		that.list=data.list;
		that.page=data.page; 
		that.getlist();
	},
	onReachBottom() {
		that.getlist();
	},
	onPullDownRefresh() {
		that.list = [];
		that.page = 1;
		that.getlist(1);
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style>
page {
	background: #ffffff;
}

.margin-top {
	margin-top: 21upx;
}

.lsit-item {
	height: 148upx;
	padding: 0upx 51upx;
	border-bottom: solid 1upx #efefef;
}

.title-type {
	font-size: 30upx;
	font-weight: 550;
	margin-bottom: 20upx;
}

.time-text {
	color: #b3b2b2;
	font-size: 24upx;
}

.money-text {
	font-size: 36upx;
	color: #ff3030;
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
