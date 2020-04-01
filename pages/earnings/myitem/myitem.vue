<template>
	<view>
		<view style="height: 100%;" >
			<view class="kong"></view>
			<view class="header">
				<scroll-view scroll-x class="bg-white nav solid-top">
					<view class="flex text-center">
						<view class="cu-item flex-sub tab" :class="0 == TabCur ? 'c-tab' : ''" @tap="tabSelect" data-id="0"><text>直推好友</text></view>
						<view class="cu-item flex-sub tab" :class="1 == TabCur ? 'c-tab' : ''" @tap="tabSelect" data-id="1"><text>扩散好友</text></view>
					</view>
				</scroll-view>
			</view>
  

			<swiper :current="TabCur" circular="false" style="height: calc(100%-16upx-100upx);" @change="getselect">
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="getalllist"> 
						<view class="white"></view>
						<view class="bg-white">
							<view class="list flex  align-center text-center text-gray">
								<view class="basis-10">序号</view>
								<view class="basis-xs">头像</view>
								<view class="basis-xs">昵称</view>
								<view class="basis-30">电话</view>
							</view>
							<view class="list flex  align-center text-center" v-for="(item, index) in alllist" :key="index">
								<view class="basis-10">{{ index + 1 }}</view>
								<view class="basis-xs">
									<view class="cu-avatar round margin-left sm-avatar " :style="[{ backgroundImage: ' url(' + item.avatar_url + ')' }]"></view>
								</view>
								<view class="basis-xs">{{ item.nickname }}</view>
								<view class="basis-30">{{ item.time }}</view>
								<view class="basis-xs">{{ item.child_count }}</view>
							</view>
						</view>
						<view style="height: 50upx;"></view>
						<nolist type="5" text="您的团队还没有人" v-if="noall"></nolist>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="getzlist"> 
						<view class="white"></view>
						<view class="bg-white">
							<view class="list flex  align-center text-center text-gray">
								<view class="basis-10"></view>
								<view class="basis-xs">头像</view>
								<view class="basis-xs">姓名</view>
								<view class="basis-30">加入时间</view>
								<view class="basis-xs">团队人数</view>
							</view>
							<view class="list flex  align-center text-center" v-for="(item, index) in zlist" :key="index">
								<view class="basis-10">{{ index + 1 }}</view>
								<view class="basis-xs">
									<view class="cu-avatar round margin-left sm-avatar " :style="[{ backgroundImage: ' url(' + item.avatar_url + ')' }]"></view>
								</view>
								<view class="basis-xs">{{ item.nickname }}</view>
								<view class="basis-30">{{ item.time }}</view>
								<view class="basis-xs">{{ item.child_count }}</view>
							</view>
						</view>
						<view style="height: 50upx;"></view>
						<nolist type="5" text="您的团队还没有人" v-if="nozlist"></nolist>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			TabCur: 0,
			tx: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
			lsit: [],
			iheight: '',
			page: 1,
			page1: 1,
			alllist: [],
			zlist: [],
			allnomore: false,
			noall: false,
			znomore: false,
			nozlist: false,
			first: 0,
			second: 0
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
		},
		getselect(e) {
			this.TabCur = e.detail.current;
		},
		// 获取全部团队列表
		getalllist() {
			if (that.allnomore) {
				return;
			}
			that.noall = false;
			this.$request
				.get(
					{
						url: 'api/share/get-team',
						data: {
							page: that.page,
							status: 0
						}
					},
					'正在加载'
				)
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res);
						that.first = res.data.first;
						that.second = res.data.second;
						if (res.data.list.length > 0) {
							that.alllist = that.alllist.concat(res.data.list);
							that.page = that.page + 1;
							console.log(that.alllist);
						} else {
							if (that.page == 1) {
								that.noall = true;
							}
							that.allnomore = true;
						}
					}
				});
		},
		getzlist() {
			if (that.znomore) {
				return;
			}
			that.nozlist = false;
			this.$request
				.get(
					{
						url: 'api/share/get-team',
						data: {
							page: that.page1,
							status: 1
						}
					},
					'正在加载'
				)
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res);
						if (res.data.list.length > 0) {
							that.zlist = that.zlist.concat(res.data.list);
							that.page1 = that.page1 + 1;
						} else {
							if (that.page1 == 1) {
								that.nozlist = true;
							}
							that.znomore = true;
						}
					}
				});
		}
	},
	onLoad() {
		that = this;
		that.getalllist();
		that.getzlist();
		uni.getSystemInfo({
			success(res) {
				console.log('asjd:', res);
				that.iheight = res.windowHeight;
			}
		});
	},
	onPullDownRefresh() {
		that.alllist = [];
		that.page = 1;
		that.zlist = [];
		that.page1 = 1;
		that.getalllist();
		that.getzlist();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style>
page {
	background: #ffffff;
	height: 100%;
	overflow: hidden;
}

.header {
	width: 100%; 
	z-index: 999;
}

.tab {
	font-size: 28upx;
	color: #333333;
}

.c-tab text {
	font-weight: 550;
	border-bottom: solid #ffd100 8upx;
	padding: 21upx;
}

.no-border {
	border: none !important;
}

.basis-10 {
	flex-basis: 10%;
}

.basis-30 {
	flex-basis: 30%;
}

.list {
	height: 102upx;
	border-bottom: solid #e2e2e2 2upx;
}

.sm-avatar {
	width: 62upx;
	height: 62upx;
}
</style>
