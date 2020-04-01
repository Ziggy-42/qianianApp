<template>
	<view>
		<view class="kong"></view>
		<block v-if="info">
			<view class="order-status" style="padding: 0upx 50upx;">
				<view style="flex: 1;">
					<block v-if="info.is_pay">
						<block v-if="info.is_send == 0">已付款，请尽快发货</block>
						<block v-else>
							<block v-if="info.is_confirm == 0">订单已发货</block>
							<block v-else>订单已签收</block>
						</block>
					</block>
				</view>
				<view v-if="info.is_send == 0">
					<view><button class=" cu-btn copy-btn " @tap="showModel">填写单号</button></view>
				</view>
			</view>

			<view v-if="info.is_pay && info.is_send == 0">
				<view class="text-gray" style="height: 90upx; line-height: 90upx; padding-left: 50upx;">收件人信息</view>
				<view class="address-view" style="height: auto;">
					<view class="address-left  ">
						<view class=" ">
							<view>
								{{ info.name }}
								<text class="tel">{{ info.mobile }}</text>
							</view>
							<view>{{ info.address_data.province }},{{ info.address_data.city }},{{ info.address_data.district }},{{ info.address_data.detail }}</view>
						</view>
					</view>
					<view class="">
						<button
							class="cu-btn copy-btn"
							@tap="copyinfo"
							:data-info="
								info.name +
									' / ' +
									info.mobile +
									' / ' +
									info.address_data.province +
									' / ' +
									info.address_data.city +
									' / ' +
									info.address_data.district +
									' / ' +
									info.address_data.detail
							"
						>
							一键复制
						</button>
					</view>
				</view>
			</view>

			<view class="kong"></view>
			<view class="goodsinfo flex align-center ">
				<view class="cu-avatar goodsimg" :style="[{ backgroundImage: 'url(' + info.detailOne.attr.cover + ')' }]"></view>
				<view style=" margin-left: 20upx; width: 450upx;">
					<view style="height: 100upx;">
						<view class="text-cut2 goods-name ">{{ info.detailOne.attr.name ? info.detailOne.attr.name : '' }}</view>
					</view>
					<view class="flex " style="flex-wrap: wrap;">
						<!-- <view class="goods-bar" style="margin-right: 15upx;" v-for="(item, index) in order_refund.attr" :key="index">
						{{ item.attr_group_name }}: {{ item.attr_name }}
					</view> -->
					</view>
					<view class=" flex justify-between align-center ">
						<view class="price-color">￥{{ info.detailOne.total_price ? info.detailOne.total_price : '' }}</view>
						<view>x{{ info.detailOne.num ? info.detailOne.num : '1' }}</view>
					</view>
				</view>
			</view>
			<view class="kong"></view>
			<view class="padding-top">
				<view class="title-xme">
					<view class="shu"></view>
					订单信息
				</view>
				<view class="ol">
					<view class="li-view">
						<label>金额：</label>
						<view>￥{{ info.pay_price ? info.pay_price : '' }}</view>
					</view>
					<view class="li-view">
						<label>商品数量：</label>
						<view>x{{ info.detailOne.num ? info.detailOne.num : '' }}</view>
					</view>
					<view class="li-view">
						<label>买家留言</label>
						<view class="" style="width: 550upx;">{{ info.remark ? info.remark : '无' }}</view>
					</view>
				</view>
			</view>
			<block v-if="info.express">
				<view class="kong"></view>
				<view class=" bg-white padding-top">
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
									{{ info.express ? info.express : '' }}
								</view>
								<view>
									<text style="color: #969696; margin-right: 30upx;">快递单号</text>
									{{ info.express_no ? info.express_no : '' }}
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
								<view class="content" style="width:560upx;">{{ item.detail ? item.detail : '' }}</view>
							</view>
						</view>
						<view class="text-gray text-center" style="height: 100upx;" v-if="express.length == 0">物流信息查询失败</view>
					</view>
				</view>
			</block>

			<view class="cu-modal " :class="modalName == 'kuaidi' ? 'show' : ''" @tap="hidden">
				<form @submit="fahuo">
					<view class="cu-dialog" @tap.stop="" style="border-radius: 20upx;">
						<view class="form-group">
							<label class="text-left" >快递公司</label>
							<view class="right">
								<picker :range="express_list" @change="prinexpress" range-key="name" :value="express_index">
									<input
										placeholder="请选择快递公司"
										disabled="true"
										:value="express_index != '' ? express_list[express_index].name : ''"
										placeholder-class="placeholder"
									/>
									<input name="express" disabled="true" :value="express_index != '' ? express_list[express_index].name : ''" style="display: none;" />
								</picker>
							</view>
							<text class="cuIcon-right text-gray" style="color: #bfbfbf;"></text>
						</view>
						<view class="form-group">
							<label class="text-left" >快递单号</label>
							<view class="right"><input placeholder="请填写快递单号" value="" name="express_no" placeholder-class="placeholder" /></view>
						</view>
						<button class="cu-btn mode1-btn" style="background-color: #FFF;" form-type="submit">确定</button>
					</view>
				</form>
			</view>
			
			
		</block>
	</view>
</template>

<script>
var that = this;
export default {
	data() {
		return {
			order_refund: {},
			express_index: '',
			express_list: [],
			modalName: '',
			info: '',
			express: ''
		};
	},
	methods: {
		hidden() {
			that.modalName = '';
		},
		prinexpress(e) {
			that.express_index = e.detail.value;
		},
		showModel(e) {
			that.modalName = 'kuaidi';
		},
		prinCat(e) {
			that.express_index = e.detail.value;
		},
		getinfo() {
			this.$request
				.request({
					url: that.api.anchor_order.detail,
					data: {
						order_id: that.id
					}
				})
				.then(res => {
					console.log(res);
					that.info = res;
					if (res.is_send) {
						that.getwl();
					}
				});
		},
		copyinfo: function(e) {
			console.log(e.currentTarget.dataset.info);
			uni.setClipboardData({
				data: e.currentTarget.dataset.info,
				success: function(t) {
					uni.showToast({
						title: '复制成功！',
						icon: 'success',
						mask: 'true'
					});
				},
				fail(res) {
					console.log(res);
				}
			});
		},
		fahuo(e) {
			let value = e.detail.value;
			let req = true,
				title = '';
			value.express ? '' : ((req = false), (title = '请选择快递公司'));
			value.express_no ? '' : ((req = false), (title = '请填写快递单号'));
			if (!req) {
				that.$showModal(title);
				return;
			}
			this.$request
				.request({
					url: that.api.anchor_order.send,
					data: {
						order_id: that.id,
						express: value.express,
						express_no: value.express_no
					},
					method: 'post'
				})
				.then(res => {
					console.log(res);
					that.hidden();
					that.$alertok('提交成功！');
					that.getinfo();
				});
		},
		getwl(orderinfo) {
			this.$request
				.request({
					url: that.api.anchor_order.express,
					data: {
						order_id: that.id
					},
					rejectType: true
				})
				.then(res => {
					that.express = res.list ? res.list : [];
				});
		}
	},
	onLoad(option) {
		that = this;
		that.id = option.id ? option.id : '1';
		let config = uni.getStorageSync('config');
		that.express_list = config.express;
		that.getinfo();
		console.log(config);
	}
};
</script>

<style> 
page {
	background: #ffffff;
}

/* .right {
	width: 510upx;
	height: 140upx;
	flex-wrap: wrap;
} */

.li {
	width: 100%;
}

.tab {
	height: 80upx;
	width: 50%;
	line-height: 80upx;
	text-align: center;
}

.action {
	font-weight: 550;
}

.action text {
	padding: 15upx;
	border-bottom: solid #ffd100 6upx;
}

.textr-title {
	height: 80upx;
	border-bottom: solid #eeeeee 1upx;
	line-height: 80upx;
	padding: 0upx 30upx;
}

.textr-view {
	padding-bottom: 20upx;
	position: relative;
}

.textr-textarea {
	width: 90%;
	background: #f0f0f0;
	margin: 20upx auto;
	padding: 20upx;
	border-radius: 8upx;
}

.connum {
	position: absolute;
	right: 10%;
	bottom: 50upx;
}

.white1 {
	height: 15upx;
}

.btn {
	width: 100%;
	text-align: center;
	position: fixed;
	background: #ffffff;
	bottom: 0upx;
	padding: 20upx;
}

.btn button {
	width: 80%;
	border-radius: 10upx;
	height: 80upx;
}

.text-bl {
	font-size: 32upx;
	color: #2c2c2c;
	font-weight: 550;
}

.mb-20 {
	font-size: 26upx;
	color: #a8a8a8;
	line-height: 40upx;
}
.copy-btn {
	width: 186upx;
	height: 66upx;
	background-image: linear-gradient(-60deg, #9329ff 0%, #b000dd 100%);
	border-radius: 33upx;
	font-size: 26upx;
	color: #ffffff;
}
.address-view {
	height: 90upx;
	padding: 0upx 50upx 30upx;
}
.mode1-btn {
	width: 100%;
	height: 110upx;
	background-color: #fff;
	font-size: 30rpx;
	color: #b701e5;
}
.form-group {
	padding: 0upx 30upx;
	height: 130upx;
}
.form-group label{
	width: 170upx;
}
.form-group uni-label {
	width: auto;
	margin-right: 25upx;
}
.form-group input {
	text-align: left;
}
.li-view label {
	width: 180upx;
}
</style>
