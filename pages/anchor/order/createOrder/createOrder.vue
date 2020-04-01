<template>
	<view>
		<view class="kong"></view>
		<view class="addresscard">
			<navigator url="/pages/serve/address/address?form=1">
				<view class="  address-view " style="background-color: #fffcf7;" v-if="address">
					<view class="flex align-center justify-between">
						<view class="icon_view"><text class="cuIcon-locationfill"></text></view>
						<view>
							<view style="font-size: 28upx;">
								<text style="margin-right:10upx;">{{ address.name }}</text>
								<text class="text-gray">{{ address.mobile }}</text>
							</view>
							<view style="color: #6e6e6e;font-size: 26upx;margin-top: 10upx;">
								{{ address.province }},{{ address.city }},{{ address.district }},{{ address.detail }}
							</view>
						</view>
					</view>
					<text class="cuIcon-right text-gray" style="font-size: 40upx;"></text>
				</view>
				<view class="flex align-center" v-else style="height: 155upx;background-color: #fffcf7;width: 100%;font-size: 30upx;color: #333;padding-left: 53upx;">
					+添加收货地址
				</view>
			</navigator>
		</view>
		<view class="kong"></view>

		<view class="card-vi">
			<block>
				<view class="flex goods-list1 padding-air bg-white">
					<view class="cu-avatar" :style="[{ backgroundImage: 'url(' + order.goods.cover + ')' }]"></view>
					<view class="" style="width: 420rpx;">
						<view style="height: 100upx;">
							<view class="text-cut2">{{ order.goods.name }}</view>
						</view>
						<!-- <view class="flex align-center" style="font-size: 22upx;color: #a8a8a8;margin-top: 15upx;">
							<view class="goods-bar" v-for="(attr, index1) in item.attr_list" :key="index1" style="margin-right: 20upx;width: auto;">
								{{ attr.attr_group_name }}：{{ attr.attr_name }}
							</view>
						</view> -->
						<view class="flex align-center  justify-between" style="margin-top: 10upx;">
							<view class="price-color">
								<text>¥{{ order.goods.price }}</text>
							</view>
							<view>x{{ order.goods_num }}</view>
						</view>
					</view>
				</view>
			</block>
			<view class="bg-white padding-air" style="padding-bottom: 30upx;padding-top: 20upx;">
				<view class="text-gray" style="line-height: 70upx;">
					<text>备注</text>
					<view style="padding: 20upx; background:RGB(245,245,245); "><textarea class="textatea" placeholder="请填写备注" @input="getconten"></textarea></view>
				</view>
			</view>
		</view>

		<view style="height: 120upx;"></view>
		<view class="foot cu-bar bg-white  tabbar border shop align-center">
			<view class="submit text-black bg-white">
				<text style="position: absolute;left: 50upx; font-size: 26upx;">
					合计：
					<text class="price-color" style=" font-size: 34upx;">￥{{ order.total_price }}</text>
				</text>
			</view>
			<view class="play" style="height: 100upx;" @tap="order_ok"><button class="cu-btn  " style="font-size: 30upx;">立即支付</button></view>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			textareaValue: '',
			order: '',
			paylist: [
				{
					img: '/static/img/icon/icon-wxpay.png',
					name: '微信支付',
					id: '0',
					type: 'WECHAT_PAY'
				},
				{
					img: '/static/img/icon/iocn-lqpay.png',
					name: '零钱支付',
					id: '1',
					money: 0,
					type: 'BALANCE_PAY'
				}
			],
			dzpay: false,
			payaction: 0,
			content: '',
			goods_list: '',
			dzcard: [],
			modal: false,
			customs: [],
			zmoney: 0,
			address: '',
			kd: {},
			new_total_price: 0,
			money: 0,
			mch_list: [],
			type: '',
			room_id: '',
			anchor_id: ''
		};
	},
	methods: {
		order_ok() {
			if (!that.address) {
				that.$alert('请选择收货地址!');
				return;
			}
			if (that.payaction == -1 && !that.dzpay) {
				that.$alert('请选择支付方式!');
				return;
			}
			var dzmoney = 0;
			var zmoney = that.new_total_price;
			// 选择定制卡支付 
			if (that.paylist[that.payaction].type == 'BALANCE_PAY') {
				that.tanchuang
					.showModel({
						title: '提示',
						content: '你的账户余额为：' + that.paylist[that.payaction].money + '元,是否确认支付',
						cancelText: '取消',
						confirmText: '确定'
					})
					.then(res => {
						console.log('操作结果：', res);
						if (res == 'confirm') {
							if (Number(that.paylist[that.payaction].money) < Number(zmoney)) {
								that.$alert('您的余额不足!');
								return;
							} else {
								that.zpay();
							}
						}
					});
			} else {
				that.zpay();
			}
		},
		zpay() {
			that.$request
				.request({
					url: that.api.live_order.submit,
					data: {
						address_id:that.address.id,
						goods_id:that.order.goods.id,
						goods_num:that.order.goods_num,
						room_id:that.room_id,
						anchor_id:that.anchor_id,
						remark:that.content
					},
					method: 'post',
					Toast: '正在提交订单...'
				})
				.then(res => {
					that.$request
						.request({
							url: that.api.live_order.pay_data,
							data: {
								order_id: res.order_id
							},
							method: 'post'
						})
						.then(res => {
							that.$pay
								.zwxpay(res)
								.then(res => {
									uni.redirectTo({
										url: '/pages/order/orderlist/orderlist?id=-1'
									});
								}).catch(res=>{
									uni.redirectTo({
										url: '/pages/order/orderlist/orderlist?id=-1'
									});
								});
						});
				});
		},
		getconten(e) {
			that.content = e.detail.value;
		},
		getpaytype(e) {
			if (that.payaction == e.currentTarget.dataset.index) {
				that.payaction = -1;
			} else {
				that.payaction = e.currentTarget.dataset.index;
			}
			that.$forceUpdate();
		},
		// 控制弹窗
		hideModal(e) {
			that.modal = !that.modal;
		},
		//总价
		getprice() {
			var price = 0;
			for (let i in that.order.mch_list) {
				var mch_list = that.order.mch_list[i];
				console.log('过去：', mch_list);
				price = (Number(price) + Number(mch_list.level_price) + Number(mch_list.express_price)).toFixed(2);
			}
			that.new_total_price = price;
			that.$forceUpdate();
		},
		// 获取零钱
		getmoney() {
			this.$money.getmoney().then(res => {
				that.$forceUpdate();
				console.log('零七那:', that.paylist);
			});
		}
	},
	onLoad(option) {
		that = this;
		that.room_id = option.room_id ? option.room_id : '';
		that.anchor_id = option.anchor_id ? option.anchor_id : '';
		that.order = uni.getStorageSync('order') ? uni.getStorageSync('order') : data.order;
		console.log(that.order);
		that.address = uni.getStorageSync('address');
		that.getprice();
	},
	onShow() {
		var address = uni.getStorageSync('address');
		if (address) {
			that.address = address;
			this.$forceUpdate();
		}
		// that.getmoney();
	}
};
</script>

<style>
.textatea {
	width: 100%;
	height: 137upx;
	background-color: #f5f5f5;
	font-size: 28upx;
}

.cu-list.menu-avatar > .cu-item > .cu-avatar {
	position: absolute;
	left: 57upx;
	bottom: 29upx;
}

.old-price {
	font-size: 22upx;
	margin-left: 10upx;
}

.order-solid {
	width: 100%;
	height: 5upx;
}

.address-view {
	height: 154upx;
	background-color: #fffcf7;
	padding: 0upx 40upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.icon_view {
	width: 56upx;
	height: 56upx;
	font-size: 50upx;
	line-height: 58upx;
	text-align: center;
	font-weight: 550;
	border-radius: 50upx;
	margin-right: 15upx;
	color: #a500d3;
}

.padding-air {
	padding-left: 45upx;
	padding-right: 45upx;
}

.goods-list1 {
	padding-top: 20upx;
	padding-bottom: 20upx;
	border-bottom: solid 1upx #e4e4e4;
}

.goods-list1 .cu-avatar {
	width: 151upx;
	height: 151upx;
	margin-right: 30upx;
	border-radius: 10upx;
}

.right {
	flex-wrap: wrap;
	width: 470upx;
}

.right view {
	width: 100%;
	line-height: 52upx;
}

.print {
	width: 33upx;
	height: 33upx;
}

.pay-view {
	height: 100%;
	width: 201upx !important;
	font-size: 30upx;
}

.paytype {
	padding-left: 20upx;
}

.png {
	width: 45upx;
	height: 45upx;
	margin-right: 30upx;
}

.dzlist {
	height: 80upx;
	padding: 0upx 30upx;
}

.dzlist .content {
	width: 80%;
}

.addresscard {
	width: 706upx;
	height: 150upx;
	background-color: #ffffff;
	border-radius: 20upx;
	margin: auto;
	overflow: hidden;
}
.card-vi {
	width: 706upx;
	background-color: #ffffff;
	border-radius: 20upx;
	overflow: hidden;
	margin: auto;
	margin-bottom: 20upx;
}
.play {
	display: flex;
	align-items: center;
	margin-right: 25upx;
}
.play .cu-btn {
	width: 220upx;
	height: 72upx;
	background-image: linear-gradient(-60deg, #9329ff 0%, #b000dd 100%);
	border-radius: 36upx;
	color: #fff;
}
</style>
