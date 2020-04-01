<template>
	<view>
		<view class="bg-yanhong">
			<view :style="{ height: CustomBar + 'px' }"></view>
			<cu-custom bgColor="" :tubei="false" :isBack="true"><text slot="content" style="color: #FFF;">报告</text></cu-custom>
			<view class="text-center top-view " style="height: 370upx;">
				<view class="fenshu">90</view>
				<view class="xtit">本次得分</view>
			</view>
		</view>

		<view class="card-view">
			<view class="title">测试解读：</view>
			<view class="comment">解读内容，如，血糖高说明什么问题，有可能导致什么情况，血糖低说明什么问题，有可能导致什么情况。</view>
		</view>
		<view class="card-view">
			<view class="title">专家建议：</view>
			<view class="comment">根据测试内容显示您的血糖偏高或偏低，建议您平时多运动，少XXX，注意饮食要清淡。少量多餐。</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			CustomBar: this.CustomBar
		};
	},
	methods: {}
};
</script>

<style>
page {
	background: #fff;
}
.bg-yanhong {
	background-image: linear-gradient(-22deg, #ee9743 0%, #fc4355 48%, #f85150 74%, #f35e4a 100%);
}
.top-view {
	padding-top: 60upx;
}
.top-view .fenshu {
	font-size: 135rpx;
	color: #ffffff;
}
.xtit {
	font-size: 27rpx;
	line-height: 102rpx;
	color: #ffffff;
}

.card-view {
	width: 695upx;
	background-color: #ffffff;
	border-radius: 18upx;
	border: solid 1upx #e5e5e5;
	margin: auto;
	margin-top: 30upx;
	overflow: hidden;
	padding: 40upx;
}
.card-view .title {
	font-size: 30rpx;
	line-height: 60rpx;
	color: #2c2c2c;
}
.card-view .comment {
	font-size: 28rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 45rpx;
	letter-spacing: 0rpx;
	color: #878787;
	text-align: justify;
}
</style>
