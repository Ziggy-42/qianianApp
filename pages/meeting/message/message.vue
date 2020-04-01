<template>
	<view>
		<view class="margin-top"></view>

		<view v-for="(item, index) in list" :key="index" @tap="tpinfo" :data-id="item.room_id">
			<view class="list bg-white">
				<view class="top-view">
					<view class="title" >{{ item.stuats }}</view>
					<view class="time" >{{ item.time }}</view>
				</view>
				<view class="down" >{{ item.ctime }}</view>
			</view>
		</view>

		<view v-if="!access_token">
			<nolist type="2" text="您还没有登录~~"></nolist>
			<view class="text-center margin-top "><button class="cu-btn zcolor-btn margin-top" @tap="login">去登陆</button></view>
		</view>
		<block v-else><nolist type="2" text="暂无消息" v-if="onlist"></nolist></block>
		<view style="height: 120upx;"></view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			page: 1,
			list: [
				{
					stuats: '报名成功',
					time: '2020-02-07 14:56:12',
					ctime: '你参加的XXX会务已成功报名，请查看>>'
				},
				{
					stuats: '报名成功',
					time: '2020-02-07 14:56:12',
					ctime: '你参加的XXX会务已成功报名，请查看>>'
				}
			],
			onlist: false,
			nomore: false,
			access_token: ''
		};
	},
	methods: {
		login() {
			that.$zax.yzlogin();
		},
		getlist() {
			if (that.nomore) {
				return;
			}
			that.onlist = false;
			this.$request
				.request({
					url: that.api.live.msg,
					data: {
						type: 7,
						page: that.page
					},
					Toast: '正在加载'
				})
				.then(res => {
					var list = res;
					if (list.length > 0) {
						for (let i in list) {
							let time = that.$zax.formatDate(list[i].createtime * 1000);
							console.log(time);
							list[i].creatText = time.year + '-' + time.month + '-' + time.second + ' ' + time.minute + ':' + time.hour + ':' + time.second;
						}
						console.log(list);
						(that.list = that.list.concat(list)), (that.page = that.page + 1);
					} else {
						if (that.page != 1) {
							that.nomore = true;
						} else {
							that.onlist = true;
						}
					}
				});
		},
		tpinfo(e) {
			uni.navigateTo({
				url: '/pages/liveBroadcast/livePLayer/player/player?id=' + e.currentTarget.dataset.id
			});
		}
	},
	onLoad() {
		that = this;
		// that.getlist();
	},
	onShow() {
		that.access_token = uni.getStorageSync('access_token');
	},
	onPullDownRefresh() {
		that.getlist();
	}
};
</script>

<style>
page {
	background: #f3f3f3;
}

.list {
	width: 698upx;
	height: 184upx;
	background-color: #ffffff;
	border-radius: 10upx;
	padding: 40upx;
	margin: auto;
	margin-bottom: 30upx;
}

.top-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.title{
	font-size: 30rpx; 
		color: #2f2f2f;
}
.time{
	font-size: 25rpx; 
		color: #989898;
}
.down{
		font-size: 27rpx; 
		color: #858585;
		margin-top: 30upx;
}
</style>
