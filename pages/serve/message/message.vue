<template>
	<view>
		<view class="margin-top"></view>

		<view v-for="(item, index) in list" :key="index" @tap="tpinfo" :data-id="item.room_id">
			<view class="text-center padding" v-if="item.creatText">
				<text class="bttitle">{{ item.creatText?item.creatText:'' }}</text>
			</view>
			<view class="list bg-white">
				<view class="anchor-view ">
					<view class="cu-avatar round " :style="[{ backgroundImage: 'url(' + item.anchor.avatar + ')' }]"></view>
					<view>{{ item.anchor.name }}的直播已开始，快去看看吧！</view>
				</view>
				<view class="li-bottom">
					<view>查看详情</view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>

		<view v-if="!access_token">
			<nolist type="2" text="您还没有登录~~"></nolist>
			<view class="text-center margin-top "><button class="cu-btn zcolor-btn margin-top" @tap="login">去登陆</button></view>
		</view>
		<block v-else><nolist type="2" text="暂无消息" v-if="onlist"></nolist></block>
		<view style="height: 120upx;" ></view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			page: 1,
			list: [],
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
						for(let i in list){
							let time=that.$zax.formatDate(list[i].createtime*1000);
							console.log(time);
							list[i].creatText=time.year+'-'+time.month+'-'+time.second+' '+time.minute+':'+time.hour+':'+time.second
						};
						console.log(list);
						that.list = that.list.concat(list),
						that.page = that.page + 1;
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
		that.getlist();
	},
	onShow() {
		that.access_token=uni.getStorageSync("access_token");
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

.bttitle {
	background: #d1d1d5;
	color: #ffffff;
	padding: 10upx 20upx;
	border-radius: 5upx;
	font-size: 24upx;
}

.list {
	width: 685upx;
	/* height: 499upx; */
	margin: auto;
	border-radius: 4upx;
}

.li-top {
	padding: 35upx 47upx;
}

.title {
	font-size: 28upx;
	font-weight: 550;
}

.li-top .type {
	margin-top: 40upx;
	margin-bottom: 30upx;
	font-size: 26upx;
}

.price {
	margin-bottom: 70upx;
	font-size: 42upx;
	font-weight: 550;
}

.t-view {
	font-size: 26upx;
	color: #656565;
	height: 70upx;
	/* border: solid #000000 1upx; */
	line-height: 70upx;
}

.li-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 27upx;
	padding: 0upx 50upx;
	height: 100upx;
	border-top: solid 1upx #e4e4e4;
}
.anchor-view {
	display: flex;
	align-items: center;
	height: 140upx;
	padding: 0upx 40upx;
	font-size: 28upx;
}
.anchor-view .cu-avatar {
	width: 64upx;
	height: 64upx;
	margin-right: 20upx;
}
</style>
