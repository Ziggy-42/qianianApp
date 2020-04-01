<template>
	<view>
		<view class="ssssheader" style="background-color: #F0F0F0;">
			<view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
			<view class="padding2 top_tab " style="background-color: #F0F0F0;">
				<scroll-view scroll-x class=" nav" style="background: #F0F0F0;" :scroll-left="scrollLeft" scroll-with-animation>
					<view class="flex text-center">
						<view class="cu-item flex-sub texty" :class="-1 == TabCur ? 'tab-action' : ''" @tap="tabSelect" :data-id="-1" style="font-size: ;">全部</view>
						<view
							class="cu-item flex-sub texty"
							:class="index == TabCur ? 'tab-action' : ''"
							v-for="(item, index) in navtitle"
							:key="index"
							@tap="tabSelect"
							:data-id="index"
							style="font-size: ;"
						>
							{{ item }}
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
		</view>
		<view style="height: 110upx;"></view>

		<view class="bg-white viewlist" v-for="(item, index) in list" :key="index">
			<!-- 拼团成功 -->
			<!-- <view class="top_view flex justify-between align-center padding2 soldi-bottom" v-if="TabCur != 4">
				<view class=" ">
					{{ item.status_name }}
					<block v-if="item.is_group == 1 && item.status == 2">，还差{{ item.surplusGruopNum }}人成团</block>
				</view>
				<view class="" v-if="(item.is_group == 1 && item.status == 2) || (item.status == 1 && item.is_show_time)">
					剩{{ item.limit_time.days }}天{{ item.limit_time.hours }}小时{{ item.limit_time.mins }}分
				</view>
			</view>
			<view class="top_view flex justify-between align-center padding2 soldi-bottom" v-else>
				<view class="text-gray">订单号:{{ item.order_no }}</view>
				<view class="text-gray">{{ item.addtime }}</view>
			</view> -->
			<view
				class="flex padding2 "
				@tap="tpinfo"
				:data-id="item.order_id"
				:class="item.goods_list.length > 1 ? 'soldi-bottom' : ''"
				v-for="(goods, index1) in item.goods_list"
				:key="index1"
				style="padding-top: 20upx;padding-bottom: 20upx;"
			>
				<view class="cu-avatar goods-img " :style="[{ backgroundImage: 'url(' + goods.goods_pic + ')' }]"></view>
				<view class="com right flex justify-between align-center">
					<view class="text-cut" style="width: 100%;">{{ goods.goods_name }}</view>
					<view class="text-gray text-sm" style="width: 100%;">
						<text class="goods-bar" v-for="(attr, attrindex) in goods.attr_list" :key="attrindex">{{ attr.attr_group_name }}:{{ attr.attr_name }}</text>
					</view>
					<view class="flex align-center justify-between" style="width: 100%;">
						<text class="">￥{{ goods.price }}</text>
						<text class="">x{{ goods.num }}</text>
					</view>
				</view>
			</view>

			<view class="padding2">
				<view class="hj ">
					<text class="">合计:</text>
					<text class="price1">￥{{ item.total_price }}</text>
				</view>
			</view>
			<view class="bottom-view padding2" v-if="TabCur != 4">
				<view class="hj">
					<text class="">合计:</text>
					<text class="price1">￥{{ item.total_price }}</text>
				</view>
				<view>
					<view class="flex-grow-1" style="text-align:left;" v-if="item.refund_status == 0">
						<block v-if="item.refund_type == 1">
							<block v-if="item.is_agree == 0">等待处理</block>
							<block v-else>
								<block v-if="item.is_user_send == 0">待买家发货</block>
								<block v-else>等卖家待处理</block>
							</block>
						</block>
						<block v-else>等卖家待处理</block>
					</view>
					<block v-if="TabCur == 4">
						<text class="text-sm text-gray" v-if="item.refund_status == 1">同意已退款</text>
						<text class="text-sm text-gray" v-if="item.refund_status == 2">已同意换货</text>
						<text class="text-sm text-gray" v-if="item.refund_status == 3">已拒绝退换货</text>
						<text class="text-sm text-gray" v-if="item.refund_type == 1">退货退款：¥ {{ item.refund_price }}</text>
						<text class="text-sm text-gray" v-if="item.refund_type == 2">换货</text>
					</block>
				</view>
				<view class="flex justify-between align-center">
					<text v-if="item.apply_delete == 1 && TabCur == 0">取消申请中</text>
					<block
						bindtap="goToCancel"
						class=""
						:data-id="item.order_id"
						v-if="item.apply_delete == 0 && item.is_cancel == 0 && item.status == 0 && item.status != 4 && item.is_send == 0"
					>
						<button class="cu-btn btn text-red">取消</button>
					</block>
					<block class="btn bg-yellow1 btn-pay" v-if="item.status == 1 && item.is_cancel == 0">
						<button class="cu-btn btn click-btn  " @tap="toinfo" data-type="2" :data-id="item.order_id" :data-index="index">去支付</button>
					</block>
					<block class="btn" v-if="(item.status == 2 || item.status == 3 || item.status == 4) && item.is_group == 1">
						<!-- <button class="cu-btn btn " @tap="toinfo" data-type="1" :data-id="item.order_id">拼团详情</button> -->
						<view class="  ">
							<block v-for="(useritem, userindex) in item.user_list">
								<view class="cu-avatar sm round " :style="{ backgroundImage: 'url(' + useritem.avatar_url + ')' }"></view>
							</block>
						</view>
					</block>
					<block v-if="item.is_send == 1 && item.is_confirm == 1 && item.is_comment == 0"><button class="btn cu-btn ">评价</button></block>
				</view>
			</view>
		</view>

		<nolist type="1" text="没有相关订单!" style="margin-top:30upx;" v-if="nolist"></nolist>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			navtitle: ['待付款', '拼团中', '拼团成功', '拼团失败', '售后'],
			list: [],
			paymodal: false,
			paylist: [
				{
					img: '/static/img/icon/icon-wxpay.png',
					name: '微信支付',
					id: '0',
					type: 'WECHAT_PAY'
				},
				{
					img: '/static/img/icon/icon-alpay.png',
					name: '支付宝支付',
					id: '0',
					type: 'AL_PAY'
				},
				{
					img: '/static/img/icon/iocn-lqpay.png',
					name: '零钱支付',
					id: '0',
					type: 'BALANCE_PAY'
				}
			],
			payaction: 1,
			nolist: false,
			nomore: false
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			that.getorder();
		},
		getorder() {
			that.nolist = false;
			this.$request.request({
				url: that.api.group.order.list,
				data: {
					status: that.TabCur
				},
				success(res) {
					that.list = res.list;
					if (res.list.length == 0) {
						that.nolist = true;
					}
				}
			});
		},
		tpinfo(e) {
			uni.navigateTo({
				url: '/pages/order/groupOrder/groupOrderInfo/groupOrderInfo?id=' + e.currentTarget.dataset.id
			});
		},
		toinfo(e) {
			console.log(e);
			if (e.currentTarget.dataset.type == 2) {
				uni.navigateTo({
					url: '/pages/order/groupOrder/groupOrderInfo/groupOrderInfo?id=' + e.currentTarget.dataset.id
				});
			} else {
				uni.navigateTo({
					url: '/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo?id=' + e.currentTarget.dataset.id
				});
			}
		},
		//取消订单
		orderRevoke: function(e) {
			var a = this;
			that.tanchuang
				.showModel({
					title: '提示',
					content: '是否取消该订单？',
					cancelText: '否',
					confirmText: '是'
				})
				.then(res => {
					if (res == 'confirm') {
						that.$request.request({
							url: 'api/order/revoke',
							data: {
								order_id: e.currentTarget.dataset.id
							},
							Toast: '正在执行',
							success(res) {
								console.log(res);
								that.$alertok(res.msg);
								that.getorder();
							}
						});
					}
				});
		}
	},
	onLoad(option) {
		that = this;
		if (option.id) {
			that.TabCur = option.id;
		}
	},
	onShow() {
		that.getorder();
	}
};
</script>

<style>
page {
	background: #f0f0f0;
}

.white {
	background: #f0f0f0;
}

.cu-btn {
	background: #ffffff;
}

.btn {
	height: 56upx;
	border-radius: 10upx;
	border: solid 1upx #bbb9b9;
	line-height: 56upx;
	font-size: 25upx;
	padding: 0upx 25upx;
	background-color: #ffffff;
	background: #ffffff !important;
	margin-left: 15upx;
}

.btn-pay {
	border: none;
	color: #ffffff;
}

.top_view {
	font-size: 24upx;
	height: 74upx;
}

.soldi-bottom {
	border-bottom: solid 1upx #e2e2e2;
}

.padding2 {
	padding: 0upx 40upx;
}

.right {
	width: 480upx;
	flex-wrap: wrap;
}

.bottom-view {
	height: 90upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.goods-img {
	width: 150upx;
	height: 150upx;
	margin-right: 35upx;
}

.texty {
	font-size: 28upx;
	color: #999999;
}

.tab-action {
	font-size: 28upx;
	color: #ff4c29;
	border-bottom: solid #ff4c29 5upx;
}

.hj {
	display: flex;
	align-items: center;
	height: 70upx;
	font-size: 28upx;
}

.cu-tag1 {
	font-size: 22upx;
	padding: 8upx 14upx;
}

.price1 {
	font-size: 28upx;
	color: #ff0101;
	margin-left: 20upx;
}

.nav .cu-item {
	height: 80upx;
}

.header {
	position: fixed;
	width: 100%;
	z-index: 999;
}

.viewlist {
	width: 706upx;
	background-color: #ffffff;
	border-radius: 20upx;
	margin: auto;
	margin-bottom: 23upx;
}
.goods-bar {
	color: #3883ff;
	background-color: #eff5ff; 
}
.click-btn {
	width: 145upx;
	height: 57upx;
	background-color: #ffffff;
	border-radius: 28upx;
	border: solid 1upx #ff4c29;
	font-size: 26upx;
	color: #ff5230;
}
</style>
