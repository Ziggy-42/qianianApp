<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<cu-custom bgColor="bg-white" :tubei="true"><block slot="content">素材库</block></cu-custom>
		<!-- #endif -->
		<view :style="{ height: windowHeight - CustomBar + 'px' }">
			<scroll @downrefresh="downrefresh">
				<view class="kong"></view>
				<scroll-view scroll-x class="bg-white nav text-center">
					<view class="cu-item" :class="index == TabCur ? 'orange cur' : ''" v-for="(item, index) in tablist" :key="index" @tap="tabSelect" :data-id="index">
						{{ item.title }}
					</view>
				</scroll-view>

				<view class=" " v-if="TabCur == 0">
					<block v-if="comment.length > 0" v-for="(item, index) in comment" :key="index">
						<view class="sc-list bg-white">
							<view class="sc-left"><view class="cu-avatar" :style="[{ backgroundImage: 'url(' + item.avatar_url + ')' }]"></view></view>
							<view class="sc-view">
								<view class="top-userInfo">
									<view>
										<view class="user-name">{{ item.nickname }}</view>
										<view class="pl-time">{{ item.addtime }}</view>
									</view>
									<view><button class="cu-btn fq-btn ">一键发圈</button></view>
								</view>
								<view>
									<view class="comment-text">{{ item.comment }}</view>
									<view class="grid flex-sub col-3 grid-square">
										<view class="bg-img" :style="[{ backgroundImage: 'url(' + item + ')' }]" v-for="(item, index) in item.pic_list" :key="index"></view>
									</view>

									<view class="goods-view" @tap="tpinfo" :data-id="item.id">
										<view class="goods-img"><image :src="item.goods.pic" mode="aspectFill" lazy-load="true" style="width: 100%;height: 100%;"></image></view>
										<view class="goods-down">
											<view class="goods-name text-cut goods-hdown ">{{ item.goods.name ? item.goods.name : '' }}</view>
											<view class="goods-dview goods-hdown">
												<view class="goods-price">￥{{ item.goods.price ? item.goods.price : '' }}</view>
												<view class="old-price">￥{{ item.goods.old_price ? item.goods.old_price : '' }}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>

				<view class=" " v-if="TabCur == 1">
					<block v-if="comment.length > 0" v-for="(item, index) in comment" :key="index">
						<view class="sc-list bg-white">
							<view class="sc-left"><view class="cu-avatar" :style="[{ backgroundImage: 'url(' + item.avatar_url + ')' }]"></view></view>
							<view class="sc-view">
								<view class="top-userInfo">
									<view>
										<view class="user-name">{{ item.nickname }}</view>
										<view class="pl-time">{{ item.addtime }}</view>
									</view>
									<view><button class="cu-btn fq-btn ">一键发圈</button></view>
								</view>
								<view>
									<view class="comment-text">{{ item.comment }}</view>

									<view class="bg-img sc-video" :style="{ backgroundImage: 'url(' + item.video.pic + ')' }">
										<view class="videonv"><image src="/static/icon/icon-play.png"></image></view>
									</view>

									<view class="goods-view" @tap="tpinfo" :data-id="item.id">
										<view class="goods-img"><image :src="item.goods.pic" mode="aspectFill" lazy-load="true" style="width: 100%;height: 100%;"></image></view>
										<view class="goods-down">
											<view class="goods-name text-cut goods-hdown ">{{ item.goods.name ? item.goods.name : '' }}</view>
											<view class="goods-dview goods-hdown">
												<view class="goods-price">￥{{ item.goods.price ? item.goods.price : '' }}</view>
												<view class="old-price">￥{{ item.goods.old_price ? item.goods.old_price : '' }}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>

				<view style="height: 120upx;"></view>
			</scroll>
		</view>
	</view>
</template>

<script>
var that;
import data from '../data.js';
import scroll from '../../../components/scroll/scroll.vue';
export default {
	name: 'material',
	data() {
		return {
			CustomBar: this.CustomBar,
			windowHeight: this.windowHeight,
			TabCur: 1,
			scrollLeft: 0,
			tablist: [
				{
					id: 0,
					title: '图文'
				},
				{
					id: 1,
					title: '短视频'
				}
			],
			comment: [
				{
					avatar_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					nickname: '喜羊羊',
					addtime: '2020.10.10',
					pic_list: [
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/2edbc550c459e272c04c60b2bd42c4c4293a5e7c.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/5262e780c471656228554d3d8d7071fee8afd83e.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/6479fdc63992e2b388265bb1e9d894006c0b40ae.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/704d05b7b8e804c0158a7487ac161f8d532c22ce.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/4f71a994df97c1d5da73f7b758805ce939787bd8.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg'
					],
					video: {
						pic: 'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg'
					},
					comment: '很快就收到了，昨天点上试了一下，很不错，喜欢！很快就收到了，昨天点上试了一下，很不错，喜欢！很快就收到了，昨天点上试了一下，很不错，喜欢！',
					goods: {
						pic: 'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg',
						name: '艾草堂 艾绒  加送点火器',
						price: 88.2,
						old_price: 100.0
					}
				},
				{
					avatar_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					nickname: '喜羊羊',
					addtime: '2020.10.10',
					pic_list: [
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/2edbc550c459e272c04c60b2bd42c4c4293a5e7c.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/5262e780c471656228554d3d8d7071fee8afd83e.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/6479fdc63992e2b388265bb1e9d894006c0b40ae.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/704d05b7b8e804c0158a7487ac161f8d532c22ce.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/4f71a994df97c1d5da73f7b758805ce939787bd8.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg'
					],
					video: {
						pic: 'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg'
					},
					comment: '',
					goods: {
						pic: 'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg',
						name: '艾草堂 艾绒  加送点火器',
						price: 88.2,
						old_price: 100.0
					}
				},
				{
					avatar_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					nickname: '喜羊羊',
					addtime: '2020.10.10',
					pic_list: [
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/2edbc550c459e272c04c60b2bd42c4c4293a5e7c.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/5262e780c471656228554d3d8d7071fee8afd83e.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/6479fdc63992e2b388265bb1e9d894006c0b40ae.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/704d05b7b8e804c0158a7487ac161f8d532c22ce.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/4f71a994df97c1d5da73f7b758805ce939787bd8.jpg',
						'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg'
					],
					video: {
						pic: 'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg'
					},
					comment: '很快就收到了，昨天点上试了一下，很不错，喜欢！',
					goods: {
						pic: 'http://os1.caiguohouzi.net/web/uploads/image/store_1/5261beb521b679a414f092e4a3aa9270aa045a55.jpg',
						name: '艾草堂 艾绒  加送点火器',
						price: 88.2,
						old_price: 100.0
					}
				}
			]
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		downrefresh() {}
	},
	// #ifndef MP-WEIXIN
	created() {
		that = this;
	},
	// #endif
	// #ifdef MP-WEIXIN
	onLoad() {
		that = this;
	},
	onPullDownRefresh() {}
	// #endif
};
</script>

<style>
.sc-list {
	display: flex;
	padding: 30upx 0upx;
	border-bottom: solid #eee 1upx;
}
.sc-list .sc-left {
	width: 148upx;
	height: 110upx;
	display: flex;
	justify-content: flex-end;
}
.sc-list .sc-view {
	width: 554upx;
}
.sc-list .sc-left .cu-avatar {
	width: 110upx;
	height: 110upx;
	border-radius: 1000upx;
}
.sc-view .top-userInfo {
	height: 110upx;
	display: flex;
	align-items: center;
	padding-left: 20upx;
	display: flex;
	justify-content: space-between;
}
.sc-view .top-userInfo .user-name {
	font-size: 28upx;
	color: #1d1d1d;
}
.sc-view .top-userInfo .pl-time {
	font-size: 25upx;
	color: #a7a7a7;
	margin-top: 10upx;
}
.fq-btn {
	width: 166upx;
	height: 56upx;
	background-image: linear-gradient(266deg, #ff8657 0%, #f52c1c 100%);
	border-radius: 28upx;
	font-size: 26upx;
	color: #ffffff;
}
.sc-view .comment-text {
	font-size: 28upx;
	line-height: 44upx;
	color: #2e2e2e;
	padding-bottom: 20upx;
}
.sc-view .sc-video {
	width: 327rpx;
	height: 327rpx;
	margin-bottom: 20upx;
}
.sc-view .sc-video .videonv {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
}
.sc-view .sc-video .videonv image {
	width: 77rpx;
	height: 77rpx;
}

.goods-view {
	background-color: #eeeeee;
	display: flex;
	padding: 17upx 12upx;
}
.goods-view .goods-img {
	width: 162upx;
	height: 162upx;
	margin-right: 15upx;
}
.goods-view .goods-down {
	height: 162upx;
	flex: 1;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	flex-direction: column;
	padding: 20upx 0upx;
}
.goods-view .goods-down .goods-name {
	font-size: 28rpx;
	color: #262626;
}
.goods-view .goods-down .goods-dview {
	display: flex;
}

.goods-view .goods-down .goods-price {
	font-size: 30rpx;
	color: #ff0101;
	margin-right: 40upx;
}
.goods-view .goods-down .old-price {
	font-size: 26rpx;
	line-height: 38rpx;
	color: #9a9a9a;
}

.goods-view .goods-down .goods-hdown {
	width: 100%;
	line-height: 40upx;
	height: 40upx;
}
.orange {
	color: #ff4e1e;
}
.nav .cu-item {
	margin: 0 15upx;
}
</style>
