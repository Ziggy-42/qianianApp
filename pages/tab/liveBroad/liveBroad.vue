<template>
	<view>
		<scroll @downrefresh="downrefresh">
			<view style="position: relative;background: url('/static/icon/bg-header.png') no-repeat ; background-size: 100%; background-color: #FFF;  ">
				<!-- <image src="" mode="widthFix" style="width: 100%;"></image> -->
				<!-- style="position: absolute;top: 0upx;" --> 
				<view class="header" :style="[{ paddingTop: StatusBar + 'px' }]">
					 <!-- #ifdef MP-WEIXIN -->
					<view class="search-view "  style=" width: 580upx;" >
					<!-- #endif -->
					 <!-- #ifndef MP-WEIXIN -->
					<view class="search-view "  style="  " >
					<!-- #endif --> 
						<view class="search-form round click " @tap="tpinfo">
							<text class="cuIcon-search"></text>
							<input type="text" placeholder="输入要搜索的宝贝名称" disabled="true" confirm-type="search" />
						</view> 
					</view> 
					<view class="swiper-vai">
						<swiper class="screen-swiper " style="height: 100%;min-height:100%;" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
							<swiper-item v-for="(item, index) in banner_list" :key="index">
								<navigator :url="item.page_url ? item.page_url : ''" :open-type="item.open_type" style="width: 100%; height: 100%;">
									<image lazy-load="true" :src="item.pic_url" mode="aspectFill"></image>
								</navigator>
							</swiper-item>
						</swiper>
					</view>
				</view> 
			</view>
			  
			 
			<view class="bg-white">
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles z-color"></text>
						<text class=" text-bold ">直播分类一</text>
					</view>
					<view class="action flex align-center text-gray " style="font-size: 24upx;">
						更多
						<view class="cuIcon-right" style="font-size: 28upx;"></view>
					</view>
				</view>
				<view class="cardw-swiper" > 
				<swiper class="card-swiper"  :autoplay="true"  :indicator-dots="false" :circular="true"
				 interval="5000" duration="500" previous-margin="120rpx" @change="cardSwiper" indicator-color="#8799a3"
				 indicator-active-color="#0081ff">
					<swiper-item v-for="(item,index) in banner_list1" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item"> 
							<view class="bg-img" :style="{backgroundImage:'url('+item.pic_url+')'}" > 
								<view class="cu-capsule round"  >
									<view class='cu-tag bg-jhline '>直播中</view>
									<view class="cu-tag bg-lk">123观看</view>
								</view>
							</view> 
							<view class="down">
								<image class="avatar" :src="item.pic_url" mode=""></image>
								<view >迷宫咋快速导航</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				</view>
			</view>
			<view class="kong"></view>
			
			<view class="bg-white">
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles z-color"></text>
						<text class=" text-bold ">直播分类二</text>
					</view>
					<view class="action flex align-center text-gray " style="font-size: 24upx;">
						更多
						<view class="cuIcon-right" style="font-size: 28upx;"></view>
					</view>
				</view>
				<view class="cardw-swiper" > 
				<swiper class="card-swiper"  :autoplay="true"  :indicator-dots="false" :circular="true"
				 interval="5000" duration="500" previous-margin="120rpx" @change="cardSwiper" indicator-color="#8799a3"
				 indicator-active-color="#0081ff">
					<swiper-item v-for="(item,index) in banner_list1" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item"> 
							<view class="bg-img" :style="{backgroundImage:'url('+item.pic_url+')'}" > 
								<view class="cu-capsule round"  >
									<view class='cu-tag bg-jhline '>直播中</view>
									<view class="cu-tag bg-lk">123观看</view>
								</view>
							</view> 
							<view class="down">
								<image class="avatar" :src="item.pic_url" mode=""></image>
								<view >迷宫咋快速导航</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				</view>
			</view>  
			 
			<view style="height: 120upx;"> </view>
		</scroll>
	</view>
</template>

<script>
var that;
import data from '../data.js'; 
import scroll from '../../../components/scroll/scroll.vue'
export default {
	name: 'goodsIndex',  
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			TabCur: 0,
			scrollLeft: 0,
			banner_list: [],
			banner_list1: [],
			list: [],
			goods_list: [],
			goods_list1: [],
			tablist: [],
			modalName: '',
			cardCur:0,
			classList: [
				{
					name: '无烟艾灸盒'
				},
				{
					name: '艾艾贴'
				},
				{
					name: '黑蚂蚁透骨贴'
				},
				{
					name: '艾灸器具'
				},
				{
					name: '艾草制品'
				},
				{
					name: '艾草用品'
				},
				{
					name: '艾灸盒'
				},
				{
					name: '艾灸设备'
				}
			]
		};
	},
	methods: {
		cardSwiper(e) {
			this.cardCur = e.detail.current
		},
		showModel(e) {
			that.modalName = e.currentTarget.dataset.name;
		},
		hideModal() {
			that.modalName = '';
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		tpinfo(e) {
			let url = e.currentTarget.dataset.url;
			uni.navigateTo({
				url: url
			});
		},
		tomore(e) {
			uni.navigateTo({
				url: '/pages/goods/goodsList/goodsList'
			});
		},
		// 下拉刷新
		downrefresh(){
			console.log("下拉刷新",scroll); 
			setTimeout(function(){
				scroll.methods.stop()
				uni.stopPullDownRefresh()
			},1000) 
		},
		getindex() {
			that.$request
				.request({
					url: that.api.default.index,
					data: {
						page_id: -1
					}
				})
				.then(res => {
					console.log('首页：', res);
					that.banner_list = res.banner_list;
					that.banner_list1 = [
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/groupList/groupList'
						},
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/timelimitList/timelimitList'
						},
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/timelimitList/timelimitList'
						},
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/timelimitList/timelimitList'
						},
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/timelimitList/timelimitList'
						},
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/timelimitList/timelimitList'
						},
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/timelimitList/timelimitList'
						},
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/timelimitList/timelimitList'
						},
						{
							pic_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							url: '/pages/goods/timelimitList/timelimitList'
						}
					];
					// that.tablist = res.nav_icon_list;
					that.goods_list = res.new_goods.slice(0, 3);
					that.goods_list1 = res.hot_goods;
					uni.stopPullDownRefresh();
				});
		}
	},
	// #ifndef MP-WEIXIN
	created() {
		that = this;
		that.tablist = data.indextablist;
		that.getindex();
	},
	// #endif
	// #ifdef MP-WEIXIN
	onLoad() {
		that = this;
		that.tablist = data.indextablist;
		that.getindex();
	},
	onPullDownRefresh() {
		that.getindex();
		that.$zax.getConfig();
	}
	// #endif
};
</script>

<style>
page {
	background-color: #F4F4F4;
	height: 100vh;
}
.header {
	/* background-color: #e11b01; */
	width: 100%;
	padding-bottom: 20upx;
}
/* 搜索 */
.search-view {
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0upx 44upx;
	background: rgba(0, 0, 0, 0);
}
.search-view .search-form {
	width: 609upx;
	height: 62upx;
	background-color: #f5f5f5;
	border-radius: 31upx;
	display: flex;
	align-items: center;
	padding-left: 29upx;
	font-size: 36upx;
	color: #b5b5b5;
}
.search-view .search-form input {
	font-size: 24upx;
	margin-left: 20upx;
}
/*  */
/* 轮播图下菜单 */
.rmen-list .c-icon {
	width: 100upx;
	height: 100upx;
}
/*  */
.swiper-vai {
	height: 316upx;
	/* background-image: linear-gradient(0deg, #9a5ddf 0%, #9d7ae0 100%); */
}
.screen-swiper {
	width: 698upx;
	height: 316upx;
	/* background-color:; */
	border-radius: 16upx;
	overflow: hidden;
	margin: auto;
}
.list {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 30upx;
}
.list-view {
	width: 335upx;
	height: 510upx;
	background-color: #eeeeee;
	border-radius: 16upx;
	overflow: hidden;
	position: relative;
}
.ven-view {
	position: absolute;
	top: 0upx;
	width: 100%;
	height: 100%;
	padding: 15upx;
	background: rgba(0, 0, 0, 0.1);
}
.list-viewbg {
	width: 100%;
	height: 100%;
}
.ven-view .cu-capsule {
	font-size: 21upx;
}
.ven-down {
	display: flex;
	align-items: center;
}
.ven-down-avatar {
	width: 64upx;
	height: 64upx;
	margin-right: 10upx;
}
.ven-down-name {
	width: 100upx;
	font-size: 24upx;
	color: #fffefe;
	/* border: solid #000 1upx; */
}
.ven-down-xin {
	width: 40upx;
	height: 40upx;
	margin-right: 10upx;
}
.ven-down-num {
	width: 60upx;
	font-size: 23upx;
	color: #fffefe;
	/* border: solid #000 1upx; */
}
.cart {
	width: 130upx;
	height: 130upx;
	border-radius: 1000upx;
	background-color: #ffffff;
	box-shadow: 0upx 10upx 15upx 1upx rgba(204, 204, 204, 0.39);
	position: fixed;
	right: 30upx;
	bottom: 150upx;
}
.cart image {
	width: 100%;
	height: 100%;
}



</style>
