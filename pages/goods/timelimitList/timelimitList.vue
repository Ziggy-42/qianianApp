<template>
	<view>
		<view class="padding-air ">
			<view class="goods-li1 bg-white " v-for="(item, index) in list" :key="index" @tap="toinfo" :data-id="item.id">
				<view class=" bg-img img flex justify-center align-center" :style="[{ backgroundImage: 'url(' + item.cover_pic + ')' }]">
					<view class="img-nview flex align-center justify-center" v-if="item.time == 'false'"><view style="font-weight: 550;font-size: 30upx;">已结束</view></view>
					<block v-else>
						<view class="img-nview">
							<view class="time-title">距离结束还剩{{ item.time ? item.time.day : '00' }}天</view>
							<view class="flex justify-center align-center">
								<view class="time-view">{{ item.time ? item.time.h : '00' }}</view>
								:
								<view class="time-view">{{ item.time ? item.time.m : '00' }}</view>
								:
								<view class="time-view">{{ item.time ? item.time.s : '00' }}</view>
							</view>
						</view>
					</block>
				</view>
				<view class="goods-info">
					<view class="goode-name text-cut">{{ item.name }}</view>
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<text class="price">￥{{ item.price }}</text>
							<text class="old-price">￥{{ item.original_price }}</text>
						</view>
						<view><button class=" cu-btn play-btn">立即购买</button></view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="lodstatus" v-if="lodstatus"></uni-load-more>
	</view>
</template>

<script>
var that;
var iendtime;
export default {
	data() {
		return {
			list: [],
			page: 1,
			nolist: false,
			nomore: false,
			lodstatus: ''
		};
	},
	methods: {
		toinfo(e) {
			uni.navigateTo({
				url: '/pages/goods/goodsInfo/goodsInfo?gid=' + e.currentTarget.dataset.id
			});
		},
		getlist() {
			that.lodstatus = 'loading';
			this.$request.request({
				url: that.api.default.ms_list,
				data: {
					page: that.page
				},
				success(res) {
					let list = res.list;
					if (list.length > 0) {
						that.list = that.list.concat(list);
						that.page = that.page + 1;
						that.lodstatus = 'more';
						that.list.length == 0 ? (that.nolist = true) : (that.nolist = false);
						list.length == 0 ? ((that.lodstatus = ''), (that.nolist = true)) : list.length > 10 ? (that.lodstatus = 'more') : (that.lodstatus = '');
					} else {
						if (that.page != 1) {
							that.nomore = true;
							that.lodstatus = 'noMore';
						} else {
							that.nolist = true;
						}
					}
					that.etime();
				}
			});
		},
		// 倒计时
		etime() {
			iendtime = setInterval(function() {
				var list = that.list;
				var thistime = Math.round(new Date().getTime() / 1000);
				// console.log(thistime);
				for (let i = 0; i < list.length; i++) {
					// console.log("下标:",list[i].date_end);
					var endtime = list[i].date_end;
					var sytime = endtime - thistime;
					if (sytime < 0) {
						list[i]['time'] = 'false';
					} else {
						var day = parseInt(sytime / 86400);
						var h = parseInt((sytime % 86400) / 3600);
						var m = parseInt(((sytime % 86400) % 3600) / 60);
						var s = ((sytime % 86400) % 3600) % 60;
						let time = {
							day: day,
							h: h < 10 ? '0' + h : h,
							m: m < 10 ? '0' + m : m,
							s: s < 10 ? '0' + s : s
						};
						list[i]['time'] = time;
						that.list = list;
						that.$forceUpdate();
					}
				}
			}, 1000);
		}
	},
	onLoad() {
		that = this;
	},
	onShow() {
		that.getlist();
	},
	onHide() {
		clearTimeout(iendtime);
	}
};
</script>

<style>
page {
	background: #eee;
}
.padding-air {
	padding: 35upx;
}
.img {
	height: 332upx;
	background-size: cover;
	position: relative;
}
.img-nview {
	width: 332upx;
	height: 168upx;
	background: rgba(255, 255, 255, 0.6);
	color: #000;
	text-align: center;
	font-size: 30upx;
}
.time-view {
	width: 36upx;
	height: 36upx;
	background-color: #353535;
	line-height: 36upx;
	text-align: center;
	color: #ffffff;
	margin: 0upx 10upx;
	font-size: 23upx;
}
.time-title {
	margin-top: 43upx;
	margin-bottom: 18upx;
}
.tag {
	font-size: 22upx;
	background-color: #ffd100;
	padding: 5upx 14upx;
}
.price {
	font-size: 36upx;
	color: #ff4040;
	font-weight: 550;
}
.old-price {
	font-size: 28upx;
	margin: 0upx 40upx 0upx 30upx;
}
.goode-name {
	font-size: 32upx;
	color: #3a3a3a;
	font-weight: 550;
	padding: 15upx 0upx;
}
.goods-conten {
	font-size: 27upx;
}
.goods-li1 {
	border-radius: 12upx;
	border: solid 2upx #e6e6e6;
	overflow: hidden;
	margin-bottom: 34upx;
}
.goods-info {
	padding: 30upx 40upx;
}
.play-btn {
	height: 60upx;
	font-size: 26upx;
	background-image: linear-gradient(-60deg, #ff4c29 0%, #ff7155 100%);
	border-radius: 28upx;
	color: #fff;
}
</style>
