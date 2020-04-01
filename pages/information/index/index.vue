<template>
	<view>
		<swiper class="screen-swiper" :indicator-dots="false" :circular="f" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index" class="flex align-center  justify-center ">
				<image :src="item.url" mode="aspectFill" class="swiper-image shadow-warp"></image>
			</swiper-item>
		</swiper>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index == TabCur ? 'z-color cur ' : 'text-gray'" v-for="(item, index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
				{{ item.title }}
			</view>
		</scroll-view>

		<navigator class="guangao" open-type="navigate" url=""><image :src="guangao" mode="aspectFill"></image></navigator>

		<view class="dymlist">
			<block v-for="(item, index) in list" :key="index">
				<view class="dymview">
					<view class="dymleft">
						<view class="dy-title">{{ item.title }}</view>
						<view class="dy-subtit">{{ item.subtit }}</view>
						<view class="dydoen">
							<view>{{ item.upusername }}</view>
							<view>{{ item.uptime }}</view>
							<view>{{ item.zan }}</view>
						</view>
					</view>
					<view class="dymright"><image class="image" :src="item.pric" mode="aspectFill"></image></view>
				</view>
			</block>
		</view>

		<navigator class="up-btn" url="../up/up"><image src="/static/icon/icon-up.png"></image></navigator>
	</view>
</template>

<script>
var that;
import data from '../data.js';
export default {
	data() {
		return {
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				},
				{
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg'
				},
				{
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				},
				{
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				},
				{
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				},
				{
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				},
				{
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}
			],
			guangao: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
			TabCur: 0,
			scrollLeft: 0,
			tabList: [
				{
					id: 1,
					title: '权威发布'
				},
				{
					id: 2,
					title: '健康投稿'
				}
			],
			list: []
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		toinfo(e){
			uni.navigateTo({
				url:'../info/info'
			})
		}
	},
	onLoad() {
		that = this;
		that.list = data.list;
	}
};
</script>

<style>
.swiper-image {
	width: 682rpx;
	height: 301rpx;
	background-color: #eeeeee;
	border-radius: 18rpx;
}
.nav .cu-item {
	margin: 0upx 40upx;
}
.guangao {
	width: 650rpx;
	height: 110rpx;
	background-color: #f1f1f1;
	border-radius: 10rpx;
	overflow: hidden;
	margin: 20upx auto;
}
.guangao image {
	width: 100%;
	height: 100%;
}
.up-btn {
	width: 120rpx;
	height: 120rpx;  
	position: fixed;
	bottom: 200upx;
	right: 20upx;
}
.up-btn image{
	width: 100%;
	height: 100%;
}
</style>
