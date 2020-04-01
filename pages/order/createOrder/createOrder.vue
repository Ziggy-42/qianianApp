<template>
	<view>
		<view class="kong"></view>
		<view class="addresscard">
			<navigator url="/pages/serve/address/address?form=1">
				<view class="  address-view " style="background-color: #fffcf7;" v-if="address">
					<view class="flex align-center justify-between">
						<view class="icon_view"><text class="Guoicon-dizhi"></text></view>
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

		<view class="card-vi" v-for="(mchitem, mchindex) in mch_list" :key="mchindex">
			<view class="more-title ">
				<label>{{ mchitem.name }}</label>
			</view>
			<block v-for="(item, index) in mchitem.goods_list" :key="index">
				<view class="flex goods-list1 padding-air bg-white">
					<view class="cu-avatar" :style="[{ backgroundImage: 'url(' + item.goods_pic + ')' }]"></view>
					<view class="" style="width: 420rpx;">
						<view class="text-cut" style="color:#262626;">{{ item.goods_name }}</view>
						<view class="flex align-center" style="font-size: 22upx;color: #a8a8a8;margin-top: 15upx;">
							<view class="goods-bar" v-for="(attr, index1) in item.attr_list" :key="index1" style="margin-right: 20upx;width: auto;">
								{{ attr.attr_group_name }}：{{ attr.attr_name }}
							</view>
						</view>
						<view class="flex align-center  justify-between" style="margin-top: 10upx;">
							<view class="price-color">
								<text v-if="item.is_level">¥{{ item.level_price }}</text>
								<text :class="item.is_level ? 'old-price' : ''">¥{{ item.price }}</text>
							</view>
							<view>x{{ item.num }}</view>
						</view>
					</view>
				</view>
			</block>
			<view class="bg-white padding-air" style="padding-bottom: 30upx;padding-top: 20upx;">
				<view class="flex justify-between text-gray align-center " style="height: 70upx;">
					<text>运费</text>
					<text class="text-price">{{ mchitem.express_price }}</text>
				</view>
				<view class="text-gray" style="line-height: 70upx;">
					<text>备注</text>
					<view style="padding: 0upx 20upx; background:RGB(245,245,245); ">
						<input class="textatea" placeholder="请填写备注" @input="getconten" :data-mchindex="mchindex" />
					</view>
				</view>
			</view>
		</view>

		<view class="card-vi"> 
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item, index) in paylist" :key="index" style="height: 88upx;border-bottom: 1upx solid ##EEE;" @tap="getpaytype" :data-index="index">
					<view class="content paytype flex align-center justify-between" style="padding-right: 40upx;">
						<view class=" flex align-center">
							<view class="prpayicon" :class="item.icon" :style="{ color: item.color }"></view>
							<text class="playtitle">{{ item.name }}</text>
						</view>
						<text class="text-sm text-gray" v-if="item.money">
							余额：
							<text class="text-price">{{ item.money ? item.money : '0' }}</text>
						</text>
					</view>
					<view class="action">
						<image class="print" v-if="payaction == index" src="/static/icon/icon-print-cur.png"></image>
						<image class="print" v-else src="/static/icon/icon-print.png"></image>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 120upx;"></view>
		<view class="foot cu-bar bg-white  tabbar border shop align-center">
			<view class="submit text-black bg-white">
				<text style="position: absolute;left: 50upx; font-size: 26upx;">
					合计：
					<text class="price-color" style=" font-size: 34upx;">￥{{ new_total_price }}</text>
				</text>
			</view>
			<view class="play" style="height: 100upx;" @tap="order_ok"><button class="cu-btn  " style="font-size: 30upx;">立即支付</button></view>
		</view>
		<chunLei-modal v-model="showModel" type="default" :mData="defaultData" @onConfirm="onConfirm"></chunLei-modal>
	</view>
</template>

<script>
var that;
import data from './data.js';
import TabMask from '@/components/chunLei-modal/tabMask';
export default {
	data() {
		return { 
			textareaValue: '',
			order: '',
			paylist: [
				{
					img: '/static/img/icon/icon-wxpay.png',
					icon: 'Guoicon-weixin',
					color: '#00c800',
					name: '微信支付',
					id: '0',
					type: 'WECHAT_PAY'
				},
				{
					img: '/static/img/icon/icon-wxpay.png',
					icon: 'Guoicon-zhifubao',
					color: '#06b4fd',
					name: '支付宝支付',
					id: '0',
					type: 'ALIPAY'
				},
				{
					img: '/static/img/icon/iocn-lqpay.png',
					name: '零钱支付',
					icon: 'Guoicon-zijin',
					color: '#F2D5A8',
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
			defaultData: {},
			showModel: false,
		};
	},
	methods: { 
		 onConfirm(){ 
			if (Number(that.money) < Number(that.new_total_price)) {
				that.$alert('您的余额不足!');
				return;
			} else {
				that.zpay();
			} 
		 },
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
			if (that.paylist[that.payaction].type == 'BALANCE_PAY') {
				that.showModel=true;
				that.defaultData = {
					title: '提示',
					content:'您的账户余额为：' + that.money + '元,是否确认支付', 
					cancelText: '取消',
					confirmText: '确定',
					confirmColor: '#3CC51F'
				}; 
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
			console.log('提交的信息：', mch_list);
			uni.showLoading({
				mask:true,
				title:"正在提交订单..."
			})
			this.$request.request({
				url: that.api.order.new_submit,
				data: {
					address_id: that.address.id,
					mch_list: JSON.stringify(mch_list),
					payment: 3,
					use_integral: 1
				},
				method: 'post',
				success(res) {
					console.log('订单信息：', res);
					console.log(that.paylist[that.payaction].type);
					that.$pay.pay(that.paylist[that.payaction].type, res.order_id).then(res => {
						if (res.code == 1) {
							that.$alert('支付失败!');
							setTimeout(function() {
								if (that.type == 'dz') {
								} else if (that.type == 'tc') {
								} else {
									uni.redirectTo({
										url: '/pages/order/orderlist/orderlist?id=-1'
									});
								}
							}, 1000);
						} else {
							that.$alertok('支付成功！');
							setTimeout(function() {
								if (that.type == 'tc') {
									uni.redirectTo({
										url: '/pages/card/card?type=tc'
									});
								} else {
									uni.redirectTo({
										url: '/pages/order/orderlist/orderlist?id=-1'
									});
								}
							}, 1000);
						}
					});
				}
			});
		},
		getconten(e) {
			let index = e.currentTarget.dataset.mchindex;
			that.mch_list[index]['content'] = e.detail.value;
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
				price = (Number(price) + Number(mch_list.level_price) + Number(mch_list.express_price)).toFixed(2);
			}
			that.new_total_price = price;
			that.$forceUpdate();
		}
	},
	onLoad(option) {
		that = this;
		that.order = uni.getStorageSync('order') ? uni.getStorageSync('order') : data.order;
		console.log('订单详情：', that.order);
		that.mch_list = that.order.mch_list;
		that.address = that.order.address;
		that.type = option.type ? option.type : '';
		that.getprice();
		that.money = uni.getStorageSync('money');
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
page {
	background: #f0f0f0;
}
.textatea {
	width: 100%;
	height: 66upx;
	background-color: #f5f5f5;
	font-size: 24rpx;
	color: #292929;
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
	color: #ff4444;
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
	background-image: linear-gradient(-60deg, #ff4c29 0%, #ff7155 100%);
	border-radius: 36upx;
	color: #fff;
}
.goods-bar {
	font-size: 24rpx;
	color: #3883ff;
	background-color: #eff5ff;
	border-radius: 3px;
	padding: 5px 7px;
}
.prpayicon {
	width: 40upx;
	font-size: 40upx;
	margin-right: 30upx;
}
.playtitle {
	font-size: 26rpx;
	color: #000000;
}
</style>
