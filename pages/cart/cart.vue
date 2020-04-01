<template>
	<view>
		<view class="cu-custom bg-white" :style="[{ height: CustomBar + 'px' }]">
			<view class="cu-bar fixed" :style="style">
				<view class="action" @tap="BackPage"><text class="cuIcon-back"></text></view>
				<view class="content " :style="[{ top: StatusBar + 'px' }]">购物车</view>
				<view class="action text-orange" @tap="showModal" :style="[{ top: StatusBar + 'px' }]">删除</view>
			</view>
		</view>

		<view class="margin-top"></view>
		<view class="goods-list bg-white" v-for="(item, index) in list" :key="index">
			<view class="flex align-center">
				<view class="prin" @tap="cartCheck" :data-index="index" data-type="list">
					<image src="/static/icon/print-cur.png" v-if="item.checked"></image>
					<image src="/static/icon/print.png" v-else></image>
				</view>
				<view class="cu-avatar" :style="[{ backgroundImage: 'url(' + item.goods_pic + ')' }]"></view>
				<view class="right">
					<view class="goods-rtop" style="font-size: 30upx;" @tap="tpinfo" :data-id="item.goods_id">
						<view class="goodsnamev">
							<view class="goodsname text-cut2">{{ item.goods_name }}</view>
						</view>
						<!-- <view class="goodsdelata" @tap.stop="deleteCartItem" data-type="list" :data-id="item.cart_id" :data-index="index"><text class="cuIcon-delete"></text></view> -->
					</view>
					<!-- <view class="text-gray text-cut" style="font-size:26upx;">
						<text v-for="(attr, attrindex) in item.attr_list" :key="attrindex" style="margin-right: 15upx;">{{ attr.attr_group_name }}:{{ attr.attr_name }}</text>
					</view> -->
					<view class="goods-down" style="font-size: 30upx;">
						<view class="price-color price">￥{{ item.price }}</view>
						<view class="li-conten flex align-center">
							<view class="add-del" @tap="comput" data-listtype="list" :data-type="1" :data-index="index">-</view>
							<view style="font-size: 26upx;color: #989898; width: 80upx;text-align: center;">{{ item.num }}</view>
							<view class="add-del" @tap="comput" data-listtype="list" :data-type="0" :data-index="index">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 120upx;"></view>
		<view class="foot down_view flex justify-between align-center">
			<view class="flex align-center" @tap="cartCheckAll">
				<image class="print1" v-if="allprint" src="/static/icon/print-cur.png"></image>
				<image class="print1" v-else src="/static/icon/print.png"></image>
				全选
			</view>

			<view class=" flex align-center ">
				<view>
					合计：
					<text class="z-color">￥{{ zprice }}</text>
				</view>
				<view class="pay" @tap="buy"><button class="cu-btn">结算</button></view>
			</view>
		</view>

		<nolist type="6" text="您的购物车空空如也~~" v-if="nolist"></nolist>

		<view v-if="!access_token">
			<nolist type="6" text="您还没有登录~~"></nolist>
			<view class="text-center margin-top "><button class="cu-btn  zcolor-btn margin-top " @tap="login">去登陆</button></view>
		</view>

		<chunLei-modal v-model="showModel" :mData="mData" :type="type" @onConfirm="deleteCartItem" @cancel="cancel" navMask></chunLei-modal>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			total: 0, //总价格
			allChecked: false, //全选状态  true|false
			empty: false, //空白页现实  true|false
			cartList: [],
			list: [],
			allprint: false,
			zprice: 0,
			nolist: false,
			modal: false,
			delid: '',
			access_token: '',
			mch_list: [],
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			mData: {},
			showModel: false,
			type: 'default',
			cart_id_list: []
		};
	},
	computed: {
		style() {
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			return style;
		}
	},
	methods: { 
		BackPage(){ 
			uni.navigateBack({
				delta:1
			})
		},  
		tpinfo(e) {
			console.log(e);
			uni.navigateTo({
				url: '/pages/goods/goodsinfo/goodsinfo?gid=' + e.currentTarget.dataset.id
			});
			
		},
		//选中状态处理
		check(type, index) {
			if (type === 'item') {
				this.cartList[index].checked = !this.cartList[index].checked;
			} else {
				const checked = !this.allChecked;
				const list = this.cartList;
				list.forEach(item => {
					item.checked = checked;
				});
				this.allChecked = checked;
			}
			this.calcTotal(type);
		},
		cancel() {},
		showModal() {
			var list = that.list;
			var cart_id_list = [];
			for (let i in list) {
				if (list[i]['checked']) {
					cart_id_list.push(list[i].cart_id);
				}
			}
			if (cart_id_list.length > 0) {
				that.mData = { title: '提示', content: '确定要删除所选商品吗？', confirmText: '确定', cancelText: '取消', confirmColor: '#3CC51F' };
				that.showModel = true;
				that.cart_id_list = cart_id_list;
			} else {
				that.$alert('请选择商品');
			}
		},
		//删除
		deleteCartItem(e) {
			console.log("啊士大：",that.cart_id_list);
			that.$request
				.request({
					url: that.api.cart.delete,
					data: {
						cart_id_list: that.cart_id_list
					}
				})
				.then(res => {
					that.$alertok('删除成功');
					if (e.currentTarget.dataset.type == 'list') {
						that.list.splice(e.currentTarget.dataset.index, 1);
					} else if (e.currentTarget.dataset.type == 'mch') {
						let findex = e.currentTarget.dataset.findex;
						let index = e.currentTarget.dataset.index;
						that.mch_list[findex].list.splice(index, 1);
					}
					if (that.allprint) {
						that.cartCheckAll();
					} else {
						for (let i in that.list) {
							that.list[i].checked = false;
						}
					}
					that.calcTotal();
				});
		},
		// 增加数量
		comput(e) {
			var type = e.currentTarget.dataset.type;
			var index = e.currentTarget.dataset.index;
			let findex = e.currentTarget.dataset.findex ? e.currentTarget.dataset.findex : '';
			let listtype = e.currentTarget.dataset.listtype;
			if (listtype == 'list') {
				if (type == 0) {
					that.list[index].num = that.list[index].num + 1;
				} else {
					if (that.list[index].num > 1) {
						that.list[index].num = that.list[index].num - 1;
					}
				}
			} else if (listtype == 'mch') {
				if (type == 0) {
					that.mch_list[findex].list[index].num = that.mch_list[findex].list[index].num + 1;
				} else {
					if (that.mch_list[findex].list[index].num > 1) {
						that.mch_list[findex].list[index].num = that.mch_list[findex].list[index].num - 1;
					}
				}
			}
			that.comp(index, findex, listtype), that.calcTotal();
		},
		// 获取列表
		getlist() {
			that.nolist = false;
			this.$request
				.request({
					url: that.api.cart.list
				})
				.then(res => {
					console.log(res);
					that.list = res.list;
					that.mch_list = res.mch_list;
					if (res.list.length == 0 && res.mch_list.length == 0) {
						that.nolist = true;
					} else {
						// for (let i in that.mch_list) {
						// 	for (let t in that.mch_list[i].list) {
						// 		// that.mch_list[i][t]['checked']=false
						// 		console.log('啊送你到家咯圣诞卡：', that.mch_list[i].list[t]);
						// 	}
						// 	that.$forceUpdate();
						// }
					}
				});
		},
		// 选择
		cartCheck(e) {
			var index = e.currentTarget.dataset.index;
			let type = e.currentTarget.dataset.type;
			console.log(type);
			if (type == 'list') {
				if (that.list[index]['checked']) {
					that.list[index]['checked'] = false;
					that.allprint = false;
				} else {
					that.list[index]['checked'] = true;
				}
			} else {
				let mchindex = e.currentTarget.dataset.mchindex;
				if (that.mch_list[mchindex].list[index]['checked']) {
					that.mch_list[mchindex].list[index]['checked'] = false;
					that.allprint = false;
				} else {
					that.mch_list[mchindex].list[index]['checked'] = true;
				}
			}

			that.calcTotal();
		},
		// 选择多商户列表
		mchcartCheck(e) {
			var findex = e.currentTarget.dataset.findex;
			var index = e.currentTarget.dataset.index;
			if (that.mch_list[findex].list[index]['checked']) {
				that.mch_list[findex].list[index]['checked'] = false;
				that.allprint = false;
			} else {
				that.mch_list[findex].list[index]['checked'] = true;
			}
			that.$forceUpdate();
			that.calcTotal();
		},
		// 全选
		cartCheckAll(e) {
			var list = that.list;
			if (that.allprint) {
				for (let i = 0; i < list.length; i++) {
					list[i]['checked'] = false;
				}
				for (let i in that.mch_list) {
					for (let t in that.mch_list[i].list) {
						that.mch_list[i].list[t]['checked'] = false;
					}
				}
				that.allprint = false;
			} else {
				for (let i = 0; i < list.length; i++) {
					list[i]['checked'] = true;
				}
				for (let i in that.mch_list) {
					for (let t in that.mch_list[i].list) {
						that.mch_list[i].list[t]['checked'] = true;
					}
				}
				that.allprint = true;
			}
			that.list = list;
			that.calcTotal();
		},
		//计算总价
		calcTotal() {
			var list = that.list;
			var zprice = 0;
			for (let i = 0; i < list.length; i++) {
				if (list[i]['checked']) {
					zprice = (Number(zprice) + Number(list[i].price)).toFixed(2);
				}
			}
			for (let i in that.mch_list) {
				for (let t in that.mch_list[i].list) {
					if (that.mch_list[i].list[t]['checked']) {
						zprice = (Number(zprice) + Number(that.mch_list[i].list[t].price)).toFixed(2);
					}
				}
			}
			that.zprice = zprice;
		},
		// 计算单价
		comp(index, findex, listtype) {
			if (listtype == 'list') {
				that.list[index].price = (Number(that.list[index].unitPrice) * that.list[index].num).toFixed(2);
			} else if (listtype == 'mch') {
				that.mch_list[findex].list[index].price = (Number(that.mch_list[findex].list[index].unitPrice) * that.mch_list[findex].list[index].num).toFixed(2);
			}
		},
		buy() {
			var list = that.list;
			var edgoodslist = [];
			var edmch = [];
			var goodsidlist = [];
			var mch_list = [];
			var edmch_list = [];
			let ptlist = {
				mch_id: 0,
				goods_list: []
			};
			for (let i = 0; i < list.length; i++) {
				if (list[i]['checked']) {
					edgoodslist.push(list[i]);
					ptlist.goods_list.push({
						cart_id: list[i].cart_id
					});
				}
			}
			if (ptlist.goods_list.length > 0) {
				mch_list.push(ptlist);
			}
			if (that.mch_list.length > 0) {
				for (let i in that.mch_list) {
					let mchlist = {
						mch_id: that.mch_list[i].id,
						goods_list: []
					};
					let delist = {
						id: that.mch_list[i].id,
						list: [],
						name: that.mch_list[i].name
					};
					for (let t in that.mch_list[i].list) {
						if (that.mch_list[i].list[t]['checked']) {
							delist.list.push(that.mch_list[i].list[t]);
							mchlist.goods_list.push({
								cart_id: that.mch_list[i].list[t].cart_id
							});
						}
					}
					if (mchlist.goods_list.length > 0) {
						mch_list.push(mchlist);
						edmch_list.push(delist);
					}
				}
			}
			if (edgoodslist.length == 0 && edmch_list.length == 0) {
				that.$alert('请选择商品！');
				return;
			}
			this.$request
				.request({
					url: that.api.cart.cart_edit,
					data: {
						list: JSON.stringify(edgoodslist),
						mch_list: JSON.stringify(edmch_list)
					},
					method: 'post'
				})
				.then(res => {
					this.$request
						.request({
							url: that.api.order.new_submit_preview,
							data: {
								mch_list: JSON.stringify(mch_list)
							},
							method: 'post'
						})
						.then(res => {
							console.log(res);
							uni.setStorageSync('order', res);
							uni.navigateTo({
								url: '/pages/order/createOrder/createOrder'
							});
						});
				});
		}
	},
	onLoad() {
		that = this;
	},
	onShow() {
		that.access_token = uni.getStorageSync('access_token');
		console.log(that.access_token);
		if (that.access_token) {
			that.getlist();
		}
		if (that.allprint) {
			that.cartCheckAll();
		}
	}
};
</script>

<style>
.print1 {
	width: 36upx;
	height: 36upx;
	margin: 0upx 30upx;
}

.down_view {
	width: 100%;
	height: 106upx;
	background-color: #ffffff;
	box-shadow: 2upx -1upx 0upx 0upx rgba(205, 205, 205, 0.43);
	color: #000;
	font-size: 28upx;
	position: fixed;
	bottom: 0upx;
}

.pay {
	width: 202upx;
	height: 108upx;
	line-height: 108upx;
	text-align: center;
	font-size: 34upx;
	color: #000000;
}
.pay .cu-btn {
	width: 169upx;
	height: 75upx;
	background-image: linear-gradient(-60deg, #ff4c29 0%, #ff7155 100%);
	border-radius: 38upx;
	color: #fff;
	font-size: 28upx;
	color: #ffffff;
}

.soldi-bottom {
	border-bottom: solid 1upx #e2e2e2;
}

.down {
	height: 80upx;
	padding-right: 60upx;
}

.right {
	flex-wrap: wrap;
	height: 100%;
	width: 389upx;
	height: 148upx;
}

.prin image {
	width: 40upx;
	height: 40upx;
}

.prin {
	width: 80upx;
	text-align: center;
	margin: 0upx 10upx;
}

.price {
	font-weight: 550;
	font-size: 28upx;
	color: #ff0101;
}

.goods-list .cu-avatar {
	width: 177upx;
	height: 177upx;
	border-radius: 10upx;
	margin-right: 18upx;
}

.goods-list {
	width: 706upx;
	margin: 10upx auto;
	border-radius: 10upx;
	padding: 30upx 50upx 30upx 0upx;
	margin-bottom: 33upx;
}
.goods-rtop {
	display: flex;
	justify-content: space-between;
}
.goodsnamev {
	height: 100upx;
}
.goodsname {
	text-align: justify;
	font-size: 28upx;
	line-height: 45upx;
	color: #2f2f2f;
	font-weight: 550;
}
.goodsdelata {
	width: 40upx;
	text-align: center;
	padding-top: 5upx;
	font-size: 40upx;
	color: #a7a7a7;
}
.goods-down {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goods-down .price {
	font-size: 28upx;
	font-weight: 550;
}
</style>
