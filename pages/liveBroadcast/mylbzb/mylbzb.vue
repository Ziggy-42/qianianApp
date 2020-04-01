<template>
	<view>
		<view class="goodslist1">
			<block v-for="(item, index) in userlist" :key="index">
				<view class="goods-view" @tap="tpinfo" :data-id="item.id" :data-status="item.status" >
					<view class="goods-img"><image :src="item.cover" style="width: 100%; height: 100%;" mode="aspectFill"></image></view>
					<view class="goods-right">
						<view class="goods-top-view text-cut">
							<view class="title-view">{{ item.title }}</view>
							<view @tap.stop="del" :data-index="index" :data-id="item.id" class="cuIcon-delete"></view>
						</view>
						<view class="down-view">
							<view style="color: #828282;">{{ item.goods }}件商品</view>
							<view style="color: #ff9829;">
								<view class=" ">
									<text v-if="item.status == 0">未知</text>
									<text v-if="item.status == 1">直播中</text>
									<text v-if="item.status == 2">预告中</text>
									<text v-if="item.status == 3">已结束</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<nomore v-if="nomore" text="没有更多了"></nomore>
		<uni-load-more status="loading" v-if="loading" ></uni-load-more>
		<nolist type="0" text="您还没有直播" v-if="nolist"></nolist>
		 
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			loading:false,
			userlist: [],
			page: 1,
			nomore: false,
			nolist: false
		};
	},
	methods: {
		del(e) {
			let id = e.currentTarget.dataset.id; 
			let index=e.currentTarget.dataset.index;
			uni.showModal({
				title: '提示',
				content: '确定要删除',
				cancelText: '取消',
				confirmText: '确定',
				success(res) {
					if (res.confirm) {
						that.$request
							.request({
								url: that.api.live.del_notice_live,
								data: {
									id: id
								},
								Toast:'请稍等...',
								method:"get"
							})
							.then(res => { 
								that.userlist.splice(index,1)
								if(that.userlist.length<5){
									that.page=1;
									that.getlist()
								}
								that.$alertok("删除成功！");
								
							});
					}
				}
			});
		},
		getlist() {
			that.loading=true
			that.$request
				.request({
					url: that.api.live.my_live,
					method: 'GET',
					data: {
						page: that.page
					}
				})
				.then(res => {
					console.log(res); 
					if (that.page == 1) {
						that.userlist = res.list;
						that.page = that.page + 1;
					} else {
						if (res.list.length > 0) {
							that.userlist = that.userlist.concat(res.list); 
							that.page = that.page + 1;
						} else {
							if (that.page != 1) {
								if (!that.nomore) {
									that.nomore = true;
								}
							} else {
								that.nolist = true;
							}
						}
					}
					that.loading=false
					uni.hideLoading();
				});
		},
		tpinfo(e) {
			let id=e.currentTarget.dataset.id;
			let status=e.currentTarget.dataset.status;
			if(status==1){
				uni.navigateTo({
					url: '/pages/liveBroadcast/livePusher/pusher/pusher?id='+id
				});
			}else{
				uni.navigateTo({
					url: '/pages/liveBroadcast/livedetail/livedetail?id='+id
				});
			}
			
		}
	},
	onLoad() {
		that = this;
		that.getlist();
	},
	onReachBottom() {
		that.getlist();
	}
};
</script>

<style> 
.goodslist1 .goods-img {
	width: 160upx;
	height: 160upx;
	border-radius: 10upx;
	overflow: hidden;
	margin-right: 25upx;
}
.goods-top-view {
	height: 110upx;
	width: 450upx;
	display: flex;
	justify-content: space-between;
	padding-top: 10rpx;
}
.goods-top-view .cuIcon-delete {
	font-size: 42upx;
}
.goods-top-view .title-view {
	margin-top: 3upx;
	font-size: 28upx;
	color: #313131;
}

.down-view {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 25upx;
}
</style>
