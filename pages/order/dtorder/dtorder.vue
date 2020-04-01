<template>
	<view>
		<view style="border-bottom: 20upx solid #f3f3f3;">
			<view>
				<view style="height: 5upx;width: 100%;background-image: url('/static/img/icon/icon-address-border.png');background-size: cover;"></view>
				<navigator url="/pages/address/address?form=1">
					<view class="flex align-center justify-between  address-view " style="background-color: #fffcf7;" v-if="address">
						<view class="flex align-center justify-between">
							<view class="icon_view">收</view>
							<view>
								<view style="font-size: 28upx;">
									<text style="margin-right:10upx;">{{ address.name }}</text>
									{{ address.mobile }}
								</view>
								<view style="color: #6e6e6e;font-size: 26upx;">{{ address.province }},{{ address.city }},{{ address.district }},{{ address.detail }}</view>
							</view>
						</view>
						<text class="cuIcon-right"></text>
					</view>
					<view class="flex align-center" v-else style="height: 155upx;background-color: #fffcf7;width: 100%;font-size: 30upx;color: #333;padding-left: 53upx;">
						+添加收货地址
					</view>
				</navigator>
				<view style="height: 5upx;width: 100%;background-image: url('/static/img/icon/icon-address-border.png');background-size: cover;"></view>
			</view>
			<view class="flex goods-list1 padding-air bg-white" v-for="(item, index) in goods_list" :key="index">
				<view class="cu-avatar" :style="[{ backgroundImage: 'url(' + item.goods_pic + ')' }]"></view>
				<view class="flex justify-between right " style="flex-wrap: wrap;">
					<view class="text-cut">{{ item.goods_name }}</view>
					<view style="font-size: 22upx;color: #a8a8a8;">
						<text v-for="(attr, index1) in item.attr_list" :key="index1" style="margin-right: 20upx;">{{ attr.attr_group_name }}：{{ attr.attr_name }}</text>
					</view>
					<view class="flex justify-between">
						<view>
							<text class="text-red" v-if="item.is_level">¥{{ item.level_price }}</text>
							<text :class="item.is_level ? 'old-price' : ''">¥{{ item.price }}</text>
						</view>
						<text>x{{ item.num }}</text>
					</view>
				</view>
			</view>
			<view class="bg-white padding-air" style="padding-bottom: 30upx;padding-top: 20upx;">
				<view class="flex justify-between text-gray align-center " style="height: 70upx;">
					<text>运费</text>
					<text class="text-price">{{ order.mch_list[0].express_price }}</text>
				</view>
				<view class="text-gray" style="line-height: 70upx;">
					<text>备注</text>
					<view style="padding: 20upx; background:RGB(245,245,245); "><textarea class="textatea" placeholder="请填写备注" @input="getconten"></textarea></view>
				</view>
			</view>
		</view>
		<view>
			<view class="fangshi" style="background: #fff;height: 86upx;line-height: 86upx;padding-left: 56upx;">
				<text style="color: #9a9a9a;font-size: 24upx;">支付方式</text>
			</view>
			<view class="cu-list menu">
				<!-- <view class="cu-item" style="height: 88upx;border-bottom: 1upx solid #e7e7e7;" v-if="dzcard.length>0" @tap="clickdz" data-index="0">
					<view class="content paytype flex align-center">
						<image src="/static/img/icon/icon-20.png" class="png" mode="aspectFit" style="margin-right: 30upx;"></image>
						<text class="text-grey">定制卡支付</text>
					</view>
					<view class="action">
						<image class="print" v-if="dzpay" src="/static/img/icon/icon-print.png"></image>
						<image class="print" v-else src="/static/img/icon/icon-printno.png"></image>
					</view>
				</view> -->
				<view class="cu-item" v-for="(item, index) in paylist" :key="index" style="height: 88upx;border-bottom: 1upx solid #e7e7e7;" @tap="getpaytype" :data-index="index">
					<view class="content paytype flex align-center justify-between" style="padding-right: 40upx;">
						<view class="paytype flex align-center">
							<image :src="item.img" class="png" mode="aspectFit" style="margin-right: 30upx;"></image>
							<text class="text-grey">{{ item.name }}</text>
						</view>
						<text class="text-sm text-gray" v-if="item.money">
							余额：
							<text class="text-price">{{ item.money ? item.money : '0' }}</text>
						</text>
					</view>
					<view class="action">
						<image class="print" v-if="payaction == index" src="/static/img/icon/icon-print.png"></image>
						<image class="print" v-else src="/static/img/icon/icon-printno.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 120upx;"></view>
		<view class="foot cu-bar bg-black tabbar border shop">
			<view class="bg-black submit text-black">
				<text style="position: absolute;left: 50upx;color: #fff;font-size: 26upx;">
					合计：
					<text style="color: #fff;font-size: 34upx;">￥{{ new_total_price }}</text>
				</text>
			</view>
			<view class="bg-yellow1 flex align-center justify-center pay-view" style="height: 100upx;" @tap="order_ok">
				<button class="action " style="width: 100%;height: 100%;line-height: 100upx;font-size: 30upx;">立即支付</button>
			</view>
		</view>
		<view class="cu-modal" :class="modal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请选择要支付的定制卡</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class=" ">
					<scroll-view scroll-y="true" style="max-height: 400upx;">
						<view class="cu-list">
							<view class="cu-item flex justify-between align-center dzlist" v-for="(item, index) in dzcard" :key="index" @tap="printdzCard" :data-index="index">
								<view class="content  flex justify-between align-center ">
									<text>{{ item.name }}</text>
									<text class="text-price text-red text-sm">{{ item.balance }}</text>
								</view>
								<view class="action">
									<image class="print" v-if="item.is_select" src="/static/img/icon/icon-print.png"></image>
									<image class="print" v-else src="/static/img/icon/icon-printno.png"></image>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="dzcomp">确定</view>
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
			textareaValue: '',
			order: '',
			paylist: [
				{
					img: '/static/img/icon/icon-wxpay.png',
					name: '微信支付',
					id: '0',
					type: 'WECHAT_PAY'
				},
				//#ifndef MP-WEIXIN
				{
					img: '/static/img/icon/icon-alpay.png',
					name: '支付宝支付',
					id: '0',
					type: 'ALIPAY'
				},
				//#endif
				{
					img: '/static/img/icon/iocn-lqpay.png',
					name: '零钱支付',
					id: '0',
					type: 'BALANCE_PAY'
				}
			],
			cardpay: [
				{
					img: '/static/img/icon/icon-20.png',
					name: '定制卡支付',
					id: '0',
					type: 'CUSTOM_PAY'
				}
			],
			dzpay: false,
			payaction: -1,
			content: '',
			goods_list: '',
			dzcard: [],
			modal: false,
			customs: [],
			zmoney: 0,
			address: '',
			kd: {},
			new_total_price: 0
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
			if (that.dzpay) {
				if (that.customs.length == 0) {
					that.$alert('请选择要支付的定制卡!');
					return;
				} else {
					// 判断定制卡金额是否够
					for (let t = 0; t < that.dzcard.length; t++) {
						for (let i = 0; i < that.customs.length; i++) {
							if (that.dzcard[t].id == that.customs[i]) {
								dzmoney = (Number(dzmoney) + Number(that.dzcard[t].balance)).toFixed(2);
							}
						}
					}
					if (dzmoney < zmoney && that.payaction == -1) {
						that.$alert('定制卡余额不足,请选择其他支付方式!');
						return;
					}
				}
			}
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
			var dzmoney = 0;
			var zmoney = that.new_total_price;
			var mch_list = that.order.mch_list;
			mch_list[0]['content'] = that.content;
			mch_list[0]['offline'] = 0;
			mch_list[0]['real_price'] = that.new_total_price;
			mch_list[0]['pay_price'] = dzmoney < zmoney ? (Number(that.new_total_price) - Number(dzmoney)).toFixed(2) : that.new_total_price;
			
			console.log(mch_list);

			this.$request
				.post(
					{
						url: 'api/order/new-submit',
						data: {
							address_id: that.address.id,
							mch_list: JSON.stringify(mch_list),
							payment: 3,
							use_integral: 1
						}
					},
					'正在提交订单'
				)
				.then(res => {
					if (res.code == 1) {
						// this.$alert(res.msg);
						this.$alertwarn(res.msg);
					} else {
						console.log(res);
						if (that.dzpay) {
							this.$request
								.get({
										url: 'api/order/pay-data',
										data: {
											order_id: res.data.order_id,
											pay_type: 'CUSTOM_PAY',
											customs: JSON.stringify(that.customs),
											is_custom: 1,
											custom_price: Number(dzmoney) < Number(zmoney) ? dzmoney : that.new_total_price,
											other: Number(dzmoney) < Number(zmoney) ? 1 : 0
										}
									},
									'正在支付'
								)
								.then(res1 => {
									if (res.code == 1) {
										this.$alert(res1.msg);
									} else {
										if (Number(dzmoney) < Number(zmoney)) {
											that.$pay.pay(that.paylist[that.payaction].type, res.data.order_id).then(res2 => {
												if (res2.code == 1) {
													that.$alert('支付失败!');
													this.$request
														.get(
															{
																url: 'api/default/custom-back',
																data: {
																	order_id: res.data.order_id
																}
															},
															''
														)
														.then(ires => {
															if (ires.code == 1) {
															} else {
																setTimeout(function() {
																	uni.redirectTo({
																		url: '/pages/order/orderlist/orderlist?id=-1'
																	});
																}, 1000);
															}
														});
												} else {
													that.$alertok('支付成功！');
													setTimeout(function() {
														uni.redirectTo({
															url: '/pages/order/orderlist/orderlist?id=-1'
														});
													}, 1000);
												}
											});
										} else {
											that.$alertok('支付成功！');
											setTimeout(function() {
												uni.redirectTo({
													url: '/pages/order/orderlist/orderlist?id=-1'
												});
											}, 1000);
										}
									}
								});
						} else {
							console.log('单其他方式支付');
							that.$pay.pay(that.paylist[that.payaction].type, res.data.order_id).then(res => {
								if (res.code == 1) {
									that.$alert('支付失败!');
									setTimeout(function() {
										uni.redirectTo({
											url: '/pages/order/orderlist/orderlist?id=-1'
										});
									}, 1000);
								} else {
									this.$alertok('支付成功！');
									setTimeout(function() {
										uni.redirectTo({
											url: '/pages/order/orderlist/orderlist?id=-1'
										});
									}, 1000);
								}
							});
						}
					}
				});
		},
		getconten(e) {
			// console.log(e.detail.value)
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
		// 选择定制卡支付
		clickdz() {
			that.dzpay = !that.dzpay;
			if (that.dzpay) {
				that.hideModal();
			}
		},
		// 控制弹窗
		hideModal(e) {
			that.modal = !that.modal;
		},
		// 定制卡点击确认
		dzcomp() {
			that.hideModal();
			var dzmoney = 0;
			var zmoney = that.new_total_price;
			// 选择定制卡支付
			if (that.payaction == 0) {
				if (that.customs.length == 0) {
					that.$alert('请选择要支付的定制卡!');
					return;
				} else {
					// 判断定制卡金额是否够
					for (let t = 0; t < that.dzcard.length; t++) {
						for (let i = 0; i < that.customs.length; i++) {
							if (that.dzcard[t].id == that.customs[i]) {
								dzmoney = (Number(dzmoney) + Number(that.dzcard[t].balance)).toFixed(2);
							}
						}
					}
					if (dzmoney < zmoney) {
						that.$alert('定制卡余额不足,请选择其他支付方式！');
						return;
					}
				}
			}
		},
		getdzlist(e) {
			this.$request
				.post(
					{
						url: 'api/default/custom-bag'
					},
					'正在加载'
				)
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res.data.list);
						if (res.data.list.length > 0) {
							that.dzlist = that.dzlist.concat(res.data.list);
							that.dzpage = that.dzpage + 1;
						} else {
							that.$alert('没有更多了');
						}
					}
				});
		},
		//选择定制卡
		printdzCard(e) {
			var i = e.currentTarget.dataset.index;
			if (that.dzcard[i]['is_select']) {
				that.dzcard[i]['is_select'] = false;
				for (let t = 0; t < that.customs.length; t++) {
					if (that.customs[t] == that.dzcard[i].id) {
						that.customs.splice(t, 1);
					}
				}
			} else {
				that.dzcard[i]['is_select'] = true;
				that.customs.push(that.dzcard[i].id);
			}
			that.$forceUpdate();
			console.log('选择的定制卡：' + that.customs);
		},
		//总价
		getprice() {
			var price = 0;
			var mch_list = that.order.mch_list[0];
			console.log('过去：', mch_list.level_price);
			price = (Number(mch_list.level_price) + Number(mch_list.express_price)).toFixed(2);

			that.new_total_price = price;
			that.$forceUpdate();
		},
		getmoney() {
			this.$money.getmoney().then(res => {
				// #ifdef MP-WEIXIN
				that.paylist[1]['money'] = res.data ? res.data.money : '';
				// #endif
				// #ifndef MP-WEIXIN
				that.paylist[2]['money'] = res.data ? res.data.money : '';
				// #endif
				that.$forceUpdate();
				console.log('零七那:', that.paylist);
			});
		}
	},
	onLoad() {
		that = this;
		that.order = uni.getStorageSync('order');
		that.goods_list = uni.getStorageSync('order').mch_list[0].goods_list;
		that.address = uni.getStorageSync('order').address;
		that.dzcard = uni.getStorageSync('order').custom_list;
		that.kd = uni.getStorageSync('order').mch_list[0].kd;
		if (uni.getStorageSync('order').mch_list[0].kd) {
			that.order.mch_list[0].express_price = (Number(that.order.mch_list[0].express_price) + Number(that.kd.price)).toFixed(2);
			that.order.mch_list[0]['express_add'] = that.kd.price;
		}
		that.getprice();
		uni.removeStorageSync('address');
		this.$forceUpdate();
		that.getmoney();
	},
	onShow() {
		var address = uni.getStorageSync('address');
		if (address) {
			that.address = address;
			this.$forceUpdate();
		}
	},
	onUnload() {}
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
}

.icon_view {
	width: 56upx;
	height: 56upx;
	background-color: #ffd100;
	font-size: 30upx;
	color: #000000;
	line-height: 58upx;
	text-align: center;
	font-weight: 550;
	border-radius: 50upx;
	margin-right: 25upx;
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
</style>
