<template>
	<view>
		<view class="kong"></view>
		<block v-for="(item, index) in list" :key="index">
			<view class="list" @tap="tpinfo" :data-id="item.id" :data-src="item.file_url">
				<view class="list-left">
					<view class="list-img"><image mode="aspectFill" :src="item.cover"></image></view>
					<view class="list-c">
						<view>
							{{ item.chapter }}
							<text class="time">{{ item.duration }}</text>
						</view>
						<view class="list-name text-cut ">{{ item.name }}</view>
					</view>
				</view>
				<view class="list-right">观看>></view>
			</view>
		</block>
		<block><video id="oneVideo" :src="playsrc" class="onevideo" @fullscreenchange="fullscreenchange"></video></block>
	</view>
</template>

<script>
var that;
var oneVideo;
export default {
	data() {
		return {
			list: [],
			page: 1,
			course_id: '',
			play: false,
			playsrc: ''
		};
	},
	methods: {
		getlist(e) {
			that.$request
				.request({
					url: that.api.college.course_detail,
					data: {
						course_id: that.course_id
					},
					method: 'get'
				})
				.then(res => {
					let list = res;
					that.list = list;
				});
		},
		tpinfo(e) {
			let src = e.currentTarget.dataset.src;
			that.playsrc = src;
			console.log(e);
			console.log(that.playsrc);
			oneVideo.requestFullScreen();
			setTimeout(function() {
				oneVideo.play();
			}, 1000);

			// uni.navigateTo({
			// 	url:'/pages/academy/videodetail/videodetail?id='+e.currentTarget.dataset.id
			// })
		},
		fullscreenchange(e) {
			console.log(e.detail.direction);
		}
	},
	onLoad(option) {
		that = this;
		that.course_id = option.course_id ? option.course_id : '8';
		that.getlist();
	},
	onReady() {
		oneVideo = uni.createVideoContext('oneVideo');
	}
};
</script>

<style>
.list {
	height: 195rpx;
	padding: 0rpx 50rpx 0rpx 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fffefe;
	border-bottom: solid #eeeeee 1rpx;
}
.list-left {
	display: flex;
	align-items: center;
}

.list-img {
	width: 244rpx;
	height: 131rpx;
	background-color: #eeeeee;
	border-radius: 12rpx;
	overflow: hidden;
	margin-right: 27rpx;
}
.list-img image {
	width: 100%;
	height: 100%;
}

.list-right {
	font-size: 28rpx;
	color: #a500d3;
}
.list-c {
	width: 300rpx;
	font-size: 27rpx;
	color: #292929;
}
.time {
	font-size: 24rpx;
	color: #a8a8a8;
	margin-left: 24rpx;
}
.list-name {
	margin-top: 38rpx;
}
.onevideo{
	position: fixed;
	top: -100%;
}
</style>
