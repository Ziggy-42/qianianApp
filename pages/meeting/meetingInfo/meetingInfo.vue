<template>
	<view>
		<view class="top"><image :src="imgurl" mode="aspectFill"></image></view>

		<view class="bg-white padding-bottom">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>
					<text class="">会务名称</text>
				</view>
			</view>
			<view class="cont" style="line-height: 60upx;">
				<view class="smtext">
					<image class="icon" src="/static/icon/icon-time.png"></image>
					<view>时间：2020-03-10 15:20</view>
				</view>
				<view class="smtext">
					<image class="icon" src="/static/icon/icon-time.png"></image>
					<view>地址：上海市闵行区虹梅南路124号</view>
				</view>
			</view>
		</view>
		<view class="kong"></view>
		<view class="bg-white padding-bottom">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>
					<text class="">会务简介</text>
				</view>
			</view>
			<view class="cont wenzi ">上海会务简介，此次会务的目的，规模，主要针对方向，文字简单描述。上海会务简介，此次会务的目的，规模，主要针对方向，文字简单描述。</view>
		</view>

		<view class="kong"></view>
		<view class="bg-white padding-bottom">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>
					<text class="">现场报道</text>
				</view>
			</view>

			<view class="grid flex-sub padding-lr " :class="imglist.length > 2 ? 'col-3 grid-square' : 'col-1'" v-if="bao">
				<view
					class="bg-img"
					:class="imglist.length > 2 ? '' : 'only-img'"
					:style="{ backgroundImage: 'url(' + item + ')' }"
					v-for="(item, index) in imglist"
					:key="index"
				></view>
			</view>

			<view class="flex align-center justify-center  text-gray " style="height: 250upx;" v-else>会务暂未开始，报名火热进行中</view>
		</view>

		<view style="height: 120upx;"></view>

		<view class=" cu-btn btn bg-blue ">我要报名</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgurl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
			imglist: [
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
			],
			bao: false
		};
	},
	methods: {}
};
</script>

<style>
.top {
	width: 100%;
	height: 380rpx;
	background-color: #f0f0f0;
}
.top image {
	width: 100%;
	height: 100%;
}
.cont {
	padding: 0upx 40upx;
}
.wenzi {
	font-size: 27rpx;
	line-height: 46rpx;
	color: #898989;
}
.btn {
	width: 100%;
	height: 95rpx;
	position: fixed;
	bottom: 0;
}
</style>
