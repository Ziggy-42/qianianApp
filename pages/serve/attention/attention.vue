<template>
	<view class="bg-white">
		<view class="kong"></view>
		<view class="cu-list menu-avatar ">
			<view class="cu-item" v-for="(item, index) in userlist" :key="index" @tap="touser" :data-user_id="item.anchor.user_id">
				<view class="cu-avatar round lg avatar " :style="[{ backgroundImage: 'url(' + item.anchor.avatar + ')' }]"></view>
				<view class="content" >
					<view class="text-grey text-block">{{ item.anchor.name }}</view>
					<view class="text-gray text-sm flex" style="margin-top: 12rpx;">
						<text>{{ item.anchor.follow_count }}人关注</text>
						<block>
							<view style="margin: 0upx 10upx;" > | </view>
							<text class="  ">累计{{ item.anchor.live_count }}场直播</text>
						</block>
					</view>
				</view>
				<view class="action" @tap="dofans" :data-index="index" :data-user_1="item.user_1" :data-user_2="item.user_2">
					<!-- <text class="btn" v-if="item.is_true == 0">取消关注</text>
					<text class="btn huguan" v-if="item.is_true == 1">相互关注</text> -->
					<text class="cuIcon-right"  ></text>
				</view>
			</view>
		</view> 
		<uni-load-more :status="lodstatus" v-if="lodstatus"></uni-load-more>
		<nolist text="您还没有关注主播"  v-if="nolist" ></nolist>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			lodstatus:'',
			userlist: [],
			page: 1, 
			nolist: false
		};
	},
	methods: {
		getlist() {
			that.lodstatus = 'loading';
			that.nolist=false;
			that.$request
				.request({
					url: that.api.live.follow_list,
					method: 'post',
					data: { 
						page: that.page
					}
				})
				.then(res => {
					console.log(res)
					if (that.page == 1) {
						that.userlist = res;
						res.length==0?(that.lodstatus = '',that.nolist=true):(res.length>10?that.lodstatus = 'more':that.lodstatus = '')
					}else{
						if (res.length > 0) {
							that.userlist = that.userlist.concat(res);
							that.page++;
							that.lodstatus = 'more'; 
						} else {
							that.lodstatus = 'noMore';
							that.nolist=true 
						}
					} 
					uni.hideLoading();
				});
			
		},
		touser(e) { 
			var data = e.currentTarget.dataset;
			uni.navigateTo({
				url: './info/info?id='+ data.user_id
			});
		} 
	},
	onLoad(option) {
		that = this; 
		that.getlist();
	},
	onReachBottom() {
		that.getlist();
	}
};
</script>

<style>
	page{
		background: #fff;
	}
.text-block {
	color: #434343;
	font-size: 30upx;
}

.cu-list.menu-avatar>.cu-item{
	height: 200upx;
}

.cu-list.menu-avatar > .cu-item .action {
	width: 80upx;
	font-size: 40rpx;
	color: #bfbfbf;
}

.btn {
	background-color: #ffd100;
	border-radius: 4upx;
	padding: 11upx 20upx;
	font-size: 26upx;
}

.huguan {
	background-color: #e3e3e3;
	color: #707070;
}
.cu-list.menu-avatar>.cu-item .content{
	left: 180rpx;
}
.avatar{
	width: 120rpx;
	height: 120rpx;
	margin-right: 20rpx;
}
</style>
