<template>
	<view>
		<view class="card-view">
			<view class="" style="padding:40upx;">
				<view class="list" style="padding: 30upx 0upx;">
					<view class="flex align-center ">
						<image src="/static/logo.png" class="avatar"></image>
						<view class="username">李瑞娟</view>
					</view>
					<view style="font-size: 25rpx;">未支付</view>
				</view>
				<view class="list tar">
					<label>手机号</label>
					<view>15537839105</view>
				</view>
				<view class="list tar">
					<label>身份等级</label>
					<view>区域代理</view>
				</view>
				<view class="list tar">
					<label>签单时间</label>
					<view>2020-02-08 15:23:12</view>
				</view>
			</view>

			<view class="xianv">
				<view class="yuan" style="left: -14upx;"></view>
				<view class="yuan" style="right: -14upx;"></view>
			</view>

			<view class="text-center">
				<block v-if="1" >
					<view style="padding-top: 70upx;"  >
						<view style="font-size: 36rpx;color: #0071f0;">恭喜您成为区域代理！</view>
						<view><image src="/static/logo.png" class="qrcode"></image></view> 
					</view>
				</block>
				<block v-else >
					<view><image src="/static/logo.png" class="qrcode"></image></view>
					<view class="text-center"><button class="cu-btn line-blue" @tap="showModel">查看支付码</button></view>
				</block>
			</view>
		</view>

		<view class="cu-modal" :class="modalName == 'qrcode' ? 'show' : ''" @tap="hidden">
			<view class="cu-dialog" @tap.stop="">
				<view class="tishi">截图或长按保存支付码，前往xxx处XXX平台，向工作人员出示支付码完成支付!</view>
				<view class="maview" style="position: relative;">
					<view class="text-center">
						<view style="font-size: 26rpx;color: #181818; padding-top:70upx; ">您的支付码为</view>
						<view class="matext">ABC123546</view>
						<view style="font-size: 28rpx;color: #1992fb;">截图或长按保存图片</view>
					</view>
					<image src="/static/icon/icon-close.png" class="close" @tap="hidden"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			modalName: ''
		};
	},
	methods: {
		hidden() {
			that.modalName = '';
		},
		showModel() {
			that.modalName = 'qrcode';
		}
	},
	onLoad() {
		that = this;
	}
};
</script>

<style>
page {
	background-color: #f3f3f3;
}
.card-view {
	width: 698upx;
	background-color: #ffffff;
	border-radius: 20upx;
	margin: auto;
	margin-top: 35upx;
	overflow: hidden;
	padding-bottom: 60upx;
}
.qrcode {
	width: 206rpx;
	height: 206rpx;
	margin: 50upx auto;
}
.text-view {
	width: 100%;
	font-size: 24upx;
	color: #535353;
	display: flex;
	align-items: center;
}
.text-view .icon {
	width: 30upx;
	height: 30upx;
	margin-right: 25upx;
}
.solid-view {
	height: 60upx;
	border-bottom: #eee dashed 1upx;
}
.down-view {
	padding: 40upx;
	line-height: 60upx;
	font-size: 28rpx;
	color: #2f2f2f;
}
.list {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.list label {
	font-size: 25rpx;
	line-height: 55rpx;
	color: #a9a8a8;
}
.tar {
	padding-left: 10upx;
}

.avatar {
	width: 100upx;
	height: 100upx;
	border-radius: 100upx;
	margin-right: 23upx;
}
.username {
	font-size: 30rpx;
	color: #2f2f2f;
}
.xianv {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: dashed 2rpx #eeeeee;
}
.xianv .yuan {
	width: 34rpx;
	height: 34rpx;
	background-color: #f3f3f3;
	border-radius: 1000upx;
	position: relative;
	top: 14upx;
}

.cu-dialog {
	width: 559rpx;
	height: 585rpx;
	background-color: rgba(0, 0, 0, 0);
	border-radius: 16rpx;
	font-size: 32rpx;
	color: #9c9c9c;
	overflow: initial;
}
.cu-dialog .close {
	position: absolute;
	bottom: -100upx;
	width: 76rpx;
	height: 76rpx;
	left: 0;
	right: 0;
	margin: auto;
}
.maview {
	height: 436rpx;
	position: relative;
	background: #fff;
	border-radius: 20upx;
}
.tishi {
	background-image: linear-gradient(48deg, #1992fb 0%, #34baff 100%);
	border-radius: 22rpx;
	font-size: 28rpx;
	line-height: 48rpx;
	color: #ffffff;
	text-align: left;
	padding: 25upx 48upx;
}
.matext {
	width: 434rpx;
	height: 105rpx;
	line-height: 105rpx;
	background-color: #f0f2f8;
	font-size: 44rpx;
	color: #181818;
	margin: 64upx auto 57upx;
}
</style>
