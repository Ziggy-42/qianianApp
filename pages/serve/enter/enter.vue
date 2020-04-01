<template>
	<view>
		<view class="kong"></view>
		<view class="title">请选择入驻身份</view>
		<view class="view">
			<image src="/static/image/mch-bg.png" mode="widthFix" @tap="tpinfo" data-url="/pages/mch/enter/enter"></image>
			<image src="/static/image/zb-bg.png" mode="widthFix" @tap="tpinfo" data-url="/pages/liveBroadcast/enter/enter"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		tpinfo(e) {
			uni.navigateTo({
				url: e.currentTarget.dataset.url
			});
		}
	},
	onLoad() {}
};
</script>

<style>
page {
	background: #fff;
}

.view {
	text-align: center;
}
.view image {
	width: 611upx;
	height: 214upx;
	margin-bottom: 61upx;
	border-radius: 24upx;
}
.title {
	line-height: 170upx;
	padding-left: 78upx;
	font-size: 36upx;
	color: #2c2c2c;
}
</style>
