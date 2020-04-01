<template>
	<view style="background-color: #fff;">
		<view style="background-color: #f3f3f3;height: 21upx;width: 100%;"></view>
		<view class="d-finish" style="width: 100%;height: 243upx;background-color: #ffd100;overflow: hidden;">
			<view class="f-content" style="margin-left: 65upx;margin-top: 52upx;">
				<view style="font-size: 32upx;line-height: 70upx;font-weight: 600;">{{info.share_status_1}}</view>
				<view style="font-size: 28upx;line-height: 66upx;">{{info.share_status_2}}</view>
			</view>
		</view>
		<view style="background-color: #f3f3f3;height: 21upx;width: 100%;"></view>
		<view class="d-message" style="width: 100%;background-color: #fff;border: 0;">
			<view class="m-content" style="background-color: #fff;">
				<view style="margin-left: 48upx;line-height: 100upx;">商品信息</view>
				<view class=" menu-avatar" style="height: 200upx;">
					<view class=" flex " v-for="(item, index) in info.orderDetail" :key="index" style="height: 200upx;">
						<view class="cu-avatar lg" :style="[{ backgroundImage: 'url(' + item.cover_pic + ')' }]" style="width:151upx;height:151upx;background-size: cover;"></view>
						<view class="content" style="height: 151upx;width: 500upx;">
							<view class="text-grey text-name" style="color: #333;font-size: 28upx;width: 100%;">{{item.name}}</view>
							<view class="text-gray text-sm flex justify-between">
								<view>
									<text class="ya-text" v-for="(attr,attrindex) in item.attr" :key="attrindex">
										{{attr.attr_group_name}}：{{attr.attr_name}}
									</text>
								</view> 
								<text class="ya-text">数量: {{item.num}}</text>
							</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut text-time">
									<text class="text-price">{{item.total_price}}</text>
									<text class="text-li">利润:{{info.share_money}}元</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;background-color: #fff;">
			<view class="b-conten" style="margin-left: 43upx;margin-top: 23upx;">
				<view class="text-f">买家：{{info.nickname}}</view>
				<view class="text-f">订单号：{{info.order_no}}</view>
				<view class="text-f">下单时间：{{info.addtime}}</view>
				<view class="text-f">订单状态：{{info.send_status}}</view>
				<view class="text-f">收益等级：{{info.share_status}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				info: ''
			}
		},
		methods: {},
		onLoad(option) {
			that = this;
			that.info = JSON.parse(option.info);
			console.log("订单详情：", that.info);
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	} 
	.cu-avatar{
		margin-left: 43upx;
		margin-right: 34upx;
	}

	.text-li {
		background: #ff6d6d;
		color: #fff; 
		height: 35upx;
		display: block;
		text-align: center;
		line-height: 35upx;
		float: left;
		margin-left: 17upx;
		padding: 0upx 15upx;
	}

	.ya-text {
		font-size: 22upx;
		color: #a8a8a8;
		line-height: 65upx;
		margin-right: 15upx;
	}

	.text-price {
		float: left;
		display: block;
		height: 35upx;
		line-height: 35upx;
		text-align: center;
		font-size: 28upx;
		color: #333;
	}

	.text-f {
		font-size: 26upx;
		color: #a8a8a8;
		line-height: 46upx;
	}
</style>
