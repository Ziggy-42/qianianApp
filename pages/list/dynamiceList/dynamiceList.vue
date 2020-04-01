<template>
	<view>
		<view class="bg-white margin-top text-center" style="padding: 30upx 0upx 26upx;">
			<view class="text-block">{{ cclass.long_title }}</view>
			<view class="text-gray">{{ cclass.description }}</view>
		</view>
		<view class="goods-padding">
			<view class=" grid col-2 margin-bottom text-center">
				<view>
					<view class="goods-item " v-if="index % 2 == 0" v-for="(item, index) in list" :key="index">
						<view class="goods-view bg-white ">
							<view class="grid-square" @tap="toinfo" :data-id="item.id" style="position: relative;">
								<!-- <view class="bg-img flex justify-center align-center" :style="[{ backgroundImage: 'url(' +item.thumb+ ')' }]">
								</view> -->
								<image :src="item.thumb" lazy-load="true" mode="widthFix" style="width: 100%;"></image>
								<image v-if="item.video_url" class="icon-play" src="/static/img/icon/video-play.png" style=""></image>
							</view>
							<view class="goods-name" @tap="toinfo" :data-id="item.id">{{ item.title }}</view>
							<view class="flex justify-between goods-padding-sm">
								<view class=" flex align-center justify-start">
									<view class="cu-avatar sm round" :style="[{ backgroundImage: 'url(' + item.user.avatar_url + ')' }]"></view>
									<text class="text-sm nickname margin-left-sm text-cut">{{ item.user.nickname }}</text>
								</view>
								<view class="text-right goods-zan basis-sm flex align-center justify-end" @tap="dolike" :data-index="index" :data-id="item.id">
									<image src="/static/img/icon/shoucang.png" mode="widthFix" v-if="item.is_like == 0"></image>
									<image src="/static/img/icon/shoucang-cur.png" v-if="item.is_like == 1"></image>
									<text class="text-sm margin-left-sm">赞</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view>
					<view class="goods-item" v-if="index % 2 == 1" v-for="(item, index) in list" :key="index">
						<view class="goods-view bg-white ">
							<view class="grid-square" @tap="toinfo" :data-id="item.id" style="position: relative;">
								<!-- <view class="bg-img flex justify-center align-center" :style="[{ backgroundImage: 'url(' +item.thumb+ ')' }]">
								</view> -->
								<image :src="item.thumb" lazy-load="true" mode="widthFix" style="width: 100%;"></image>
								<image v-if="item.video_url" class="icon-play" src="/static/img/icon/video-play.png" style=""></image>
							</view>
							<view class="goods-name" @tap="toinfo" :data-id="item.id">{{ item.title }}</view>
							<view class="flex justify-between goods-padding-sm">
								<view class="flex  align-center justify-start ">
									<view class="cu-avatar sm round" :style="[{ backgroundImage: 'url(' + item.user.avatar_url + ')' }]"></view>
									<text class="text-sm margin-left-sm nickname text-cut">{{ item.user.nickname }}</text>
								</view>
								<view class="text-right goods-zan basis-sm flex align-center justify-end" @tap="dolike" :data-index="index" :data-id="item.id">
									<image src="/static/img/icon/shoucang.png" mode="widthFix" v-if="item.is_like == 0"></image>
									<image src="/static/img/icon/shoucang-cur.png" v-if="item.is_like == 1"></image>
									<text class="text-sm margin-left-sm">赞</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			list: [],
			c_id: '',
			page: 1,
			latitude: 34.753963,
			lngitude: 113.674755,
			urlImg: '',
			cclass: ''
		};
	},
	methods: {
		getlist() {
			that = this;
			var list = that.list;
			if (that.page != 1) {
				console.log(that.pageCount < that.page);
				if (that.pageCount < that.page) {
					if (!that.nomore) {
						that.$alert('没有更多了！');
						that.nomore = true;
					}
					return;
				}
			}
			this.$request
				.post({
					url: 'api/dynamice/list',
					data: {
						latitude: that.latitude,
						lngitude: that.lngitude,
						page: that.page,
						cate_id: that.c_id
					}
				})
				.then(res => {
					console.log(res);
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						if (res.data.list.length > 0) {
							that.list = list.concat(res.data.list);
							that.pageCount = res.data.page_count;
							that.page = that.page + 1;
						} else {
							if (!that.page == 1) {
								if (!that.nomore) {
									that.$alert('没有更多了！');
									that.nomore = true;
								}
							}
						}
					}
				});
		},
		toinfo(e) {
			uni.navigateTo({
				url: '/pages/dynamice/dynamice?id=' + e.currentTarget.dataset.id
			});
		},
		dolike(e) {
			that = this;
			this.$request
				.post({
					url: 'api/dynamice/like',
					data: {
						did: e.currentTarget.dataset.id,
						type: 0
					}
				})
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						this.$alert(res.msg);
						var list = that.list;
						list[e.currentTarget.dataset.index]['is_like'] = list[e.currentTarget.dataset.index]['is_like'] == 0 ? 1 : 0;
						that.list = list;
					}
				});
		}
	},
	onLoad(option) {
		that = this;
		let cclass = option.cclass ? JSON.parse(option.cclass) : '';
		that.cclass = cclass;
		that.c_id = cclass.id;
		that.urlImg = uni.getStorageSync('url');
		uni.setNavigationBarTitle({
			title: cclass.title
		});
		that.getlist();
	},
	onshow() {
		this.OverflowButton.getInstance().hide();
	},
	onReachBottom() {
		that.getlist();
	}
};
</script>

<style>
.text-block {
	font-size: 35upx;
	height: 45upx;
	line-height: 45upx;
	font-family: '黑体';
	color: #333;
}

.text-gray {
	font-size: 25upx;
	line-height: 33upx;
	font-family: '黑体';
	color: #999;
	padding: 10upx 40upx;
}

.margin-top {
	margin-top: 20upx;
}

.no-border {
	border: none !important;
}

.goods-item .grid-square view {
	height: 311upx;
}

.goods-padding {
	padding: 10upx;
}

.goods-item {
	padding: 7.5upx;
}

.goods-view {
	border-radius: 10upx;
	overflow: hidden;
}

.find-padding {
	padding: 15upx;
}

.find-item {
	padding: 15upx;
}

.find-view {
	overflow: hidden;
	border-radius: 10upx;
	border: solid 1px #e6e4e4;
}

.find-item .grid-square view {
	height: 200upx;
}

.goods-name {
	font-size: 27upx;
	padding: 20upx 35upx;
	text-align: left;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	/* min-height: 100upx; */
}

.cu-avatar.sm {
	width: 46upx;
	height: 46upx;
	font-size: 1em;
}

.margin-left-sm {
	margin-left: 14upx;
}

.goods-zan image {
	width: 30upx;
	height: 28upx;
}

.goods-zan {
	font-size: 22upx;
}

.goods-padding-sm {
	padding: 0upx 25upx 20upx 25upx;
}

.tab_view {
	font-size: 28upx;
}

.icon-play {
	width: 80upx;
	height: 80upx;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}

.tab-action {
	font-size: 34upx;
	font-weight: 600;
	font-stretch: normal;
	color: #333333;
	border-bottom: solid #ffd100 8upx;
}

.screen-swiper {
	height: 375upx;
}

.flind-bottom {
	padding: 20upx 25upx 19upx;
}

.flind-bottom image {
	width: 36upx;
	height: 36upx;
}

.mine_header {
	border-bottom: solid 2px #f5f5f5;
}

.mine_header .cu-avatar.xl {
	width: 107upx;
	height: 107upx;
}

.mine_header .cu-avatar {
	margin-left: 50upx;
}

.user-name {
	font-size: 28upx;
	line-height: 107upx;
	color: #333333;
}

.cuard-view .mine-goods-bottom {
	padding: 20upx 30upx 20upx;
}

.cuard-view .c-title {
	font-size: 28upx;
	color: #282828;
	padding: 25upx 30upx 20upx;
}

.cuard-view .col-1 .img {
	height: 233upx;
}

.cu-card > .cu-item {
	margin: 0upx 48upx 22px;
	box-shadow: 0 0 20upx rgba(0, 0, 0, 0.2);
}

.cu-bar .search-form {
	height: 52upx;
	font-size: 22upx;
}

.find-fbiao {
	width: 255upx;
	height: 136upx !important;
	background-color: rgba(255, 255, 255, 0.7);
	color: #000000;
	font-size: 27upx;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	font-weight: 550;
}

.bg-img {
	position: relative;
}


.nickname{
	width: 150upx;
	text-align: left;
}
</style>
