<template>
	<view>
		 
		<view class="top bg-white margin-top">
			<view class="text-gray" style="margin-bottom: 24upx;" >总收益</view>
			<view style="font-size: 50upx;color: #fe4141;" >¥{{info.total_price ? info.total_price : 0}}</view>
		</view>

		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="tolist" data-id="1"  >
				<navigator class="content" hover-class="none" url="" open-type="redirect"><text class="text-black">分享佣金</text></navigator>
				<view class="action text-gray" style="font-size: 28upx;">￥{{info.share_money ? info.share_money : 0}}</view>
			</view>
			<view class="cu-item arrow" @tap="tolist" data-id="2" >
				<navigator class="content" hover-class="none" url="" open-type="redirect"><text class="text-black">团队奖励</text></navigator>
				<view class="action text-gray" style="font-size: 28upx;">￥{{info.team_price ? info.team_price : 0}}</view>
			</view>
			<view class="cu-item arrow" @tap="tolist" data-id="3" >
				<navigator class="content" hover-class="none" url="" open-type="redirect"><text class="text-black">顾问奖励</text></navigator>
				<view class="action text-gray" style="font-size: 28upx;">￥{{info.guwen_price ? info.guwen_price : 0}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
export default {
	data() {
		return {
			info:{}
		};
	},
	methods: {
		getmoney(){
				this.$request
				.get({
						url: 'api/share/total-money',
					},
					'正在加载'
				)
				.then(res => {
					if (res.code == 1) {
						this.$alert(res.msg);
					} else {
						// console.log(res.data);
						that.info=res.data
					}
				}); 
		},
		tolist(e){
			uni.navigateTo({
				url:"/pages/earnings/mxlist/mxlist?type="+e.currentTarget.dataset.id
			})
		}
	},
	onLoad() {
		that=this;
		that.getmoney();
	},
	onPullDownRefresh() { 
		that.getmoney();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style>
	.top{
		padding-top: 62upx;
		padding-bottom: 72upx;
		text-align: center;
	}
</style>
