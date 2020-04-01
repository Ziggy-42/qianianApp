<template>
	<view>
		<view class="header">
			<video :src="info.video_list[print].url" @play="play" :controls="info.video_list[print].is_look==0?'false':'true'">
				<view class="video-com" v-if="info.video_list[print].is_look==0" >
					<view class="title" >{{info.video_list[print].name}}</view>
					<view><button class="cu-btn bg-orange text-sm " style="margin-bottom: 40rpx;padding: 10rpx 30rpx;" @tap="buy">立即购买</button></view>
				</view>
			</video>
		</view>
		<view class="padding">
			<view class="title">{{ info.name ? info.name : '' }}-{{ info.title ? info.title : '' }}</view>
			<view class="desc-v">
				<text>{{ info.looks ? info.looks : '0' }}人观看</text>
				<text>共{{ info.video_count ? info.video_count : '' }}节课</text>
			</view>
		</view>
		<view class="white1"></view>
		<view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view
						class="cu-item flex-sub"
						:class="index == TabCur ? 'text-orange cur' : ''"
						v-for="(item, index) in tablist"
						:key="index"
						@tap="tabSelect"
						:data-id="index"
					>
						{{ item }}
						<block v-if="index == TabCur"></block>
					</view>
				</view>
			</scroll-view>

			<view class="padding bg-white " v-if="TabCur == 0">
				<view class="title">讲师介绍</view>
				<view class="teacher-view margin-bottom">
					<view class="cu-avatar round " :style="[{ backgroundImage: 'url(' + info.teacher.head_img + ')' }]"></view>
					<view>
						<view class="teacher-name">{{ info.teacher.name }}</view>
						<view class="teacher-desc">{{ info.teacher.desc }}</view>
					</view>
				</view>
				<!-- <view class="title">课程详情</view>
				<view class="teacher-view">
					<view class="cu-avatar round " :style="[{ backgroundImage: 'url(' + info.teacher.head_img + ')' }]"></view>
					<view>
						<view class="teacher-name">{{ info.teacher.name }}</view>
						<view class="teacher-desc">{{ info.teacher.desc }}</view>
					</view>
				</view> -->
			</view>
			<view class="padding bg-white " v-if="TabCur == 1">
				<view class="title">课程目录</view>
				<scroll-view class="class-view" scroll-x="true">
					<view class="class-li" :class="print == index ? 'print' : ''" v-for="(item, index) in info.video_list" :key="index" @tap="printVideo" :data-index="index">
						<view class="class-name">{{ item.name }}</view>
						<view>
							<text class="text-card">
								<block v-if="item.is_look == 1">可看</block>
								<block v-if="item.is_look == 0">未购买</block>
							</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<block v-if="info.is_price == 0">
			<view style="height: 110upx;"></view>
			<view class="down-view bg-white">
				<view class="flex align-center ">
					<view v-if="info.discount && info.is_discount == 1">
						<view class="f25">整学期{{ info.discount }}折（限时抢购）</view>
						<view class="f25">截至{{ info.date }}</view>
					</view>
					<text class="down-price">¥{{ info.price ? info.price : '0.00' }}</text>
				</view>
				<view><button class="cu-btn btn dong" @tap="buy">立即购买</button></view>
			</view>
		</block>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			TabCur: 1,
			scrollLeft: 0,
			tablist: ['详情', '目录'],
			clist: [{ name: '第一学期' }],
			id: '',
			info: '',
			print: 0
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		printVideo(e) {
			that.print = e.currentTarget.dataset.index;
		},
		play(e) {},
		getinfo(e) {
			that.loading = true;
			that.$request
				.request({
					url: 'index/good/getVideoClassDetail',
					data: {
						id: that.id
					}
				})
				.then(res => {
					console.log(res);
					that.info = res;
				})
				.catch(res => {
					that.loading = true;
				});
		},
		buy(e) {
			uni.navigateTo({
				url: '/pages/video/order/suborder/suborder?id=' + that.id
			});
		}
	},
	onLoad(option) {
		that = this;
		that.id = option.id ? option.id : '2';
		that.getinfo();
	}
};
</script>

<style>
.header {
	width: 100%;
	/* height: 410rpx; */
}
.header video {
	width: 100%;
	height: 100%;
}
.padding {
	padding: 25rpx;
}

.title {
	font-size: 33rpx;
	font-weight: 550;
	line-height: 80rpx;
}

.teacher-view {
	display: flex;
}

.teacher-view .cu-avatar {
	width: 120rpx;
	height: 120rpx;
	margin-right: 30rpx;
}
.teacher-view .teacher-name {
	font-size: 32rpx;
	font-weight: 550;
	margin-top: 10rpx;
	margin-bottom: 25rpx;
}
.teacher-view .teacher-desc {
	font-size: 26rpx;
	color: #9c9c9c;
}
.class-view {
	width: 710rpx;
	height: 200rpx;
	white-space: nowrap;
}
.class-li {
	width: 375rpx;
	height: 175rpx;
	display: inline-block;
	border: solid #eeeeee 1rpx;
	border-radius: 5rpx;
	margin-right: 20rpx;
	padding: 25rpx;
	margin-top: 15rpx;
}
.class-name {
	font-size: 34rpx;
	font-weight: 550;
	margin-bottom: 40rpx;
}
.text-card {
	font-size: 22rpx;
	padding: 10rpx 20rpx;
	color: #fff;
	background-color: #e2e2e2;
	border-radius: 1000rpx;
}
.print {
	border: solid #f4813d 1rpx;
}
.print .class-name {
	color: #f4813d;
}
.print .text-card {
	background-color: #f4813d;
}
.desc-v {
	font-size: 24rpx;
	color: #bcbcbc;
}
.desc-v text {
	margin-right: 40rpx;
}
.video-com{
	width: 100%; 
	text-align: center;
	color: #FFF;
	font-size: 32rpx;
	height:410rpx;
	padding-top: 90rpx;
	position: absolute;
	z-index: 999;
	background-color: rgba(0,0,0,0.6);
}
.video-com .title{
	margin-bottom: 40rpx;
}
 



</style>
