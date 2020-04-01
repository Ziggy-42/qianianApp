<template>
	<view>
		<view class="card-item bg-white">
			<view class="margin-bottom1">提现金额</view>
			<view class="flex align-center" style="border-bottom: solid 1px #d2d2d2;">
				<label class="icon">￥</label>
				<input
					class="margin-left"
					type="digit"
					@input="getmoney"
					:value="money == 0 ? '' : money"
					placeholder="请输入提现金额"
					style="width: 100%;"
					placeholder-style="color:#bfbfbf;font-size: 28rpx;"
				/>
			</view>
			<!-- <view class="flex align-center" style="border-bottom: solid 1px #d2d2d2; height: 100upx; ">
				<label class="" style="width: 250upx;font-size: 30upx; ">微信号码：</label>
				<input class="margin-left"  @input="getinput" value=" " placeholder="请输入微信号"
					style="width: 100%;" placeholder-style="color:#bfbfbf;font-size: 28rpx;" />
			</view> -->
			<view class="hint text-gray">
				当前可提现金额{{ price.price ? price.price : '' }}元,
				<text class="text-blue1" @tap="getall">全部提现</text>
			</view>
		</view>
		<view class="text-center"><button class="cu-btn zcolor-btn " @tap="btn_ok">提现</button></view>
	</view>
</template>
<script>
var that;
export default {
	data() {
		return {
			type: 0,
			show: false,
			list: [],
			print: 0,
			money: 0, 
			info:{},
			price:{}
		};
	},
	methods: {
		c_show() {
			this.show = !this.show;
		},
		select(e) {
			let index = e.currentTarget.dataset.index;
			that.print = e.currentTarget.dataset.index;
			that.c_show();
			that.$forceUpdate();
		},
		// 获取提现金额
		getmoney(e) {
			console.log(e.detail.value);
			that.money = e.detail.value;
		},
		// 全部
		getall() {
			that.money = that.price.price;
		},
		btn_ok() {
			that.txlq();
		},
		// 提现到零钱
		txlq() {
			if (that.money == 0) {
				that.$alert('请输入提现金额');
				return;
			}
			if (that.money > that.price.price) {
				that.$alert('您的余额不足！');
				return;
			} 
			that.$request
				.request({
					url: that.api.share.apply,
					data: {
						cash: that.money, 
						 // name: p, 
						 // mobile: o,
						pay_type:'0' 
					},
					method:'post',
					Toast: '正在提交...'
				})
				.then(res => {
					that.$alertok('提现成功！') 
					setTimeout(function() { 
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				});
			 
		},  
		tpaddbank() {
			uni.navigateTo({
				url: '/pages/mine/addbank1/addbank1'
			});
		}, 
		getinfo() {
			this.$request
				.request(
					{
						url: that.api.share.get_info
					} 
				)
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res);
						that.info=res;
						that.price = res.price; 
						uni.setStorageSync("ensho",res)
					}
				});
		},
	},
	onLoad: function(option) {
		that = this;
		console.log(that); 
		let info=uni.getStorageSync("ensho");
		if(info){
			that.info=info;
			that.price = info.price; 
		}else{
			that.getinfo();
		}
		
	} 
};
</script>

<style>
.icon {
	font-size: 60upx;
	font-weight: 600;
	color: #000000;
}

.margin-bottom1 {
	margin-bottom: 83upx;
}

.margin-bottom2 {
	margin-bottom: 34upx;
}

.card-item {
	width: 637upx;
	/* height: 521upx; */
	background-color: #ffffff;
	border-radius: 10upx;
	padding: 43upx 61upx 70upx;
	margin: 50upx auto;
	font-size: 26upx;
}

.hint {
	font-size: 24upx;
	margin-top: 38upx;
	font-size: 24rpx;
	color: #bfbfbf;
}

.text-blue1 {
	color: #82bdff;
}

.cu-btn {
	width: 493upx;
	height: 72upx;
	background-color: #b701e5;
	border-radius: 36upx;
	color: #fff;
	font-size: 30rpx;
}

.cu-list.menu-avatar > .cu-item .content {
	left: 106upx;
	width: -webkit-calc(100% - 48px - 30px - 60px - 10px);
	width: calc(100% - 48px - 30px - 60px - 10px);
}

.icon2 {
	width: 27upx;
	height: 27upx;
}
</style>
