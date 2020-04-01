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
				<swiper-item v-for="(item, index) in goods.pic_list" :key="index">
					<image :src="item.pic_url" mode="aspectFill"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video> -->
				</swiper-item>
			</swiper>
			<view class="ts-view flex justify-between align-center bg-black" v-if="!goods.time">活动已结束</view>
			<view class="ts-view flex justify-between align-center bg-black" v-else>
				距离结束还剩
				<block>{{ goods.day ? goods.day : '00' }}天{{ goods.h ? goods.h : '00' }}:{{ goods.m ? goods.m : '00' }}:{{ goods.s ? goods.s : '00' }}</block>
			</view>
		</view>

		<view class=" padding-air bg-white " style="padding-bottom: 0upx;padding-top: 15upx; ">
			<view class=" flex justify-between " style="font-weight: 550; overflow: hidden;">
				<text style="font-size: 38upx;color: #ff4040;">
					￥{{ goods.price ? goods.price : '' }}
					<text class="text-gray old-price" style="font-size: 28upx;margin: 0upx 10upx;">￥{{ goods.original_price ? goods.original_price : '0.00' }}</text>
				</text>
				<view class="text-gray" style="font-size: 24upx;position: relative;top: 10upx;">销量：{{ goods.sales ? goods.sales : 0 }}</view>
			</view>
			<view style="font-weight: 600; margin-top: 10upx;">
				<text style="font-size: 32upx;color: #000000;">{{ goods.name ? goods.name : '' }}</text>
			</view>
			<view class="text-gray " v-if="goods.subtitle" style="font-size: 27upx; padding:10upx 0upx 20upx;">{{ goods.subtitle ? goods.subtitle : '' }}</view>
		</view>
		<view class=" padding-air bg-white" style="padding-top: 10upx ; padding-bottom: 10upx; margin-top: 30upx;">
			<view class="li-view flex " v-if="goods.provenance">
				<view class="li-title" style="color: #aaaaaa;">发货源产地</view>
				<view class="li-conten" style="line-height: 40upx;margin-top: 14upx; color: #000000 !important;">{{ goods.provenance ? goods.provenance : '' }}</view>
			</view>
			<view class="li-view   flex align-center " @tap="tmodal">
				<view class="li-title text-gray " style="color: #aaaaaa;">选择物流</view>
				<view class="li-conten text-black" style="color: #000000 !important;">
					<block v-if="kd == index" v-for="(item, index) in kdlist" :key="index">
						{{ item.name ? item.name : '' }}
						<text v-if="item.price > 0">（补{{ item.price }}元运费）</text>
					</block>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>

			<view class="li-view   flex align-center ">
				<view class="li-title" style="color: #aaaaaa;">选择数量</view>
				<view class="li-conten flex align-center">
					<image src="/static/img/icon/icon-jian.png" @tap="comput" :data-type="1" mode="widthFix" style="width: 44upx;height: 29upx;"></image>
					<view style="font-size: 26upx;color: #000000; width: 80upx;text-align: center;">{{ num ? num : '0' }}</view>
					<image src="/static/img/icon/icon-add.png" @tap="comput" :data-type="0" mode="widthFix" style="width: 44upx;height: 29upx;"></image>
				</view>
			</view>

			<view class="li-view flex " v-if="goods.service_list.length > 0">
				<view class="li-title" style="color: #aaaaaa;">售后保障</view>
				<view class="li-conten" style="line-height: 40upx;margin-top: 14upx;color: #000000; ">
					<block v-for="(item, index) in goods.service_list" :key="index">
						{{ item ? item : '' }}
						<block v-if="goods.service_list.length != index + 1">,</block>
					</block>
				</view>
			</view>
		</view>

		<view class="padding-air margin-top bg-white soldi-bottom" style="padding-bottom: 10upx;" v-if="comment.length > 0">
			<view class="flex justify-between">
				<view style="font-size: 28upx;">用户评价</view>
				<view style="font-size: 26upx;color: #ff5151;" @tap="tplist">更多>></view>
			</view>
			<view v-if="comment.length > 0">
				<view class="flex align-center" style="height: 80upx;">
					<view class="cu-avatar sm round" :style="[{ backgroundImage: 'url(' + comment.avatar_url + ')' }]"></view>
					<view class="text-gray " style="margin-left: 25upx;">{{ comment.nickname }}</view>
				</view>
				<view style="padding: 10upx 0upx;font-size: 24upx;color: #4f4f4f;line-height: 40upx;">{{ comment.addtime }}</view>
				<view>
					<view class="grid flex-sub col-4 grid-square">
						<view class="bg-img" :style="[{ backgroundImage: 'url(' + item + ')' }]" v-for="(item, index) in comment.pic_list" :key="index"></view>
					</view>
				</view> 
				<view class="bg-gray text-gray" style="padding: 15upx; border-radius: 10upx; " v-if="comment.reply_content" >
					<view>
						商家回复：
						<text>{{ comment.reply_content }}</text>
					</view>
				</view>
			</view> 
			 
		</view>
		<view class="padding-air bg-white margin-top" v-if="goods.information.length > 0" :class="comment.length > 0 ? '' : 'margin-top'">
			<view class="flex justify-between"><view style="font-size: 28upx;">产品信息</view></view>
			<view class="t-view text-gray" style="font-size: 24upx;">
				<view class="flex li-ciew " v-for="(item, index) in goods.information" :key="index">
					<view class="title">{{ item[0] }}</view>
					<view class="conten">{{ item[1] }}</view>
				</view>
			</view>
		</view>

		<view v-if="goods.video_url" style="position: relative; margin-top: 20upx;">
			<view
				class=" bg-img flex justify-center align-center "
				@tap="playvideo"
				style="width: 100%;height: 350upx;"
				:style="{ backgroundImage: 'url(' + goods.video_url + '?x-oss-process=video/snapshot,t_10000,m_fast,f_png,ar_auto)' }"
			>
				<image src="/static/ico/pay.png" style="width: 70upx;height: 70upx;"></image>
			</view>
		</view>

		<view class="padding-air bg-white margin-top ">
			<view class=" flex justify-center align-center ">
				<text class="lain"></text>
				<view style="font-size: 28upx;">商品详情</view>
				<text class="lain"></text>
			</view>
		</view>

		<view class="info bg-white">
			<rich-text :nodes="detail"></rich-text>
			<video :src="goods.video_url" v-if="play" id="myVideo" @fullscreenchange="fullscreenchange" style="width: 100%;height: 350upx; "></video>
		</view>

		<view style="height: 120upx;"></view>
		<view class="foot cu-bar bg-black tabbar border shop">
			<!-- open-type="contact" -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="action bg-black" open-type="contact" :session-from="kefupara">
				<view><image src="/static/img/icon/icon-kefu.png" mode="widthFix" style="width: 30upx;height: 30upx;margin-bottom: 10upx;"></image></view>
				客服
			</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button class="action bg-black" @tap="kefu">
				<view><image src="/static/img/icon/icon-kefu.png" mode="widthFix" style="width: 30upx;height: 30upx;margin-bottom: 10upx;"></image></view>
				客服
			</button>
			<!-- #endif -->

			<button class="action bg-black" open-type="share" @tap="c_show">
				<view><image src="/static/img/icon/icon-fenx.png" mode="widthFix" style="width: 30upx;height: 30upx;margin-bottom: 10upx;"></image></view>
				分享
			</button>
			<block v-if="!goods.time"><view class="bg-gray submit text-black" style="background-color: #c5c3c3;color: #FFF;">已结束</view></block>
			<block v-else>
				<view
					class="bg-orange submit text-black"
					style="background-image: linear-gradient(88deg,  #feb935 0%,  #feda6a 0%,  #fefb9e 0%,  #fff59f 0%,  #ffee9f 0%,  #ffe18b 100%);"
					@tap="getall"
					data-type="3"
				>
					加入购物车
				</view>
				<view class="bg-red submit text-black" @tap="getall" data-type="2" style="background-color: #ffd100;">立即购买</view>
			</block>
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
							:data-name="item1.attr_name"
						>
							{{ item1.attr_name }}
						</view>
					</view>
				</view>
				<view class="bg-black " @tap="hideModal" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="modali ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="content text-black">选择物流</view>
					<view class="action text-blue" @tap="tmodal" style="position: absolute;right: 0upx;"><text class="cuIcon-close text-black"></text></view>
				</view>
				<view class="text-left bg-white">
					<view class="flex justify-between align-center wl-list " v-for="(item, index) in kdlist" :key="index" @tap="pint" :data-id="index">
						<view>
							{{ item.name }}
							<text v-if="item.price > 0" style="color: #ff6a6a;">（补{{ item.price }}元运费）</text>
						</view>
						<image v-if="kd == index" src="/static/img/icon/icon-print.png" mode="widthFix" style="width: 34upx;height: 34upx;"></image>
						<image v-else src="/static/img/icon/icon-printno.png" mode="widthFix" style="width: 34upx;height: 34upx;"></image>
					</view>
				</view>
				<view class="bg-black " style="height: 88upx;font-size: 30upx;line-height: 88upx;" @tap="tmodal">确定</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="allmodal ? 'show' : ''">
			<view style="width: 100%;height: 100%;position: absolute;top: 0upx;" @tap="getall" data-type="1"></view>
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
					<view class="action text-blue" @tap="getall" data-type="1"><text class="cuIcon-close text-black"></text></view>
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
				<view class="bg-white flex justify-between  align-center" style="height: 100upx;padding: 0upx 40upx; ">
					<view>数量:</view>
					<view class="li-conten flex align-center " style="width: 150upx;">
						<image src="/static/img/icon/icon-jian.png" @tap="comput" :data-type="1" mode="widthFix" style="width: 44upx;height: 29upx;"></image>
						<view style="font-size: 26upx;color: #989898; width: 80upx;text-align: center;">{{ num }}</view>
						<image src="/static/img/icon/icon-add.png" @tap="comput" :data-type="0" mode="widthFix" style="width: 44upx;height: 29upx;"></image>
					</view>
				</view>
				<!-- <view class="bg-black" :class="prinattr.length ==attr.length?'bg-yellow1':''" @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view> -->
				<view class="bg-black  bg-yellow1" v-if="prinattr.length == attr.length" @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">
					确定
				</view>
				<view class="  bg-yellow1" v-else @tap="getall" data-ok="1" style="height: 88upx;font-size: 30upx;line-height: 88upx;">确定</view>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="show ? 'show' : ''">
			<view class="cu-dialog">
				<view class="bg-gary">
					<view class="down-item  margin-top">
						<view class="cu-list  bg-gary grid col-4 no-border" style="background-color: #f6f6f6;">
							<view class="cu-item  bg-gary down-tab" v-for="(item, index) in fxtablist" :key="index" @tap="share" :data-index="index">
								<view><image :src="item.image" style="width: 90upx;height: 90upx;"></image></view>
								<text style="font-size: 20upx;color: #333333;">{{ item.name }}</text>
							</view>
						</view>
					</view>
					<view class=" bg-white text-center" style="height:75upx;line-height: 75upx;color: #0f0e0e;" @tap="c_show">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
var videoCtx;
var iendtime;
export default {
	data() {
		return {
			swiperList: [],
			dotStyle: false,
			towerStart: 0,
			direction: '',
			pjlist: [
				{
					user_name: '用户123',
					user_img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					conten: '用户评价用户评价，用户评价，用户评价用户评价，用户评价，用户评价用户评价，用户评价。',
					images: ['/static/img/test/img02.jpg', '/static/img/test/img03.jpg', '/static/img/test/img04.jpg', '/static/img/test/img05.jpg', '/static/img/test/img06.jpg']
				}
			],
			gid: '',
			goods: '',
			attr: '',
			detail: '',
			modal: false,
			modali: false,
			allmodal: false,
			kd: 0,
			prinattr: [],
			num: 1,
			kdlist: [],
			comment: [],
			attrgoods: '',
			paytype: 1,
			userinfo: uni.getStorageSync('userinfo'),
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
			fx: '',
			play: false,
			jsonUser: '',
			kefupara: ''
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
		getinfo() {
			this.$request
				.get({
					url: 'api/default/goods',
					data: {
						id: that.gid
					}
				})
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res.data);
						that.goods = res.data;
						// console.log(JSON.parse(res.data.attr));
						var attr = res.data.attr_group_list;
						that.attr = attr;
						var detail = res.data.detail.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ');
						that.detail = detail;
						that.kdlist = res.data.kd_list;
						that.etime();
						// #ifdef MP-WEIXIN
						let kefupara = that.jsonUser;
						kefupara['商品'] = that.goods.name;
						kefupara['订单号'] = '无';
						that.kefupara = JSON.stringify(kefupara);
						//#endif
					}
				});
		},
		hideModal() {
			that.modal = !that.modal;
		},
		pint(e) {
			console.log(e.currentTarget.dataset.id);
			that.kd = e.currentTarget.dataset.id;
		},
		tmodal() {
			that.modali = !that.modali;
		},
		getall(e) {
			if (e) {
				//判断但规格直接购买
				if (e.currentTarget.dataset.ok) {
					if (that.prinattr.length == that.attr.length) {
						if (e.currentTarget.dataset.type != 1) {
							if (that.paytype == 2) {
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
		// 打开客服
		kefu() {
			// #ifndef MP-WEIXIN
			var that = this;
			// console.log(that.userinfo)
			var customer = {
				head: that.userinfo.avatar_url, //该字段可以将顾客头像同步过来
				名称: that.userinfo.nickname,
				商品名称: that.goods.name
			};
			customer = JSON.stringify(customer);
			//用 encodeURIComponent 进行编码
			customer = encodeURIComponent(customer);
			var url = that.goods.kf_link;
			console.log(customer, url);
			uni.navigateTo({
				url: '/pages/kefu/kefu?url=' + url + '&customer=' + customer
			});
			//#endif
		},
		// 加入购物车
		addcart() {
			if (!uni.getStorageSync('access_token')) {
				that.$zax.yzlogin();
				return;
			}
			if (that.prinattr.length != that.attr.length) {
				that.getall();
				return;
			}
			console.log('商品id:', that.gid);
			console.log('规格信息：', that.prinattr);
			console.log('数量：', that.num);
			this.$request
				.post({
					url: 'api/cart/add-cart',
					data: {
						goods_id: that.gid,
						attr: JSON.stringify(that.prinattr),
						num: that.num
					}
				})
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res);
						this.$alert(res.msg);
					}
				});
		},
		// 选择规格
		getattr(e) {
			var attr_group_id = e.currentTarget.dataset.gid;
			var attr_id = e.currentTarget.dataset.id;
			var attr_name = e.currentTarget.dataset.name;
			for (let t = 0; t < that.attr.length; t++) {
				if (that.attr[t].attr_group_id == attr_group_id) {
					for (let a = 0; a < that.attr[t].attr_list.length; a++) {
						if (that.attr[t].attr_list[a].attr_id == attr_id) {
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
							attr_id: that.attr[t].attr_list[a].attr_id,
							attr_name: that.attr[t].attr_list[a].attr_name
						};
						console.log('点击的', v);
						list = list.concat(v);
					}
				}
			}
			that.prinattr = list;
			that.getattringo();
			this.$forceUpdate();
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
		// 倒计时
		etime() {
			clearInterval(iendtime);
			let that = this;
			iendtime = setInterval(function() {
				var thistime = Math.round(new Date().getTime() / 1000);
				var endtime = that.goods.end_time;
				var sytime = endtime - thistime;
				if (sytime < 0) {
					that.goods['time'] = false;
				} else {
					that.goods['time'] = true;
					var day = parseInt(sytime / 86400);
					var h = parseInt((sytime % 86400) / 3600);
					var m = parseInt(((sytime % 86400) % 3600) / 60);
					var s = ((sytime % 86400) % 3600) % 60;
					that.goods['day'] = day;
					that.goods['h'] = h >= 10 ? h : '0' + h;
					that.goods['m'] = m >= 10 ? m : '0' + m;
					that.goods['s'] = s >= 10 ? s : '0' + s;
					// that.goods=goods;
				}
				that.al();
			}, 1000);
		},
		al() {
			var that = this;
			this.$forceUpdate();
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
			var mch_list = [
				{
					mch_id: that.goods.mch ? that.goods.mch.id : '0',
					goods_list: [
						{
							goods_id: that.gid,
							attr: that.prinattr,
							num: that.num
						}
					],
					kd: that.kdlist[that.kd]
				}
			];
			console.log('订单信息：', mch_list);
			// return;
			this.$request
				.post({
					url: 'api/order/new-submit-preview',
					data: {
						mch_list: JSON.stringify(mch_list)
					}
				})
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log(res.data);
						uni.setStorageSync('order', res.data);
						uni.navigateTo({
							url: '../../order/createOrder/createOrder'
						});
					}
				});
		},
		//评论列表
		getcomlist() {
			this.$request
				.get({
					url: 'api/default/comment-list',
					data: {
						goods_id: that.gid,
						page: 1
					}
				})
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log('评论列表:', res.data.list.length > 0);
						if (res.data.list.length > 0) {
							that.comment = res.data.list[0];
						}
					}
				});
		},
		tplist() {
			uni.navigateTo({
				url: '/pages/evaluateList/evaluateList?id=' + that.gid
			});
		},
		//获取规格信息
		getattringo() {
			var attr_list = [];
			for (let i in that.prinattr) {
				attr_list.push(that.prinattr[i].attr_id);
			}
			this.$request
				.get({
					url: 'api/default/goods-attr-info',
					data: {
						goods_id: that.gid,
						attr_list: JSON.stringify(attr_list),
						group_checked: 0,
						group_id: 0
					}
				})
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						console.log('规格信息', res);
						that.attrgoods = res.data;
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
			console.log(goods);
			// #ifndef MP-WEIXIN
			let index = e.currentTarget.dataset.index;
			var data = {
				type: index
			};
			var fx = {
				imageUrl: goods.cover_pic,
				title: goods.name,
				path: '/pages/goods/goodsitem/goodsitem?gid=' + goods.id + '&user_id=' + uni.getStorageSync('userinfo').id
			};
			if (index == 0) {
				console.log('分享到小程序');
				that.$share.wxshare(fx).then(res => {
					console.log(res);
				});
			} else {
				that.$share.share(data).then(res => {
					console.log(res);
				});
			}
			// #endif
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
		console.log(option);
		that.gid = option.gid;
		that.getinfo();
		that.getcomlist();
		videoCtx = uni.createVideoContext('myVideo');
		this.jsonUser = uni.getStorageSync('jsonUser');
	},
	onBackPress() {
		if (that.allmodal) {
			that.allmodal = !that.allmodal;
			return;
		}
	},
	onShareAppMessage() {
		console.log('分享');
		var goods = that.goods;
		return {
			imageUrl: goods.cover_pic,
			title: goods.name,
			path: '/pages/goods/goodsitem/goodsitem?gid=' + goods.id + '&user_id=' + that.userinfo.id,
			success: function(res) {
				console.log('成功', res);
			}
		};
	}
};
</script>

<style>
.margin-top {
	margin-top: 30upx;
}

.lain {
	padding: 1upx 50upx;
	background: #e9e9e9;
	margin: 0upx 15upx;
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
	background: #ffd100 !important;
	color: #000000 !important;
}

.t-view {
	/* height: 284upx; */
	border: solid 1upx #7e7c7c;
	margin-top: 32upx;
	padding: 20upx 40upx;
	border-radius: 8upx;
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
	min-height: 70upx;
	line-height: 70upx;
	overflow: height;
}

.li-title {
	color: #000000;
	font-size: 28upx;
	/* border: solid 2upx #000000; */
	width: 168upx;
}

.li-conten {
	color: #989898;
	font-size: 26upx;
	/* border: solid 2upx #000000; */
	width: 460upx;
}

.li-ciew {
	/* border: solid #000000 1upx; */
	min-height: 60upx;
}

.li-ciew .title {
	width: 130upx;
	line-height: 60upx;
}

.li-ciew .conten {
	/* margin-top: 15upx; */
	/* line-height: 35upx; */
	line-height: 60upx;
	width: 670upx;
}

.img-ks-lazyload {
	width: 750upx !important;
}
.bg-yellow1 {
	background: #ffd100 !important;
	color: #000000 !important;
}
</style>
