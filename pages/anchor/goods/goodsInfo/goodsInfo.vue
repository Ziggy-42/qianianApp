<template>
	<view>
		<view>
			<swiper
				class="screen-swiper"
				:indicator-dots="true"
				:circular="true"
				:autoplay="true"
				interval="5000"
				duration="500"
				indicator-active-color="#FFF"
				style="height: 720upx;"
			>
				<swiper-item v-for="(item, index) in goods.slider" :key="index" @tap="blow_up" :data-url="item"><image :src="item" mode="aspectFill"></image></swiper-item>
			</swiper>
		</view>

		<view class=" padding-air bg-white " style="padding-top: 15upx; ">
			<view  class="flex  justify-between" style="font-weight: 550; overflow: hidden;height: 50upx;">
				<view class="price-color" style="font-size: 38upx;font-weight: 550;margin-right: 20upx;">￥{{ goods.price ? goods.price : '' }}</view>
				<!-- <view class="text-gray" style="font-size: 24upx;position: relative;top: 10upx;">销量：{{ goods.virtual_sales ? goods.virtual_sales : '' }}</view> -->
			</view>
			<view style="font-weight: 600; margin-top: 10upx;">
				<text style="font-size: 32upx;color: #000000;">{{ goods.name ? goods.name : '' }}</text>
			</view>
			<view class="text-gray " v-if="goods.subtitle" style="font-size: 27upx; padding:10upx 0upx 20upx;">{{ goods.price ? goods.price : '' }}</view>
		</view>
		<view class="kong"></view>
		<view>
			<view class="li-view  ">
				<view class="li-title">选择数量</view>
				<view class="li-conten flex align-center">
					<view class="add-del" @tap="comput" :data-type="1">-</view>
					<view style="font-size: 26upx;color: #000000; width: 80upx;text-align: center;">{{ num }}</view>
					<view class="add-del" @tap="comput" :data-type="0">+</view>
				</view>
			</view>
			<!-- <view class="li-view " @tap="tmodal">
				<view class="li-title text-gray">选择规格</view>
				<view class="li-conten text-black" style="color: #000000 !important;"></view>
				<text class="lg text-gray cuIcon-right"></text>
			</view> -->
		</view>
		<view class="kong"></view>
		<!-- <view v-if="goods.video_url" style="position: relative; ">
			<view
				class=" bg-img flex justify-center align-center "
				@tap="playvideo"
				style="width: 100%;height: 350upx;"
				:style="{ backgroundImage: 'url(' + goods.video_url + '?x-oss-process=video/snapshot,t_10000,m_fast,f_png,ar_auto)' }"
			>
				<image src="/static/ico/pay.png" style="width: 70upx;height: 70upx;"></image>
			</view>
		</view> -->
		
		
		<!-- 商户 -->
		<!-- <block v-if="goods.mch">
		<view class="let-mchView"  >
			<view class="image"><image :src="goods.mch.logo" mode="aspectFill"></image></view>
			<view class="center">
				<view class="mchName">{{goods.mch.name}}</view>
				<view class="mchNum">共{{goods.mch.goods_num}}件宝贝</view>
			</view>
			<view><button class="cu-btn" @tap="tpmchinfo" :data-id="goods.mch.id"  >进入</button></view>
		</view> 
		<view class="kong"></view>
		</block> -->
		<view class="padding-air bg-white  ">
			<view class=" flex justify-center align-center ">
				<text class="lain"></text>
				<view style="font-size: 28upx;">商品详情</view>
				<text class="lain"></text>
			</view>
		</view>
		<view class="info bg-white">
			<!-- <rich-text :nodes="detail"></rich-text>
			<video :src="goods.video_url" v-if="play" id="myVideo" @fullscreenchange="fullscreenchange" style="width: 100%;height: 350upx; "></video> -->
			<view class="" v-for="(item,index) in goods.detail_image" :key="index">
				<image :src="item" mode="widthFix" @tap="blow_up" :data-url="item" style="width: 100%;"></image>
			</view>
		</view>
		<view style="height: 120upx;"></view>
		<view class="foot cu-bar bg-white tabbar border shop" style="border-top: 1upx solid #f3f3f3; padding: 0upx 5% ; ">
			<!-- <button class="action">
				<view class="cuIcon-favor"></view>
				收藏
			</button>
			<view class="action">
				<view class="cuIcon-cart"></view>
				购物车
			</view> -->
			<view class="btn-group" style="justify-content: flex-end;">
				<!-- <button class="cu-btn lin-color round shadow-blur" @tap="getall" data-type="3">加入购物车</button> -->
				<button class="cu-btn lin-color1 round shadow-blur" style="width: 100%;" @tap="getall" :data-id="goods.id" data-type="2">立即购买</button>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="modal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green"></view>
					<view class="action text-blue" @tap="hideModal"><text class="cuIcon-close text-black"></text></view>
				</view>
				<view class="padding-li text-left bg-white" v-for="(item, index) in attr" :key="index">
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
						>
							{{ item1.attr_name }}
						</view>
					</view>
				</view>
				<view class="bg-black " style="height: 88upx;font-size: 30upx;line-height: 88upx; " @tap="hideModal">确定</view>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="allmodal ? 'show' : ''">
			<view style="width: 100%;height: 100%;position: absolute;top: 0upx;" @tap="getall" data-type="1"></view>
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="flex justify-between" style="width: 100%;position: relative;">
						<view class="flex " style="padding:40upx 30upx;">
							<view>
								<view class="bg-img x_goodsimg">
									<!-- attrgoods.pic  goods.cover_pic-->
									<image :src="goods.cover ? goods.cover : ''" mode="aspectFill" style="width: 100%;height: 100%;"></image>
								</view>
							</view>
							<view class=" " style="width: 400upx;">
								<view class="text-left text-cut2" style="line-height: 48upx;font-size: 30upx; height: 100upx;">{{ goods.name }}</view>
								<view class="text-left text-bold price-color" style=" width: 100%;font-size: 32rpx; margin-top: 20upx;">
									<!-- attrgoods.price -->
									￥{{ goods.price ? goods.price :'' }}
								</view>
								<!-- <view>库存 {{ attrgoods.num ? attrgoods.num : goods.num }}</view> -->
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
				<view class="bg-black  bg-yellow1" v-if="prinattr.length == attr.length" @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">
					确定
				</view>
				<view class="  bg-yellow1" v-else @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
var videoCtx;
export default {
	data() {
		return {
			swiperList: [],
			dotStyle: false,
			towerStart: 0,
			direction: '',
			pjlist: [],
			gid: '',
			goods: '',
			attr:[],
			detail: '',
			modal: false,
			modali: false,
			allmodal: false,
			prinattr: [],
			num: 1,
			comment: '',
			attrgoods: '',
			buytype: 1,
			userinfo: uni.getStorageSync('userinfo'),
			show: false,
			fx: '',
			play: false,
			kefupara: '',
			jsonUser: '',
			room_id: "",
			anchor_id: ""
		};
	},
	methods: {
		tpmchinfo(e){
			uni.navigateTo({
				url:'/pages/mch/mchinfo/mchinfo?id='+e.currentTarget.dataset.id
			})
		},
		getinfo() {
			this.$request
				.request({
					url: that.api.anchor_order.anchor_goods_detail,
					data: {
						id: that.gid
					}
				})
				.then(res => {
					console.log(res);
					res.detail.slider = res.detail.slider.split(',')
					res.detail.detail_image = res.detail.detail_image.split(',')
					that.detail = res.detail;
					
					that.goods = res.detail;
					// that.goods['cover_pic'] = res.pic_list[0].pic_url;
					// var attr = res.attr_group_list;
					// that.attr = attr;
					// var detail = res.detail.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ');
					// that.detail = detail;
				});
		},
		hideModal() {
			that.modal = !that.modal;
		},
		tmodal() {
			that.modali = !that.modali;
			that.allmodal = !that.allmodal;
		},
		pint(e) {
			console.log(e.currentTarget.dataset.id);
			that.kd = e.currentTarget.dataset.id;
		},
		blow_up(e){
			var url = e.currentTarget.dataset.url;
			uni.previewImage({
				urls: [url]
			})
		},
		getall(e) {
			var id = e.currentTarget.dataset.id;
			var num = that.num;
			if (e) {
				//判断但规格直接购买
				if (e.currentTarget.dataset.ok) {
					if (that.prinattr.length == that.attr.length) {
						if (e.currentTarget.dataset.type != 1) {
							if (that.paytype == 2) {
								console.log('attrgoods', that.attrgoods);
								if (that.attrgoods) {
									if (that.attrgoods.num == 0) {
										that.$alert('当前商品已售罄!');
										that.allmodal = !that.allmodal;
										return;
									}
								} else {
									console.log('goods', that.goods.num);
									if (that.goods.num == 0) {
										that.$alert('当前商品已售罄!');
										that.allmodal = !that.allmodal;
										return;
									}
								}
								that.buy();
							}
							if (that.paytype == 3) {
								that.addcart();
							}
							that.allmodal = !that.allmodal;
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
					that.allmodal = !that.allmodal;
					that.paytype = e.currentTarget.dataset.type;
				}
			} else {
				that.allmodal = !that.allmodal;
			}
		},
		// 选择规格
		getattr(e) {
			var attr_group_id = e.currentTarget.dataset.gid;
			var attr_id = e.currentTarget.dataset.id;
			var attr_name = e.currentTarget.dataset.name;
			for (let t = 0; t < that.attr.length; t++) {
				if (that.attr[t].attr_group_id == attr_group_id) {
					console.log('当前大类:', that.attr[t]);
					for (let a = 0; a < that.attr[t].attr_list.length; a++) {
						if (that.attr[t].attr_list[a].attr_id == attr_id) {
							console.log('选择的小类：', that.attr[t].attr_list[a]);
							that.attr[t].attr_list[a]['type'] = true;
							that.$forceUpdate();
						} else {
							that.attr[t].attr_list[a]['type'] = false;
							that.$forceUpdate();
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
							attr_id: that.attr[t].attr_list[a].attr_id,
							attr_name: that.attr[t].attr_list[a].attr_name
						};
						// console.log("点击的", v);
						list = list.concat(v);
						that.$forceUpdate();
					}
				}
			}
			that.prinattr = list;
			// console.log('选择规格:', that.prinattr);
			// console.log("规格列表：", that.attr)
			that.getattringo();
			that.$forceUpdate();
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
				that.getall();
				return;
			} 
			this.$request
				.request({
					url: that.api.live_order.submit_preview,
					data: {
						goods_id:that.gid,
						goods_num:that.num
					},
					method: 'post'
				})
				.then(res => {
					console.log(res);
					uni.setStorageSync('order', res); 
					uni.navigateTo({
						url: '/pages/anchor/order/createOrder/createOrder?room_id='+that.room_id+'&anchor_id='+that.anchor_id
					});
				}); 
		},
		previewImage(e) {
			console.log(e.currentTarget.dataset.list);
			uni.previewImage({
				urls: e.currentTarget.dataset.list,
				current: e.currentTarget.dataset.img
			});
		},
		playvideo() {
			that.play = true;
			videoCtx = uni.createVideoContext('myVideo');
			setTimeout(function() {
				videoCtx.requestFullScreen();
				0;
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
		console.log(option);
		that.gid = option.id ? option.id : '3';
		that.room_id=option.room_id ? option.room_id : '';
		that.anchor_id=option.anchor_id ? option.anchor_id : ''; 
		that.getinfo();
		that.userinfo = uni.getStorageSync('userinfo');
	},
	onBackPress() {
		if (!that.allmodal) {
			that.allmodal = !that.allmodal;
			return;
		}
	},
	onShareAppMessage() {
		// console.log('分享');
		// var goods = that.goods;
		// console.log(goods);
		// return {
		// 	imageUrl: goods.cover_pic,
		// 	title: goods.name,
		// 	path: '/pages/goods/goodsinfo/goodsinfo?gid=' + goods.id + '&user_id=' + that.userinfo.id,
		// 	success: function(res) {
		// 		console.log('成功', res);
		// 	}
		// };
	}
};
</script>

<style>
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

.bg-yellow1 {
	background: #b701e5;
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

.x_goodsimg {
	width: 184upx;
	height: 184upx;
	border-radius: 10upx;
	margin-right: 30upx;
	overflow: hidden;
}
</style>

