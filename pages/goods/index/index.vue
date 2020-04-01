<template>
	<view>
		<view class="bg-color-hong top-view ">
			<view class="cu-custom bg-color-hong " :style="[{ height: CustomBar + 'px' }]" style="z-index: 999;">
				<view class="cu-bar" :style="[{ height: CustomBar + 'px' }, { paddingTop: StatusBar + 'px' }]">
					<view class="action" @tap="BackPage">
						<text class="cuIcon-back"></text>
						商城
					</view>
					<!-- #ifndef MP-WEIXIN -->
					<view class="cu-bar search ">
						<view class="search-form round">
							<text class="cuIcon-search"></text>
							<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索" confirm-type="search" />
						</view>
						<view class="action text-center " style="display: block;" @tap="tpinfo" data-url="/pages/cart/cart">
							<view style="font-size: 34upx;"><text class="cuIcon-cart"></text></view>
							<view style="font-size: 18upx;">购物车</view>
						</view>
					</view>
					<!-- #endif -->
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="cu-bar search ">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索" confirm-type="search" />
				</view>
				<view class="action text-center " style="display: block;" @tap="tpinfo" data-url="/pages/cart/cart">
					<view style="font-size: 34upx;"><text class="cuIcon-cart"></text></view>
					<view style="font-size: 18upx;">购物车</view>
				</view>
			</view>
			<!-- #endif -->

			<view class="tclass-view">
				<view class="" style="width: 550upx;">
					<scroll-view scroll-x class=" nav" scroll-with-animation :scroll-left="scrollLeft">
						<view class="cu-item" :class="index == TabCur ? 'text-white cur' : ''" v-for="(item, index) in cat_list" :key="index" @tap="tabSelect" :data-id="index">
							{{ item.name }}
						</view>
					</scroll-view>
				</view>
				<view class="openclbtn" @tap="showModel" data-name="DrawerModalR">更多>></view>
			</view>

			<view class="cu-modal drawer-modal justify-end" :class="modalName == 'DrawerModalR' ? 'show' : ''" @tap="hideModal">
				<view class="cu-dialog basis-lg" @tap.stop="">
					<view class="rclass-view">
						<view class="rclass-li zbg-red ">
							<text class="cuIcon-qr_code"></text>
							全部分类
						</view>
						<block v-for="(item, index) in cat_list" :key="index">
							<view class="rclass-li" @tap="tabSelect" :data-id="index">{{ item.name }}</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 80upx;">
			<view class="header" :class="fixed ? 'fixed' : ''">
				<view class="tab" @tap="qie" data-index="0" :class="sort == 0 ? 'action' : ''">综合</view>
				<view class="tab" @tap="qie" data-index="3" :class="sort == 3 ? 'action' : ''">销量</view>
				<view class="tab price " @tap="qie" data-index="2" :class="sort == 2 ? 'action' : ''">
					价格
					<view>
						<view class="cuIcon-triangleupfill" :class="sort_type == 1 ? '' : 'text-gray'" style="position: relative;top: 12upx;"></view>
						<view class="cuIcon-triangledownfill" :class="sort_type == 0 ? '' : 'text-gray'" style="position: relative;top: -5upx;"></view>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 30upx;"></view>
		<goodslist :list="goods_list" gtype="0"></goodslist>
		<uni-load-more :status="lodstatus" v-if="lodstatus"></uni-load-more>
		<nolist type="1" text="暂无相关商品" v-if="nolist"></nolist>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			lodstatus: '',
			sort: '',
			sort_type: '-1',
			goods_list: [],
			cat_id: '',
			page: 1,
			goods_id: '',
			nomore: false,
			nolist: false,
			TabCur: 0,
			scrollLeft: 0,
			cat_list: [],
			modalName: '',
			fixed: false
		};
	},
	methods: {
		BackPage() {
			uni.navigateBack({
				delta: 1
			});
		},
		showModel(e) {
			that.modalName = e.currentTarget.dataset.name;
		},
		hideModal() {
			that.modalName = '';
		},
		tpinfo(e) {
			let url = e.currentTarget.dataset.url;
			uni.navigateTo({
				url: url
			});
		},
		tabSelect(e) {
			that.TabCur = e.currentTarget.dataset.id;
			that.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			that.cat_id = that.cat_list[that.TabCur].id;
			that.page = 1;
			that.getlist();
			that.hideModal();
		},
		qie(e) {
			let index = e.currentTarget.dataset.index;
			that.sort = index;
			if (index == 2) {
				if (that.sort_type != -1) {
					that.sort_type == 1 ? (that.sort_type = 0) : (that.sort_type = 1);
				} else {
					that.sort_type = 1;
				}
			} else {
				that.sort_type = '-1';
			}
			that.page = 1;
			that.getlist();
		},
		getlist() {
			let goods_list = that.goods_list;
			let page = that.page;
			that.lodstatus = 'loading';
			let nolist = '';
			let nomore = '';
			that.$request.request({
				url: that.api.default.goods_list,
				data: {
					cat_id: that.cat_id ? that.cat_id : that.cat_list[that.TabCur].id,
					page: that.page
				},
				success(res) {
					let li = res.list;
					if (page == 1) {
						goods_list = li;
						page = 2;
						goods_list.length == 0 ? (nolist = true) : (nolist = false),
							li.length == 0 ? ((that.lodstatus = ''), (that.nolist = true)) : li.length > 10 ? (that.lodstatus = 'more') : (that.lodstatus = '');
					} else {
						if (li.length > 0) {
							goods_list = goods_list.concat(li);
							page++;
							that.lodstatus = 'more';
						} else {
							that.lodstatus = 'noMore';
							that.nolist = true;
						}
					}
					that.goods_list = goods_list;
					that.page = page;
					that.nolist = nolist;
					that.nomore = nomore;
				}
			});
		},
		getcarLsit() {
			that.$request.request({
				url: that.api.default.cat_list,
				success(res) {
					console.log(res);
					that.cat_list = res.list;
					uni.setStorageSync("cat_list",res.list);
				}
			});
		}
	},
	onLoad(option) {
		that = this;
		that.cat_id = option.cat_id ? option.cat_id : '';
		that.cat_list = uni.getStorageSync('cat_list');
		console.log(that.cat_list);
		that.getcarLsit();
		that.getlist();
	},
	onReachBottom() {
		that.getlist();
	},
	onPageScroll(e) {
		let topview = uni.createSelectorQuery().select('.top-view');
		let scrolltop = e.scrollTop;
		let topheight;
		topview
			.boundingClientRect(data => {
				topheight = data.height;
			})
			.exec();
		scrolltop > topheight ? (that.fixed = true) : (that.fixed = false);
	}
};
</script>

<style>
page {
	background-color: #f0f0f0;
}
.fixed {
	position: fixed;
}
.header {
	height: 80rpx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* position: fixed; */
	top: 0;
	z-index: 999;
	background: #fff;
	padding-bottom: 0upx;
}
.header .tab {
	flex: 1;
	text-align: center;
	font-size: 27rpx;
	color: #969696;
}
.header .action {
	color: #ff381e;
}
.price {
	display: flex;
	align-items: center;
	justify-content: center;
}
.xia .cuIcon-triangleupfill {
	color: #ffffff;
}
.shang .cuIcon-triangledownfill {
	color: #ffffff;
}
</style>
