<template>
	<view>
		<view class="kong"></view> 
		<view class="video-list1">
			<view class="video-view" v-for="(item, index) in list" :key="index" @tap="tpinfo" :data-id="item.id">
				<view class="video-img-view">
					<image class="video-img" :src="item.cover" mode="aspectFill"></image>
					<image class="video-play" src="/static/icon/icon-play.png"></image>
				</view>
				<view class="video-down">
					<view class="video-name text-cut">{{ item.title }}</view>
					<view class="ftitle">{{item.count}}节课 | 共{{item.view}}人观看</view>
					<view class="price-color price">￥{{item.price}}</view> 
				</view>
			</view>
		</view>
		<nomore v-if="nomore" text="没有更多了"></nomore>
		<nolist type="0" text="暂无视频" v-if="nolist"></nolist>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			list: [],
			id:'',
			type:'',
			page:1,
			nolist: false,
			nomore: false
		};
	},
	methods: {
		tpinfo(e) {
			uni.navigateTo({
				url: '/pages/academy/videoInfo/videoInfo?id='+e.currentTarget.dataset.id
			});
		},
		getlist(){
			that.$request.request({
				url:that.api.college.list,
				data:{
					class_id:that.id,
					type:that.type,
					page:that.page
				}
			}).then(res=>{
				console.log('列表:', res);
				if (res.length > 0) {
					var list = res;
					that.list = that.list.concat(list);
					that.page = that.page + 1;
				} else {
					if (that.page != 1) {
						if (!that.nomore) {
							that.$alert('没有更多了!');
							that.nomore = true;
						}
					} else {
						that.nolist = true;
					}
				}
				that.$forceUpdate();
			})
		}
	},
	onLoad(option){
		console.log(option);
		that=this
		that.id=option.id?option.id:''
		that.type=option.type?option.type:''
		that.getlist();
	},
	onPullDownRefresh() {
		
	},
	onReachBottom() {
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
