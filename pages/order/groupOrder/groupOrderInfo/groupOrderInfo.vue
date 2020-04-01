<template>
	<view style="background-color: #fff;">
		<!-- <cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">订单详情</block>
		</cu-custom> -->
		<view style="background-color: #f3f3f3;height: 21upx;width: 100%;"></view>
		<view class="d-finish flex align-center" style="width: 100%;height: 143upx;background-color: #ffd100;overflow: hidden;padding-left: 30upx;">
			<view style="font-size: 32upx;line-height: 70upx;font-weight: 600;">
				<block class="order-status flex-row">
					<text>{{ data.status_name }}</text>
					<text class="ml-2" v-if="data.status == 3 && data.is_send == 0 && data.apply_delete == 0">请等待发货</text>
					<text class="ml-2" v-if="data.apply_delete == 1 && data.status == 1">取消申请中</text>
					<text class="ml-2" v-if="data.status == 3 && data.is_send == 1 && data.is_confirm == 0">订单已发货</text>
					<text class="ml-2" v-if="data.status == 3 && data.is_send == 1 && data.is_confirm == 1">订单已完成</text>
					<text class="ml-2" v-if="data.apply_delete == 1 && data.status == 3">已申请售后</text>
					<text class="ml-2" v-if="data.apply_delete == 2 && data.status == 3 && data.is_send == 0">取消申请中</text>
				</block>
				<block class="order-time flex-row" v-if="data.status == 2">
					{{ limit_time.hours ? limit_time.hours : '00' }}小时{{ limit_time.mins ? limit_time.mins : '00' }}分{{ limit_time.secs ? limit_time.secs : '00' }}秒
					后自动取消订单
				</block>
			</view>
		</view>

		<view v-if="data.express">
			<view class="white"></view>
			<view class="flex  justify-between  li ">
				<view class="">
					<view>快递公司:{{ data.express }}</view>
					<view>快递单号:{{ data.express_no }}</view>
				</view>
				<view><text class="cuIcon-right"></text></view>
			</view>
		</view>

		<view class="white"></view>
		<view class="li">
			<view class="flex justify-between">
				<view>联系人：{{ data.name }}</view>
				<view>{{ data.mobile }}</view>
			</view>
			<view>收货地址：{{ data.address }}</view>
		</view>
		<view class="white"></view>
		<view class="li">
			<view>订单编号：{{ data.order_no }}</view>
			<view>下单时间：{{ data.addtime }}</view>
		</view>
		<view class="white"></view>
		<view class="li">
			<view class="flex justify-between">
				<text>商品总额</text>
				<text>￥{{ data.goods_total_price }}</text>
			</view>
			<view class="flex justify-between">
				<text>商品数量</text>
				<text>x{{ data.num }}</text>
			</view>
			<!-- 	<view class="flex justify-between" v-if="data.colonel>0&&data.is_group==1">
				<text>团长优惠</text>
				<text>¥ {{data.colonel}}</text>
			</view> -->
			<view class="flex justify-between">
				<text>运费</text>
				<text>￥{{ data.express_price }}</text>
			</view>
			<view class="flex justify-between" v-if="data.content">
				<text>买家留言</text>
				<view class="text-right" style="width: 550upx;">{{ data.content }}</view>
			</view>
			<view class="flex justify-between" v-if="data.words">
				<text>商家留言</text>
				<view class="text-right" style="width: 550upx;">{{ data.words ? data.words : '无' }}</view>
			</view>
			<view class="order-total-price">
				合计：
				<text style="color:#ff5c5c;">¥ {{ data.pay_price }}</text>
			</view>
		</view>
		<view class="white"></view>
		<view class="soldi-bottom" v-for="(item, index) in goodslist" :key="index">
			<view class="goodsinfo flex align-center ">
				<view class="cu-avatar goodsimg" :style="[{ backgroundImage: 'url(' + item.goods_pic + ')' }]"></view>
				<view style=" margin-left: 20upx; width: 500upx;">
					<view>{{ item.name }}</view>
					<view class="flex ">
						<view v-for="(item1, index1) in item.attr" :key="index1">{{ item1.attr_group_name }}: {{ item1.attr_name }}</view>
					</view>
					<view class="flex justify-between">
						<text>￥{{ item.total_price }}</text>
						<text>x{{ item.num }}</text>
					</view>
				</view>
			</view>
			<!-- <block v-if="item.order_refund_enable==1">
				<view class="text-right sqsh align-center">
					<button class="cu-btn shouh bg-white" v-if="item.is_order_refund==0" @tap="shouh" :data-order_detai_id="item.order_detail_id">申请售后</button>
					<text class="refund-text text-sm text-gray" v-if="item.is_order_refund==1">已申请售后</text>
				</view>
			</block> -->
		</view>

		<view v-if="data.is_pay == 0">
			<view class="fangshi" style="background: #fff;height: 86upx;line-height: 86upx;padding-left: 56upx;">
				<text style="color: #9a9a9a;font-size: 24upx;">支付方式</text>
			</view>
			<view class="cu-list menu"> 
				<view class="cu-item" v-for="(item, index) in paylist" :key="index" style="height: 88upx;border-bottom: 1upx solid #e7e7e7;" @tap="getpaytype" :data-index="index">
					<view class="content paytype flex align-center">
						<image :src="item.img" class="png" mode="aspectFit" style="margin-right: 30upx;"></image>
						<text class="text-grey">{{ item.name }}</text>
					</view>
					<view class="action">
						<image class="print" v-if="payaction == index" src="/static/img/icon/icon-print.png"></image>
						<image class="print" v-else src="/static/img/icon/icon-printno.png"></image>
					</view>
				</view>
			</view>
			<view class="text-center padding-bottom margin-top"><button class="cu-btn bg-yellow1" style="width: 80%;height: 80upx; " @tap="pay">确认支付</button></view>
		</view>
		<view v-else>
			<view style="height: 120upx; background: #F0F0F0;"></view>
			<view class="footer flex justify-end align-center" v-if="data.is_send == 0">
				<block v-if="data.is_pay == 1">
					<view v-if="data.apply_delete == 0">
						<button class="play-btn  cu-btn bg-yellow1" @tap="orderRevoke" :data-id="data.order_id">申请退款</button>
						<block v-if="data.status == 2"><button class="play-btn cu-btn  bg-yellow1" @tap="tpgroupinfo">邀请参团</button></block>
						<block v-if="data.apply_delete == 0 && data.status == 3 && data.is_send == 1 && data.is_confirm == 0">
							<button bindtap="toConfirm" class="play-btn cu-btn bg-yellow1">确认收货</button>
						</block>
					</view>
					<view v-else>退款申请中</view>
				</block>
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
var item;
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
			modal: false,
			limit_time: [],
			userinfo:''
		};
	},
	methods: {
		getinfo() {
			this.$request
				.get(
					{
						url: 'api/group/order/detail',
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
						that.countDownRun(res.data.limit_time_ms);
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
		// 倒计时
		countDownRun: function(n) {
			var r = this;
			item = setInterval(function() {
				var e = new Date(n[0], n[1] - 1, n[2], n[3], n[4], n[5]) - new Date(),
					t = parseInt((e / 1e3 / 60 / 60) % 24, 10),
					o = parseInt((e / 1e3 / 60) % 60, 10),
					i = parseInt((e / 1e3) % 60, 10);
				(t = r.checkTime(t)), (o = r.checkTime(o)), (i = r.checkTime(i));
				var limit_time = {
					hours: 0 < t ? t : 0,
					mins: 0 < o ? o : 0,
					secs: 0 < i ? i : 0
				};
				that.limit_time = limit_time;
				that.$forceUpdate();
			}, 1e3);
		},
		checkTime: function(e) {
			return e < 10 && (e = '0' + e), e;
		}, 
		// 支付
		pay() {
			var dzmoney = 0;
			var zmoney = that.new_total_price; 
			if(that.paylist[that.payaction].type=="BALANCE_PAY"){
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
								that.$pay.grouppay(that.paylist[that.payaction].type, that.gid).then(res => {
									if (res.code == 1) {
										console.log('支付失败！');
										that.$alert('支付失败！');
									} else {
										console.log('支付成功！');
										that.$alert('支付成功！');
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
			}else{
				that.$pay.grouppay(that.paylist[that.payaction].type, that.gid).then(res => {
					if (res.code == 1) { 
						that.$alert('支付失败'); 
					} else {  
						uni.showToast({
							title:"支付成功！"
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					}
				});
			} 
		},
		tpgroupinfo(e) {
			uni.navigateTo({
				url: '/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo?id=' + that.gid
			});
		},
		orderRevoke: function() {
			uni.showModal({
				title: '提示',
				content: '是否取消该订单？',
				cancelText: '否',
				confirmtext: '是',
				success: function(e) {
					if (e.confirm) {
						that.$request
							.get(
								{
									url: 'api/group/order/revoke',
									data: {
										order_id: that.gid
									}
								},
								'正在加载'
							)
							.then(res => {
								if (res.code == 1) {
									that.$alert(res.msg);
								} else {
									console.log('详情：', res);
									that.$alert(res.msg);
									that.getinfo();
								}
							});
					}
				}
			});
		}
	},
	onLoad(option) {
		console.log(option);
		that = this;
		that.gid = option.id;
		that.getinfo();
		that.userinfo=uni.getStorageSync("userinfo");
	},
	onBackPress() {
		clearInterval(item);
	}
};
</script>

<style>
page {
	background: #f0f0f0;
}

 

.play-btn {
	padding: 10upx 20upx;
	color: #ffffff;
	margin-left: 20upx;
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
</style>
