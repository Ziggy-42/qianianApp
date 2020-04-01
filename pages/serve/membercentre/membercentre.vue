<template>
	<view class="bg-img" style="height: 100%;" :style="[{ backgroundImage: 'url(' + bg + ')' }]">
		<scroll-view class="sc-view " scroll-y="true">
			<view class="top-view ">
				<view >
					<cu-custom :bgColor="color" :isBack="true"><block slot="content">会员中心</block></cu-custom>
				</view>
				<view class="text-center margin-bottom margin-top">
					<image :src="topimg" mode="widthFix" style="width: 382upx;"></image>
				</view> 
				<view class="all">
					<view class="bg-white all_white">
						<view class="text-center atitle">会员权益</view>
						<block v-for="(item, index) in level.synopsis" :key="index">
							<view class="list flex ">  
								<view class="flex justify-center align-center l_pos bg-img "  :style="[{ backgroundImage: 'url(' + item.pic  + ')' }]" >
									<image src="/static/liveBroadcast/cicon.png" mode="" v-if="!item.pic" ></image>
									<view class="l_index">{{ index + 1 }}</view>
								</view>
								<view class="l_content">{{ item.content }}</view>
							</view>
						</block>
					</view>
					<view class="btn" v-if="!info.now_level.id">
						<button class="bg-white text-center b_btn cu-btn " @click="buy">立即升级 ￥{{ level.price?level.price:''}}</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			color: 'bg-kong',
			bg: 'https://qf.huamais.com/addons/zjhj_mall/core/web/uploads/image/store_1/d4f1b6c30be3f715e6ef1589dbace522f1748035.png',
			topimg:'https://qf.huamais.com/addons/zjhj_mall/core/web/uploads/image/store_1/7b804e21f601100f69ab7f9ecf1e84d3041973dc.png',
			info: '',
			level: ''
		};
	},
	methods: {
		getinfo() {
			that.$request
				.request({
					url: that.api.user.member,
					method: 'post'
				})
				.then(res => {
					that.info = res;
					res.next_level
						? ((res.next_level.synopsis = JSON.parse(res.next_level.synopsis)), (that.level = res.next_level))
						: ((that.level = res.now_level));
					 console.log(that.level);
					 uni.setStorageSync("level",that.info)
				});
		},
		buy(){
			that.$request
					.request({
						url: that.api.user.submit_member,
						data:{
							level_id: that.level.id,
							pay_type: 'WECHAT_PAY'
						},
						method: 'post'
					})
					.then(res => {
						 console.log(res);
						 that.$pay.zwxpay(res).then(es=>{
							 that.$alertok("支付成功！");
							 console.log(es);
							 that.info.now_level=that.info.next_level
							  uni.setStorageSync("level",that.info)
							 that.getinfo();
							 that.$zax.userinfo() 
						 })
					}); 
		}
	},
	onLoad() {
		that = this;
		that.getinfo();
		that.info= uni.getStorageSync("level")
	}
};
</script>

<style>
page {
	height: 100vh;
}
.sc-view {
	height: 100%;
}

.all {
	/* position: absolute;
	top: 470upx; */
	width: 100%;
	padding: 0 35upx;
}

.all_white {
	width: 100%;
	min-height: 705upx;
	border-radius: 20upx;
	padding: 10upx 33upx;
}

.atitle {
	color: #2c2c2c;
	font-size: 32upx;
	line-height: 142upx;
}

.list {
	margin-bottom: 32upx;
}

.l_pos {
	position: relative;
	width: 55upx;
	height: 55upx;
	margin-right: 23upx;
	width: 10%;
}

.l_pos image {
	width: 55upx;
	height: 55upx;
	position: absolute;
	top: 0;
}

.l_index {
	font-size: 32upx;
	color: #fff;
	z-index: 1000;
}

.l_content {
	width: 90%;
	color: #373737;
	font-size: 28upx;
	line-height: 50upx;
}

.btn {
	padding: 0 108upx;
	width: 100%;
	margin-top: 37upx;
}

.b_btn {
	border-radius: 35upx;
	width: 100%;
	height: 70upx;
	color: #ac1dff;
	line-height: 70upx;
}
.top-view {
	background-size: cover;
}
</style>
