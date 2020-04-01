<template>
	<view>
		<view class="header-user">
			<view class="user-avatar cu-avatar round" @tap="tpinfo" data-url="/pages/login/login" :style="[{ backgroundImage: 'url(' + userinfo.avatar + ')' }]"></view>
			<view>
				<view class="user-name">{{ userinfo.name }}</view>
			</view>
		</view>
		<view class=" " style="position: relative; top: -60rpx;" @tap="tpshoplist">
			<view class="sy-view" @tap="tpinfo" data-url="/pages/earnings/earnings">
				<view class="sy-view-left">
					<image src="/static/icon/icon-shop.png" mode="widthFix"></image>
					博主橱窗
				</view>
				<view class="sy-view-right">
					<view class="sy-view-mone">{{ userinfo.goodsCount.total ? userinfo.goodsCount.total : '0' }}件商品</view>
					<view class="cuIcon-right"></view>
				</view>
			</view>
		</view>

		<view class="list" style="margin-top: -40upx;">
			<block v-for="(item, index) in list" :key="index">
				<view class="list-view" @tap="tpinfo" :data-index="index" :data-id="item.id" :data-status="item.status">
					<image class="list-viewbg" :src="item.cover" mode="aspectFill"></image>
					<view class="ven-view ">
						<view class="cu-capsule round ">
							<view class="cu-tag bg-poporetopo ">
								<text v-if="item.status == 0">未知</text>
								<text v-if="item.status == 1">直播中</text>
								<text v-if="item.status == 2">预告中</text>
								<text v-if="item.status == 3">直播结束</text>
							</view>
							<view class="cu-tag bg-lokong" v-if="item.status == 1">{{ item.total_online ? item.total_online : '0' }}观看</view>
						</view>
						<view style="height: 300upx;"></view>
						<view class="text-cut text-white" style="margin-bottom: 30upx;font-size: 26upx;">{{ item.title }}</view>

						<view class="ven-down justify-between">
							<view class="flex align-center">
								<view class="ven-down-avatar  cu-avatar round" :style="[{ backgroundImage: 'url(' + userinfo.avatar + ')' }]"></view>
								<view class="ven-down-name text-cut ">{{ userinfo.name }}</view>
							</view>
							<view class="flex align-center">
								<view class="ven-down-xin"><image src="/static/liveBroadcast/dianzan.png" mode="widthFix"></image></view>
								<view class="ven-down-num">{{ item.like }}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			page: 1,
			id: '',
			userinfo: '',
			list: []
		};
	},
	methods: {
		tpinfo(e) {
			let id = e.currentTarget.dataset.id;
			let status = e.currentTarget.dataset.status;
			let url = '';
			switch (status) {
				case 1:
					url = '/pages/liveBroadcast/livePLayer/player/player?id=' + id;
					break;
				case 2:
					url = '/pages/liveBroadcast/yugaoInfo/yugaoInfo?id=' + id;
					break;
				case 3:
					url = '/pages/liveBroadcast/livedetail/livedetail?id=' + id;
					break;
			}
			uni.navigateTo({
				url: url
			});
		},
		getinfo() {
			that.$request
				.request({
					url: that.api.live.blogger,
					data: {
						page: that.page,
						user_id: that.id
					}
				})
				.then(res => {
					console.log(res);
					that.userinfo = res.blogger;
					that.list = res.live_log;
					console.log(that.userinfo);
					console.log(that.list);
				});
		},
		tpshoplist() {
			uni.navigateTo({
				url: '../goodslist/goodslist?id=' + that.id
			});
		}
	},
	onLoad(option) {
		that = this;
		that.id = option.id ? option.id : '';
		that.getinfo();
	}
};
</script>

<style>
.header-user {
	width: 100%;
	height: 320rpx;
	background-image: linear-gradient(0deg, #9a5ddf 0%, #9d7ae0 100%);
	color: #fff;
	padding: 55rpx;
	text-align: center;
}
.user-avatar {
	width: 130rpx;
	height: 130rpx;
	margin-right: 24rpx;
}
.user-name {
	font-size: 30rpx;
	color: #ffffff;
	margin-top: 15rpx;
}
.user-set {
	width: 232rpx;
	height: 50rpx;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 25rpx;
	font-size: 23rpx;
	color: #ffffff;
	line-height: 50rpx;
	padding: 0rpx 20rpx;
	margin-top: 15rpx;
}
.user-set text {
	margin-right: 10rpx;
}

.sy-view {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 698rpx;
	height: 134rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	margin: auto;
	padding: 0rpx 45rpx;
}
.sy-view .sy-view-left {
	display: flex;
	align-items: center;
	font-size: 30rpx;
	color: #292929;
}
.sy-view .sy-view-left image {
	width: 52rpx;
	height: 40rpx;
	margin-right: 24rpx;
}
.sy-view .sy-view-right {
	display: flex;
	align-items: center;
	font-size: 34rpx;
	color: #bfbfbf;
}
.sy-view .sy-view-right .sy-view-mone {
	font-size: 32rpx;
	color: #9322cf;
	margin-right: 20rpx;
	font-weight: 550;
}

.menu-view {
	width: 698rpx;
	margin: auto;
	border-radius: 20rpx;
	overflow: hidden;
	margin-top: 20rpx;
	background: #fff;
}
.menu-title {
	font-size: 28rpx;
	color: #212121;
	font-weight: 550;
	padding-left: 30rpx;
	height: 70rpx;
	overflow: hidden;
	line-height: 110rpx;
}
.vip-view {
	width: 698rpx;
	height: 121rpx;
	background-image: linear-gradient(86deg, #9421cf 0%, #9f78ee 100%);
	border-radius: 14rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: auto;
	font-size: 28rpx;
	margin-top: 20rpx;
	padding: 0rpx 35rpx;
	color: #fff;
}
.vip-view .cu-btn {
	height: 51rpx;
	background-color: #ffffff;
	border-radius: 26rpx;
	font-size: 25rpx;
	color: #a500d3;
}

/*  */
.order-list .c-icon {
	width: 50rpx;
	height: 50rpx;
}
.rmen-list .c-icon {
	width: 70rpx;
	height: 70rpx;
}

.list {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 30upx;
}
.list-view {
	width: 335upx;
	height: 510upx;
	background-color: #eeeeee;
	border-radius: 16upx;
	overflow: hidden;
	position: relative;
	margin-bottom: 20upx;
}
.ven-view {
	position: absolute;
	top: 0upx;
	width: 100%;
	height: 100%;
	padding: 15upx;
	background: rgba(0, 0, 0, 0.1);
}
.list-viewbg {
	width: 100%;
	height: 100%;
}
.ven-view .cu-capsule {
	font-size: 21upx;
}
.ven-down {
	display: flex;
	align-items: center;
}
.ven-down-avatar {
	width: 64upx;
	height: 64upx;
	margin-right: 10upx;
}
.ven-down-name {
	width: 100upx;
	font-size: 24upx;
	color: #fffefe;
	/* border: solid #000 1upx; */
}
.ven-down-xin {
	width: 40upx;
	height: 40upx;
	margin-right: 10upx;
}
.ven-down-num {
	width: 60upx;
	font-size: 23upx;
	color: #fffefe;
	/* border: solid #000 1upx; */
}

.texty {
	font-size: 32upx;
	color: #999999;
}

.tab-action {
	font-size: 38rpx;
	color: #2f2f2f;
}

.tab-action .nav-bottom {
	width: 37upx;
	height: 10upx;
	background-color: #b701e5;
	border-radius: 115upx;
	margin: auto;
}

.nav .cu-item {
	line-height: 35px;
}

.meg-view {
	text-align: center;
	font-size: 20upx;
	position: relative;
}
.meg-view image {
	width: 32upx;
	height: 30upx;
}

/* .search-view {
	width: 407upx;
	height: 58upx;
	border-radius: 29upx;
} */
</style>
