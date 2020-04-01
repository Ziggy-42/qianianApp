<template>
	<view>
		<view class="header" style="background-color: #F0F0F0;">
			<view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
			<view class="padding2 top_tab " style="background-color: #F0F0F0;">
				<scroll-view scroll-x class=" nav" style="background: #F0F0F0;">
					<view class="flex text-center">
						<view
							class="cu-item flex-sub texty"
							:class="item.id == TabCur ? 'tab-action' : ''"
							v-for="(item, index) in navtitle"
							:key="index"
							@tap="tabSelect"
							:data-id="item.id"
							style="font-size: ;"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
		</view>
		<view style="height: 130upx;"></view>
		<!--   -->

		<view class="list bg-white margin-bottom" v-for="(item, index) in list" :key="index" v-if="!item.setmeal_start">
			<view
				class="flex padding2 "
				@tap="tpinfo2"
				:data-id="item.order_id"
				:data-order_refund_id="item.order_refund_id"
				:class="item.goods_list.length != index1 + 1 ? 'soldi-bottom' : ''"
				v-for="(goods, index1) in item.goods_list"
				:key="index1"
				style="padding-top: 20upx;padding-bottom: 20upx;"
			>
				<view class="cu-avatar goods-img " :style="[{ backgroundImage: 'url(' + goods.goods_pic + ')' }]"></view>
				<view class="com right goods-info ">
					<view class="goods-info-top ">
						<view class="goods-name" style="width: 100%;">{{ goods.goods_name }}</view>
						<text class="goods-price">￥{{ goods.price }}</text>
					</view>
					<view class="goods-info-bottom">
						<view class="text-gray text-sm  " style="width: 100%;">
							<text class="goods-bar" v-for="(attr, attrindex) in goods.attr_list" :key="attrindex">{{ attr.attr_group_name }}:{{ attr.attr_name }}</text>
						</view>
						<text class="goods-price">x{{ goods.num }}</text>
					</view>
				</view>
			</view>
			<view class="bottom-view  padding2 ">
				<view>
					<!-- <button class="btn" open-type="contact" :session-from="item.kefupara" :data-index="index">联系客服</button> -->
					<view>
						<text class="text-black">合计:</text>
						<block v-if="TabCur == 4">
							<text class="price1">￥{{ item.refund_price }}</text>
						</block>
						<block v-else>
							<text class="price1">￥{{ item.real_price }}</text>
						</block>
					</view>
				</view>
				<view class="flex justify-between align-center">
					<block v-if="TabCur == 4">
						<view v-if="item.refund_status == 0">
							<block v-if="item.refund_type == 1">
								<block v-if="item.is_agree == 0">等待处理</block>
								<block v-else>
									<block v-if="item.is_user_send == 0">待买家发货</block>
									<block v-else>等卖家待处理</block>
								</block>
							</block>
							<block v-else>等卖家待处理</block>
						</view>
						<view style="color: #36ba75" v-if="item.refund_status == 1">已同意并退款</view>
						<view style="color: #36ba75" v-if="item.refund_status == 2">已同意换货</view>
						<block v-if="item.refund_status == 3">
							<view style="color: #ff4544" v-if="item.refund_type == 1">已拒绝退货退款</view>
							<view style="color: #ff4544" v-if="item.refund_type == 2">已拒绝换货</view>
						</block>
					</block>
					<block v-else>
						<view class="flex-grow-1" v-if="item.is_send == 0">
							<text v-if="item.apply_delete == 1">退款申请中</text>
							<button class="btn v-right bg-white" @tap="orderRevoke" :data-id="item.order_id" v-else>{{ item.is_pay ? '退款' : '取消订单' }}</button>
						</view>
						<view class="flex-grow-1" v-if="item.is_pay == 0 && item.pay_type != 2">
							<button @tap="tpinfo2" class="btn v-right bg-white fu-btn " :data-id="item.order_id" :data-index="index">付款</button>
						</view>
						<view class=" flex align-center  " v-if="item.is_send == 1 && item.is_confirm == 0">
							<view class="flex-grow-0" v-if="item.express">
								<button class=" cu-btn btn v-right bg-white" v-if="item.goods_list.length == 1" @tap="tpinfo" :data-id="item.order_id">查看物流</button>
								<button class=" cu-btn btn v-right bg-white" v-else @tap="tpinfo2" :data-id="item.order_id">查看物流</button>
							</view>
							<view class="flex-grow-0"><button @tap="orderConfirm" class=" cu-btn btn v-right bg-white " :data-id="item.order_id">确认收货</button></view>
						</view>
						<view class="flex-grow-1" v-if="item.is_send == 1 && item.is_confirm == 1 && item.is_comment == 0">
							<button class=" cu-btn btn v-right bg-white" @tap="pingjia" :data-id="item.order_id">评价</button>
						</view>
						<view class="flex-grow-1" v-if="item.refund == 1">
							<button class=" cu-btn btn v-right bg-white" @tap="shouhuolist" data-index="4" :data-id="item.order_id">售后详情</button>
						</view>
					</block>
				</view>
			</view>
		</view>

		<view class="cu-modal " :class="modalName == 'kuaidi' ? 'show' : ''">
			<view class="cu-dialog" style="border-radius: 20upx;" >
				<view class="form-group">
					<label>快递公司</label>
					<view class="right"><input placeholder="请填写快递公司" placeholder-class="placeholder" /></view>
				</view>
				<view class="form-group">
					<label>快递单号</label>
					<view class="right"><input placeholder="请填写快递单号" placeholder-class="placeholder" /></view>
				</view>
				<button class="cu-btn mode1-btn" @tap="subkd">确定</button>
			</view>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<view v-if="!access_token">
			<nolist type="1" text="您还没有登录~~"></nolist>
			<view class="text-center margin-top "><button class="cu-btn bg-yellow1 margin-top" @tap="login">去登陆</button></view>
		</view>
		<block v-else><nolist type="1" text="没有相关订单" v-if="!onlist && list.length == 0"></nolist></block>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<nolist type="1" text="没有相关订单" v-if="!onlist && list.length == 0"></nolist>
		<!-- #endif -->
	</view>
</template>

<script>
var that;
import orderlist from '../../order/order.js';
export default {
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			navtitle: [
				{ id: -1, name: '全部' },
				{ id: 0, name: '未发货' },
				{ id: 1, name: '已发货' },
				{ id: 2, name: '已签收' },
				{ id: 3, name: '待评价' },
				{ id: 4, name: '售后' }
			],
			list: [],
			onlist: false,
			page: 1,
			onmore: false,
			access_token: '',
			modalName: '',
			subkdid:''
		};
	},
	methods: {
		hiddenModel(){
			that.modalName=""
		},
		showkdModel(e){
			that.subkdid=e.currentTarget.dataset.id;
			that.modalName="kuaidi";
		}, 
		subkd(){
			that.hiddenModel();
		},
		login() {
			that.$zax.yzlogin();
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			(this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60), that.getorder();
			that.page = 1;
			that.list = [];
		},  
		todzlist(e) {
			uni.navigateTo({
				url: '/pages/card/cardinfo/cardinfo?id=' + e.currentTarget.dataset.id
			});
		},
		getorder() {
			that.onlist = true;
			this.$request
				.request({
					url:  that.api.live.anchor_order,
					data: {
						type:that.TabCur,
						page:that.page
					}
				})
				.then(res => { 
					console.log(res);
					if (res.data.list.length > 0){
						let list = res.data.list;
						that.list = list;
					} else {
						if (that.page != 1) {
							if (!that.nomore) {
								that.$alert('没有更多了！');
								that.nomore = true;
							}
						} else {
							that.onlist = false;
						}
						that.list = [];
					} 
			 });
		},
		tpinfo(e) {
			uni.navigateTo({
				url: '/pages/order/shopOrderinfo/shopOrderinfo?id=' + e.currentTarget.dataset.id
			});
		},
		//评价
		pingjia(e) {
			uni.navigateTo({
				url: '/pages/order/pingjia/pingjia?id=' + e.currentTarget.dataset.id
			});
		},
		// 第二种详情
		tpinfo2(e) {
			// 售后详情
			console.log(e.currentTarget.dataset.order_refund_id);
			if (e.currentTarget.dataset.order_refund_id) {
				uni.navigateTo({
					url: '/pages/order/shouhou/shouhouInfo/shouhouInfo?id=' + e.currentTarget.dataset.order_refund_id
				});
			} else {
				uni.navigateTo({
					url: '/pages/order/orderinfo2/orderinfo2?id=' + e.currentTarget.dataset.id
				});
			}
		},
		//取消订单
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
										that.getorder();
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
			// 					that.list = [];
			// 					setTimeout(function() {
			// 						that.getorder();
			// 					}, 1000);
			// 				}
			// 			})
			// 		);
			// 	}
			// });
		},
		// 确认收货
		orderConfirm: function(e) {
			var a = this;
			that.tanchuang
				.showModel({
					title: '提示',
					content: '是否确认已收到货？',
					cancelText: '否',
					confirmText: '是'
				})
				.then(res => {
					if (res == 'confirm') {
						that.$request
							.get(
								{
									url: 'api/order/confirm',
									data: {
										order_id: e.currentTarget.dataset.id
									}
								},
								'操作中'
							)
							.then(res => {
								if (res.code == 1) {
									that.$alert(res.msg);
								} else {
									console.log(res);
									that.$alert(res.msg);
									setTimeout(function() {
										that.getorder();
									}, 1000);
								}
							});
					}
				});
			// uni.showModal({
			// 	title: '提示',
			// 	content: '是否确认已收到货？',
			// 	cancelText: '否',
			// 	confirmText: '是',
			// 	success: function(t) {
			// 		if (t.cancel) return !0;
			// 		that.$request
			// 			.get(
			// 				{
			// 					url: 'api/order/confirm',
			// 					data: {
			// 						order_id: e.currentTarget.dataset.id
			// 					}
			// 				},
			// 				'操作中'
			// 			)
			// 			.then(res => {
			// 				if (res.code == 1) {
			// 					that.$alert(res.msg);
			// 				} else {
			// 					console.log(res);
			// 					that.$alert(res.msg);
			// 					setTimeout(function() {
			// 						that.getorder();
			// 					}, 1000);
			// 				}
			// 			});
			// 	}
			// });
		},
		// 打开客服
		kefu(e) {
			// #ifndef MP-WEIXIN
			var that = this;
			// console.log(that.userinfo)
			var goods = that.list[e.currentTarget.dataset.index];
			var userinfo = uni.getStorageSync('userinfo');
			var customer = {
				head: userinfo.avatar_url, //该字段可以将顾客头像同步过来
				名称: userinfo.nickname,
				订单号: goods.order_no
			};
			customer = JSON.stringify(customer);
			console.log('爱上你的', customer);
			//用 encodeURIComponent 进行编码
			customer = encodeURIComponent(customer);
			let url1 = goods.kf_link ? goods.kf_link : '';
			console.log(customer, url1);
			uni.navigateTo({
				url: '/pages/kefu/kefu?url=' + url1 + '&customer=' + customer
			});
			// #endif
		}
	},
	onLoad(option) {
		that = this;
		that.TabCur = option.id ? option.id : 0;
	},
	onShow() {
		that.list = orderlist.orderlist;
		// that.access_token = uni.getStorageSync('access_token');
		// that.jsonUser = uni.getStorageSync('jsonUser');
		// if (uni.getStorageSync('access_token')) {
		// 	that.getorder();
		// }
	}
};
</script>

<style>
page {
	/* background: #FFFFFF; */
}

.v-right {
	margin-left: 20upx;
}

.btn {
	line-height: 34upx;
	border-radius: 28upx;
	border: solid 1upx #a0a0a0;
	font-size: 26upx;
	padding: 10upx 30upx;
	background: #ffffff;
}
.fu-btn {
	border: solid 1upx #b701e5;
	color: #b701e5;
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

.list {
	width: 706upx;
	background-color: #ffffff;
	border-radius: 20upx;
	margin: auto;
	margin-bottom: 23upx;
}

.bottom-view {
	height: 110upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: solid #eeeeee 1upx;
}

.goods-img {
	width: 180upx;
	height: 180upx;
	background-color: #f6f6f6;
	border-radius: 10upx;
	margin-right: 20upx;
}

.texty {
	font-size: 28upx;
	color: #999999;
}

.tab-action {
	font-size: 28upx;
	color: #b701e5;
	border-bottom: solid #b701e5 5upx;
}

.hj {
	height: 70upx;
	font-size: 28upx;
}

.cu-tag1 {
	font-size: 22upx;
	padding: 8upx 14upx;
	border-radius: 5upx;
}

.price1 {
	font-size: 28upx;
	color: #b701e5;
	margin-left: 15upx;
}

.nav .cu-item {
	height: 80upx;
}

.header {
	position: fixed;
	width: 100%;
	z-index: 999;
}

.goods-info-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 10upx;
	/* border: solid #000 1upx; */
}
.goods-info-top .goods-name {
	line-height: 48upx;
	font-size: 28upx;
	color: #000;
	font-weight: 550;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.goods-info-top .goods-price {
	font-size: 26upx;
	color: #3e3e3e;
	width: 148upx;
	text-align: right;
}
.goods-info-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 30upx;
}
.goods-info-bottom .goods-bar {
	font-size: 24upx;
	color: #cc49f1;
	background-color: #fdf4ff;
	border-radius: 6upx;
	padding: 10upx 15upx;
}

/* 弹窗 */
.mode1-btn {
	height: 114upx;
	font-size: 30upx;
	color: #b701e5;
	width: #FFF;
	background: #FFFFFF;
}
.form-group {
	height: 135upx;
	padding: 0upx 52upx;
	display: flex;
	align-items: center;
	background: #ffffff;
	border-bottom: solid 1upx #ebebeb;
}
.form-group label{
	text-align: left;
}
.form-group .right input {
	text-align: right;
}
.placeholder {
	text-align: right;
}
</style>
