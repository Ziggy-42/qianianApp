<template>
	<view>
		<view class="header" style="background-color: #F0F0F0;">
			<!-- <view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
			<view class="padding2 top_tab " style="background-color: #F0F0F0;">
				<scroll-view scroll-x class=" nav" style="background: #F0F0F0;">
					<view class="flex text-center">
						<view
							class="cu-item flex-sub texty"
							:class="item.id == TabCur ? 'tab-action' : ''"
							v-for="(item, index) in navtitle"
							:key="index"
							@tap="tabSelect"
							:data-id="item.id"
							style="font-size: ;"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view> -->
			<view style="background-color: #F0F0F0;height: 19upx;width: 100%;"></view>
		</view>
		<!-- <view style="height: 130upx;"></view> -->
		<view class="goodslist3">
			<block v-for="(item, index) in goods_list" :key="index">
				<view class="goods-view">
					<view class="goods-img"><image :src="item.cover_pic" style="width: 100%; height: 100%;" mode="aspectFill"></image></view>
					<view class="goods-right">
						<view class="goods-name">{{ item.name }}</view>
						<view class="goods-price">￥{{ item.price }}</view>
					</view>
					<view class="goods-print" @tap="printl" :data-index="index">
						<image src="/static/icon/print-cur.png" v-if="item.print"></image>
						<image src="/static/icon/print.png" v-else></image>
					</view>
				</view>
			</block>
		</view>
		<nomore text="没有更多了" v-if="nomore"></nomore>
		<nolist text="暂时没有商品" v-if="nolist"></nolist>
		<view class="down-view">
			<!-- <view>最多可选50个</view> -->
			<view class="flex align-center justify-between" style="width: 100%;;">
				<view>
					<text class="price-color">已选: {{ num }}</text>
					<text>/{{ goods_list.length }}</text>
				</view>
				<button class="cu-btn" @tap="choosedone">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			// navtitle: [{ id: -1, name: '平台商品' }, { id: 0, name: '商家商品' }, { id: 1, name: '我的商品' }],
			goods_list: [],
			num: 0,
			page: 1,
			nomore: false,
			nolist: false,
			idlist: []
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			(this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60), that.getorder();
			that.page = 1;
			that.list = [];
		},
		printl(e) {
			let index = e.currentTarget.dataset.index;
			let goods_list = that.goods_list;
			goods_list[index]['print'] = !goods_list[index]['print'];
			if (goods_list[index]['print']) {
				that.idlist.push(goods_list[index].id);
				console.log(that.idlist);
				that.num++;
			} else {
				var idindex = that.idlist.indexOf(goods_list[index].id);
				that.idlist.splice(idindex, 1);
				that.idlist = that.idlist;
				console.log(that.idlist);
				that.num--;
			}
			that.goods_list = goods_list;
			that.$forceUpdate();
		},
		getlist() {
			that.$request
				.request({
					url: that.api.anchor_order.choose_goods,
					method: 'GET',
					data: {
						page: that.page,
						type: 1
					}
				})
				.then(res => {
					console.log(res);
					if (res.list.length > 0) {
						that.goods_list = that.goods_list.concat(res.list);
						that.page = that.page + 1;
					} else {
						if (that.page != 1) {
							if (!that.nomore) {
								that.$alert('没有更多了!');
								that.nomore = true;
							}
						} else {
							that.nolist = true;
						}
					}
				});
		},
		choosedone() {
			console.log(that.idlist);

			if (that.idlist.length == 0) {
				uni.showToast({
					title: '请选择至少一件商品',
					icon: 'none'
				});
				return false;
			}
			that.idlist = that.idlist.join();
			console.log(that.idlist);
			that.$request
				.request({
					url: that.api.anchor_order.submit_selected_goods,
					method: 'POST',
					data: {
						ids: that.idlist
					}
				})
				.then(res => {
					console.log(res);
					uni.showToast({
						title: '添加成功！',
						icon: 'success',
						duration: 1200
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1400);
				});
		}
	},
	onLoad() {
		that = this;
		that.getlist();
	},
	onReachBottom() {
		that = this;
		that.getlist();
	}
};
</script>

<style>
@import '../../../../../css/goods.css'; 
.header {
	position: fixed;
	width: 100%;
	z-index: 999;
}

.tab-action {
	font-size: 28upx;
	color: #b701e5;
	border-bottom: solid #b701e5 5upx;
}

.goods-name {
	height: 100upx;
}

.down-view {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0upx 30upx;
	height: 105upx;
	background-color: #ffffff;
	box-shadow: 2rpx -1rpx 0rpx 0rpx rgba(205, 205, 205, 0.43);
	position: fixed;
	bottom: 0upx;
	font-size: 28rpx;
}

.down-view .cu-btn {
	width: 140rpx;
	height: 58rpx;
	background-color: #b701e5;
	border-radius: 29rpx;
	font-size: 28rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29rpx;
	letter-spacing: 0rpx;
	color: #ffffff;
	margin-left: 20upx;
}
</style>
