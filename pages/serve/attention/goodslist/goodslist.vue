<template>
	<view>
		<view class="goodslist">
			<block v-for="(item, index) in list" :key="index">
				<view class="goods-view" @tap="tpinfo" :data-id="item.id">
					<view class="goods-img"><image :src="item.pic_url ? item.pic_url : item.cover" mode="aspectFill" lazy-load="true"></image></view>
					<view class="goods-down">
						<view class="goods-name text-cut">{{ item.name }}</view>
						<view class="goods-dview">
							<view class="goods-price">￥{{ item.price }}</view>
							<!-- <view class="icon-car"><image src="/static/icon/icon-car.png" mode="widthFix"></image></view> -->
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			page: 1,
			id: '',
			userinfo: '',
			list: []
		};
	},
	methods: {
		getinfo() {
			that.$request
				.request({
					url: that.api.live.blogger_goods,
					data: {
						page: that.page,
						user_id: that.id
					}
				})
				.then(res => {
					console.log(res);
					that.list = res;
				});
		},
		tpinfo(e){
			uni.navigateTo({
				url:'/pages/anchor/goods/goodsInfo/goodsInfo?id='+e.currentTarget.dataset.id
			})
		}
	},
	onLoad(option) {
		that = this;
		that.id = option.id ? option.id : '2';
		that.getinfo();
	}
};
</script>

<style> 
</style>
