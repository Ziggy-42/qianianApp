<template>
	<view>
		<view class="white"></view>
		<view class="goods bg-white flex align-center ">
			<view class="cu-avatar goodsimg " :style="[{ backgroundImage: 'url(' + info.goods_pic + ')' }]"></view>
			<view class="right flex justify-between">
				<view class="li flex justify-between align-center">{{ info.name }}</view>
				<view class="li flex justify-between align-center">
					<view>
						<text v-for="(item, index) in info.attr" :key="index">{{ item.attr_group_name }}:{{ item.attr_name }}</text>
					</view>
					<text>x{{ info.num }}</text>
				</view>
			</view>
		</view>
		<view class="white"></view>
		<view class="flex bg-white align-center ">
			<view class="tab" @tap="getprint" :data-index="index" :class="print == index ? 'action1' : ''" v-for="(item, index) in tab" :key="index">
				<text>{{ item }}</text>
			</view>
		</view>
		<view class="white1"></view>
		<block v-if="print == 0">
			<view class="textr-title bg-white soldi-bottom flex justify-between ">
				<text>退款金额</text>
				<text class="text-price text-gray margin-left ">{{ info.total_price }}</text>
			</view>
			<view class=" textr-view bg-white soldi-bottom">
				<view class="textr-title">退款原因</view>
				<textarea class="textr-textarea" @input="gettkcon" placeholder="请输入退款原因" maxlength="300" placeholder-style="font-size:28upx"></textarea>
				<text class="connum">{{ tkcon.length }}/100</text>
			</view>
		</block>
		<block v-else>
			<view class=" textr-view bg-white soldi-bottom">
				<view class="textr-title">换货说明</view>
				<textarea class="textr-textarea" @input="gethhcon" placeholder="请输入换货说明" maxlength="300" placeholder-style="font-size:28upx"></textarea>
				<text class="connum">{{ hhcon.length }}/100</text>
			</view>
		</block>

		<view class="cu-bar bg-white ">
			<view class="action" style="font-size: 26upx;">凭证上传</view>
			<view class="action">{{ imgList.length }}/4</view>
		</view>
		<view class="cu-form-group bg-white " :class="print == 0 ? 'soldi-bottom' : ''">
			<view class="grid col-5 grid-square flex-sub">
				<view class="bg-img img-v" v-for="(item, index) in imgList" :key="index">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
				</view>
				<view class="solids" @click="choose_img_upload(1)" v-if="imgList.length < 4"><text class="cuIcon-add"></text></view>
			</view>
		</view>
		<block v-if="print == 0">
			<view class="cu-bar bg-white ">
				<view class="action" style="font-size: 26upx;font-weight: 550;">
					<text class="text-red" style="padding: 0upx;border: none;">*</text>
					退款服务
				</view>
			</view>
			<view class="rk-vieew">
				<view>操作提示：</view>
				<view style="margin-top: 20upx;">
					1.若提出申请后，商家拒绝退款或退货，可再次提交申请或选择
					<text class="text-red">“商品投诉”</text>
					，请求商城客服人员介入。
				</view>
				<view style="margin-top: 24upx;">
					2.成功完成退款/退货；经过商城审核后，退款金额将自动返还到您的
					<text class="text-red">“微信账户”</text>
					。
				</view>
			</view>
		</block>

		<view class="btn"><button class="cu-btn bg-yellow1" @tap="sub">提交</button></view>
	</view>
</template>

<script>
var that = this;
export default {
	data() {
		return {
			tab: ['退货退款', '换货'],
			info: {},
			print: 0,
			tkcon: '',
			hhcon: '',
			imgList: []
		};
	},
	methods: {
		getinfo() {
			this.$request
				.get(
					{
						url: 'api/order/refund-preview',
						data: {
							order_detail_id: that.id
						}
					},
					'正在加载'
				)
				.then(res => {
					console.log(res);
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res);
						that.info = res.data;
					}
				});
		},
		// 选择
		getprint(e) {
			that.print = e.currentTarget.dataset.index;
		},
		gettkcon(e) {
			that.tkcon = e.detail.value;
		},
		gethhcon(e) {
			that.hhcon = e.detail.value;
		},
		DelImg(e) {
			that.tanchuang
				.showModel({
					title: '提示',
					content: '确认要删除该图片吗?',
					cancelText: '取消',
					confirmText: '确定'
				})
				.then(res => { 
					if (res == 'confirm') {
						console.log(e.currentTarget.dataset.index);
						that.imgList.splice(e.currentTarget.dataset.index, 1);
						console.log(that.imgList);
						that.$forceUpdate();
					}
				}); 
			// uni.showModal({
			// 	title: '提示',
			// 	content: '确认要删除该图片吗?',
			// 	success(res) {
			// 		if (res.confirm) {
			// 			console.log(e.currentTarget.dataset.index);
			// 			that.imgList.splice(e.currentTarget.dataset.index, 1);
			// 			console.log(that.imgList)
			// 			that.$forceUpdate();
			// 		}
			// 	}
			// });
		},
		// 上传图片
		async choose_img_upload(n) {
			let uploader = new this.$Uploader();
			let path_arr = await uploader.choose_and_upload(n);
			// console.log(path_arr);
			this.imgList = this.imgList.concat(path_arr);
			// console.log(this.imgList);
			(that.images = that.images ? that.images + ',' + path_arr : path_arr), console.log('图片', that.images);
		},
		sub() {
			if (that.print == 0) {
				if (!that.tkcon) {
					return that.$alert('请输填写退款原因');
				}
			} else {
				if (!that.hhcon) {
					return that.$alert('请输填写换货原因');
				}
			}
			this.$request
				.post(
					{
						url: 'api/order/refund',
						data: {
							type: Number(that.print) + 1,
							order_detail_id: that.id,
							desc: that.print == 0 ? that.tkcon : that.hhcon,
							pic_list: that.imgList,
							orderType: 'STORE'
						}
					},
					'正在加载'
				)
				.then(res => {
					console.log(res);
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res);
						that.$alert('售后订单提交成功!');
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/order/orderlist/orderlist'
							});
						}, 1000);
					}
				});
		}
	},
	onLoad(option) {
		that = this;
		that.id = option.id;
		that.getinfo();
	}
};
</script>

<style>
page {
	background: #ffffff;
}

.rk-vieew {
	width: 647upx;
	background-color: #fdf8e4;
	border-radius: 10upx;
	margin: auto;
	color: #bb934d;
	padding: 35upx 35upx;
	font-size: 24upx;
	line-height: 38upx;
}

.goods {
	height: 180upx;
	padding: 0upx 40upx;
}

.soldi-bottom {
	border-bottom: solid #eeeeee 1upx;
}

.text-red {
	color: #ff2a2a;
}

.goodsimg {
	width: 140upx;
	height: 140upx;
	margin-right: 30upx;
}

.right {
	width: 510upx;
	height: 140upx;
	flex-wrap: wrap;
}

.li {
	width: 100%;
}

.tab {
	height: 80upx;
	width: 50%;
	line-height: 80upx;
	text-align: center;
}

.action1 {
	font-weight: 550;
}

.action1 text {
	padding: 15upx;
	border-bottom: solid #ffd100 6upx;
}

.textr-title {
	height: 80upx;
	/* border-bottom: solid #EEEEEE 1upx; */
	line-height: 80upx;
	padding: 0upx 30upx;
}

.textr-view {
	padding-bottom: 20upx;
	position: relative;
}

.textr-textarea {
	width: 90%;
	height: 200upx;
	background: #f0f0f0;
	margin: 0upx auto;
	padding: 20upx;
	border-radius: 8upx;
}

.connum {
	position: absolute;
	right: 8%;
	bottom: 30upx;
}

.white1 {
	height: 15upx;
}

.btn {
	width: 100%;
	text-align: center;
	background: #ffffff;
	padding: 60upx 20upx;
}

.btn button {
	width: 501upx;
	height: 71upx;
	background-color: #ffd100;
	border-radius: 6upx;
	border: solid 2upx #ffd100;
	font-size: 30upx;
}
</style>
