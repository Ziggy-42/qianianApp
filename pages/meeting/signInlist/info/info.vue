<template>
	<view>
		<view class="card-view">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>
					<text class=" text-bold ">XX会务</text>
				</view>
			</view>
			<view class="text-center">
				<view><image src="/static/logo.png" class="qrcode"></image></view>
				<view class="text-gray  " style="font-size: 26upx;">出示二维码签到</view>
			</view>
			<view class="solid-view"></view>
			<view class="down-view">
				<view class="text-view">
					<image class="icon" src="/static/icon/icon-time.png" mode="widthFix"></image>
					<text>时间：2020-02-07 15：30</text>
				</view>
				<view class="text-view">
					<image class="icon" src="/static/icon/icon-time.png" mode="widthFix"></image>
					<text>上海是闵行区虹梅南路124号</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
.card-view {
	width: 698upx;
	height: 803upx;
	background-color: #ffffff;
	border-radius: 20upx;
	margin: auto;
	margin-top: 35upx;
	overflow: hidden;
}
.qrcode {
	width: 348rpx;
	height: 347rpx;
	margin: 30upx auto;
}
.text-view {
	width: 100%;
	font-size: 24upx;
	color: #535353;
	display: flex;
	align-items: center;
}
.text-view .icon {
	width: 30upx;
	height: 30upx;
	margin-right: 25upx;
}
.solid-view {
	height: 60upx;
	border-bottom: #eee dashed 1upx;
}
.down-view {
	padding: 40upx;
	line-height: 60upx;
	font-size: 28rpx;
	color: #2f2f2f;
}
</style>
