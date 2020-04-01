<template>
	<view class="bg-white">
		<!-- <cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">排行榜</block>
		</cu-custom> -->
		<view class="white"> </view>
		<view class="bg-white padding-top" style="position: relative;">
			<view class="text-center">
				<image src="/static/img/icon/bck-03.png" mode="widthFix" style="width: 697upx; height: 257upx;"></image>
			</view>
			<view class="top-view cu-list grid col-3 no-border align-center" style=" background: rgba(0,0,0,0); position: absolute;top: 30upx;left: 0upx;right: 0upx;margin:auto;">
				<view>
					<view class="text-num">{{mytop}}</view>
					<view class="text-title">排名</view>
				</view>
				<view>
					<view>
						<view class="cu-avatar round" :style="[{ backgroundImage: 'url(' +  list[mytop-1].avatar_url  + ')' }]"></view>
					</view>
					<view class="name" style="margin-top: 10upx;">{{list[mytop-1].nickname}}</view>
				</view>
				<view>
					<view class="text-num">{{list[mytop-1].team_count}}</view>
					<view class="text-title">团队人数</view>
				</view>
			</view>
		</view>
		<view class="list-view bg-white">
			<view class="top-list bg-gray grid col-4 no-border align-center text-center">
				<view>排名</view>
				<view>头像</view>
				<view>姓名</view>
				<view>团队人数</view>
			</view>
			<view class="list bg-white grid col-4 align-center text-center" v-for="(item,index) in list" :key="index">
				<view class="rank">{{index+1}}</view>
				<view>
					<view class="cu-avatar round   sm-avatar " :style="[{ backgroundImage: ' url(' + item.avatar_url + ')' }]"></view>
				</view>
				<view>{{item.nickname}}</view>
				<view>{{item.team_count}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				mytop: 2,
				tx: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
				list: [],
				page: 1,
				imgUrl: wx.getStorageSync("url")
			};
		},
		methods: {
			getlist() {
				this.$request
					.get({
							url: 'api/share/top-list',
							data: {
								page: that.page
							}
						},
						'正在加载'
					)
					.then(res => {
						if (res.code == 1) {
							this.$alert(res.msg);
						} else {
							console.log(res.data);
							that.list = that.list.concat(res.data.userList);
							that.mytop = res.data.mytop;
							that.page = that.page + 1;
							that.pageCount = res.data.pageCount;
							that.avatar();
						}
					});
			},
			avatar() {
				for (let i = 0; i < that.list.length; i++) {
					console.log(that.list[i]);
					if (that.list[i].avatar_url.search("http") == -1) {
						that.list[i].avatar_url = that.imgUrl + that.list[i].avatar_url;
					}
				}
			}
		},
		onLoad() {
			that = this;
			that.getlist();
		},
		onPullDownRefresh() {
			that.list = [];
			that.page = 1;
			that.getlist(1);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	};
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.top-view {
		width: 697upx;
		height: 257upx;
		background-color: #ffd100;
		border-radius: 16upx 16upx 0px 0px;
		background: url(/static/img/icon/bck-03.png);
		background-size: 100% 100%;
		margin: auto;
	}

	.cu-avatar {
		width: 100upx;
		height: 100upx;
	}

	.text-num {
		font-size: 36upx;
		font-weight: 550;
	}

	.text-title {
		font-size: 26upx;
	}

	.name {
		font-size: 30upx;
		color: #9a5904;
	}

	.top-list {
		font-size: 26upx;
		height: 86upx;
	}

	.list {
		font-size: 24upx;
		height: 110upx;
		border-bottom: solid 2upx #eeeeee;
	}

	.rank {
		font-size: 28upx;
	}

	.sm-avatar {
		width: 62upx;
		height: 62upx;
	}

	.list-view {
		width: 656upx;
		margin: -20upx auto 0upx;
		box-shadow: 0upx 10upx 20upx rgba(0, 0, 0, 0.3);
		border-radius: 0upx 0upx 16upx 16upx;
		overflow: hidden;
	}
</style>
