<template>
	<view>
		<view class="header" style="background-color: #F0F0F0;">
			<view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
			<view class="padding2 top_tab " style="background-color: #F0F0F0;">
				<scroll-view scroll-x class=" nav" style="background: #F0F0F0;" :scroll-left="scrollLeft" scroll-with-animation>
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

		<view class="viewlist bg-white margin-bottom" v-for="(item, index) in list" :key="index" v-if="!item.setmeal_start">
			<view
				class="flex padding2 "
				@tap="tpinfo2"
				:data-ordertype="item.order_type"
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
						<view style="height: 40upx;">
							<view class="goods-name  " style="width: 100%;">{{ goods.goods_name }}</view>
						</view>
					</view>
					<view class="goods-info-bottom">
						<view class="text-gray text-sm  " style="width: 100%;">
							<view>
								<text class="goods-bar" v-for="(attr, attrindex) in goods.attr_list" :key="attrindex" v-if="goods.attr_list.length > 0">
									{{ attr.attr_group_name }}:{{ attr.attr_name }}
								</text>
							</view>
							<view style="height: 60upx;" v-if="goods.attr_list.length == 0">
								<text class="goods-price">￥{{ goods.price }}</text>
							</view>
						</view>
					</view>
					<view class="flex align-center justify-between" style="margin-top: 30upx;">
						<text class="goods-price">￥{{ goods.price }}</text>
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
							<text class="price1">￥{{ item.pay_price }}</text>
						</block>
					</view>
				</view>
				<view class="flex justify-between align-center" @tap.stop="">
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
							<!-- #ifndef  MP-WEIXIN -->
							<button
								class="btn v-right bg-white"
								@tap="sModel"
								:data-index="index"
								:data-id="item.order_id"
								:data-play="item.is_pay"
								v-else
							>
								{{ item.is_pay ? '退款' : '取消订单' }}
							</button>
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							<button
								class="btn v-right bg-white"
								@tap="orderRevoke"
								:data-index="index"
								:data-id="item.order_id"
								:data-play="item.is_pay"
								v-else
							>
								{{ item.is_pay ? '退款' : '取消订单' }}
							</button>
							<!-- #endif -->
						</view>
						<view class="flex-grow-1" v-if="item.is_pay == 0 && item.pay_type != 2">
							<!--  @tap.top="pay"  -->
							<button @tap.top="tpinfo2" class="btn v-right bg-white fu-btn " :data-id="item.order_id" :data-index="index">付款</button>
						</view>
						<view class=" flex align-center  " v-if="item.is_send == 1 && item.is_confirm == 0">
							<!-- <view class="flex-grow-0" v-if="item.express">
								<button class=" cu-btn btn v-right bg-white" v-if="item.goods_list.length == 1" @tap="tpinfo" :data-id="item.order_id">查看物流</button>
								<button class=" cu-btn btn v-right bg-white" v-else @tap="tpinfo2" :data-id="item.order_id">查看物流</button>
							</view> -->
							<view class="flex-grow-0">
								<button @tap="orderConfirm"  class=" cu-btn btn v-right bg-white " :data-id="item.order_id">确认收货</button>
							</view>
						</view>
						<view class="flex-grow-1" v-if="item.is_send == 1 && item.is_confirm == 1 && item.is_comment == 0">
							<button class=" cu-btn btn v-right bg-white" @tap="pingjia" :data-id="item.order_id">评价</button>
						</view>
						<view class="flex-grow-1" v-if="item.refund == 1">
							<button class=" cu-btn btn v-right bg-white" @tap="shouhuolist"  data-index="4" :data-id="item.order_id">
								售后详情
							</button>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="!access_token">
			<nolist type="1" text="您还没有登录~~"></nolist>
			<view class="text-center margin-top "><button class="cu-btn  margin-top zcolor-btn" @tap="login">去登陆</button></view>
		</view>
		<block v-else><nolist type="1" text="没有相关订单" v-if="!onlist && list.length == 0"></nolist></block>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<nolist type="1" text="没有相关订单" v-if="!onlist && list.length == 0"></nolist>
		<!-- #endif -->
		<chunLei-modal v-model="showModel" type="default" :mData="defaultData" @onConfirm="onConfirm"></chunLei-modal>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			TabCur: -1,
			scrollLeft: 0,
			navtitle: [
				{ id: -1, name: '全部' },
				{ id: 0, name: '待付款' },
				{ id: 1, name: '待发货' },
				{ id: 2, name: '待收货' },
				{ id: 3, name: '已完成' },
				{ id: 4, name: '售后' }
			],
			list: [],
			onlist: false,
			page: 1,
			onmore: false,
			access_token: '',
			defaultData: {},
			showModel: false,
			deleteId: '',
			deleteType:'',
			deleteIndex:''
		};
	},
	methods: {
		login() {
			that.$zax.yzlogin();
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			that.page = 1;
			that.list = [];
			if (that.access_token) {
				that.getorder();
			}
		},
		// 售后列表
		shouhuolist(e) {
			this.TabCur = e.currentTarget.dataset.index;
			that.list = [];
			this.$request.request({
				url: that.api.order.list,
				data: {
					status: that.TabCur,
					order_id: e.currentTarget.dataset.id
				},
				Toast: '正在加载...',
				success(res) {
					if (res.list.length > 0) {
						that.list = that.list.concat(res.list);
					} else {
						if (that.page != 1) {
							if (!that.nomore) {
								that.$alert('没有更多了！');
								that.nomore = true;
							}
						} else {
							that.onlist = false;
						}
					}
				}
			});
		},
		totclist(e) {
			uni.navigateTo({
				url: '/pages/card/tcinfo/tcinfo?id=' + e.currentTarget.dataset.id
			});
		},
		todzlist(e) {
			uni.navigateTo({
				url: '/pages/card/cardinfo/cardinfo?id=' + e.currentTarget.dataset.id
			});
		},
		getorder() {
			that.onlist = true;
			that.$request.request({
				url: that.api.order.list,
				data: {
					status: that.TabCur,
					page: that.page
				},
				success(res) {
					console.log(res);
					that.page == 1 ? (that.list = []) : '';
					if (res.list.length > 0) {
						let list = res.list;
						that.list = that.list.concat(list);
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
		sModel(e) {
			let detail = e.currentTarget.dataset;
			that.deleteId=detail.id; 
			that.deleteIndex=detail.index;
			that.showModel = true;
			that.defaultData = { 
				content: '是否取消该订单',
				cancelText: '取消',
				confirmText: '确认',
				confirmColor: '#4c4c4c'
			};
		},
		onConfirm(){
			that.$request.request({
				url: that.api.order.revoke,
				data: {
					order_id:that.deleteId 
				},
				Toast: '正在执行...',
				success(res) {
					let orderinfo=that.list[that.deleteIndex]; 
					if(orderinfo.is_pay){ 
						orderinfo.apply_delete=1
						that.list[that.deleteIndex]=orderinfo
					}else{
						that.list.splice(that.deleteIndex, 1); 
					} 
					that.$alertok("操作成功！") 
				},
				complete(){
					uni.hideLoading()
				}
			});
		},
		//取消订单
		orderRevoke: function(e) {
			let detail = e.currentTarget.dataset,
				index = detail.index,
				is_pay = detail.play; 
			console.log('支付', detail);
			uni.showModal({
				title: '提示',
				content: '是否取消该订单',
				cancelText: '否',
				confirmText: '是',
				success: function(t) {
					if (t.cancel) return !0;
					if (t.confirm) {
						that.$request.request({
							url: that.api.order.revoke,
							data: {
								order_id: e.currentTarget.dataset.id,
								o_type: order_type
							},
							Toast: '正在执行...',
							success(res) {
								// that.list.splice(index, 1);
								// that.$showModal(is_pay == 1 ? '订单取消申请已提交，请等候管理员审核' : '订单已取消');
								let orderinfo=that.list[index];
								if(orderinfo.is_pay){ 
									orderinfo.apply_delete=1
									that.list[index]=orderinfo
								}else{
									that.list.splice(index, 1); 
								} 
								that.$alertok("操作成功！")  
							}
						});
					}
				}
			});
		},
		// 确认收货
		orderConfirm: function(e) { 
			uni.showModal({
				title: '提示',
				content: '是否确认已收到货？',
				cancelText: '否',
				confirmText: '是',
				success: function(t) {
					if (t.cancel) return !0;
					that.$request.request({
						url: that.api.order.confirm,
						data: {
							order_id: e.currentTarget.dataset.id, 
						},
						Toast: '操作中...',
						success(res) {
							that.$alertok('已确认收货');
							setTimeout(function() {
								that.getorder();
							}, 1000);
						}
					});
				}
			});
		},
		pay(e) {
			let detail = e.currentTarget.dataset;
			console.log(detail);
			let index = detail.index;
			let id = detail.id;  
			that.$pay
				.pay(0, {
					order_id: id,
					order_type: order_type
				})
				.then(res => {
					console.log(res);
					that.list[index].is_pay = 1;
				});
			 
		}
	},
	onLoad(option) {
		that = this;
		that.TabCur = option.id ? option.id : 1;
		that.scrollLeft = (option.id - 1) * 60;
	},
	onShow() {
		that.access_token = uni.getStorageSync('access_token');
		if (that.access_token) {
			that.getorder();
		}
	},
	onPullDownRefresh() {
		that.getorder();
	}
};
</script>

<style>
page {
	background: #f0f0f0;
}

.v-right {
	margin-left: 20upx;
}

.btn {
	line-height: 34rpx;
	border-radius: 28upx;
	border: solid 1upx #a0a0a0;
	font-size: 26upx;
	padding: 10upx 30upx;
	background: #ffffff;
}
.fu-btn {
	border: solid 1rpx #ff4c29;
	color: #ff5230;
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

.viewlist {
	width: 706rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	margin: auto;
	margin-bottom: 23rpx;
}

.bottom-view {
	height: 110upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: solid #eeeeee 1upx;
}

.goods-img {
	width: 180rpx;
	height: 180rpx;
	background-color: #f6f6f6;
	border-radius: 10rpx;
	margin-right: 20rpx;
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
	color: #ff0101;
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
	padding-top: 10rpx;
	/* border: solid #000 1rpx; */
}
.goods-info-top .goods-name {
	line-height: 48rpx;
	font-size: 28rpx;
	color: #000;
	font-weight: 550;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.goods-info-top .goods-price {
	font-size: 26rpx;
	color: #3e3e3e;
	width: 148rpx;
	text-align: right;
}
.goods-info-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 30rpx;
}
.goods-info-bottom .goods-bar {
	font-size: 24rpx;
	color: #3883ff;
	background-color: #eff5ff;
	border-radius: 6rpx;
	padding: 10rpx 15rpx;
}
</style>
