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
			<view class="flex padding2 " @tap="tpinfo2" :data-id="item.id" :data-order_refund_id="item.order_refund_id" style="padding-top: 20upx;padding-bottom: 20upx;">
				<view class="cu-avatar goods-img " :style="[{ backgroundImage: 'url(' + item.detailOne.pic + ')' }]"></view>
				<view class="com right goods-info ">
					<view class="goods-info-top ">
						<view style="height: 100upx;">
							<view class="goods-name text-cut2" style="width: 100%;">{{ item.detailOne.attr.name }}</view>
						</view>
						<view style="height: 100upx;">
							<text class="goods-price">￥{{ item.detailOne.total_price }}</text>
						</view>
					</view>
					<view class="goods-info-bottom">
						<!-- <view class="text-gray text-sm  " style="width: 100%;">
							<text class="goods-bar" v-for="(attr, attrindex) in goods.attr_list" :key="attrindex">{{ attr.attr_group_name }}:{{ attr.attr_name }}</text>
						</view> -->
						<text class="goods-price">x{{ item.detailOne.num }}</text>
					</view>
				</view>
			</view>
			<view class="bottom-view  padding2 ">
				<view>
					<text class="text-black">合计:</text>
					<block v-if="TabCur == 4">
						<text class="price1">￥{{ item.pay_price }}</text>
					</block>
					<block v-else>
						<text class="price1">￥{{ item.pay_price }}</text>
					</block>
				</view>
				<view class="flex justify-between align-center">
					<view class="flex-grow-1" v-if="TabCur == 1">
						<!--  @tap="tpinfo2" :data-id="item.id" :data-order_refund_id="item.order_refund_id" -->
						<button class="btn v-right bg-white" @tap="clickfh" :data-id="item.id"  >发货</button>
					</view>
					<view class="flex-grow-1" v-if="TabCur == 2"><button @tap="tpinfo2" class="btn v-right bg-white fu-btn " :data-id="item.id">查看详情</button></view>
				</view>
			</view>
		</view>

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
									placeholder-class="placeholder" placeholder-style="text-align:left"
								/>
								<input name="express" disabled="true" :value="express_index != '' ? express_list[express_index].name : ''" style="display: none;" />
							</picker>
						</view>
						<text class="cuIcon-right text-gray" style="color: #bfbfbf;"></text>
					</view>
					<view class="form-group">
						<label class="text-left" >快递单号</label>
						<view class="right"><input placeholder="请填写快递单号" value="" name="express_no" placeholder-class="placeholder"  placeholder-style="text-align:left" /></view>
					</view>
					<button class="cu-btn mode1-btn" style="background-color: #FFF;" form-type="submit">确定</button>
				</view>
			</form>
		</view>

		<nolist type="1" text="没有相关订单" v-if="!onlist && list.length == 0"></nolist>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			TabCur: 1,
			scrollLeft: 0,
			navtitle: [{ id: 1, name: '未发货' }, { id: 2, name: '已发货' }, { id: 3, name: '已签收' }],
			list: [],
			onlist: false,
			page: 1,
			onmore: false,
			access_token: '',
			modalName: '',
			subkdid: '',
			express_index: '',
			express_list: [],
			fhid:''
		};
	},
	methods: {
		tpinfo2(e) {
			uni.navigateTo({
				url: '../orderInfo/orderInfo?id=' + e.currentTarget.dataset.id
			});
		},
		hidden() {
			that.modalName = '';
		},
		prinexpress(e) {
			that.express_index = e.detail.value;
		},
		clickfh(e) {
			that.fhid=e.currentTarget.dataset.id;
			that.modalName = 'kuaidi';
		},
		prinCat(e) {
			that.express_index = e.detail.value;
		},
		showkdModel(e) {
			that.subkdid = e.currentTarget.dataset.id;
			that.modalName = 'kuaidi';
		},
		subkd() {
			that.hiddenModel();
		},
		tabSelect(e) {
			that.TabCur = e.currentTarget.dataset.id;
			that.page = 1;
			that.list = [];
			that.getorder();
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
						order_id: that.fhid,
						express: value.express,
						express_no: value.express_no
					},
					method: 'post'
				})
				.then(res => {
					console.log(res);
					that.hidden();
					that.$alertok('提交成功！');
					that.onlist = true;
					that.page=1;
					that.list=[]
					that.getorder();
				});
		},
		getorder() {
			that.onlist = true;
			this.$request
				.request({
					url: that.api.anchor_order.list,
					data: {
						type: that.TabCur,
						page: that.page
					}
				})
				.then(res => {
					console.log(res);
					let list = res;
					if (list.length > 0) {
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
					}
				});
		},
		tpinfo(e) {
			uni.navigateTo({
				url: '../orderInfo/orderInfo?id=' + e.currentTarget.dataset.id
			});
		},
		 
	},
	onLoad(option) {
		that = this;
		that.TabCur = option.id ? option.id : 1;
		let config = uni.getStorageSync('config');
		that.express_list = config.express;
		that.getorder();
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
	width: 100%;
	height: 110upx;
	background-color: #fff;
	font-size: 30rpx;
	color: #b701e5;
}
.form-group {
	height: 135upx;
	padding: 0upx 52upx;
	display: flex;
	align-items: center;
	background: #ffffff;
	border-bottom: solid 1upx #ebebeb;
}
.form-group label {
	width: 170upx;
	text-align: left;
}
.form-group .right input {
	text-align: left;
}
.placeholder {
	text-align: right;
}
</style>
