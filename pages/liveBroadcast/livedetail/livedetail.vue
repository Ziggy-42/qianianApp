<template>
	<view>
		<view class="top">
			<view class="top_img" style="height: 85%;" >
				<video class="video" :poster="info.detail.cover" :src="info.detail.file_url" v-if="info.detail.file_url" style="width: 100%;height: 100%; " ></video>
				<image :src="info.detail.cover" v-else style="width: 100%;height: 100%; " mode="aspectFill" ></image>
			</view>
			<view class="flex justify-center align-center img_bot">
				<view class="bg-white shadow  b_all">
					<view class="b_icon">
						<image src="/static/liveBroadcast/camera.png"></image>
						<text>{{ info.detail.duration }}</text>
					</view>
					<text class="b_time">{{ start_time }} - {{ end_time }}</text>
				</view>
			</view>
		</view>

		<view class="title flex" style="padding: 36upx 45upx;border-bottom: 1upx solid #eee;">
			<view class="l_icon" style="margin-right: 20upx;"></view>
			直播数据
		</view>

		<view class="flex flex-wrap align-center">
			<view class="list_bor">
				<view class="text-color1">{{ info.detail.max_online }}</view>
				<view class="text-color2">最高在线</view>
			</view>
			<view class="list_bor">
				<view class="text-color1">{{ info.detail.common_total }}</view>
				<view class="text-color2">累计互动</view>
			</view>
			<view class="list_bor">
				<view class="text-color1">{{ info.detail.share_total }}</view>
				<view class="text-color2">分享次数</view>
			</view>
			<view class="list_bor">
				<view class="text-color1">{{ info.detail.click_goods_total }}</view>
				<view class="text-color2">商品点击</view>
			</view>
		</view>
		
		<block v-if="info.detail.user_id==userinfo.id" > 
			<view class="title flex" style="padding: 36upx 45upx;border-bottom: 1upx solid #eee;">
				<view class="l_icon" style="margin-right: 20upx;"></view>
				销售数据
			</view>
			<view class="flex flex-wrap align-center" style="margin-bottom: 30upx;">
				<view class=" list_bor1">
					<view class="text-color1">{{ordernum}}</view>
					<view class="text-color2">订单数量</view>
				</view>
				<view class=" list_bor1">
					<view class="text-color1">{{info.sale_data.live_data.sum_price}}</view>
					<view class="text-color2">销售金额</view>
				</view>
				<view class=" list_bor1">
					<view class="text-color1">{{info.sale_data.platform_data.sum_price}}</view>
					<view class="text-color2">返利订单</view>
				</view>
				<view class=" list_bor1">
					<view class="text-color1">{{info.sale_data.platform_data.rebate_price}}</view>
					<view class="text-color2">返利金额</view>
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			id: '',
			info: '',
			start_time: '',
			end_time: '',
			ordernum: 0,
			userinfo:{},
			show:false
		};
	},
	methods: {
		getinfo() {
			that.$request
				.request({
					url: that.api.live.scene_detail,
					data: {
						id: that.id
					}
				})
				.then(res => {
					console.log(res);
					that.info = res;
					let start_time = that.$zax.formatDate(res.detail.start_time * 1000);
					that.start_time = start_time.month + '/' + start_time.date + ' ' + start_time.hour + ':' + start_time.date;
					let end_time = that.$zax.formatDate(res.detail.end_time * 1000);
					that.end_time = end_time.month + '/' + end_time.date + ' ' + end_time.hour + ':' + end_time.date;
					that.ordernum = Number(res.sale_data.live_data.total) + Number(res.sale_data.platform_data.total);
					
					// that.show=info.detail.user_id==userinfo.id
					
				});
		}
	},
	onLoad(option) {
		that = this;
		that.id = option.id ? option.id : '';
		that.getinfo();
		that.userinfo=uni.getStorageSync("userinfo");
	}
};
</script>

<style>
page {
	background: #fff;
}

.top {
	height: 507upx;
	width: 100%;
	position: relative;
}

.top_img image {
	height: 436upx;
	width: 100%;
}

.img_bot {
	padding: 0 32upx;
	width: 100%;
	position: absolute;
	bottom: 0;
}

.b_all {
	height: 114upx;
	width: 100%;
	padding: 26upx 19upx;
	border-radius: 10upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.b_icon {
	background-color: #fbecff;
	border-radius: 10upx;
	padding: 22upx;
	color: #9322cf;
	font-size: 25upx;
	margin-right: 80upx;
}

.b_icon image {
	width: 34upx;
	height: 22upx;
	margin-right: 13upx;
}

.b_time {
	line-height: 76upx;
	color: #292929;
	margin-right: 20upx;
}

.l_icon {
	width: 7upx;
	height: 38upx;
	background-color: #b701e5;
	border-radius: 4upx;
}

.list_bor {
	width: 25%;
	border-right: 1upx solid #eee;
	height: 210upx;
	font-size: 28upx;
	border-bottom: 1upx solid #eee;
	line-height: 54upx;
	flex-direction: column;
	text-align: center;
	display: flex;
	justify-content: center;
}
.text-color1 {
	color: #282828;
}
.text-color2 {
	color: #8d8c8c;
}
.list_bor:nth-child(4) {
	border-right: none;
}
.list_bor1 {
	width: 50%;
	border-right: 1upx solid #eee;
	height: 210upx;
	font-size: 28upx;
	border-bottom: 1upx solid #eee;
	line-height: 54upx;
	flex-direction: column;
	text-align: center;
	display: flex;
	justify-content: center;
}
.video {
	width: 100%;
	height: 100%;
}
</style>
