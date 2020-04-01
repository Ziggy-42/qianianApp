<template>
	<view>
		<scroll-view class="scrollView" scroll-y="true" @scroll="gund">
			<view class="top-view" :style="[{ backgroundImage: 'url(' + shop.header_bg + ')' }]">
				<view style="background-color: rgba(255,255,255,0.2);">
					<cu-custom :bgColor="color" :isBack="true"><block slot="content">商家店铺</block></cu-custom>
					<view class="mch-view">
						<view class="mch-image"><image :src="shop.logo" mode="aspectFill"></image></view>
						<view class="mchrl">
							<view class="mch-name">{{ shop.name }}</view>
							<view class="mchrldw">
								<view class="mch-num">共{{shop.goods_num }}件宝贝</view>
								<view class="mch-search">
									<text class="cuIcon-search"></text>
									<input placeholder="输入要搜索的宝贝名称" :value="keyword" confirm-type="search" @input="getsearch" @confirm="search" placeholder-class="placeholder" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="header">
				<view class="tab" @tap="qie" data-index="1" :class="tabCar == 1 ? 'action' : ''">综合</view>
				<view class="tab" @tap="qie" data-index="2" :class="tabCar == 2 ? 'action' : ''">销量</view>
				<view class="tab price " @tap="qie" data-index="3" :class="tabCar == 3 ? 'action' : ''">
					价格
					<view v-if="!sort_type">
						<view class="cuIcon-triangleupfill" style="position: relative;top: 12upx;"></view>
						<view class="cuIcon-triangledownfill" style="position: relative;top: -5upx;"></view>
					</view>
					<view v-else>
						<view class="cuIcon-triangleupfill" v-if="sort_type == 1"></view>
						<view class="cuIcon-triangledownfill" v-if="sort_type == 2"></view>
					</view>
				</view>
			</view>
			<view class="kong"></view>
			<goodslist :list="goods_list"></goodslist>
			<view class="kong"></view>
			<uni-load-more status="loading" v-if="loading" ></uni-load-more>
			<nolist type="1" :text="'暂无相关的商品'" v-if="nolist"></nolist>
		</scroll-view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			loading:false,
			tabCar: '',
			sort_type: '',
			color: 'bg-kong', 
			topheight: 0,
			goods_list: [],
			mch_id:'',
			shop:'',
			page:1,
			nolist:false,
			nomore:false,
			keyword:''
		};
	},
	methods: {
		getsearch(e){
			that.keyword=e.detail.value;
		},
		search(e){
			that.page = 1;
			that.goods_list=[],
			that.getmchinfo();
		},
		qie(e) {
			let index = e.currentTarget.dataset.index;
			that.sort = index;
			if (index == 3) {
				if (that.sort_type != -1) {
					that.sort_type == 1 ? (that.sort_type =2) : (that.sort_type = 1);
				} else {
					that.sort_type = 1;
				}
			} else {
				that.sort_type = '';
			}
			that.tabCar=index
			that.page = 1;
			that.goods_list=[],
			that.getmchinfo();
		},
		gund(e) {
			let top = e.detail.scrollTop;
			if (top > that.topheight) {
				that.color = 'bg-white';
			} else {
				that.color = 'bg-kong';
			}
		},
		getmchinfo() {
			that.loading=true;
			this.$request
				.request({
					url: that.api.mch.shop,
					data: {
						mch_id: that.mch_id,
						tab: 2,
						sort: that.sort_type==2?4:that.tabCar,
						page: that.page, 
						keyword:that.keyword
					}
				})
				.then(res => {
					console.log(res)
					that.shop=res.shop;
					let goods_list=res.goods_list; 
					if (goods_list.length > 0) {
						that.goods_list = that.goods_list.concat(goods_list);
						that.page++; 
					} else {
						if (that.page != 1) {
							if (!that.nomore) {
								that.$alert('没有更多了！');
								that.nomore = true;
							}
						} else {
							that.nolist = true;
						}
					}
					uni.stopPullDownRefresh()
					that.loading=false;
				});
		}
	},
	onLoad(option) {
		that = this;
		that.mch_id=option.mch_id?option.mch_id:''; 
		that.getmchinfo();
	},

	onReady() {
		const query = uni.createSelectorQuery();
		query
			.select('.top-view')
			.boundingClientRect(function(res) {
				that.topheight = res.height;
			})
			.exec();
	},
	onReachBottom() {
		that.getmchinfo();
	}
};
</script>

<style> 
page{
	background: #f3f3f3;
}
.header {
	height: 80upx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 999;
	background: #fff;
}
.header .tab {
	flex: 1;
	text-align: center;
	font-size: 27upx;
	color: #969696;
}
.header .action {
	color: #b000dd;
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
.scrollView {
	height: 100vh;
}

.mch-view {
	height: 170upx;
	display: flex;
	color: #fff;
	padding: 30upx 47upx;
}
.mch-image {
	width: 110upx;
	height: 110upx;
	background-color: #eeeeee;
	border-radius: 10upx;
	overflow: hidden;
	margin-right: 26upx;
}
.mch-image image {
	width: 100%;
	height: 100%;
}
.mchrl {
	width: 520upx;
}
.mchrl .mchrldw {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 23upx;
	margin-top: 10upx;
}
.mch-name {
	font-size: 27upx;
	margin-top: 10upx;
}
.mch-search {
	width: 347upx;
	height: 53upx;
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	border-radius: 27upx;
	color: #b5b5b5;
	padding: 0upx 22upx;
}
.mch-search input {
	font-size: 22upx;
	margin-left: 10upx;
}
.placeholder {
	font-size: 22upx;
	color: #c7c6c6;
}
</style>
