<template>
	<view>
		<view class="kong"></view>
		<view class="header-view">
			<view class="card-view bg-img " :style="{backgroundImage:'url('+tx+')'}" >
				<view class="">
					<view style="font-size: 28rpx;">总收益</view>
					<view style="font-size: 46rpx;font-weight:550;margin-top: 20rpx;">{{ price.total_price ? price.total_price : 0 }}</view>
					<view style="font-size: 26rpx; margin-top: 40rpx;">可提现资金：{{ price.price ? price.price : 0.0 }}</view>
					
				</view>
				<view><button class="cu-btn btn bg-white z-color"  @tap="tap" data-url="/pages/earnings/tixian/tixian">提现</button></view>
			</view>
		</view>
		<view class="kong"></view>
		<view class="cu-list menu">
			<view class="cu-item arrow" v-for="(item, index) in tablist" :key="index">
				<view class="content" @tap="tap" :data-url="item.url">
					<text class="text-black">{{ item.title }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			tx: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
			tablist: [
				{
					url: '/pages/earnings/errecording/errecording',
					title: '资金明细'
				},
				{
					url: '/pages/earnings/orderlist/orderlist',
					title: '订单明细'
				},
				{
					url: '/pages/earnings/myitem/myitem',
					title: '我的团队'
				}
			],
			price: {}, 
			info:{},
			userinfo: uni.getStorageSync('userinfo'),
			urlImg: uni.getStorageSync('url')
		};
	},
	methods: {
		tp(e) {
			uni.navigateTo({
				url: e.currentTarget.dataset.url
			});
		},
		getinfo() {
			this.$request
				.request(
					{
						url: that.api.share.get_info
					} 
				)
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res);
						that.info=res;
						that.price = res.price; 
						uni.setStorageSync("ensho",res)
					}
				});
		},
		tap(e) {
			console.log(e.currentTarget.dataset.url);
			uni.navigateTo({
				url: e.currentTarget.dataset.url
			});
		}
	},
	onLoad() {
		that = this;
		let info=uni.getStorageSync("ensho"); 
		if(info){
			that.info=info;
			that.price = info.price; 
		}  
	},
	onShow() {
		that.getinfo(); 
	},
	onPullDownRefresh() {
		that.getinfo();
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
.kong {
	background: #f6f6f6;
}
.sr-title {
	font-size: 26upx;
	color: #4e4e4e;
}

.sr-money {
	font-size: 30upx;
	color: #ff2828;
	margin-top: 10upx;
}

.no-border {
	border: none !important;
}

.header {
	width: 633upx;
	height: 409upx;
	border-radius: 16upx;
	margin: auto;
	box-shadow: 0 0 20upx rgb(0, 0, 0, 0.2);
}

.name {
	font-size: 32upx;
	padding: 24upx 0upx 19upx;
}

.name image {
	margin-right: 12upx;
	width: 32upx;
	height: 32upx;
}

.position {
	font-size: 22upx;
	margin-bottom: 10upx;
}

.xian {
	padding-top: 51upx;
	border-right: solid 1upx #dcdcdc;
}

.top-cd {
	border-right: solid 1upx #dcdcdc;
	margin: 20upx 0upx;
	font-size: 25upx;
	color: #000;
}

.top-cd view image {
	width: 35upx;
	height: 35upx;
}
.header-view {
	padding: 30rpx 28rpx;
	background: #fff;
}
.card-view {
	width: 696rpx;
	height: 284rpx;
	background-color: #9c79e0;
	border-radius: 18rpx;
	color: #fff;
	padding: 58rpx 35rpx 0rpx 47rpx;
	display: flex;
	justify-content: space-between;
}
.btn {
	width: 184rpx;
	height: 68rpx;
	background-color: #ffffff;
	border-radius: 34rpx;
	font-size: 26rpx; 
}
</style>
