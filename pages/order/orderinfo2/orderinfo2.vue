<template>
	<view>
		<view class=" bg-yanhong order-status">
			<!-- {{ data.status }} -->
			<view class="order-status-left">
				<view class="" v-if="data.is_send == 0">
					<block v-if="data.apply_delete == 1">
						<view class="status-title">退款申请中</view>
						<view class="status-subtitle">请耐心等待</view>
					</block>
					<block v-else>
						<block v-if="data.is_pay">
							<view class="status-title">订单等待发货</view>
							<view class="status-subtitle">包裹正在等待揽收，请耐心等待</view>
						</block>
						<block v-else>
							<view class="status-title">订单等待付款</view>
							<view class="status-subtitle"></view>
						</block>
					</block>
				</view>
				<view class="  " v-if="data.is_send == 1 && data.is_confirm == 0">
					<view class="status-title">订单等待收货</view>
					<view class="status-subtitle">包裹正在路上，请耐心等待</view>
				</view>
				<view v-if="data.is_send == 1 && data.is_confirm == 1 && data.is_comment == 0">
					<view class="status-title">订单已收货</view>
					<view class="status-subtitle">包裹已收到，快去评价吧</view>
				</view>
				<view v-if="data.refund == 1">售后详情</view>
			</view>
			<view>
				<view v-if="data.is_send == 0">
					<block v-if="data.apply_delete == 1"><text class="Guoicon-weibiaoti12 icon"></text></block>
					<block v-else>
						<block v-if="data.is_pay"><text class="Guoicon-daifahuo1 icon"></text></block>
						<block v-else><text class="Guoicon-fukuan icon"></text></block>
					</block>
				</view>
				<view class="" v-if="data.is_send == 1 && data.is_confirm == 0"><text class="Guoicon-daishouhuo1 icon"></text></view>
				<view class="" v-if="data.is_send == 1 && data.is_confirm == 1 && data.is_comment == 0"><text class="Guoicon-weibiaoti12 icon"></text></view>
				<view class="" v-if="data.refund == 1">售后详情</view>
			</view>
		</view>

		<view class="address-view">
			<view class="address-left  ">
				<view class="cuIcon-locationfill addres-icon flex  align-center "></view>
				<view class="">
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
				<view style=" margin-left: 20upx; width: 450upx;">
					<view class="text-cut goods-name ">{{ item.name ? item.name : item.attr.name }}</view>
					<view style=" height: 80upx;">
						<view class="flex " style="flex-wrap: wrap;">
							<view class="goods-bar" style="margin-right: 15upx;" v-for="(item1, index1) in item.attr" :key="index1">
								{{ item1.attr_group_name }}: {{ item1.attr_name }}
							</view>
						</view>
					</view>
					<view class="flex justify-between align-center ">
						<text>￥{{ item.total_price }}</text>
						<view>x{{ item.num }}</view>
						<block v-if="item.order_refund_enable == 1">
							<view class="flex sqsh align-center  " v-if="order_type == 0">
								<button class="cu-btn shouh bg-white" v-if="item.is_order_refund == 0" @tap="shouh" :data-order_detai_id="item.order_detail_id">申请售后</button>
								<text class="refund-text text-sm text-gray" v-if="item.is_order_refund == 1">已申请售后</text>
							</view>
						</block>
					</view>
				</view>
			</view>
			<!-- 进入 -->
			<!-- <block v-if="item.order_refund_enable == 1">
				<view class="flex  sqsh align-center  ">
					<view class="margin-right">
						<button class="cu-btn shouh bg-white" v-if="item.express" @tap="tpwl" :data-order_detai_id="item.order_detail_id">查看物流</button>
					</view>
					<button class="cu-btn shouh bg-white" v-if="item.is_order_refund == 0" @tap="shouh" :data-order_detai_id="item.order_detail_id">申请售后</button>
					<text class="refund-text text-sm text-gray" v-if="item.is_order_refund == 1">已申请售后</text>
				</view>
			</block> -->
		</view>
		<view class="ol">
			<view class="li-view">
				<label>总额</label>
				<view>￥{{ data.goods_total_price ? data.goods_total_price : '' }}</view>
			</view>
			<view class="li-view">
				<label>数量</label>
				<view>x{{ data.num ? data.num : '' }}</view>
			</view>
			<view class="li-view">
				<label>运费</label>
				<view>{{ data.express_price ? data.express_price : 0.0 }}</view>
			</view>
			<view class="li-view">
				<label>买家留言</label>
				<view class="" style="flex: 1;">{{ data.content ? data.content : '无' }}</view>
			</view>
			<view class="li-view">
				<label>订单编号</label>
				<view class="" style="flex: 1;">{{ data.order_no ? data.order_no : '无' }}</view>
			</view>
			<view class="li-view" v-if="data.words">
				<label>商家留言</label>
				<view class="" style="flex: 1;">{{ data.words ? data.words : '无' }}</view>
			</view>
			<!-- <view class="li-view">
				<label>订单编号</label>
				<view class="" style="width: 550upx;">{{ data.order_no ? data.order_no : '' }}</view>
			</view> -->
			<!-- <view class="li-view">
				<label>下单时间</label>
				<view class="" style="width: 550upx;">{{ data.addtime ? data.addtime : '' }}</view>
			</view> -->
		</view>
		<view class="kong"></view>

		<view v-if="data.express" class=" bg-white padding-top">
			<view class="title-xme">
				<view class="shu"></view>
				物流信息
			</view>
			<view class="bg-white">
				<view class="white"></view>
				<view class="flex justify-between li" style="padding-left: 40upx;">
					<view class="" style="font-size: 28upx;">
						<view>
							<text style="color: #969696; margin-right: 30upx;">快递公司</text>
							{{ data.express ? data.express : '' }}
						</view>
						<view>
							<text style="color: #969696; margin-right: 30upx;">快递单号</text>
							{{ data.express_no ? data.express_no : '' }}
						</view>
					</view>
				</view>
			</view>
			<view class="d-bottom  bg-white">
				<view class="cu-timeline flex" v-for="(item, index) in express" :key="index">
					<view class="cu-time">
						<view class="tv-2">{{ item.datetime ? item.datetime : '' }}</view>
					</view>
					<view class="cu-item" :class="index == 0 ? 'cu-item1' : index + 1 == express.length ? 'cu-item2' : ''">
						<view class="content" style="width:540upx;">{{ item.detail ? item.detail : '' }}</view>
					</view>
				</view>
				<view class="text-gray text-center" style="height: 100upx;" v-if="express.length == 0">物流信息查询失败</view>
			</view>
		</view>

		<view style="height: 120upx;"></view>
		<view class="foot-view">
			<view class="">
				合计：
				<text style="color:#ff2424;">¥ {{ data.pay_price ? data.pay_price : '' }}</text>
			</view>
			<view>
				<block v-if="data.is_pay == 0"><button class="cu-btn play-btn" @tap="pay">立即支付</button></block>
				<block v-else>
					<block v-if="data.is_send == 0">
						<view v-if="data.apply_delete == 1">退款申请中</view>
						<view v-if="data.is_pay == 1 && data.apply_delete == 0">
							<!-- #ifdef MP-WEIXIN -->
							<button class="tk-btn cu-btn" @tap="orderRevoke" :data-id="data.order_id">申请退款</button>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<button class="tk-btn cu-btn" @tap="sModel" :data-id="data.order_id">申请退款</button>
							<!-- #endif -->
						</view>
					</block>
				</block>  
				<view class="  " v-if="data.is_send == 1 && data.is_confirm == 0">
					<button class="tk-btn cu-btn" @tap="shouhuo" :data-id="data.order_id">确认收货</button>
				</view>
				<view v-if="data.is_send == 1 && data.is_confirm == 1 && data.is_comment == 0">
					 <button class="tk-btn cu-btn" @tap="sModel" :data-id="data.order_id">去评价</button>
				</view>
				
			</view>
		</view>
		<chunLei-modal v-model="showModel" type="default" :mData="defaultData" @onConfirm="onConfirm"></chunLei-modal>
	</view>
</template>

<script>
var that;
import orderlist from '../order.js';
export default {
	data() {
		return {
			gid: '',
			goodslist: [],
			data: {},
			dzpay: false,
			payaction: -1,
			content: '',
			dzcard: [],
			modal: false,
			express: [],
			order_type: '',
			defaultData: {},
			showModel: false
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
			this.$request.request({
				url: that.api.order.detail,
				data: {
					order_id: that.gid,
					o_type: that.order_type
				},
				Toast: '正在加载...',
				success(res) {
					console.log('详情：', res);
					that.goodslist = res.goods_list;
					that.data = res;
				}
			});
		},
		sModel(e) {
			let detail = e.currentTarget.dataset,
				order_type = detail.ordertype;
			that.deleteId = detail.id;
			that.deleteType = order_type;
			that.deleteIndex = detail.index;
			that.showModel = true;
			that.defaultData = {
				title: '提示',
				content: '是否取消该订单',
				cancelText: '取消',
				confirmText: '确认',
				confirmColor: '#00ba00'
			};
		},
		onConfirm() {
			that.$request.request({
				url: that.api.order.revoke,
				data: {
					order_id: that.gid
				},
				Toast: '正在执行...',
				success(res) {
					that.$alertok('操作成功！');
					uni.navigateBack({
						delta: 1
					});
				},
				complete() {
					uni.hideLoading();
				}
			});
		}, 
		shouhuo(){ 
			that.$request.request({
				url: that.api.order.confirm,
				data: {
					order_id:that.gid
				},
				Toast: '操作中...',
				success(res) {
					that.$alertok('已确认收货');
					setTimeout(function() {
						that.getinfo();
					}, 1000);
				},
				complete(){
					uni.hideLoading();
				}
			});
		}, 
		orderRevoke: function(e) {
			var a = this;
			uni.showModal({
				title: '提示',
				content: '是否取消该订单',
				cancelText: '否',
				confirmText: '是',
				success: function(t) {
					if (t.confirm) {
						that.$request.request({
							url: that.api.order.revoke,
							data: {
								order_id: that.gid
							},
							Toast: '正在执行',
							success() {
								that.$alertok('操作成功！');
								uni.navigateBack({
									delta: 1
								});
							},
							fail(res) {
								uni.hideLoading();
							}
						});
					}
				}
			});
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
		// 控制弹窗
		hideModal(e) {
			that.modal = !that.modal;
		},
		shouh(e) {
			console.log(e.currentTarget.dataset);
			uni.navigateTo({
				url: '/pages/order/refundOrder/refundOrder?id=' + e.currentTarget.dataset.order_detai_id
			});
		},
		// 支付
		pay() {
			let id = that.gid;
			let order_type = that.ordertype;
			if (order_type) {
				that.$request
					.request({
						url: that.api.live_order.pay_data,
						data: {
							order_id: id
						},
						method: 'post'
					})
					.then(res => {});
			} else {
				that.$pay
					.pay(0, {
						order_id: id,
						order_type: order_type
					})
					.then(res => {});
			}
		},
		getwl(orderinfo) {
			let order_type = that.order_type;
			this.$request.request({
				url: that.api.order.express_detail,
				data: {
					order_id: that.gid,
					detail_id: that.detail_id,
					o_type: order_type
				},
				rejectType: true,
				success(res) {
					that.express = res.list ? res.list : [];
				}
			});
		}
	},
	onLoad(option) {
		that = this;
		that.gid = option.id ? option.id : '21';
		that.order_type = option.order_type ? option.order_type : '';
	},
	onShow() {
		that.userinfo = uni.getStorageSync('userinfo');
		that.getinfo();
		that.getwl();
	}
};
</script>

<style>
page {
	background: #f0f0f0;
}
.kong {
	background: #f0f0f0;
}
.addres-icon {
	font-size: 45upx;
	color: #ff4444;
}
.goods-bar {
	font-size: 24upx;
	color: #3883ff;
	background-color: #eff5ff;
}
.tk-btn {
	background-color: #ffffff;
	border-radius: 32upx;
	border: solid 1upx #a0a0a0;
	font-size: 26upx;
	color: #4b4b4b;
}
</style>
