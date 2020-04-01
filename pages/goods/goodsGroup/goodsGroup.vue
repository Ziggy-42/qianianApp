<template>
	<view style="height: 100%;">
		<view>
			<swiper
				class="screen-swiper"
				:indicator-dots="true"
				:circular="true"
				:autoplay="true"
				interval="5000"
				duration="500"
				indicator-active-color="#FFF"
				style="height: 600upx;"
			>
				<swiper-item v-for="(item, index) in goodsinfo.pic_list" :key="index">
					<skeleton :loading="loading" :imgTitle="true" v-if="loading"></skeleton>
					<image :src="item" mode="aspectFill" v-else></image>
				</swiper-item>
			</swiper>
			<view class="padding-air bg-white">
				<view class="flex justify-between align-center" style="position: relative;">
					<view class="flex align-center">
						<view class="cu-tag radius tag-view ">{{ goodsinfo.group_num ? goodsinfo.group_num : '' }}人团</view>
						<view class="z-color text-bold" style="font-size: 34upx; margin-left: 15upx;">￥{{ goodsinfo.group_price ? goodsinfo.group_price : '' }}</view>
						<view class="old-price" style="font-size: 26upx;margin-left:10upx;">￥{{ goodsinfo.original_price ? goodsinfo.original_price : '' }}</view>
					</view>
					<view class="text-sm text-gray">销量：254</view>
				</view>
				<view style="font-weight: 600;margin-top: 15upx;">
					<text style="font-size: 32upx;color: #000000;">{{ goodsinfo.name ? goodsinfo.name : '' }}</text>
				</view>
				<view class="text-gray " v-if="goodsinfo.subtitle" style="font-size: 27upx; padding:10upx 0upx 0upx;">{{ goodsinfo.subtitle ? goodsinfo.subtitle : '' }}</view>
			</view>
			<view class="kong"></view>
			<view class=" bg-white bg-white " v-if="groupList.length > 0">
				<view class="cu-bar bg-white">
					<view class="action title-style-3"><text class="">参与拼团</text></view>
					<view class="action text-sm text-gray ">查看更多>></view>
				</view>
				<view class="groupList-view">
					<swiper vertical="true" circular="true" display-multiple-items="1" autoplay>
						<swiper-item v-for="(item, index) in groupList" :key="index">
							<view class="pt-list">
								<view class="pt-left ">
									<view class="flex  ">
										<view class="cu-avatar round text-center margin-right" :style="[{ backgroundImage: 'url(' + item.avatar_url + ')' }]"></view>
										<view>
											<view class="g-name">{{ item.nickname }}</view>
											<view class="g-proNum">还差{{ item.surplus }}人成团</view>
										</view>
									</view>
									<view class="flex align-center " style="font-size: 22upx; margin-right: 20upx; ">
										剩余：
										<view class="text-red" style="margin-left: 10upx;">
											{{ item.limit_time1.hours ? item.limit_time1.hours : '00' }}: {{ item.limit_time1.mins ? item.limit_time1.mins : '00' }}:
											{{ item.limit_time1.secs ? item.limit_time1.secs : '00' }}
										</view>
									</view>
								</view>
								<view class=""><view class="pt-btn" @tap="printgroup" :data-id="item.id">去拼团</view></view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<view class="kong"></view>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index == TabCur ? 'c-color cur ' : ''" v-for="(item, index) in tabList" :key="index" @tap="tabSelect" :data-id="index">{{ item }}</view>
		</scroll-view>
		<view class="info bg-white" style="padding-top: 10upx;" v-if="TabCur == 0"><rich-text :nodes="detail"></rich-text></view>

		<view class=" " v-else style="padding-bottom: 10upx;">
			<block v-if="comment.length > 0" v-for="(item, index) in comment" :key="index">
				<view class="comment-view">
					<view class="top-userInfo">
						<view class="cu-avatar" :style="[{ backgroundImage: 'url(' + item.avatar_url + ')' }]"></view>
						<view>
							<view class="user-name">{{ item.nickname }}</view>
							<view class="pl-time">{{ item.addtime }}</view>
						</view>
					</view>
					<view>
						<view class="comment-text">{{ item.comment }}</view>
						<view class="grid flex-sub col-4 grid-square">
							<view class="bg-img" :style="[{ backgroundImage: 'url(' + item + ')' }]" v-for="(item, index) in item.pic_list" :key="index"></view>
						</view>
					</view>
					<view class="bg-gray text-gray" style="padding: 15upx; border-radius: 10upx; " v-if="comment.reply_content">
						<view>
							商家回复：
							<text>{{ comment.reply_content }}</text>
						</view>
					</view>
				</view>
			</block>
		</view>

		<view style="height: 120upx;"></view>
		<view class=" foot cu-bar bg-white tabbar border shop">
			<view class="action">
				<view class="cuIcon-home"></view>
				首页
			</view>
			<view class="action">
				<view class="cuIcon-cart"><view class="cu-tag badge">99</view></view>
				购物车
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange  round shadow-blur" v-if="goodsinfo.is_only == 1" data-type="3" @tap="hideModal">单独购买</button>
				<button class="cu-btn bg-red  round shadow-blur" @tap="hideModal" data-type="2">我要开团</button>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="modal ? 'show' : ''">
			<view style="width: 100%;height: 100%;position: absolute;top: 0upx;" @tap="hideModal" data-type="1"></view>
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="flex justify-between" style="width: 100%;position: relative;">
						<view class="flex " style="padding:40upx 30upx;">
							<view>
								<view class="cu-avatar x_goodsimg" :style="[{ backgroundImage: 'url(' + attrgoods.pic + ')' }]" v-if="attrgoods.pic"></view>
								<view class="cu-avatar x_goodsimg" :style="[{ backgroundImage: 'url(' + goodsinfo.cover_pic + ')' }]" v-else></view>
							</view>
							<view class=" " style="width: 400upx;">
								<view class="text-left text-cut2" style="line-height: 48upx;font-size: 30upx; height: 100upx;">{{ goodsinfo.name }}</view>
								<view class="text-left text-bold price-color" style=" width: 100%;font-size: 32rpx; margin-top: 20upx;">
									￥
									<text v-if="paytype == 3">{{ attrgoods.single ? attrgoods.single : goodsinfo.original_price }}</text>
									<text v-else>{{ attrgoods.goods_price ? attrgoods.goods_price : goodsinfo.price }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 450upx;width: 100%;">
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
					<view class="bg-white flex justify-between  align-center" style="height: 100upx;padding: 0upx 40upx; ">
						<view>数量:</view>
						<view class="li-conten flex align-center " style="width: 200upx;">
							<view class="add-del" @tap="comput" :data-type="1">-</view>
							<view style="font-size: 26upx;color: #989898; width: 80upx;text-align: center;">{{ num }}</view>
							<view class="add-del" @tap="comput" :data-type="0">+</view>
						</view>
					</view>
				</scroll-view>
				<view class="bg-black  bg-yellow1" v-if="prinattr.length == attr.length" @tap="hideModal" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">
					确定
				</view>
				<view class="  bg-yellow1" v-else @tap="hideModal" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view>
			</view>
		</view>

		<!-- <view class="cu-modal bottom-modal" :class="modal ? 'show' : ''">
			<view style="width: 100%;height: 100%;position: absolute;top: 0upx;" @tap="getall" data-type="1"></view>
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="flex justify-between" style="width: 100%;position: relative;">
						<view class="flex " style="padding:40upx 30upx;">
							<view>
								<view class="bg-img x_goodsimg">
									<image :src="attrgoods.pic ? attrgoods.pic : goods.cover_pic" mode="aspectFill" style="width: 100%;height: 100%;"></image>
								</view>
							</view>
							<view class=" " style="width: 400upx;">
								<view class="text-left text-cut2" style="line-height: 48upx;font-size: 30upx; height: 100upx;">{{ goods.name }}</view>
								<view class="text-left text-bold price-color" style=" width: 100%;font-size: 32rpx; margin-top: 20upx;">
									￥{{ attrgoods.price ? attrgoods.price : goods.price }}
								</view> 
							</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 450upx;width: 100%;">
					<view class="padding-li text-left bg-white" v-for="(item, index) in attr" :key="index" style="padding: 0upx 40upx;">
						<view class="text-left" style="height: 60upx;">{{ item.attr_group_name }}</view>
						<view class="no-h-view" style="padding-bottom: 30upx;">
							<view
								class="x_view"
								:class="item1.type ? 'attr-action' : ''"
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
					<view class="bg-white flex justify-between  align-center" style="height: 100upx;padding: 0upx 40upx; ">
						<view>数量:</view>
						<view class="li-conten flex align-center " style="width: 200upx;">
							<view class="add-del" @tap="comput" :data-type="1">-</view>
							<view style="font-size: 26upx;color: #989898; width: 80upx;text-align: center;">{{ num }}</view>
							<view class="add-del" @tap="comput" :data-type="0">+</view>
						</view>
					</view>
				</scroll-view>
				<view class="bg-black  bg-yellow1" v-if="prinattr.length == attr.length" @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">
					确定
				</view>
				<view class="  bg-yellow1" v-else @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view>
			</view>
		</view> -->
	</view>
</template>

<script>
var that;
var videoCtx;
import data from '../data.js';
export default {
	data() {
		return {
			showSkeleton: true,
			motto: 1111,
			userInfo: {
				nickName: 'nickName'
			},
			img: 'http://img5.imgtn.bdimg.com/it/u=2754780702,3253667337&fm=26&gp=0.jpg',
			opacity: 1,
			swiperList: [],
			dotStyle: false,
			towerStart: 0,
			direction: '',
			gid: '',
			goods: '',
			attr: '',
			detail: '',
			modal: false,
			modali: false,
			kd: 0,
			prinattr: [],
			num: 1,
			kdlist: [],
			goodsinfo: '',
			groupList: [],
			group_id: '',
			attrgoods: {},
			paytype: '',
			play: false,
			loading: true,
			TabCur: 0,
			tabList: ['商品详情'],
			comment: []
		};
	},
	methods: {
		tabSelect(e) {
			that.TabCur = e.currentTarget.dataset.id;
		},
		tpshop() {
			uni.switchTab({
				url: '/pages/shop/shop'
			});
		},
		getinfo() {
			this.$request.request({
				url: that.api.group.details,
				data: {
					gid: that.gid
				},
				success(res) {
					console.log(res);
					that.goodsinfo = res.info;
					var attr = res.attr_group_list;
					that.attr = attr;
					var detail = res.info.detail.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ');
					that.detail = detail;
					that.kdlist = res.kd_list;
					that.groupList = res.groupList;
					that.countDown();
					that.loading = false;
				},
				fail(res) {}
			});
		},
		hideModal(e) {
			if (e) {
				//判断但规格直接购买
				if (e.currentTarget.dataset.ok) {
					if (that.prinattr.length == that.attr.length) {
						if (e.currentTarget.dataset.type != 1) {
							if (that.paytype == 2) {
								that.groudbuy();
							}
							if (that.paytype == 3) {
								that.buy();
							}
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
		pint(e) {
			console.log(e.currentTarget.dataset.id);
			that.kd = e.currentTarget.dataset.id;
		},
		tmodal() {
			that.modali = !that.modali;
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
		// 进团
		printgroup(e) {
			uni.navigateTo({
				url: '/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo?id=' + e.currentTarget.dataset.id
			});
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
		buy() {
			if (!uni.getStorageSync('access_token')) {
				that.$zax.yzlogin();
				return;
			}
			if (that.prinattr.length != that.attr.length) {
				that.hideModal();
				return;
			}
			var goods_info = {
				goods_id: that.gid,
				attr: that.prinattr,
				num: that.num,
				type: 'ONLY_BUY',
				deliver_type: '1',
				group_id: '0',
				parent_id: '0'
			};
			that.$request.request({
				url: that.api.group.submit_preview,
				data: {
					goods_info: JSON.stringify(goods_info),
					group_id: '',
					type: 'ONLY_BUY'
				},
				success() {
					console.log(res.data);
					uni.setStorageSync('order', res.data);
					that.hideModal();
					uni.redirectTo({
						url: '/pages/order/groupOrder/groupOrder'
					});
				}
			});
		},
		groudbuy(e) {
			if (that.prinattr.length != that.attr.length) {
				that.hideModal();
				return;
			}
			var goods_info = {
				goods_id: that.gid,
				attr: that.prinattr,
				num: that.num,
				type: 'GROUP_BUY',
				deliver_type: '1',
				group_id: '0',
				parent_id: '0'
			};
			that.$request.request({
				url: that.api.group.submit_preview,
				data: {
					goods_info: JSON.stringify(goods_info),
					group_id: '',
					type: 'GROUP_BUY'
				},
				success(res) {
					that.hideModal();
					console.log('订单', res);
					uni.setStorageSync('order', res);
					uni.redirectTo({
						url: '/pages/order/groupOrder/groupOrder'
					});
				}
			});
		},
		// 倒计时
		countDown: function() {
			setInterval(function() {
				for (var e in that.groupList) {
					var a =
							new Date(
								that.groupList[e].limit_time_ms[0],
								that.groupList[e].limit_time_ms[1] - 1,
								that.groupList[e].limit_time_ms[2],
								that.groupList[e].limit_time_ms[3],
								that.groupList[e].limit_time_ms[4],
								that.groupList[e].limit_time_ms[5]
							) - new Date(),
						i = parseInt(a / 1e3 / 60 / 60 / 24, 10),
						o = parseInt((a / 1e3 / 60 / 60) % 24, 10),
						r = parseInt((a / 1e3 / 60) % 60, 10),
						s = parseInt((a / 1e3) % 60, 10);
					(i = that.checkTime(i)),
						(o = that.checkTime(o)),
						(r = that.checkTime(r)),
						(s = that.checkTime(s)),
						(that.groupList[e].limit_time1 = {
							days: i,
							hours: 0 < o ? o : '00',
							mins: 0 < r ? r : '00',
							secs: 0 < s ? s : '00'
						});
					that.al();
					that.$forceUpdate();
				}
			}, 1e3);
		},
		checkTime: function(t) {
			return t < 0 ? '00' : (t < 10 && (t = '0' + t), t);
		},
		al() {
			var that = this;
			// console.log(that.groupList)
			// console.log("天："+that.groupList[0].limit_time1.days+"时："+that.groupList[0].limit_time1.hours+"分："+that.groupList[0].limit_time1.mins+"秒："+that.groupList[0].limit_time1.secs);
			that.$forceUpdate();
		},
		//获取规格信息
		getattringo() {
			var attr_list = [];
			for (let i in that.prinattr) {
				attr_list.push(that.prinattr[i].attr_id);
			}
			this.$request
				.get(
					{
						url: 'api/group/index/goods-attr-info',
						data: {
							goods_id: that.gid,
							attr_list: JSON.stringify(attr_list),
							group_checked: 0,
							group_id: 0
						}
					},
					''
				)
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log('规格信息', res);
						that.attrgoods = res.data;
					}
				});
		},
		playvideo() {
			that.play = true;
			videoCtx = uni.createVideoContext('myVideo');
			setTimeout(function() {
				videoCtx.requestFullScreen();
				videoCtx.play();
			}, 100);
		},
		fullscreenchange(e) {
			if (!e.detail.fullScreen) {
				videoCtx.stop();
				setTimeout(function() {
					that.play = false;
				}, 1000);
			}
		}
	},
	onLoad(option) {
		that = this;
		that.gid = option.gid ? option.gid : 1;
		// let info = data.groupInfo;
		// if (info) {
		// 	that.goodsinfo = info.info;
		// 	var attr = info.attr_group_list;
		// 	that.attr = attr;
		// 	var detail = info.info.detail.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ');
		// 	that.detail = detail;
		// 	that.kdlist = info.kd_list;
		// 	that.groupList = info.groupList;
		// 	that.comment = info.comment;
		// 	that.countDown();
		// }
		that.getinfo();
	},
	onshow() {}
};
</script>

<style>
page {
	height: 100%;
}

.margin-top {
	margin-top: 15px;
}

.x_view {
	/* width: 150upx; */
	padding: 0upx 20upx;
	height: 56upx;
	line-height: 56upx;
	background: #ececec;
	font-size: 24upx;
	text-align: center;
	border-radius: 10upx;
	margin: 11upx 20upx 11upx 0upx;
	color: #9f9f9f;
}

.t-view {
	/* height: 284upx; */
	border: solid 1upx #747474;
	margin-top: 32upx;
	padding: 20upx 40upx;
	border-radius: 1upx;
}

.soldi-bottom {
	border-bottom: solid 2upx #e2e2e2;
}

.ts-view {
	padding: 0upx 33upx 0upx 57upx;
	height: 77upx;
	background-color: #fef6d2;
	font-size: 28upx;
	font-weight: 550;
	color: #ff4040;
}

.no-h-view {
	flex-wrap: wrap;
	display: flex;
}

.screen-swiper {
	height: 511upx;
	background-color: #f0f0f0;
}

.padding-air {
	padding: 35upx 44upx 35upx 52upx;
}

.pt-btn {
	width: 128upx;
	font-size: 24upx;
	color: #3f3f3f;
	line-height: 54upx;
	text-align: center;
	height: 54upx;
	background-image: linear-gradient(92deg, #ff7155 0%, #ff4c29 100%);
	border-radius: 27upx;
	color: #fff;
}

.foot-view {
	height: 114upx;
	font-size: 30upx;
	font-weight: 550;
}

.foot-view {
	position: fixed;
	bottom: 0upx;
	width: 100%;
}

.c-color {
	color: #fe401b;
}

.groupList-view swiper {
	height: 126upx;
}
.groupList-view .pt-list {
	height: 126upx;
	display: flex;
	align-items: center;
	padding: 0upx 36upx;
	justify-content: space-between;
}
.groupList-view .pt-list .pt-left {
	display: flex;
	justify-content: space-between;
	align-item: center;
	flex: 1;
}
.groupList-view .pt-list .pt-left .cu-avatar {
	width: 86upx;
	height: 86upx;
}
.g-name {
	font-size: 28upx;
	color: #262626;
}
.g-proNum {
	font-size: 24upx;
	color: #b2b2b2;
}

.wl-list {
	font-size: 28upx;
	height: 140upx;
	padding: 0upx 50upx;
	border-bottom: solid 1upx #ececec;
}

.wl-list image {
	width: 34upx;
	height: 34upx;
}

.no-h-view {
	flex-wrap: wrap;
	display: flex;
}

.padding-li {
	padding: 0upx 20upx 0upx 50upx;
}

.x_view {
	padding: 0upx 30upx;
	height: 56upx;
	line-height: 56upx;
	background: #ececec;
	font-size: 24upx;
	text-align: center;
	border-radius: 10upx;
	margin: 11upx 20upx 11upx 0upx;
	color: #9f9f9f;
}

.bg-yellow1 {
	background: #f52618;
	color: #fff;
}

.t-view {
	/* height: 284upx; */
	border: solid 1upx #c7c7c7;
	margin-top: 32upx;
	padding: 20upx 40upx;
	border-radius: 10upx;
}

.soldi-bottom {
	border-bottom: solid 2upx #e2e2e2;
}

.ts-view {
	padding: 0upx 33upx 0upx 45upx;
	height: 77upx;
	background-color: #353535;
	font-size: 28upx;
	color: #ffffff;
}

.ts-view .cu-btn {
	width: 166upx;
	height: 48upx;
	font-size: 26upx;
	font-weight: 500;
}

.screen-swiper {
	height: 511upx;
	background-color: #f0f0f0;
}

.padding-air {
	padding: 35upx 44upx 35upx 52upx;
}

.li-view {
	height: 105upx;
	display: flex;
	align-items: center;
	background: #fff;
	padding: 0upx 36upx;
	border-bottom: solid #eeeeee 1upx;
}

.li-title {
	color: #1d1d1d;
	font-size: 28upx;
	width: 180upx;
}

.li-conten {
	color: #989898;
	font-size: 26upx;
	width: 460upx;
}

.lin-color {
	background-image: linear-gradient(-60deg, #dd00ac 0%, #fd59ff 100%);
	height: 75upx;
	font-size: 28upx;
	color: #ffffff;
}
.lin-color1 {
	background-image: linear-gradient(-60deg, #9329ff 0%, #b000dd 100%);
	height: 75upx;
	font-size: 28upx;
	color: #ffffff;
}
.c-color {
	color: #fe401b;
}

.x_goodsimg {
	width: 184upx;
	height: 184upx;
	border-radius: 10upx;
	margin-right: 30upx;
	overflow: hidden;
	border: solid 2rpx #ff0f0f;
}
</style>
