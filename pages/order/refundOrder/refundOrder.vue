<template>
	<view>
		<view class="kong"></view>
		<view class="soldi-bottom bg-white card-view">
			<view class="goodsinfo flex align-center ">
				<view class="cu-avatar goodsimg" :style="[{ backgroundImage: 'url(' + info.goods_pic + ')' }]"></view>
				<view style=" margin-left: 20upx; width: 500upx;">
					<view class="text-cut goods-name ">{{ info.name }}</view>
					<view class="flex justify-between">
						<text>￥{{ info.total_price?info.total_price:'0.00' }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="kong"></view>
		<view class="card-view">
			<view class="form-group">
				<label>退款金额</label>
				<view class="right">
					<view class="text-right price-color">￥{{ info.total_price?info.total_price:'0.00' }}</view>
				</view>
			</view>
			<view class="form-group">
				<label>退款原因</label>
				<view class="right">
					<picker :range="refund" @change="prinCat">
						<input
							class="text-right padding-right"
							placeholder="请选择填写退款原因"
							disabled="true"
							:value="index != -1 ? refund[index] : ''"
							placeholder-class="placeholder"
						/>
						<input name="mch_common_cat_id" disabled="true" :value="index != -1 ? refund[index] : ''" style="display: none;" />
					</picker>
				</view>
				<text class="cuIcon-right text-gray" style="color: #bfbfbf;"></text>
			</view> 
			<view class="form-group no-border">
				<label>退款备注</label>
				<view class="right"><input placeholder="请输入备注" name="realname" placeholder-class="placeholder" /></view>
			</view>
		</view>

		<view class="down-view"><button class="cu-btn" @tap="sub" >确定</button></view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			gid: '',
			info: '',
			data: {},
			dzpay: false,
			payaction: -1,
			content: '',
			dzcard: [],
			modal: false,
			refund:['不想要','拍多','货物损坏'],
			index:0
		};
	},
	methods: {
		prinCat(e){
			 that.index=e.detail.value;
		},
		getinfo() {
			this.$request
				.request({
					url: that.api.order.refund_preview,
					data: {
						order_detail_id: that.gid
					}
				})
				.then(res => {
					uni.hideLoading();
					that.info = res;
				});
		},
		sub(){
			uni.showLoading({
				mask:true,
				title:'正在提交'
			})
			this.$request
			.request({
				url: that.api.order.refund,
				data: {
					order_detail_id: that.gid,
					type: 1,
					desc: that.refund[that.index],
					pic_list: []
				},
				method:'post'
			})
			.then(res => {
				console.log(res);
				that.$alertok("退款申请已提交")
				uni.navigateBack({
					delta:1
				})
			}); 
			uni.hideLoading()
		}
	},
	onLoad(option) {
		console.log(option);
		that = this;
		that.gid = option.id ? option.id : '24';
		that.getinfo();
		that.userinfo = uni.getStorageSync('userinfo');
	}
};
</script>

<style>
page {
	background: #f3f3f3;
}

.card-view {
	width: 706rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	overflow: hidden;
	margin: auto;
}
 

.play-btn {
	padding: 10upx 20upx;
	color: #ffffff;
	border-radius: 10upx;
}

.footer {
	height: 100upx;
	position: fixed;
	bottom: 0upx;
	width: 100%;
	padding: 0upx 20upx;
	background: #ffffff;
}

.sqsh {
	/* border: solid #000 1upx !important; */
	padding: 0upx 30upx;
	height: 70upx;
	display: flex;
	justify-content: flex-end;
	align-content: center;
}

.text-li {
	background: #ff6d6d;
	color: #fff;
	width: 117upx;
	height: 35upx;
	display: block;
	text-align: center;
	line-height: 35upx;
	float: left;
	margin-left: 17upx;
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

.goodsinfo {
	padding: 20upx;
	display: flex;
}

.goodsimg {
	width: 111rpx;
	height: 111rpx;
	background-color: #f6f6f6;
	border-radius: 10rpx;
	overflow: hidden;
}

.soldi-bottom {
	border-bottom: solid #eeeeee 1upx;
}

.li {
	padding: 20upx;
	line-height: 50upx;
}

.foot-view {
	width: 100%;
	display: flex;
	height: 100rpx;
	position: fixed;
	bottom: 0rpx;
	background: #fff;
	align-items: center;
	padding: 0rpx 40rpx;
	justify-content: space-between;
}
.ol {
	padding: 20rpx 0rpx;
	background: #fff;
}
.goods-name {
	font-size: 28rpx;
	line-height: 45rpx;
	color: #2f2f2f;
}
.down-view {
	width: 100%;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 0upx;
	background: #fff;
}
.down-view .cu-btn {
	width: 662rpx;
	height: 75rpx;
	background-image: linear-gradient(-60deg, #9329ff 0%, #b000dd 100%);
	border-radius: 38rpx;
	color: #fff;
}
</style>
