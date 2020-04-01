<template>
	<view>
		<view>
			<video class="video"  :src="info.file_url" :poster="info.cover"></video> 
		</view>
		<view class="title-view"> 
			<view style="font-size: 30upx; color: #232323;font-weight: 550;">{{info.name}}</view>
			<view style="font-size: 30upx; color: #232323; margin-top: 25upx;">{{info.chapter}}</view>
		</view>
		<view class="kong"></view>

		<!-- <view class="bg-white" style="padding: 20upx 0upx;">
			<view class="bg-img vip-view " :style="[{ backgroundImage: 'url(' + bg + ')' }]">
				<view>会员专区</view>
				<view><button class="cu-btn">加入会员</button></view>
			</view>
		</view> -->
		<!-- <view class="kong"></view> -->
		<!-- <view class="padding-air bg-white" style="padding: 20upx 0upx;">
			<view class="flex justify-center align-center ">
				<text class="lain"></text>
				<view style="font-size: 28upx;">课程简介</view>
				<text class="lain"></text>
			</view>
		</view>
		<view class="padding-air bg-white" >
			<view class="" style="padding: 40upx;">
				123
			</view>
		</view> -->
		<!-- 
		<view>
			<block v-for="(item, index) in list" :key="index">
				<view class="list">
					<view class="list-left">
						<view class="list-img">
							<image mode="aspectFill" :src="item.cover"></image>
						</view>
						<view class="list-c">
							<view class="flex justify-between">
								<text>{{item.chapter}}</text>
								<text class="time">{{ item.createtime }}</text>
							</view>
							<view class="list-name text-cut ">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</block>
		</view> -->
		<view style="height: 120upx;"></view>
		<!-- <view class="foot">
			<button class="cu-btn" @tap="buy">立即购买</button>
		</view> -->

	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				bg: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
				list: [],
				id: '',
				info: ''
			};
		},
		methods: {
			getdetail(e) {
				console.log(that.id)
				that.$request.request({
					url: that.api.college.course_item_detail,
					data: {
						item_id: that.id
					}
				}).then(res => {
					console.log(res)
					that.info = res; 
				})
			},
			buy() {
				that.$request.request({
					url: that.api.college.pay_course_order,
					data: {
						course_id: that.id
					}
				}).then(res => {
					console.log(res)
					// that.$pay.zpay(res).then(e=>{ 
					// })
				})
			} 
		},
		onLoad(option) {
			that = this;
			console.log(option.id)
			that.id = option.id ? option.id : 38
			that.getdetail();
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
</style>
