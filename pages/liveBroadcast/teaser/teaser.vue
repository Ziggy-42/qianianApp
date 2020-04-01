<template>
	<view>
		<view class="top_img">
			<view class="share">
				<image src="/static/liveBroadcast/icon-share.png"></image>
			</view>
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg" mode="" style="width: 100%;height: 100%;"></image>
		</view>
		<view class="">
			<view class="title">
				敏感肌福利
			</view>
			<view class="user">
				<view class="" style="display: flex;">
					<image class="c_img" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
					<view class="img_flex">
						<view class="i_name">
							中国馆发
						</view>
						<view class="i_num">
							3254人关注
						</view>
					</view>
				</view>
				<view class="u_right">
					<view class="guanzhu">
						关注
					</view>
					<view class="g_right">
						<image src="/static/liveBroadcast/right.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="">
			<view class="b_title">
				<view class="line1"></view>
				<view class="" style="color: #272727;font-size: 28upx;margin: 0 30upx;">
					直播商品
				</view>
				<view class="line1"></view>
			</view>
			<view class="list">
				<view class="list_left" style="width: 26%;">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
				</view>
				<view class="list_right">
					<view class="list_name">
						美白抗氧化护肤套盒
					</view>
					<view class="name_b">
						<text class="n_price">￥299.00</text>
						<view class="n_detail">
							查看详情
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bo_fixed">
			<view class="f_content">
				距离直播开始还剩
			</view>
			<view class="" style="display: flex;align-items: center;">
				<view class="time">
					02
				</view>
				<text style="color: #b701e5;">：</text>
				<view class="time">
					02
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background: #fff;
		padding-bottom: 110upx;
	}
	.top_img{
		height: 436upx;
		width: 100%;
		border-top: 1upx solid #eee;
		position: relative;
	}
	.share{
		width: 60upx;
		height: 60upx;
		background-color: #1b1b1b;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.35;
		position: absolute;
		top: 32upx;
		right: 38upx;
		z-index: 10000;
	}
	.share image{
		width: 30upx;
		height: 30upx;
	}
	.line{
		height: 16upx;
		width: 100%;
		background: #f3f3f3;
	}
	.title{
		padding: 37upx 50upx 33upx 36upx;
		border-bottom: 1upx solid #eee;
		color: #1f1f1f;
		font-size: 32upx;
		font-weight: 600;
		line-height: 40upx;
	}
	.c_img{
		width: 123upx;
		height: 123upx;
		border-radius: 50%;
		margin-right: 22upx;
	}
	.img_flex{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.i_name{
		color: #1f1f1f;
		font-size: 30upx;
		line-height: 62upx;
	}
	.i_num{
		color: #a7a7a7;
		font-size: 25upx;
	}
	.guanzhu{
		border-radius: 30rpx;
		border: solid 1rpx #b601e5;
		color: #b701e5;
		padding: 0 31upx;
		line-height: 60upx;
		margin-right: 72upx;
	}
	.user{
		display: flex;
		padding: 32upx 50upx 32upx 36upx;
		justify-content: space-between;
	}
	.u_right{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.g_right image{
		width: 25upx;
		height: 40upx;
	}
	.b_title{
		height: 125upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.line1{
		width: 109upx;
		height: 2upx;
		background: #bfbfbf;
	}
	.list{
		padding: 0 40upx 40upx 40upx;
		display: flex;
		justify-content: flex-start;
		border-bottom: 1upx solid #eee;
	}
	.list_left image{
		width: 175upx;
		height: 175upx;
		background-color: #eeeeee;
		border-radius: 14upx;
	}
	.list_right{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 74%;
		padding-left: 23upx;
	}
	.list_name{
		color: #2c2c2c;
		font-size: 28upx;
		line-height: 74upx;
	}
	.name_b{
		font-size: 29upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.n_price{
		color: #a500d3;
		line-height: 93upx;
	}
	.n_detail{
		color: #fff;
		background-image: linear-gradient(-60deg, #a44cff 0%,#c51cf0 100%);
		border-radius: 27rpx;
		width: 172upx;
		height: 54upx;
		text-align: center;
		line-height: 54upx;
	}
	.bo_fixed{
		position: fixed;
		bottom: 0;
		height: 110upx;
		border-top: 1upx solid #eee;
		width: 100%;
		padding: 0 43upx;
		display: flex;
		align-items: center;
	}
	.f_content{
		line-height: 110upx;
		color: #1e1e1e;
		margin-right: 30upx;
	}
	.time{
		width: 35upx;
		height: 35upx;
		color: #fff;
		text-align: center;
		line-height: 35upx;
		font-size: 22upx;
		background-color: #b701e5;
	}
</style>
