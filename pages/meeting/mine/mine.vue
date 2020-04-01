<template>
	<view>
		<view class="scrollPage">
			<cu-custom><text slot="content" style="color: #FFFFFF;">我的</text></cu-custom>
			<view class="bg-gradual-green UCenter-bg">
				<image src="/static/logo.png" class="png" mode="widthFix"></image>
				<view class="username">名字</view>
			</view>

			<view class="rv-view">
				<view class="rv-btn"><image src="/static/logo.png"></image></view>
				<view class="rv-btn"><image src="/static/logo.png"></image></view>
			</view>

			<view class="cu-list menu   margin-bottom shadow-lg radius">
				<!-- <view class="cu-item arrow" v-for="(item,index) in tablist" :key="index">
					<navigator class="content" url="/pages/about/test/list" hover-class="none">
						<text class="cuIcon-creativefill text-orange"></text>
						<text class="text-grey">Bug测试</text>
					</navigator>
				</view> -->
				<view class="cu-item arrow" v-for="(item, index) in tablist" :key="index" @tap="arrowClick" :data-url="item.url"  :data-type="item.type" >
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-black">{{ item.name }}</text>
					</view>
				</view>
			</view>

			<view class="cu-tabbar-height"></view>
		</view>
		<tabview :tablist="downList"></tabview>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			downList: [
				{
					url: '/pages/meeting/index/index',
					name: '会务报名'
				},
				{
					url: '/pages/meeting/mine/mine',
					name: '我的'
				}
			],
			tablist: [
				{
					icon: '/static/mine/serveIcon01.png',
					name: '消息',
					url: '/pages/meeting/message/message'
				}, 
				{
					icon: '/static/mine/serveIcon01.png',
					name: '会务签到',
					url: '/pages/meeting/signInlist/signInlist'
				},
				{
					icon: '/static/mine/serveIcon01.png',
					name: '兑换礼品',
					url: '/pages/goods/goodsList/goodsList'
				},
				{
					icon: '/static/mine/serveIcon01.png',
					name: '扫一扫',
					url: '/pages/goods/goodsList/goodsList'
				},
				{
					icon: '/static/mine/serveIcon01.png',
					name: '个人信息',
					url: '/pages/goods/goodsList/goodsList'
				}
			]
		};
	},
	methods: {
		arrowClick(e){
			let url=e.currentTarget.dataset.url;
			let type=e.currentTarget.dataset.type;
			uni.navigateTo({
				url:url
			})
		}
	},
	onLoad() {
		that = this;
	}
};
</script>

<style>
page {
	background: #fff;
}
.UCenter-bg {
	display: flex;
	justify-content: center;
	padding-top: 40upx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	height: 496upx;
	background-image: linear-gradient(-41deg, #60b5fe 0%, #0088fe 100%);
}
.username {
	font-size: 32upx;
	color: #ffffff;
	font-weight: 550;
}
.UCenter-bg .png {
	width: 150upx;
	height: 150upx;
	border-radius: 1000upx;
	margin-bottom: 30upx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100upx;
}
.rv-view {
	padding: 30upx 40upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.rv-view .rv-btn image {
	width: 329upx;
	height: 146upx;
	border-radius: 14upx;
}

.cu-list.menu > .cu-item {
	height: 120upx;
	padding-left: 54upx;
}
.cu-list.menu > .cu-item .content > uni-image {
	margin-right: 26upx;
	width: 35rpx;
	height: 34rpx;
}
.cu-list.menu > .cu-item .content {
	display: flex;
	align-items: center;
	font-size: 30upx;
}
</style>
