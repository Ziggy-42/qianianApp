<template>
	<view>
		<view style="position: fixed;width: 100%;">
			<view class="kong"></view>
			<scroll-view scroll-x class="bg-white nav" style="border-bottom: solid #eeeeee 1upx;">
				<view class="flex text-center">
					<view class="cu-item flex-sub tab " :class="item.id == TabCur ? 'action' : ''" v-for="(item, index) in tab" :key="index" @tap="tabSelect" :data-id="item.id">
						{{ item.title }}
						<view class="down-solid"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="height: 120rpx;"></view>
		<view>
			<view class=" lsit-item flex justify-between align-center bg-white " v-for="(item, index) in list" :key="index">
				<view class="">
					<view class="title-type">
						<block v-if="item.status==1">
							待审核
						</block>
						<block v-if="item.status==2">
							审核通过已打款
						</block>
						<block v-if="item.status==3">
							驳回
						</block>
	
					</view>
					<view class="time-text">{{ item.createtime }}</view>
				</view>
				<view class="money-text"> 
					{{ item.price }}
				</view>
			</view>
		</view>

		<nolist type="2" text="暂无相关记录!" v-if="nolist"></nolist>
		<block v-else><uni-load-more :status="lodstatus" v-if="lodstatus != 'more'"></uni-load-more></block>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			TabCur: 1,
			scrollLeft: 0,
			list: [],
			tab: [
				{
					id: 1,
					title: '待审核'
				},
				{ id: 2, title: '提现通过' },
				{ id: 3, title: '驳回' }
			],
			page: 1,
			nolist: false,
			nomore: false,
			lodstatus: ''
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			that.page = 1;
			that.list = [];
			that.getlist();
		},
		getlist(i) {
			if (that.nomore) {
				return;
			}
			that.lodstatus = 'loading';
			that.nolist = false;
			this.$request
				.request({
					url: that.api.anchor_order.cash_log,
					data: {
						type: that.TabCur,
						page: that.page
					}
				})
				.then(res => {
					console.log(res);
					that.lodstatus = '';
					if (res.length > 0) {
						that.list = that.list.concat(res);
						that.page = that.page + 1;
						that.lodstatus = 'more';
					} else {
						if (that.page != 1) {
							that.nomore = true;
							that.lodstatus = 'noMore';
						} else {
							that.nolist = true;
						}
					}
				});
		}
	},
	onLoad() {
		that = this;
		that.getlist(1);
	},
	onReachBottom() {
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
	background: #ffffff;
}

.margin-top {
	margin-top: 21upx;
}

.lsit-item {
	height: 148upx;
	padding: 0upx 51upx;
	border-bottom: solid 1upx #efefef;
}

.title-type {
	font-size: 30upx;
	font-weight: 550;
	margin-bottom: 20upx;
}

.time-text {
	color: #b3b2b2;
	font-size: 24upx;
}

.money-text {
	font-size: 36upx;
	color: #ff3030;
}

.nav .cu-item {
	height: 80rpx;
	line-height: 80rpx;
}
.tab {
	color: #8b8b8b;
}
.cu-item .down-solid {
	width: 102rpx;
	height: 5rpx;
	background-color: #b701e5;
}
.action {
	font-size: 28rpx;
	color: #b701e5;
}
.action .down-solid {
	background-color: #b701e5;
	margin: auto;
	position: relative;
	top: -10rpx;
}
</style>
