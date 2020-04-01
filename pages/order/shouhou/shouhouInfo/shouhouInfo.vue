<template>
	<view>
		<view class="kong"></view>
		<view class="order-status"  style="padding: 0upx 50upx;" >
			<view style="flex: 1;">
				<block v-if="order_refund.refund_type == 1">
					<block v-if="order_refund.refund_status == 0">
						<block v-if="order_refund.is_agree == 0">等待审核中</block>
						<block v-else>
							<block v-if="order_refund.is_user_send == 0">已同意退货，请及时发货</block>
							<block v-else>已发货，待平台确认</block>
						</block>
					</block>
					<block v-if="order_refund.refund_status == 1">已同意退货并已退款</block>
					<block v-if="order_refund.refund_status == 3">已拒绝退货</block>
				</block>
				<block v-else>
					<block v-if="order_refund.refund_status == 0"><text>等待审核中</text></block>
					<block v-if="order_refund.refund_status == 2"><text class="text-bl">已同意换货</text></block>
					<block v-if="order_refund.refund_status == 3"><text class="text-bl">已拒绝换货</text></block>
				</block>
			</view>
			<view v-if="order_refund.is_agree == 1 && order_refund.is_user_send == 0">
				<view><button class=" cu-btn copy-btn " @tap="showModel" >填写单号</button></view>
			</view>
		</view>

		<view v-if="(order_refund.refund_type == 1 && order_refund.refund_status == 0 && order_refund.is_agree != 0) || order_refund.refund_status == 2">
			<view class="text-gray" style="height: 90upx; line-height: 90upx; padding-left: 50upx;">收件人信息</view>
			<view class="address-view">
				<view class="address-left  ">
					<view class=" ">
						<view>
							{{ order_refund.re_name }}
							<text class="tel">{{ order_refund.re_mobile }}</text>
						</view>
						<view>{{ order_refund.re_address }}</view>
					</view>
				</view>
				<view class="">
					<button class="cu-btn copy-btn" @tap="copyinfo" :data-info="order_refund.re_name+' /'+ order_refund.re_mobile +'/ '+order_refund.re_address">一键复制</button>
				</view>
			</view>
		</view>

		<view class="kong"></view>
		<view class="goodsinfo flex align-center ">
			<view class="cu-avatar goodsimg" :style="[{ backgroundImage: 'url(' + order_refund.goods_pic + ')' }]"></view>
			<view style=" margin-left: 20upx; width: 450upx;">
				<view style="height: 100upx;">
					<view class="text-cut2 goods-name ">{{ order_refund.name }}</view>
				</view>
				<view class="flex " style="flex-wrap: wrap;">
					<view class="goods-bar" style="margin-right: 15upx;" v-for="(item, index) in order_refund.attr" :key="index">
						{{ item.attr_group_name }}: {{ item.attr_name }}
					</view>
				</view>
			</view>
		</view>
		<view class="kong"></view> 

		<form bindsubmit="sendFormSubmit" reportSubmit="true">
			<block v-if="order_refund.is_agree == 1 && order_refund.is_user_send != 0">
				<view class="padding-top">
					<view class="title-xme">
						<view class="shu"></view>
						快递信息
					</view>
					<view class="li-view">
						<label>快递公司：</label>
						<text>{{ order_refund.user_send_express }}</text>
					</view>
					<view class="li-view">
						<label>快递单号：</label>
						<text>{{ order_refund.user_send_express_no }}</text>
					</view>
				</view>
			</block>

			<view class="kong"></view>

			<view class="padding-top">
				<view class="title-xme">
					<view class="shu"></view>
					退款信息
				</view>
				<view class="ol">
					<view class="li-view">
						<label>退款金额：</label>
						<view>￥{{ order_refund.refund_price }}</view>
					</view>
					<view class="li-view">
						<label>商品数量：</label>
						<view>x{{ order_refund.num ? order_refund.num : '' }}</view>
					</view>
					<view class="li-view">
						<label>申请原因：</label>
						<view>{{ order_refund.refund_desc }}</view>
					</view>
					<view class="li-view" v-if="order_refund.refund_status == 3">
						<label>拒绝原因</label>
						<view class="" style="flex: 1;">{{ order_refund.refuse_desc }}</view>
					</view>
				</view>
			</view>
		</form>
		<view class="cu-modal " :class="modalName == 'kuaidi' ? 'show' : ''">
			<form @submit="sendddd " >
			<view class="cu-dialog" style="border-radius: 20upx;">
				<view class="form-group">
					<label>快递公司</label>
					<view class="right"> 
						<picker :range="express_list" @change="prinCat" range-key="name" :value="express_index">
							<input placeholder="请选择快递公司" disabled="true" :value="express_index != '' ? express_list[express_index].name : ''" placeholder-class="placeholder" />
							<input name="express" disabled="true" :value="express_index != '' ? express_list[express_index].name : ''" style="display: none;" />
						</picker>
					</view>
					<text class="cuIcon-right text-gray" style="color: #bfbfbf;"></text>
				</view>
				<view class="form-group">
					<label>快递单号</label>
					<view class="right"><input placeholder="请填写快递单号" value="" name="express_no" placeholder-class="placeholder" /></view>
				</view>
				<button class="cu-btn mode1-btn" form-type="submit" >确定</button>
			</view>
			</form>
		</view>
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
			modalName:''
		};
	},
	methods: {
		hidden(){
			that.modalName=''
		},
		showModel(e){
			that.modalName='kuaidi'
		},
		prinCat(e){
			that.express_index=e.detail.value
		},
		getinfo() {
			this.$request
				.request({
					url: that.api.order.refund_detail,
					data: {
						order_refund_id: that.id
					}
				})
				.then(res => {
					console.log(res);
					that.order_refund = res;
					that.express_list = res.express_list;
				});
		},
		copyinfo: function(e) {
			uni.setClipboardData({
				data: e.currentTarget.dataset.info,
				success: function(t) {
					uni.showToast({
						title: '复制成功！',
						icon: 'success',
						mask: 'true'
					});
				}
			});
		},
		sendddd(e){
			let value=e.detail.value;
			let req=true,title='';
			value.express?'':(req=false,title='请选择快递公司');
			value.express_no?'':(req=false,title='请填写快递单号');
			if(!req){
				that.$showModal(title);
				return
			} 
			this.$request
				.request({
					url: that.api.order.refund_send,
					data: {
						order_refund_id: that.id,
						express:value.express,
						express_no:value.express_no,
						orderType: 'STORE'
					},
					method:'post'
				})
				.then(res => {
					console.log(res); 
					that.hidden()
					that.$alertok("提交成功！")
					that.getinfo();
			});
		}
	},
	onLoad(option) {
		that = this;
		that.id = option.id ? option.id : '1';
		that.getinfo();
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
.mode1-btn{
	width: 100%;
	height: 110upx;
	background-color: #FFF;
	font-size: 30rpx; 
		color: #b701e5;
}
.form-group{
	padding: 0upx 30upx;
	height: 130upx;
}
.form-group uni-label {
    width: auto;
	margin-right: 25upx;
}
.form-group  input{
	text-align: left;
}
</style>
