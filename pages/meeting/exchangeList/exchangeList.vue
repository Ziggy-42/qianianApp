<template>
	<view>
		<view class="header">
			<scroll-view scroll-x class="nav guo-nav">
				<view class="flex text-center">
					<view
						class="cu-item flex-sub"
						:class="index == TabCur ? 'text-blue action ' : ''"
						v-for="(item, index) in tabList"
						:key="index"
						@tap="tabSelect"
						:data-id="index"
					>
						{{ item.name }}
						<view class="after"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="height: 120upx;"></view>
		<view class="list-view">
			<block v-for="(item, index) in list" :key="index">
				<view class="li-view">
					<image class="image" lazy-load="true" :src="item.pic" mode="aspectFill"></image>
					<view class=" flex-sub flex-wrap  justify-between flex " style="height:157upx;">
						<view class="title-view text-cut">{{ item.name }}</view>
						<view class="text-view"><text class="text-gray">截止时间：2020年02月07日24:00</text></view>
					</view>
					<view class="rigcode" @tap="showModel" >
						<image src="/static/logo.png"></image>
						<view>
							<view>兑换二维码</view>
							<view>点击查看</view>
						</view>
					</view>
				</view>
			</block>
		</view>

		<view class="cu-modal" :class="modalName == 'qrcode' ? 'show' : ''" @tap="hidden" >
			<view class="cu-dialog" @tap.stop="" >
				<view style="position: relative;">
					<view class="text-center"><image src="/static/logo.png" class="qrcode"></image></view>
					<view>兑换二维码</view>
					<image src="/static/icon/icon-close.png" class="close" @tap="hidden" ></image>
				</view> 
			</view>
		</view>

		<uni-load-more status="loading" v-if="loading"></uni-load-more>
	</view>
</template>

<script>
var that;
export default {
	components: {},
	data() {
		return {
			TabCur: 1,
			tabList: [{ id: 0, name: '未兑换' }, { id: 1, name: '已兑换' }, { id: 1, name: '已过期' }],
			scrollLeft: 0,
			list: [
				{
					pic: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					name: 'XXX会务',
					tag: '线上'
				}
			],
			page: 1,
			nolist: false,
			loading: false,
			downList: [
				{
					url: '/pages/meeting/index/index',
					name: '会务报名'
				},
				{
					url: '/pages/meeting/mine/mine',
					name: '我的'
				}
			],
			modalName: ''
		};
	},
	methods: {
		hidden(){
			that.modalName=""
		},
		showModel(){
			that.modalName="qrcode"
		},
		tabSelect(e) {
			that.TabCur = e.currentTarget.dataset.id;
			that.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		getlist(e) {
			let page = that.page;
			that.loading = true;
			// that.$request
			// 	.request({
			// 		url: that.api.live.list,
			// 		data: {
			// 			keyword: that.keyword,
			// 			page: page,
			// 		}
			// 	})
			// 	.then(res => {
			// 		let list = res.list;
			// 		if (list.length > 0) {
			// 			that.list = that.list.concat(list);
			// 			that.page++;
			// 			that.nolist = false
			// 		} else {
			// 			that.nolist = true;
			// 		}
			// 		console.log(res);
			// 		uni.hideLoading();
			// 		uni.stopPullDownRefresh();
			// 		that.loading = false;
			// 	});
		}
	},
	onLoad() {
		that = this;
	}
};
</script>

<style>
page {
	background: #f3f3f3;
}
.header {
	position: fixed;
	width: 100%;
}
.tab2-view {
	display: flex;
	padding: 0upx 135upx;
	justify-content: space-between;
	height: 100upx;
	align-items: center;
}
.tab2-view .tab-btn {
	width: 123upx;
	height: 52upx;
	border-radius: 26upx;
	font-size: 28upx;
	line-height: 52upx;
	text-align: center;
	color: #9e9e9e;
}
.tab2-view .action {
	background-color: #d2eaff;
	color: #0088fe;
}
.list-view {
	padding: 0upx 25upx;
}
.list-view .li-view {
	align-items: flex-start;
	display: flex;
	padding: 32upx;
	background: #fff;
}
.list-view .li-view .image {
	width: 157upx;
	height: 157upx;
	margin-right: 20upx;
	border-radius: 10upx;
}
.title-view {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 30upx;
	color: #2f2f2f;
}

.text-view {
	width: 100%;
	font-size: 24upx;
	color: #535353;
	display: flex;
	align-items: center;
}
.text-view .icon {
	width: 30upx;
	height: 30upx;
	margin-right: 15upx;
}
.rigcode {
	width: 170upx;
	text-align: center;
	font-size: 22upx;
	line-height: 31upx;
	color: #4f74ff;
}
.rigcode image {
	width: 96upx;
	height: 96upx;
	margin-bottom: 10upx;
}
.cu-dialog {
	width: 559rpx;
	height: 585rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	font-size: 32rpx;
	color: #9c9c9c; 
	overflow: initial;
}
.qrcode {
	width: 322rpx;
	height: 323rpx;
	margin-top: 90upx;
	margin-bottom: 50upx;
}
.cu-dialog  .close {
	position: absolute;
	bottom: -200upx;
	width: 76rpx;
	height: 76rpx;
	left: 0;
	right: 0;
	margin: auto; 
}
</style>
