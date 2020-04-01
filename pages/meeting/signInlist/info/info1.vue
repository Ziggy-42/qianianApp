<template>
	<view>
		<view class="card-view">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>
					<text class=" text-bold ">XX会务</text>
				</view>
			</view>  
			<view class="down-view">
				<view class="text-view">
					<image class="icon" src="/static/icon/icon-time.png" mode="widthFix"></image>
					<text>时间：2020-02-07 15：30</text>
				</view>
				<view class="text-view">
					<image class="icon" src="/static/icon/icon-time.png" mode="widthFix"></image>
					<text>网址：https://huiwu.com</text>
				</view>
				<view class="text-view">
					<image class="icon" src="/static/icon/icon-time.png" mode="widthFix"></image>
					<text>账号：ghjsggbbhh</text>
				</view>
				<view class="text-view">
					<image class="icon" src="/static/icon/icon-time.png" mode="widthFix"></image>
					<text>密码：qngy1234</text>
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
	background-color: #ffffff;
	border-radius: 20upx;
	margin: auto;
	margin-top: 35upx;
	overflow: hidden;
	padding: 20upx 0upx; 
}
.qrcode {
	width: 348rpx;
	height: 347rpx;
	margin: 30upx auto;
}
.text-view {
	width: 100%; 
	color: #2f2f2f;
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
	padding: 0upx 40upx 20upx;
	line-height: 70upx;
	font-size: 30rpx;
	color: #2f2f2f;
}
</style>
