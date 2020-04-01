<template>
	<view>
		<view class="cu-modal bottom-modal" :class="show ? 'show' : ''">
			<view class="cu-dialog">
				<view class="bg-gary">
					<view class="down-item  margin-top">
						<view class="cu-list  bg-gary grid col-4 no-border" style="background-color: #f6f6f6;">
							<view class="cu-item  bg-gary down-tab" v-for="(item, index) in fxtablist" :key="index" @tap="share" :data-index="index">
								<view><image :src="item.image" style="width: 90upx;height: 90upx;"></image></view>
								<text style="font-size: 20upx;color: #333333;">{{ item.name ? item.name : '' }}</text>
							</view>
						</view>
					</view>
					<view class=" bg-white text-center" style="height:75upx;line-height: 75upx;color: #0f0e0e;" @tap="c_show">取消</view>
				</view>
			</view>
		</view>
		<!-- <view class="cu-custom bg-white" :style="[{ height: CustomBar + 'px' }]">
			<view class="cu-bar fixed" :style="style">
				<view class="action" @tap="BackPage">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{ top: StatusBar + 'px' }]">
					<slot name="content">拼团详情</slot>
				</view>
			</view>
		</view> -->
		<view class="white"></view>
		<view class="body">
			<view :class="info.show_attr_picker ? 'no-scroll' : ''">
				<navigator hoverClass="none">
					<view class="goods flex-row flex">
						<view class="goods-pic flex-grow-0"><image :src="goods.cover_pic"></image></view>
						<view class="goods-info flex-grow-1 flex-col">
							<view class="goods-info-title flex-grow-0">{{ goods.name ? goods.name : '' }}</view>
							<view class="goods-money flex-grow-0 flex-row flex-y-bottom flex  align-center">
								<view class="goods-price flex-grow-0 flex-y-bottom">
									¥
									<text>{{ goods.price ? goods.price : '' }}</text>
								</view>
								<view class="goods-original-price flex-grow-0 flex-y-bottom">¥{{ goods.original_price ? goods.original_price : '' }}</view>
							</view>
							<view class="goods-label flex align-center">
								<view class="goods-limit flex-grow-0">{{ goods.group_num ? goods.group_num : '' }}人团</view>
								<view class="goods-omit flex-grow-0">拼团省 {{ reduce_price ? reduce_price : '0.00' }}</view>
							</view>
						</view>
						<view class="pt-status-pic">
							<image src="__wxapp_img.pt.success.url" v-if="info.group_fail == 1"></image>
							<image src="__wxapp_img.pt.fail.url" v-if="info.group_fail == 2"></image>
						</view>
					</view>
				</navigator>
				<view class="pt-group-shell">
					<view class="flex-col pt-group" style="height:auto;padding-bottom: 20upx;">
						<view class="flex-grow-0 top-title  text-center" v-if="info.groupFail == 0 && info.surplus > 0">
							还剩
							<text>{{ info.surplus == '' ? '' : info.surplus }}</text>
							人, 仅剩
							<text>
								{{ limit_time.days ? limit_time.days : '00' }}天：{{ limit_time.hours ? limit_time.hours : '00' }}：{{
									limit_time.mins ? limit_time.mins : '00'
								}}：{{ limit_time.secs ? limit_time.secs : '00' }}失效
							</text>
						</view>
						<view class="flex-grow-0 top-title text-center" v-if="info.groupFail == 2">
							超过有效时间，
							<text>拼团失败</text>
						</view>
						<view class="flex-grow-0 top-title text-center" v-if="info.groupFail == 1">拼团成功</view>
						<image src="/static/img/icon/icon-pt-group-bg.png" style="position:absolute;left:0;top:0;width:702rpx;height:214rpx;"></image>
						<view class="head-pic flex justify-center align-center text-center">
							<block v-for="(item3, index4) in grouplist" :key="index4">
								<view class="head-pic-item flex-grow-0" v-if="index4 == 0">
									<image :src="item3.avatar_url" style="border:2rpx solid #ff5c5c;"></image>
									<view class="group-frist text-center ">团长</view>
								</view>
								<view class="head-pic-item flex-grow-0" v-else>
									<image :src="item3.avatar_url" v-if="item3.avatar_url != 0"></image>
									<image src="/static/img/icon/pt-no-group-num-pic.png" v-else></image>
								</view>
							</block>
						</view>
					</view>
				</view>
				<view class="play-btn">
					<block v-if="info.groupFail == 0">
						<button open-type="share" @tap="c_show" class="cu-btn  pt_btn bg-yellow1" v-if="info.inGroup == true">邀请好友</button>
						<view @tap="hideModal" :data-type="1" class="cu-btn  bg-yellow1 pt_btn " v-else>我要参团</view>
					</block>
					<block v-if="info.groupFail == 1">
						<!-- @tap="goToGoodsDetails" -->
						<button @tap="goToGoodsDetails" class="cu-btn  pt_btn text-center bg-yellow1" v-if="info.inGroup == true">拼团成功</button>
					</block>
				</view>
			</view>

			<!-- v-if="info.show_attr_picker" -->
			<!-- <view class="attr-picker" >
				<view class="content-box">
					<view class="flex-row" style="border-bottom: 1rpx solid #e3e3e3;padding: 24rpx 28rpx">
						<view class="flex-grow-0">
							<view class="goods-pic-box">
								<image mode="aspectFill" :src="goods.attr_pic" v-if="goods.attr_pic"></image>
								<image mode="aspectFill" :src="goods.cover_pic" v-else></image>
							</view>
						</view>
						<view class="flex-grow-1" style="padding: 0 24rpx">
							<view style="color:#ff4544;margin-bottom: 12rpx;font-weight: bold">￥{{goods.price}}</view>
							<view style="font-size:9pt">
								库存 {{goods.num}}
							</view>
						</view>
						<view class="flex-grow-0">
							<view bindtap="hideAttrPicker" class="text-center " style="width: 100rpx;height: 100rpx">
								<image src="__wxapp_img.store.close.url" style="width: 30rpx;height: 30rpx"></image>
							</view>
						</view>
					</view>
					<scroll-view scrollY="true" style="max-height: 650rpx;">
						<view style="padding: 24rpx 28rpx">
							<view>
								<view class="attr-group" v-if="info.attr_group.attr_list.length>0" v-for="(attr_group,index1) in attr_group_list "
								 :key="index1">
									<view class="attr-group-name">{{attr_group.attr_group_name}}</view>
									<view class="attr-list">
										<text bindtap="attrClick" class="attr-item item.checked?'active':''" data-group-id="attr_group.attr_group_id"
										 :data-id="attr_group.attr_id" v-for="(item1,index2) in attr_group.attr_list" :key="index2">
											{{item1.attr_name}}
										</text>
									</view>
								</view>
							</view>
							<view style="height: 0;border-bottom: 1rpx solid #e3e3e3;margin-bottom: 40rpx"></view>
							<view style="padding-bottom: 40rpx">
								<view class="flex-row  mb-20">
									<view class="flex-grow-1">数量</view>
									<view class="flex-grow-0">
										<view class="flex-row number-input-box">
											<view bindtap="numberSub" class="flex-grow-0 text-center  number-btn number-sub form.number<=1?'disabled':''">-
											</view>
											<view class="flex-grow-0">
												<input bindblur="numberBlur" class="flex-grow-1 number-input" min="1" step="1" type="number" value="form.number"></input>
											</view>
											<view bindtap="numberAdd" class="flex-grow-0 text-center  number-btn number-add">+
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view bindtap="buyNow" class="flex-row buy-confirm  text-center">
						确认
					</view>
				</view>
			</view> -->

			<!-- <view class="share-modal share_modal_active">
				<view class="share-modal-body">
					<view class="flex-row">
						<view class="flex-grow-1 text-center">
							<button class="share-bottom" openType="share" style="height:100%">
								<image src="__wxapp_img.share.friend.url"></image>
								<view>分享给朋友</view>
							</button>
						</view>
						<view class="flex-grow-1 text-center">
							<view bindtap="getGoodsQrcode" class="share-bottom">
								<image src="__wxapp_img.share.qrcode.url"></image>
								<view>生成商品海报</view>
							</view>
						</view>
					</view>
					<view bindtap="shareModalClose" class="share-modal-close  text-center">关闭</view>
				</view>
			</view> -->
			<!-- <view class="goods-qrcode-modal goods_qrcode_active">
				<view class="goods-qrcode-body flex-col">
					<view class="flex-grow-1" style="position: relative">
						<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;padding: 100rpx 100rpx 60rpx">
							<view class="goods-qrcode-box">
								<view class="goods-qrcode-loading text-center ">
									<view class="text-center flex-col">
										<image src="__wxapp_img.system.loading2.url" style="width: 150rpx;height: 150rpx"></image>
										<view style="color: #888">海报生成中</view>
									</view>
								</view>
								<image bindtap="goodsQrcodeClick" class="goods-qrcode" :class="info.goods_qrcode?'active':''" :data-src="info.goods_qrcode"
								 mode="aspectFill" :src="info.goods_qrcode"></image>
							</view>
						</view>
					</view>
					<view class="flex-grow-0 flex-col text-center" style="padding: 0 60rpx 80rpx">
						<view style="margin-bottom: 20rpx;padding: 0 40rpx">
							<button bindtap="saveGoodsQrcode" style="background: #ff4544;color: #fff;" v-if="info.goods_qrcode">
								保存图片
							</button>
							<button style="opacity: .4" v-else>保存图片</button>
						</view>
						<view style="color: #888;font-size: 9pt;text-align: center">保存至相册可以分享给朋友</view>
					</view>
					<view bindtap="goodsQrcodeClose" class="goods-qrcode-close">
						<image src="__wxapp_img.store.close2.url" style="width: 50rpx;height: 50rpx;display: block"></image>
					</view>
				</view>
			</view> -->
		</view>

		<!-- 选择规格 -->
		<view class="cu-modal bottom-modal" :class="modal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="flex justify-between" style="width: 100%;position: relative;">
						<view class="flex align-center" style="padding: 20upx; ">
							<view>
								<view class="cu-avatar x_goodsimg" :style="[{ backgroundImage: 'url(' + attrgoods.pic + ')' }]" v-if="attrgoods.pic"></view>
								<view class="cu-avatar x_goodsimg" :style="[{ backgroundImage: 'url(' + goods.cover_pic + ')' }]" v-else></view>
							</view>
							<view class="flex justify-between " style=" width: 400upx;height: 100upx;flex-wrap: wrap; ">
								<view class="text-left text-bold" style="color:#ff4544; width: 100%;">￥{{ attrgoods.price ? attrgoods.price : goods.price }}</view>
								库存 {{ attrgoods.num ? attrgoods.num : goods.num }}
							</view>
						</view>
					</view>
					<view class="action text-blue" @tap="hideModal" data-type="1"><text class="cuIcon-close text-black"></text></view>
				</view>
				<view class="padding-li text-left bg-white" v-for="(item, index) in attr" :key="index" style="padding: 0upx 40upx;">
					<view class="text-left" style="height: 60upx;">{{ item.attr_group_name }}</view>
					<view class="no-h-view" style="padding-bottom: 30upx;">
						<view
							class="x_view"
							:class="item1.type ? 'bg-yellow1' : ''"
							v-for="(item1, index1) in item.attr_list"
							:key="index1"
							@tap="getattr"
							:data-id="item1.attr_id"
							:data-gid="item.attr_group_id"
							:data-name="item1.attr_name"
						>
							{{ item1.attr_name }}
						</view>
					</view>
				</view>
				<!-- <view class="bg-black " @tap="hideModal" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view> -->
				<view
					class="bg-yellow1 "
					v-if="prinattr.length == attr.length"
					@tap="hideModal"
					data-ok="1"
					:data-style="1"
					style="height: 88upx;font-size: 30upx;line-height: 88upx;"
				>
					确定
				</view>
				<view class="bg-black" v-else @tap="hideModal" data-ok="1" :data-style="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view @tap="tpshop" class="toshop flex justify-center align-center"><text class="cuIcon-home"></text></view>
		<!-- #endif -->
	</view>
</template>

<script>
var that;
var time;
export default {
	data() {
		return {
			id: '',
			group_fail: 0,
			goods: {},
			info: {},
			limit_time: {},
			reduce_price: {},
			grouplist: [],
			modal: false,
			attr: [],
			num: 1,
			prinattr: [],
			attrgoods: [],
			iheight: uni.getStorageSync('iheight'),
			group_id: '',
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			style: '',
			show: false,
			fxtablist: [
				{
					id: 0,
					image: '/static/img/invite/icon-wx.png',
					name: '分享到微信'
				},
				//#ifndef MP-WEIXIN
				{
					id: 1,
					image: '/static/img/invite/icon-pyq.png',
					name: '分享到朋友圈'
				},
				{
					id: 2,
					image: '/static/img/invite/icon-wb.png',
					name: '分享到微博'
				},
				{
					id: 3,
					image: '/static/img/invite/icon-qq.png',
					name: '分享到QQ'
				},
				{
					id: 4,
					image: '/static/img/invite/icon-lj.png',
					name: '复制链接'
				}
				//#endif
			],
			fx: ''
		};
	},
	methods: {
		tpshop() {
			//#ifdef MP-WEIXIN
			uni.switchTab({
				url: '/pages/shop/shop'
			});
			// #endif
		},
		getstyle() {
			console.log('爱上表达哈', this.StatusBar);
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			that.style = style;
		},
		BackPage() {
			// uni.redirectTo({
			// 	url: "/pages/order/groupOrder/orderlist/orderlist"
			// })
			uni.navigateBack({
				delta: 1
			});
		},
		getinfo() {
			this.$request.request({
				url: 'api/group/order/group',
				data: {
					oid: that.id
				},
				success(res) {
					console.log(res);
					var grouplist = res.data.groupList;
					for (let i in grouplist) {
						if (grouplist[i].avatar_url) {
							if (grouplist[i].avatar_url.search('http') == -1) {
								grouplist[i].avatar_url = uni.getStorageSync('url') + grouplist[i].avatar_url;
							}
						}
					}
					var e = (res.data.goods.original_price - res.data.goods.price).toFixed(2);
					that.goods = res.data.goods;
					that.info = res.data;
					that.countDownRun(res.data.limit_time_ms);
					that.grouplist = grouplist;
					that.reduce_price = e < 0 ? 0 : e;
					that.attr = res.data.attr_group_list;
					that.$forceUpdate();
				}
			});
		},
		// 倒计时
		countDownRun: function(r) {
			time = setInterval(function() {
				var t = new Date(r[0], r[1] - 1, r[2], r[3], r[4], r[5]) - new Date(),
					e = parseInt(t / 1e3 / 60 / 60 / 24, 10),
					o = parseInt((t / 1e3 / 60 / 60) % 24, 10),
					a = parseInt((t / 1e3 / 60) % 60, 10),
					i = parseInt((t / 1e3) % 60, 10);
				(e = that.checkTime(e)), (o = that.checkTime(o)), (a = that.checkTime(a)), (i = that.checkTime(i));
				var limit_time = {
					days: e,
					hours: o,
					mins: a,
					secs: i
				};
				that.limit_time = limit_time;
				that.$forceUpdate();
			}, 1e3);
		},
		checkTime: function(t) {
			return (t = 0 < t ? t : 0) < 10 && (t = '0' + t), t;
		},
		// 控制弹窗
		// hideModal(e) {
		// 	console.log(e);
		// 	if (e) {
		// 		if (e.currentTarget.dataset.type) {
		// 			that.modal = !that.modal;
		// 		} else {
		// 			if (that.prinattr.length == that.attr.length) {
		// 				that.modal = !that.modal;
		// 				that.groudbuy();
		// 			}
		// 		}
		// 	} else {
		// 		that.modal = !that.modal;
		// 	}
		// },
		hideModal(e) {
			if (e) {
				//判断但规格直接购买
				if (e.currentTarget.dataset.ok) {
					if (that.prinattr.length == that.attr.length) {
						if (e.currentTarget.dataset.type != 1) {
							that.groudbuy();
						}
					} else {
						that.$alert('请选择规格');
						return;
					}
				} else {
					if (that.attr.length == 1 && that.attr[0].attr_list.length == 1) {
						console.log('单规格');
						that.attr[0].attr_list[0]['type'] = true;
						var v = {
							attr_group_id: that.attr[0].attr_group_id,
							attr_id: that.attr[0].attr_list[0].attr_id,
							attr_name: that.attr[0].attr_list[0].attr_name
						};
						that.prinattr[0] = v;
						that.$forceUpdate();
						console.log('prinattr：', that.prinattr);
					}
					that.modal = !that.modal;
					that.paytype = e.currentTarget.dataset.type;
				}
			} else {
				that.modal = !that.modal;
			}
		},
		// 一件开团
		goToGoodsDetails: function(t) {
			uni.navigateTo({
				url: '/pages/goods/goodsGroup/goodsGroup?gid=' + that.goods.id
			});
		},
		// 选择规格
		getattr(e) {
			var attr_group_id = e.currentTarget.dataset.gid;
			var attr_id = e.currentTarget.dataset.id;
			var attr_name = e.currentTarget.dataset.name;
			for (let t = 0; t < that.attr.length; t++) {
				if (that.attr[t].attr_group_id == attr_group_id) {
					// console.log("当前大类:", that.attr[t]);
					for (let a = 0; a < that.attr[t].attr_list.length; a++) {
						if (that.attr[t].attr_list[a].attr_id == attr_id) {
							// console.log("选择的小类：", that.attr[t].attr_list[a]);
							that.attr[t].attr_list[a]['type'] = true;
						} else {
							that.attr[t].attr_list[a]['type'] = false;
						}
					}
				}
			}
			// 添加规格
			var list = [];
			for (let t = 0; t < that.attr.length; t++) {
				for (let a = 0; a < that.attr[t].attr_list.length; a++) {
					if (that.attr[t].attr_list[a]['type'] == true) {
						var v = {
							attr_group_id: that.attr[t].attr_group_id,
							attr_group_name: that.attr[t].attr_group_name,
							attr_id: that.attr[t].attr_list[a].attr_id,
							attr_name: that.attr[t].attr_list[a].attr_name
						};
						// console.log("点击的", v);
						list = list.concat(v);
					}
				}
			}
			that.prinattr = list;
			// console.log('选择规格:', that.prinattr);
			// console.log("规格列表：", that.attr)
			this.$forceUpdate();
			that.getattringo();
		},
		comput(e) {
			var type = e.currentTarget.dataset.type;
			if (type == 0) {
				that.num = that.num + 1;
			} else {
				if (that.num == 1) {
					return;
				}
				that.num = that.num - 1;
			}
		},
		//获取规格信息
		getattringo() {
			var attr_list = [];
			for (let i in that.prinattr) {
				attr_list.push(that.prinattr[i].attr_id);
			}
			this.$request.request({
				url: 'api/group/index/goods-attr-info',
				data: {
					goods_id: that.goods.id,
					attr_list: JSON.stringify(attr_list),
					group_checked: 0,
					group_id: 0
				},
				success(res) {
					console.log('规格信息', res);
					that.attrgoods = res.data;
				}
			});
		},
		groudbuy(e) {
			if (that.prinattr.length != that.attr.length) {
				that.hideModal();
				return;
			}
			var goods_info = {
				goods_id: that.goods.id,
				attr: that.prinattr,
				num: that.num,
				type: 'GROUP_BUY_C',
				deliver_type: '1',
				group_id: '',
				parent_id: that.info.oid
			};
			that.$request.request({
				url: 'api/group/order/submit-preview',
				data: {
					goods_info: JSON.stringify(goods_info),
					group_id: '',
					address_id: '',
					type: 'GROUP_BUY_C',
					longitude: '',
					latitude: ''
				},
				Toast: '正在提交',
				success(res) {
					console.log(res.data);
					uni.setStorageSync('order', res.data);
					uni.redirectTo({
						url: '/pages/order/groupOrder/groupOrder?id=-1'
					});
				}
			});
		},
		// 分享弹窗
		c_show(e) {
			// #ifndef MP-WEIXIN
			this.show = !that.show;
			// #endif
		},
		share(e) {
			var goods = that.goods;
			// #ifndef MP-WEIXIN
			let index = e.currentTarget.dataset.index;
			var data = {
				type: index
			};
			var fx = {
				path: '/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo?id=' + that.id + '&user_id=' + uni.getStorageSync('userinfo').id,
				imageUrl: that.goods.cover_pic,
				title: '我正在参与拼团，快来一起吧！'
			};
			if (index == 0) {
				console.log('分享到小程序');
				that.$share.wxshare(fx).then(res => {});
			} else {
				that.$share.share(data).then(res => {
					console.log(res);
				});
			}
			// #endif
		}
	},
	onLoad(option) {
		that = this;
		that.id = option.id;
		that.getinfo();
		that.getstyle();
	},
	onShow() {
		if (!uni.getStorageSync('access_token')) {
			that.$zax.yzlogin();
			return;
		}
	},
	onUnload() {
		clearInterval(time);
	},
	onShareAppMessage() {
		console.log('分享');
		var goods = that.goods;
		return {
			imageUrl: goods.cover_pic,
			title: '我正在参与拼团，快来一起吧！',
			path: '/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo?id=' + that.id + '&user_id=' + that.userinfo.id,
			success: function(res) {
				console.log('成功', res);
			}
		};
	}
};
</script>

<style>
.white {
	background: #f0f0f0;
}

page {
	background: #f0f0f0;
}

.goods {
	background-color: #fff;
	padding: 24rpx 24rpx 0 24rpx;
	position: relative;
}

.pt-status-pic image {
	width: 140rpx;
	height: 140rpx;
}

.pt-status-pic {
	position: absolute;
	top: 112rpx;
	right: 24rpx;
	z-index: 999;
}

.goods-pic image {
	width: 260rpx;
	height: 260rpx;
	margin-right: 24rpx;
}

.goods-info-title {
	font-size: 11pt;
	color: #353535;
}

.goods-price {
	font-size: 10pt;
	color: #ff5c5c;
}

.goods-price text {
	font-size: 18pt;
}

.goods-original-price {
	font-size: 9pt;
	color: #a4a4a4;
	text-decoration: line-through;
	margin-left: 10rpx;
}

.goods-money {
	margin-top: 20rpx;
	line-height: 1;
}

.goods-label {
	margin: 10rpx 0;
	color: #ff5c5c;
	font-size: 9pt;
}

.goods-limit {
	padding: 0 12rpx;
	background-color: #feeeee;
	margin-right: 8rpx;
}

.goods-omit {
	background-color: #feeeee;
	padding: 0 12rpx;
}

.pt-group {
	width: 702rpx;
	position: relative;
	background-color: #ffd100;
	min-height: 214rpx;
}

.pt-group-shell {
	margin-top: 24rpx;
	padding: 0 24rpx;
}

.top-title {
	font-size: 10pt;
	color: #353535;
	padding-top: 52rpx;
}

.top-title text {
	color: #ff5c5c;
}

.head-pic {
	padding: 34rpx 40rpx 0 40rpx;
	flex-wrap: wrap;
}

.head-pic-item {
	position: relative;
	margin: 10rpx 8rpx;
	width: 70rpx;
	height: 70rpx;
}

.head-pic image {
	width: 70rpx;
	height: 70rpx;
	border-radius: 35rpx;
}

.group-frist {
	width: 56rpx;
	height: 26rpx;
	background-color: #ff5c5c;
	color: #fff;
	font-size: 6pt;
	border-radius: 13rpx;
	position: absolute;
	top: 56rpx;
	left: 7rpx;
}

.play-btn {
	margin: 24rpx 24rpx 32rpx 24rpx;
}

.play-btn .pt_btn {
	width: 100%;
	height: 88rpx;
	/* background-color: #ff5c5c; */
	border-radius: 10rpx;
	color: #fff;
	font-size: 13pt;
}

.button::after {
	content: normal !important;
}

.group-notice,
.goods-more {
	height: 90rpx;
	padding: 0 24rpx;
	background-color: #fff;
}

.group-notice-left {
	font-size: 10pt;
	color: #353535;
}

.group-notice-info {
	font-size: 9pt;
	color: #919191;
}

.goods-right image {
	width: 16rpx;
	height: 26rpx;
	margin-left: 20rpx;
}

.goods-more {
	margin-top: 20rpx;
	border-bottom: 1rpx solid #e2e2e2;
}

.list-item {
	padding: 24rpx;
	border-bottom: 1rpx solid #e2e2e2;
	background-color: #fff;
}

.list-item .corver-pic image {
	width: 220rpx;
	height: 220rpx;
	border-radius: 5rpx;
	margin-right: 24rpx;
}

.goods-title {
	color: #353535;
	font-size: 11pt;
}

.list-item .group-item image {
	width: 34rpx;
	height: 34rpx;
	border: 1rpx solid #fff;
	border-radius: 17rpx;
}

.list-item .group-item view {
	float: left;
	width: 24rpx;
}

.goods-sales {
	font-size: 10pt;
	color: #ff5c5c;
}

.list-item .price {
	color: #ff5c5c;
	font-size: 14pt;
	margin-right: 16rpx;
	line-height: 1;
}

.list-item .price .unit {
	font-size: 9pt;
}

.list-item .old-price {
	font-size: 10pt;
	color: #919191;
	text-decoration: line-through;
	line-height: 1;
}

.no-h-view {
	flex-wrap: wrap;
	display: flex;
}

.ts-view .cu-btn {
	width: 166upx;
	height: 48upx;
	font-size: 26upx;
	font-weight: 500;
}

.list-item .group-btn {
	height: 66rpx;
	width: 180rpx;
	color: #fff;
	font-size: 12pt;
	border-radius: 10rpx;
	background-color: #ffa360;
	background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, #ffa360), color-stop(140%, #ff5c5c));
	background-image: linear-gradient(140deg, #ffa360, #ff5c5c);
}

.attr-picker {
	position: fixed;
	bottom: 0rpx;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
}

.attr-picker .content-box {
	width: 100%;
	background: #fff;
	position: fixed;
	bottom: 0rpx;
}

.attr-picker .attr-group {
	margin-bottom: 6rpx;
}

.attr-picker .attr-group-name {
	margin-bottom: 20rpx;
}

.attr-picker .attr-item {
	display: inline-block;
	margin: 0 30rpx 30rpx 0;
	background: #f7f7f7;
	border-radius: 10rpx;
	padding: 15rpx 30rpx;
}

.attr-picker .attr-item.active {
	background: #ff4544;
	color: #fff;
}

.attr-picker .goods-pic-box {
	position: relative;
	width: 200rpx;
}

.attr-picker .goods-pic-box image {
	position: absolute;
	top: -90rpx;
	border: 5rpx solid #fff;
	width: 200rpx;
	height: 200rpx;
	border-radius: 5rpx;
	box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
}

.number-input-box {
	height: 70rpx;
}

.number-input-box .number-input {
	height: 70rpx !important;
	border: none;
	text-align: center;
	width: 120rpx;
	background: #eee;
	margin: 0 4rpx !important;
}

.number-input-box .number-btn {
	height: 100% !important;
	width: 70rpx;
	background: #eee;
}

.number-input-box .number-btn.disabled {
	background: #f6f6f6;
	color: #aaa;
}

.buy-confirm {
	height: 90rpx;
	background-color: #ff5c5c;
	color: #fff;
	font-size: 12pt;
}

.share-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0);
	z-index: 1000;
	transform: translateY(100%);
	transition: background 250ms;
}

.share-modal .share-modal-body {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #f2f2f2;
	padding-top: 60rpx;
	transform: translateY(100%);
	transition: transform 250ms;
}

.share-modal.active {
	background: rgba(0, 0, 0, 0.5);
}

.share-modal.active .share-modal-body {
	transform: translateY(0);
}

.share-modal .share-bottom {
	text-align: center;
	font-size: 9pt;
	margin: 0;
	padding: 0;
	margin-bottom: 60rpx;
	line-height: inherit;
	border: none;
	background: none;
	color: inherit;
	font-family: inherit;
	display: inline-block;
}

.share-modal .share-bottom:after {
	display: none;
}

.share-modal .share-bottom image {
	width: 120rpx;
	height: 120rpx;
	margin-bottom: 12rpx;
	border-radius: 999rpx;
	border: 1rpx solid #eee;
}

.share-modal .share-bottom:active image {
	opacity: 0.7;
}

.share-modal .share-modal-close {
	background: #fff;
	height: 100rpx;
	border-top: 1rpx solid #eee;
}

.goods-qrcode-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.5);
	padding: 40rpx;
	transform: translateY(100%);
	opacity: 0.5;
	transition: opacity 250ms;
}

.goods-qrcode-modal.active {
	transform: translateY(0);
	opacity: 1;
}

.goods-qrcode-body {
	background: #fff;
	height: 100%;
	border-radius: 10rpx;
	z-index: 99999;
}

.goods-qrcode-modal .goods-qrcode-box {
	height: 100%;
	position: relative;
	box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.15);
}

.goods-qrcode-modal .goods-qrcode-loading {
	top: 0;
	left: 0;
	position: absolute;
	width: 100%;
	height: 100%;
}

.goods-qrcode-modal .goods-qrcode {
	top: 0;
	left: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	background: #fff;
	display: none;
}

.goods-qrcode-modal .goods-qrcode.active {
	display: block;
}

.goods-qrcode-modal .goods-qrcode-close {
	position: absolute;
	top: 40rpx;
	right: 40rpx;
	padding: 15rpx;
}

.bg-yellow1 {
	background: #ffd100;
	color: #ffffff;
}
</style>
