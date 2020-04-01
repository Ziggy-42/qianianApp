<template>
	<view>
		<view>
			<!-- <video class="video"></video> -->
			<!-- height: 768upx; -->
			<video class="video" :src="info.file_url" :poster="info.cover" v-if="info.file_url"></video>
			<image :src="info.cover" mode="widthFix" v-else style="width: 100%;"></image>
		</view>
		<view class="title-view">
			<view class="flex justify-between">
				<view class="price-color flex  align-center " style="font-size: 32upx;">
					￥{{ info.price ? info.price : '0.00' }} 
					<view v-if="userinfo.level == -1 || (info.is_vip_free == 1 && info.vip_discount)" style="font-size: 22upx;margin-left: 20upx;">
						(会员价格：{{ vip_price ? vip_price : '0.00' }})
					</view>
				</view>
				<view class="text-sm text-gray">{{ list.length }}节课 | 共{{ info.view ? info.view : '0' }}人观看</view>
			</view>
			<view style="font-size: 30upx; color: #232323; margin-top: 25upx;">{{ info.title }}</view>
		</view>

		<block v-if="info.is_vip_free == 2">
			<view class="kong"></view>
			<view class="bg-white" style="padding: 20upx 0upx;">
				<view class="bg-img vip-view" @tap="joinvip" :style="[{ backgroundImage: 'url(' + bg + ')' }]">
					<view>会员可免费观看视频</view>
					<!-- <view><button class="cu-btn">加入会员</button></view> -->
				</view>
			</view>
		</block>

		<view class="kong"></view>
		<view class="padding-air bg-white" style="padding: 20upx 0upx;">
			<view class="flex justify-center align-center ">
				<text class="lain"></text>
				<view style="font-size: 28upx;">视频列表</view>
				<text class="lain"></text>
			</view>
		</view>
		<view>
			<block v-for="(item, index) in list" :key="index">
				<view class="list" @tap="printVodeo" :data-index="index" :data-id="item.id" :data-src="item.file_url" >
					<view class="list-left">
						<view class="list-img"><image mode="aspectFill" :src="item.cover"></image></view>
						<view class="list-c">
							<view class="flex justify-between">
								<text>{{ item.chapter }}</text>
								<text class="time">{{ item.duration }}</text>
							</view>
							<view class="list-name text-cut ">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view style="height: 120upx;"></view>
		<block v-if="!info.is_pay">
			<!-- v-if="(userinfo.level == -1 ) || ( info.is_vip_free ==1)" -->
			<view class="foot" v-if="userinfo.level == -1 || info.is_vip_free == 1"><button class="cu-btn" @tap="buy" :data-id="info.id">立即购买</button></view>
		</block>
		<block>
			<video id="oneVideo" :src="playsrc"  class="onevideo" @fullscreenchange="fullscreenchange"  ></video>
		</block>
	</view>
</template>

<script>
var that; 
var oneVideo;
export default {
	data() {
		return {
			bg: 'https://qf.huamais.com/addons/zjhj_mall/core/web/uploads/image/store_1/51b3a0b777d4b9035ad55da9f2aa860d9551af1f.png',
			list: [],
			id: '',
			info: {},
			printinfo: {},
			prinindex: -1,
			userinfo: {},
			vip_price: 0.0,
			play:false,
			playsrc:''
		};
	},
	methods: {
		getdetail(e) {
			var that = this;
			console.log(that.id);
			that.$request
				.request({
					url: that.api.college.detail,
					data: {
						id: that.id
					}
				})
				.then(res => {
					console.log(res);
					that.info = res;
					for (var i = 0; i < res.items.length; i++) {
						res.items[i].createtime = that.formatDate(res.items[i].createtime * 1000);
					}
					that.list = res.items;
					that.vip_price = ((Number(res.vip_discount) / 100) * Number(res.price)).toFixed(2);
				});
		},
		printVodeo(e) {
			let src=e.currentTarget.dataset.src;
			if ((that.userinfo.level > -1 && that.info.is_vip_free == 2) || that.info.is_pay) {
				// uni.navigateTo({
				// 	url: '../videodetail/videodetail?id=' + e.currentTarget.dataset.id
				// });
				that.playsrc=src; 
				console.log(e);
				console.log(that.playsrc)
				oneVideo.requestFullScreen();
				setTimeout(function() {
					oneVideo.play();
				}, 1000); 
			} else {
				uni.showModal({
					title: '提示',
					content: '您需要先购买才能查看该章节',
					confirmText: '立即购买',
					success(res) {
						if (res.confirm) {
							that.buy();
						}
					}
				});
			}
		},
		fullscreenchange(e){
			console.log(e.detail.direction);
		},
		formatDate(now) {
			now = new Date(now);
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var date = now.getDate();
			return year + '-' + month + '-' + date;
		},
		buy(e) { 
			that.$request
				.request({
					url: that.api.college.pay_course_order,
					data: {
						course_id: that.id
					}
				})
				.then(res => {
					that.$pay.zwxpay(res).then(res => {
						that.getdetail();
					});
				});
		},
		joinvip() {
			uni.navigateTo({
				url: '/pages/serve/membercentre/membercentre'
			});
		}
	},
	onLoad(option) {
		that = this;
		console.log(option.id);
		that.id = option.id ? option.id : '';
		that.getdetail();
	},
	onShow(){
		that.userinfo = uni.getStorageSync('userinfo');
	},
	onReady() {
		oneVideo=uni.createVideoContext("oneVideo")
	}
};
</script>

<style>
.video {
	width: 100%;
	height: 768upx;
}

.title-view {
	padding: 40upx;
	background: #fff;
}

.vip-view {
	width: 698upx;
	height: 121upx;
	background-image: linear-gradient(86deg, #9421cf 0%, #9f78ee 100%);
	border-radius: 14upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: auto;
	font-size: 28upx;
	padding: 0upx 35upx;
	color: #fff;
}

.vip-view .cu-btn {
	width: 160upx;
	height: 51upx;
	background-color: #ffffff;
	border-radius: 26upx;
	font-size: 25upx;
	color: #a500d3;
}

.foot {
	width: 100%;
	position: fixed;
	bottom: 0;
	height: 100upx;
	display: flex;
	background: #fff;
	align-items: center;
	justify-content: center;
}

.foot .cu-btn {
	width: 662upx;
	height: 75upx;
	background-image: linear-gradient(-60deg, #9329ff 0%, #b000dd 100%);
	border-radius: 38upx;
	color: #fff;
	font-size: 28upx;
}

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
	width: 400rpx;
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

.printV {
	border: solid #a500d3 1upx;
}
.onevideo{
	position: fixed;
	top: -100%;
}
</style>
