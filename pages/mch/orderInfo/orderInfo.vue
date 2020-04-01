<template>
	<view>
		<view class="kong"></view>
		<view class="order-status">{{ data.status }}</view>
		<view class="address-view">
			<view class="address-left  ">
				<view class="cuIcon-locationfill addres-icon "></view>
				<view class=" ">
					<view>
						{{ data.name ? data.name : '' }}
						<text class="tel">{{ data.mobile ? data.mobile : '' }}</text>
					</view>
					<view>{{ data.address ? data.address : '' }}</view>
				</view>
			</view>
			<view class="cuIcon-right"></view>
		</view>
		<view class="kong"></view>
		<view class="soldi-bottom bg-white" v-for="(item, index) in goodslist" :key="index">
			<view class="goodsinfo flex align-center ">
				<view class="cu-avatar goodsimg" :style="[{ backgroundImage: 'url(' + item.goods_pic + ')' }]"></view>
				<view style=" margin-left: 20upx; width: 500upx;">
					<view>{{ item.name }}</view>
					<view class="flex ">
						<view v-for="(item1, index1) in item.attr" :key="index1">{{ item1.attr_group_name }}: {{ item1.attr_name }}</view>
					</view>
					<view class="flex justify-between">
						<text>￥{{ item.total_price }}</text>
					</view>
				</view>
			</view>
			<block v-if="item.order_refund_enable == 1">
				<view class="flex  sqsh align-center  ">
					<view class="margin-right">
						<button class="cu-btn shouh bg-white" v-if="item.express" @tap="tpwl" :data-order_detai_id="item.order_detail_id">查看物流</button>
					</view>
					<button class="cu-btn shouh bg-white" v-if="item.is_order_refund == 0" @tap="shouh" :data-order_detai_id="item.order_detail_id">申请售后</button>
					<text class="refund-text text-sm text-gray" v-if="item.is_order_refund == 1">已申请售后</text>
				</view>
			</block>
		</view>
		<view class="ol">
			<view class="li-view">
				<label>商品总额</label>
				<text>￥{{ data.goods_total_price ? data.goods_total_price : '' }}</text>
			</view>
			<view class="li-view">
				<label>商品数量</label>
				<text>x{{ data.num ? data.num : '' }}</text>
			</view>
			<view class="li-view">
				<label>运费</label>
				<text>￥{{ data.express_price ? data.express_price : 0 }}</text>
			</view>
			<view class="li-view" v-if="data.content">
				<label>买家留言</label>
				<view class="" style="width: 550upx;">{{ data.content ? data.content : '' }}</view>
			</view>
			<view class="li-view" v-if="data.words">
				<label>商家留言</label>
				<view class="" style="width: 550upx;">{{ data.words ? data.words : '无' }}</view>
			</view>
			<view class="li-view">
				<label>订单编号</label>
				<view class="" style="width: 550upx;">{{ data.order_no ? data.order_no : '' }}</view>
			</view>
			<view class="li-view">
				<label>下单时间</label>
				<view class="" style="width: 550upx;">{{ data.addtime ? data.addtime : '' }}</view>
			</view>
		</view>
		<view class="kong"></view>
		<view class="bg-white" v-if="data.express && goodslist.length == 1" @tap="tpwl">
			<view class="white"></view>
			<view class="flex  justify-between  li ">
				<view class="">
					<view>快递公司:{{ data.express ? data.express : '' }}</view>
					<view>快递单号:{{ data.express_no ? data.express_no : '' }}</view>
				</view>
				<view><text class="cuIcon-right"></text></view>
			</view>
		</view>
		
		<view class="cu-timeline">
		  <view class="cu-time">昨天</view>
		  <view class="cu-item cur cuIcon-noticefill">
		    <view class="content bg-green shadow-blur">
		      <text>22:22</text> 【广州市】快件已到达地球
		    </view>
		  </view>
		  <view class="cu-item text-red cuIcon-attentionforbidfill">
		    <view class="content bg-red shadow-blur">
		      这是第一次，我家的铲屎官走了这么久。久到足足有三天！！
		    </view>
		  </view>
		  <view class="cu-item text-grey cuIcon-evaluate_fill">
		    <view class="content bg-grey shadow-blur">
		      这是第一次，我家的铲屎官走了这么久。
		    </view>
		  </view>
		  <view class="cu-item text-blue">
		    <view class="bg-blue content">
		      <text>20:00</text> 【月球】快件已到达月球，准备发往地球
		    </view>
		    <view class="bg-cyan content">
		      <text>10:00</text> 【银河系】快件已到达银河系，准备发往月球
		    </view>
		  </view>
		</view>

		<view style="height: 120rpx;"></view>
		<view class="foot-view">
			<view class="">
				合计：
				<text style="color:#b701e5;">¥ {{ data.pay_price ? data.pay_price : '' }}</text>
			</view>
			<view>
				<block v-if="data.is_pay == 0"><button class="cu-btn">立即支付</button></block>
				<block v-if="data.is_send == 0">
					<view v-if="data.apply_delete == 1">退款申请中</view>
					<view v-if="data.is_pay == 1 && data.apply_delete == 0"><button class="play-btn " @tap="orderRevoke" :data-id="data.order_id">申请退款</button></view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
var that;
import orderlist from '../../order/order.js';
export default {
	data() {
		return {
			gid: '',
			goodslist: [],
			data: {},
			paylist: [
				{
					img: '/static/img/icon/icon-wxpay.png',
					name: '微信支付',
					id: '0',
					type: 'WECHAT_PAY'
				},
				// #ifndef MP-WEIXIN
				{
					img: '/static/img/icon/icon-alpay.png',
					name: '支付宝支付',
					id: '0',
					type: 'ALIPAY'
				},
				// #endif
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
			dzcard: [],
			modal: false
		};
	},
	methods: {
		tpwl(e) {
			let detai_id = e.currentTarget.dataset.order_detai_id ? e.currentTarget.dataset.order_detai_id : '';
			uni.navigateTo({
				url: '/pages/order/shopOrderinfo/shopOrderinfo?id=' + that.data.order_id + '&detail_id=' + detai_id
			});
		},
		getinfo() {
			this.$request
				.get(
					{
						url: 'api/order/detail',
						data: {
							order_id: that.gid
						}
					},
					'正在加载'
				)
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log('详情：', res);
						that.goodslist = res.data.goods_list;
						that.data = res.data;
					}
				});
		},
		orderRevoke: function(e) {
			var a = this;
			that.tanchuang
				.showModel({
					title: '提示',
					content: '是否取消该订单',
					cancelText: '否',
					confirmText: '是'
				})
				.then(res => {
					if (res == 'confirm') {
						that.$request
							.get(
								{
									url: 'api/order/revoke',
									data: {
										order_id: e.currentTarget.dataset.id
									}
								},
								'正在执行'
							)
							.then(res => {
								if (res.code == 1) {
									that.$alert(res.msg);
								} else {
									console.log(res);
									that.$alert(res.msg);
									that.list = [];
									setTimeout(function() {
										that.getinfo();
									}, 1000);
								}
							});
					}
				});

			// uni.showModal({
			// 	title: "提示",
			// 	content: "是否取消该订单",
			// 	cancelText: "否",
			// 	confirmText: "是",
			// 	success: function(t) {
			// 		if (t.cancel) return !0;
			// 		t.confirm && (
			// 			that.$request
			// 			.get({
			// 				url: 'api/order/revoke',
			// 				data: {
			// 					order_id: e.currentTarget.dataset.id
			// 				}
			// 			}, '正在执行')
			// 			.then(res => {
			// 				if (res.code == 1) {
			// 					that.$alert(res.msg);
			// 				} else {
			// 					console.log(res);
			// 					that.$alert(res.msg);
			// 					that.list=[];
			// 					setTimeout(function() {
			// 						that.getinfo();
			// 					}, 1000);
			// 				}
			// 			})
			// 		);
			// 	}
			// });
		},
		// 选择普通支付方式
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
		shouh(e) {
			uni.navigateTo({
				url: '/pages/order/shouhou/shouhou?id=' + e.currentTarget.dataset.order_detai_id
			});
		},
		// 支付
		pay() {
			var dzmoney = 0;
			var zmoney = that.new_total_price;
			// 选择定制卡支付
			if (that.paylist[that.payaction].type == 'BALANCE_PAY') {
				that.tanchuang
					.showModel({
						title: '提示',
						content: '你的账户余额为：' + that.userinfo.money + '元,是否确认支付',
						cancelText: '取消',
						confirmText: '确定'
					})
					.then(res => {
						console.log('操作结果：', res);
						if (res == 'confirm') {
							if (Number(that.userinfo.money) < Number(that.zmoney)) {
								that.$alert('您的余额不足!');
								return;
							} else {
								that.$pay.pay(that.paylist[that.payaction].type, that.gid).then(res => {
									if (res.code == 1) {
										console.log('支付失败！');
										that.$alert('支付失败！');
									} else {
										console.log('支付成功！');
										uni.setStorageSync('sx', true);
										setTimeout(function() {
											that.$alertok('支付成功！');
										}, 1000);
										setTimeout(function() {
											uni.navigateBack({
												delta: 1
											});
										}, 1000);
									}
								});
							}
						}
					});
			} else {
				that.$pay.pay(that.paylist[that.payaction].type, that.gid).then(res => {
					if (res.code == 1) {
						console.log('支付失败！');
						that.$alert('支付失败！');
					} else {
						console.log('支付成功！');
						setTimeout(function() {
							that.$alertok('支付成功！');
						}, 1000);
						setTimeout(function() {
							uni.setStorageSync('sx', true);
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					}
				});
			}
		}
	},
	onLoad(option) {
		console.log(option);
		that = this;
		// that.gid = option.id;
		// that.getinfo();
		// that.userinfo = uni.getStorageSync('userinfo');
		that.goodslist = orderlist.orderinfo.data.goods_list;
		that.data = orderlist.orderinfo.data;
	}
};
</script>

<style>
page {
	background: #f3f3f3;
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

.text-f {
	font-size: 26upx;
	color: #a8a8a8;
	line-height: 46upx;
}

.goodsinfo {
	height: 176upx;
	padding: 0upx 50upx;
	display: flex;
}

.goodsimg {
	width: 116upx;
	height: 116upx;
}

.soldi-bottom {
	border-bottom: solid #eeeeee 1upx;
}

.shouh {
	height: 50upx;
	border: 1upx solid #bbb;
	padding: 0 30upx;
	border-radius: 10upx;
	font-size: 24upx;
	background: #ffffff;
}

.li {
	padding: 20upx;
	line-height: 50upx;
}

.paytype {
	padding-left: 20upx;
}

.paytype .png {
	margin-right: 30upx;
}

.dzlist {
	height: 80upx;
	padding: 0upx 30upx;
}

.dzlist .content {
	width: 80%;
}

.print {
	width: 33upx;
	height: 33upx;
}

/* 新增样式 */
.order-status {
	height: 123rpx;
	padding: 0rpx 40rpx;
	display: flex;
	align-items: center;
	font-size: 28rpx;
	color: #b000dd;
	background: #fff;
	border-bottom: solid #eeeeee 1rpx;
}
.address-view {
	display: flex;
	justify-content: space-between;
	background: #fff;
	align-items: center;
	height: 178rpx;
	padding: 0rpx 50rpx;
}
.address-left {
	display: flex;
	font-size: 28rpx;
	color: #2f2f2f;
	line-height: 45rpx;
}
.address-left .tel {
	color: #8b8b8b;
	margin-left: 15rpx;
}
.addres-icon {
	font-size: 45rpx;
	color: #b701e5;
	margin-right: 20rpx;
	padding-top: 10rpx;
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
.li-view {
	line-height: 40rpx;
	min-height: 60rpx;
	padding: 10rpx 38rpx;
	background: #fff;
	display: flex;
	align-items: center;
	font-size: 28rpx;
}
.li-view label {
	width: 145rpx;
	color: #969696;
}
</style>
