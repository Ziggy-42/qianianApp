<template>
	<view>
		<!-- <cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">待提现</block>
		</cu-custom> -->
		<view class="bg-white margin-top" style="padding: 32upx 0upx;">
			<view class="card-view" style="padding: 0upx;position: relative;" :style="[{ backgroundImage: 'url(' + card_bck + ')' }]">
				<image :src="card_bck" style="width: 100%;height: 100%;" mode="widthFix" ></image>
				<view class="card-view" style="position: absolute;top: 0upx;" >
					<view class="title flex align-center">
						<image src="/static/img/icon/icon-15.png" style="width: 30upx;height: 30upx;"></image>
						<text style="margin-left: 22upx;">待提现总金额</text>
					</view>
					<view class=" flex justify-between">
						<view class="money">￥{{price.price}}</view>
						<view class="btn-1" @tap="tp" data-url="/pages/earnings/tixianRecord/tixianRecord">提现记录</view>
					</view>
				</view> 
			</view>
		</view> 
		<view class="li bg-white   margin-top  flex justify-between">
			<view>已提现金额</view>
			<view>¥{{price.success_cash}}</view>
		</view>
		<view class="text-center">
			<button class="cu-btn btn"  style="background-color: #ffd100;" @tap="tp" data-url="/pages/earnings/tixian/tixian?type=0">提现到零钱</button>
		</view>
		<view class="text-gray text-center down-text">温馨提示：提现的金额将提现到个人账户零钱内。</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				card_bck: '/static/img/icon/bck-02.png',
				price:''
			};
		},
		methods: {
			tp(e) {
				console.log(e.currentTarget.dataset.url);
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				});
			},
			getinfo() {
				this.$request
					.get({
							url: 'api/share/get-info',
						},
						'正在加载'
					)
					.then(res => {
						if (res.code == 1) {
							this.$alert(res.msg);
						} else {
							console.log(res);
							that.price = res.data.price;
							that.level = res.data.level;
						}
					});
			},
		},
		onLoad() {
			that=this; 
		},
		onShow(){
			that.getinfo();
		}
		
	};
</script>

<style>
	.card-view {
		width: 670upx;
		height: 265upx;
		border-radius: 10upx;
		margin: auto;
		background-size: 100% 100%;
		padding: 68upx 63upx 0upx 58upx;
	}

	.card-view .title {
		font-size: 28upx;
		line-height: 60upx;
		letter-spacing: 0upx;
		color: #b17716;
		margin-bottom: 20upx;
	}

	.card-view .money {
		font-size: 50upx;
		line-height: 60upx;
		font-weight: 550;
		color: #be8930;
	}

	.btn-1 {
		width: 157upx;
		height: 48upx;
		background-color: #b17716;
		border-radius: 24upx;
		font-size: 24upx;
		line-height: 48upx;
		text-align: center;
		color: #fff;
	}

	.margin-top {
		margin-top: 21upx;
	}

	.soldi-bottom {
		border-bottom: solid 1upx #e2e2e2;
	}

	.li {
		padding: 0upx 52upx;
		height: 110upx;
		line-height: 100upx;
		font-size: 30upx;
		color: #414141;
	}

	.btn {
		width: 501upx;
		height: 71upx;
		background-color: #ffd100;
		border-radius: 6upx;
		border: solid 2upx #ffd100;
		margin: auto;
		line-height: 71upx;
		font-size: 30upx;
		text-align: center;
		margin-top: 95upx;
	}

	.down-text {
		color: #9e9e9e;
		font-size: 22upx;
		position: absolute;
		bottom: 85upx;
		width: 100%;
	}
</style>
