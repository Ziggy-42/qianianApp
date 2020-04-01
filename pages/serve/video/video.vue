<template>
	<view>
		<view class="kong"></view>
		<view class="video-list" v-for="(item, index) in list" :key="index" @tap="tpinfo" :data-id="item.course_id">
			<view class="video-img-view">
				<image class="video-img" :src="item.course.cover" mode="aspectFill"></image>
				<image class="video-play" src="/static/icon/icon-play.png"></image>
			</view>
			<view class="video-down">
				<view class="video-name">{{ item.course.title }}</view>
				<view class="video-dview">
					<view>{{item.course.itemSum.total?item.course.itemSum.total:'0'}}节课</view>
					<view>查看>></view>
				</view>
			</view>
		</view>
		<uni-load-more :status="lodstatus" v-if="lodstatus"></uni-load-more>
		<nolist text="暂无视频"  v-if="nolist" ></nolist>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			list: [],
			lodstatus: '',
			page: 1,
			nolist:false
		};
	},
	methods: {
		tpinfo(e) {
			uni.navigateTo({
				url: './infoList/infoList?course_id='+e.currentTarget.dataset.id
			});
		},
		getlist(e) {
			let page = that.page;
			that.lodstatus = 'loading';
			that.nolist=false;
			that.$request
				.request({
					url: that.api.college.course_video_list,
					method: 'get',
					data: {
						page: page
					}
				})
				.then(res => {
					let list = res;
					if (page == 1) {
						that.list = list;
						that.page++; 
						list.length==0?(that.lodstatus = '',that.nolist=true):(list.length>10?that.lodstatus = 'more':that.lodstatus = '')
					} else {
						if (list.length > 0) {
							that.list = that.list.concat(list);
							that.page++;
							that.lodstatus = 'more'; 
						} else {
							that.lodstatus = 'noMore';
							that.nolist=true 
						}
					}
					uni.hideLoading();
					uni.stopPullDownRefresh();
				});
		}
	},
	onLoad() {
		that = this;
		that.getlist();
	},
	onPullDownRefresh() {
		that.page=1;
		that.getlist();
	}
};
</script>

<style>
page {
	background: #fff;
}
.video-list {
	width: 696rpx;
	height: 430rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	border: solid 1rpx #e5e5e5;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
	margin: auto;
	margin-top: 20rpx;
	overflow: hidden;
}
.video-img-view {
	width: 100%;
	height: 268rpx;
	background-color: #eeeeee;
	position: relative;
}
.video-img-view .video-img {
	width: 100%;
	height: 100%;
}
.video-img-view .video-play {
	width: 71rpx;
	height: 71rpx;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
.video-down {
	padding: 30rpx;
}
.video-name {
	font-size: 30rpx;
	font-weight: 550;
	color: #232323;
}
.video-dview {
	display: flex;
	justify-content: space-between;
	font-size: 24rpx;
	color: #a4a4a4;
	margin-top: 30rpx;
}
</style>
