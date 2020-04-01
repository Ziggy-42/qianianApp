<template>
	<view>
		<view class="kong"></view>
		<view class="info-title">关于30岁的养生之道啊圣诞节分厘卡士大夫吉安卡罗</view>
		<view class="user-view">
			<view class="flex align-center">
				<image class="avatar" src="../../../static/SJ-LotteryDraw/SJ-LotteryDraw.png"></image>
				<view>张建军</view>
			</view>
			<view>来源：转发XXX/原创</view>
			<view>2020-02-17 15:32</view>
		</view>
		
		

		<view class="commentView">
			<view class="com-view"><text>​ 食补养生是一种态度它只潜伏在聪明人，​食补养生是一种态度它只潜伏在聪明人​食补养，生是一种态度它只潜伏在聪明人。</text></view>
			<view class="com-view"><image :src="img" mode="widthFix"></image></view>
			<view class="com-view"><text>​ 食补养生是一种态度它只潜伏在聪明人，​食补养生是一种态度它只潜伏在聪明人​食补养，生是一种态度它只潜伏在聪明人。</text></view>
		</view>

		<view style="height: 120upx;"></view>
		<view class="down-view solids-top ">
			<view class="btn">
				<text class="cuIcon-attention icon "></text>
				1254
			</view>
			<view class="btn">
				<text class="cuIcon-appreciatefill icon"></text>
				123
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
		};
	},
	methods: {}
};
</script>

<style>
.info-title {
	padding: 35upx;
	font-size: 42upx;
	color: #292929;
}
.user-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0upx 40upx;
	font-size: 24upx;
	color: #949494;
}
.user-view .avatar {
	width: 58upx;
	height: 58upx;
	margin-right: 15upx;
}

.commentView {
	padding: 0upx 33upx;
	text-align: justify;
	font-size: 30upx;
	color: #424242;
	line-height: 52upx;
}
.commentView image {
	width: 100%;
}
.commentView .com-view {
	margin: 40upx 0upx;
}
.down-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 110upx;
	position: fixed;
	width: 100%;
	bottom: 0;
}
.down-view .btn {
	flex: 1;
	height: 110upx;
	line-height: 110upx;
	font-size: 25rpx;
	color: #424242;
	text-align: center;
}
.down-view .btn .icon{
	font-size: 30upx;
	margin-right: 15upx;
}
</style>
