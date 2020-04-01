<template>
	<view class="bg-white">
		<scroll @downrefresh="downrefresh">
			<cu-custom bgColor="" :tubei="false"><text slot="content" style="color: #FFF;">我的</text></cu-custom>
			<view class="bg-yanhong">
				<view :style="[{ height: CustomBar + 'px' }]"></view>
				<view class="header-user">
					<view
						class="user-avatar cu-avatar round"
						@tap="tpinfo"
						data-url="/pages/serve/userInfo/userInfo"
						:style="[{ backgroundImage: 'url(' + userinfo.avatar_url + ')' }]"
					>
						<view class="cu-tag badge cuIcon-vip bg-orange" style="bottom: 0px;top: auto;" v-if="userinfo.level > -1"></view>
					</view>
					<view>
						<block v-if="userinfo.access_token">
							<view class="user-name text-right" v-if="userinfo.access_token">Hi,{{ userinfo.nickname }}</view>
							<view class="user-set" @tap="tpinfo" data-url="/pages/serve/userInfo/userInfo">
								<image src="/static/mine/icon1.png" mode="widthFix"></image>
								编辑个人资料
							</view>
						</block>
						<view class="user-name text-right" v-else @tap="tpinfo" data-url="/pages/login/login">{{ userinfo.nickname }}</view>
					</view>
				</view>
			</view>

			<view style="position: relative; top: -60upx;">
				<view class="sy-view" @tap="tpinfo" data-url="/pages/earnings/earnings">
					<view class="sy-view-left">身份选择</view>
					<view class="sy-view-right"><view class="cuIcon-right"></view></view>
				</view>

				<view class=" menu-view">
					<view class="menu-title">我的订单</view>
					<view class="cu-list grid col-4 no-border order-list">
						<view class="cu-item click" v-for="(item, index) in orderlist" :key="index" @tap="tpinfo" :data-url="item.url">
							<view>
								<image class="c-icon" :src="item.icon"></image>
								<view class="cu-tag badge" v-if="item.badge != 0">
									<block>{{ item.badge > 99 ? '99+' : item.badge }}</block>
								</view>
							</view>
							<text class="text-black">{{ item.name }}</text>
						</view>
					</view>
				</view>

				<view class=" menu-view">
					<view class="menu-title">我的服务</view>
					<view class="cu-list grid col-4 no-border rmen-list">
						<view class="cu-item" v-for="(item, index) in serve" :key="index" @tap="tpinfo" :data-url="item.url">
							<view>
								<image class="c-icon" :src="item.icon"></image>
								<view class="cu-tag badge" v-if="item.badge != 0">
									<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
								</view>
							</view>
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>

				<view class="cu-list menu    shadow-lg radius">
					<view class="cu-item arrow" v-for="(item, index) in liveBdList" :key="index" @tap="tpinfo" :data-url="item.url">
						<view class="content">
							<image :src="item.icon" class="png" mode="aspectFit"></image>
							<text class="text-black">{{ item.name }}</text>
						</view>
					</view>
				</view>
				<view class="kong"></view> 
				<view class="text-center " style="padding-top: 50upx;"><button class="cu-btn  line-orange  lg  tui-btn ">退出登录</button></view>
				<!-- #ifndef MP-WEIXIN -->
				<view style="height: 80upx;"></view>
				<!-- #endif -->
			</view>
		</scroll>
	</view>
</template>

<script>
var that;
import mine from './mine.js';
export default {
	name: 'mine',
	data() {
		return {
			CustomBar: this.CustomBar,
			userinfo: {
				avatar_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
				username: '拉克丝',
				access_token: ''
			},
			bg_img: 'https://qf.huamais.com/addons/zjhj_mall/core/web/uploads/image/store_1/51b3a0b777d4b9035ad55da9f2aa860d9551af1f.png',
			money: '0.00',
			orderlist: [
				{
					cuIcon: 'cardboardfill',
					icon: '/static/mine/ordericon-02.png',
					color: 'red',
					badge: '',
					name: '待付款',
					url: '/pages/order/orderlist/orderlist?id=0'
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					icon: '/static/mine/ordericon-01.png',
					badge: '',
					name: '待发货',
					url: '/pages/order/orderlist/orderlist?id=1'
				},
				{
					cuIcon: 'picfill',
					icon: '/static/mine/ordericon-03.png',
					color: 'yellow',
					badge: '',
					name: '待收货',
					url: '/pages/order/orderlist/orderlist?id=2'
				},
				{
					cuIcon: 'noticefill',
					icon: '/static/mine/ordericon-04.png',
					color: 'olive',
					badge: '',
					name: '售后',
					url: '/pages/order/orderlist/orderlist?id=4'
				}
			],
			serve: [],
			liveBdList: [],
			price: {},
			access_token: ''
		};
	},
	methods: {
		tpinfo(e) {
			if (that.userinfo.access_token) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				});
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		},
		getordernum() {
			let pagemien = uni.getStorageSync('pagemien');
			let order_count = pagemien.order_count;
			let orderlist = that.orderlist;
			orderlist[0]['badge'] = order_count.status_0 ? order_count.status_0 : '0';
			orderlist[1]['badge'] = order_count.status_1 ? order_count.status_1 : '0';
			orderlist[2]['badge'] = order_count.status_2 ? order_count.status_2 : '0';
			orderlist[3]['badge'] = '0';
		},
		getuserinfo() {
			that.$zax.userinfo().then(res => {
				console.log(res);
				that.userinfo = res.user_info;
				that.getordernum();
				uni.stopPullDownRefresh();
			});
		},
		getmoney() {
			this.$request.request({
				url: that.api.share.get_info,
				success(res) {
					console.log(res);
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						that.price = res.price;
						uni.setStorageSync('ensho', res);
					}
				}
			});
		}
	},
	//#ifndef MP-WEIXIN
	created() {
		that = this;
		that.serve = mine.servelist;
		that.liveBdList = mine.liveBdList;
		that.userinfo = uni.getStorageSync('userinfo');
		that.getuserinfo();
	},
	//#endif
	//#ifdef MP-WEIXIN
	onLoad(option) {
		that = this;
		that.serve = mine.servelist;
		that.liveBdList = mine.liveBdList;
		that.getuserinfo();
	},
	onShow() {
		that.userinfo = uni.getStorageSync('userinfo');
	},
	onPullDownRefresh() {
		that.getuserinfo();
	}
	//#endif
};
</script>

<style>
page {
	background: #fff;
}
.header-user {
	width: 100%;
	height: 270upx;
	background-image: linear-gradient(-22deg, #ee9743 0%, #fc4355 48%, #f85150 74%, #f35e4a 100%);
	display: flex;
	color: #fff;
	padding: 55upx;
	justify-content: space-between;
}
.user-avatar {
	width: 130upx;
	height: 130upx;
	margin-right: 24upx;
}
.user-name {
	font-size: 30upx;
	color: #ffffff;
	margin-top: 15upx;
	font-size: 40rpx;
	color: #fefefe;
}
.user-set {
	height: 50upx;
	border-radius: 25upx;
	font-size: 24upx;
	color: #ffffff;
	line-height: 50upx;
	margin-top: 15upx;
	display: flex;
	align-items: center;
}
.user-set image {
	width: 24upx;
	height: 28upx;
	margin-right: 15upx;
}
.user-set text {
	margin-right: 10upx;
}

.sy-view {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 698upx;
	height: 134upx;
	background-color: #ffffff;
	border-radius: 20upx;
	margin: auto;
	padding: 0upx 45upx;
	border: solid 1rpx #e5e5e5;
}
.sy-view .sy-view-left {
	display: flex;
	align-items: center;
	font-size: 30upx;
	color: #292929;
}
.sy-view .sy-view-left image {
	width: 52upx;
	height: 40upx;
	margin-right: 24upx;
}
.sy-view .sy-view-right {
	display: flex;
	align-items: center;
	font-size: 34upx;
	color: #bfbfbf;
}
.sy-view .sy-view-right .sy-view-mone {
	font-size: 32upx;
	color: #9322cf;
	margin-right: 20upx;
	font-weight: 550;
}

.menu-view {
	width: 698upx;
	margin: auto;
	border-radius: 20upx;
	overflow: hidden;
	margin-top: 20upx;
	background: #fff;
	border: solid 1rpx #e5e5e5;
}
.menu-title {
	font-size: 28upx;
	color: #212121;
	font-weight: 550;
	padding-left: 30upx;
	height: 70upx;
	overflow: hidden;
	line-height: 110upx;
}
.vip-view {
	width: 698upx;
	height: 121upx;
	background-image: linear-gradient(86deg, #9421cf 0%, #9f78ee 100%);
	border-radius: 14upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: auto;
	font-size: 28upx;
	margin-top: 20upx;
	padding: 0upx 35upx;
	color: #fff;
}
.vip-view .cu-btn {
	height: 51upx;
	background-color: #ffffff;
	border-radius: 26upx;
	font-size: 25upx;
	color: #a500d3;
}

/*  */
.order-list .c-icon {
	width: 50upx;
	height: 50upx;
}
.rmen-list .c-icon {
	width: 70upx;
	height: 70upx;
}

.cu-list.menu > .cu-item {
	height: 120upx;
	padding-left: 54upx;
}
.cu-list.menu > .cu-item .content > image {
	margin-right: 26upx;
	width: 50rpx;
	height: 50rpx;
}
.cu-list.menu > .cu-item .content {
	display: flex;
	align-items: center;
	font-size: 28upx;
	color: #1e1e1e;
}
.tui-btn {
	width: 570rpx;
	height: 72rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	border: solid 2rpx #ff2424;
	font-size: 28rpx;
	color: #f8270c;
}
</style>
